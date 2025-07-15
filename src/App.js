import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [spinning, setSpinning] = useState(false);

  // CORS proxy URLs (fallback options)
  const proxies = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://cors-anywhere.herokuapp.com/'
  ];

  const [currentProxyIndex, setCurrentProxyIndex] = useState(0);
  const targetUrl = 'https://gold.pk/';
  const refreshIntervalMs = 300000; // 5 minutes

  // Fetch with timeout
  const fetchWithTimeout = useCallback((url, timeout) => {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timeout'));
      }, timeout);

      fetch(url, { signal: controller.signal })
        .then(response => {
          clearTimeout(timeoutId);
          resolve(response);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }, []);

  // Extract price from text
  const extractPriceFromText = useCallback((text) => {
    // Remove currency symbols and extract numeric value
    const cleanText = text.replace(/[^\d,\.]/g, '');
    const numericValue = parseFloat(cleanText.replace(/,/g, ''));
    return isNaN(numericValue) ? null : numericValue;
  }, []);

  // Parse gold price from HTML
  const parseGoldPrice = useCallback((html) => {
    try {
      // Create a DOM parser to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Multiple strategies to find the gold price
      const strategies = [
        // Strategy 1: Look for common gold price selectors and table structures
        () => {
          const selectors = [
            '[data-gold-price]',
            '.gold-price',
            '#gold-price',
            '.price-value',
            '.current-price',
            'td:contains("10 gram")',
            'td:contains("10g")',
            'td:contains("10 Gram")'
          ];

          for (const selector of selectors) {
            const element = doc.querySelector(selector);
            if (element) {
              const price = extractPriceFromText(element.textContent);
              if (price && price > 50000 && price < 500000) {
                return price;
              }
            }
          }
          return null;
        },

        // Strategy 2: Look for table rows with gold price data
        () => {
          const rows = doc.querySelectorAll('tr');
          for (const row of rows) {
            const cells = row.querySelectorAll('td, th');
            let hasGoldReference = false;
            let priceValue = null;
            
            for (const cell of cells) {
              const text = cell.textContent.trim();
              // Check if this row contains gold reference
              if (text.match(/10\s*(gram|g|Gram)/i) || text.match(/gold/i)) {
                hasGoldReference = true;
              }
              // Check if this cell contains price
              if (text.match(/\d{1,3}(?:[,\.]?\d{3})*\s*(RS|PKR|₹)/i)) {
                const price = extractPriceFromText(text);
                if (price && price > 50000 && price < 500000) {
                  priceValue = price;
                }
              }
            }
            
            if (hasGoldReference && priceValue) {
              return priceValue;
            }
          }
          return null;
        },

        // Strategy 3: Enhanced regex search with better patterns
        () => {
          // Look for price patterns in the entire HTML
          const pricePatterns = [
            /(?:10\s*(?:gram|g|Gram).*?)?(\d{1,3}(?:[,\.]?\d{3})*(?:\.\d{2})?)\s*(RS|PKR|₹)/gi,
            /(\d{1,3}(?:[,\.]?\d{3})*(?:\.\d{2})?)\s*(RS|PKR|₹)(?:.*?10\s*(?:gram|g|Gram))?/gi,
            /gold.*?(\d{1,3}(?:[,\.]?\d{3})*(?:\.\d{2})?)\s*(RS|PKR|₹)/gi
          ];
          
          for (const pattern of pricePatterns) {
            const matches = Array.from(html.matchAll(pattern));
            if (matches && matches.length > 0) {
              for (const match of matches) {
                const price = extractPriceFromText(match[1]);
                if (price && price > 50000 && price < 500000) {
                  return price;
                }
              }
            }
          }
          return null;
        },

        // Strategy 4: Look for price in specific table contexts
        () => {
          const tables = doc.querySelectorAll('table');
          for (const table of tables) {
            const cells = table.querySelectorAll('td, th');
            const prices = [];
            
            for (const cell of cells) {
              const text = cell.textContent.trim();
              if (text.match(/\d{1,3}(?:[,\.]?\d{3})*\s*(RS|PKR|₹)/i)) {
                const price = extractPriceFromText(text);
                if (price && price > 50000 && price < 500000) {
                  prices.push(price);
                }
              }
            }
            
            // If we found prices in a table, return the most reasonable one
            if (prices.length > 0) {
              // Sort prices and take the median or most common range
              prices.sort((a, b) => a - b);
              return prices[Math.floor(prices.length / 2)];
            }
          }
          return null;
        },

        // Strategy 5: Look for any numeric values that could be gold prices
        () => {
          const allText = doc.body.textContent;
          const priceMatches = allText.match(/\d{1,3}(?:[,\.]?\d{3})*/g);
          
          if (priceMatches) {
            for (const match of priceMatches) {
              const price = extractPriceFromText(match);
              if (price && price > 50000 && price < 500000) {
                // Additional validation: check if price is near other gold-related content
                const context = allText.toLowerCase();
                if (context.includes('gold') || context.includes('10') || context.includes('gram')) {
                  return price;
                }
              }
            }
          }
          return null;
        }
      ];

      // Try each strategy
      for (const strategy of strategies) {
        const price = strategy();
        if (price && price > 0) {
          console.log('Successfully parsed price:', price);
          return price;
        }
      }

      console.error('Failed to parse gold price from HTML');
      return null;

    } catch (error) {
      console.error('Error parsing HTML:', error);
      return null;
    }
  }, [extractPriceFromText]);

  // Fetch with proxy
  const fetchWithProxy = useCallback(async () => {
    let lastError = null;

    // Try each proxy
    for (let i = 0; i < proxies.length; i++) {
      const proxyIndex = (currentProxyIndex + i) % proxies.length;
      const proxy = proxies[proxyIndex];

      try {
        console.log(`Attempting to fetch with proxy ${proxyIndex + 1}:`, proxy);
        const response = await fetchWithTimeout(proxy + encodeURIComponent(targetUrl), 15000);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        let html = '';
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          // Handle different proxy response formats
          if (data.contents) {
            html = data.contents; // allorigins format
          } else if (data.data) {
            html = data.data; // alternative format
          } else if (typeof data === 'string') {
            html = data; // string response
          } else {
            throw new Error('Unexpected JSON proxy response format');
          }
        } else {
          // Direct HTML response (cors-anywhere, etc.)
          html = await response.text();
        }

        if (!html || html.length < 100) {
          throw new Error('Received empty or invalid response');
        }

        // Update current proxy index for next request
        setCurrentProxyIndex(proxyIndex);
        return html;

      } catch (error) {
        console.error(`Proxy ${proxyIndex + 1} failed:`, error.message);
        lastError = error;
        continue;
      }
    }

    // If all proxies failed, throw the last error
    throw new Error(`All proxies failed. Last error: ${lastError?.message || 'Unknown error'}`);
  }, [currentProxyIndex, fetchWithTimeout, targetUrl]);

  // Fetch gold price
  const fetchGoldPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsOnline(false);

    try {
      const html = await fetchWithProxy();
      const price = parseGoldPrice(html);

      if (price) {
        setGoldPrice(price);
        setLastUpdated(new Date());
        setIsOnline(true);
      } else {
        throw new Error('Unable to parse gold price from the website');
      }
    } catch (error) {
      console.error('Error fetching gold price:', error);
      setError(error.message);
      setIsOnline(false);
    } finally {
      setLoading(false);
    }
  }, [fetchWithProxy, parseGoldPrice]);

  // Manual refresh
  const handleManualRefresh = useCallback(() => {
    setSpinning(true);
    fetchGoldPrice().finally(() => {
      setSpinning(false);
    });
  }, [fetchGoldPrice]);

  // Format time
  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }, []);

  // Format price
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }, []);

  // Setup intervals
  useEffect(() => {
    // Initial fetch
    fetchGoldPrice();

    // Setup auto-refresh
    const refreshInterval = setInterval(fetchGoldPrice, refreshIntervalMs);

    // Setup countdown
    let countdownTime = refreshIntervalMs / 1000;
    setCountdown(countdownTime);

    const countdownInterval = setInterval(() => {
      countdownTime -= 1;
      setCountdown(countdownTime);

      if (countdownTime <= 0) {
        countdownTime = refreshIntervalMs / 1000;
        setCountdown(countdownTime);
      }
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, [fetchGoldPrice, refreshIntervalMs]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Resume when tab becomes visible
        fetchGoldPrice();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchGoldPrice]);

  // Format countdown
  const formatCountdown = useCallback((seconds) => {
    if (seconds <= 0) return 'Refreshing...';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className="container">
      <header>
        <h1>
          <i className="fas fa-coins"></i> Gold Price Tracker
        </h1>
        <p className="subtitle">Live gold prices updated every 5 minutes</p>
      </header>

      <main>
        <div className="price-card">
          <div className="price-header">
            <h2>Current Gold Price</h2>
            <button 
              className={`refresh-btn ${spinning ? 'spinning' : ''}`}
              onClick={handleManualRefresh}
              title="Refresh Now"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>

          <div className="price-display">
            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Fetching latest gold prices...</p>
              </div>
            )}

            {!loading && goldPrice && (
              <div className="price-content">
                <div className="price-value">
                  {formatPrice(goldPrice)}
                </div>
                <div className="price-unit">per 10 grams</div>
              </div>
            )}

            {!loading && error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{error}</p>
                <button className="retry-btn" onClick={fetchGoldPrice}>
                  Try Again
                </button>
              </div>
            )}
          </div>

          <div className="price-footer">
            {lastUpdated && (
              <div className="last-updated">
                <i className="fas fa-clock"></i>
                <span>{formatTime(lastUpdated)}</span>
              </div>
            )}
            <div className="source-info">
              <i className="fas fa-link"></i>
              <span>Source: gold.pk</span>
            </div>
          </div>
        </div>

        <div className="status-bar">
          <div className="next-update">
            <i className="fas fa-refresh"></i>
            <span>Next update in: {formatCountdown(countdown)}</span>
          </div>
          <div className="connection-status">
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
            <span>{isOnline ? 'Connected' : 'Connecting...'}</span>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Gold Price Tracker. Data sourced from public websites.</p>
      </footer>
    </div>
  );
};

export default App;