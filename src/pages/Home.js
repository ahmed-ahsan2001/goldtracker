import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';

const Home = () => {
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

  // Conversion constants
  const GRAMS_PER_TOLA = 11.6638;

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

      console.log('Attempting to parse HTML, length:', html.length);
      
      // Check if goldratehome class exists
      const goldRateElements = doc.querySelectorAll('.goldratehome');
      console.log('Found goldratehome elements:', goldRateElements.length);
      
      if (goldRateElements.length > 0) {
        goldRateElements.forEach((el, index) => {
          console.log(`goldratehome element ${index}:`, el.textContent);
        });
      }

      // Multiple strategies to find the gold price
      const strategies = [
        // Strategy 1: Look for the specific goldratehome class from gold.pk
        () => {
          const goldRateElement = doc.querySelector('.goldratehome');
          if (goldRateElement) {
            const price = extractPriceFromText(goldRateElement.textContent);
            if (price && price > 50000 && price < 500000) {
              console.log('Found price using goldratehome class:', price);
              return price;
            }
          }
          return null;
        },

        // Strategy 2: Look for other common gold price selectors
        () => {
          const selectors = [
            'p.goldratehome',
            '[data-gold-price]',
            '.gold-price',
            '#gold-price',
            '.price-value',
            '.current-price'
          ];

          for (const selector of selectors) {
            const element = doc.querySelector(selector);
            if (element) {
              const price = extractPriceFromText(element.textContent);
              if (price && price > 50000 && price < 500000) {
                console.log('Found price using selector:', selector, price);
                return price;
              }
            }
          }
          return null;
        },

        // Strategy 3: Look for table rows with gold price data
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

  // Calculate different unit prices
  const calculatePrices = useCallback((per10GramPrice) => {
    if (!per10GramPrice) return null;
    
    return {
      per10Gram: per10GramPrice,
      per1Gram: per10GramPrice / 10,
      per1Tola: (per10GramPrice / 10) * GRAMS_PER_TOLA
    };
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

  const prices = calculatePrices(goldPrice);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>
          <i className="fas fa-coins"></i> Pakistan Gold Price Tracker
        </h1>
        <p className="subtitle">Live gold prices updated every 5 minutes</p>
      </header>

      <main className="home-main">
        <div className="price-cards-container">
          {/* 10 Gram Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>10 Grams</h2>
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

              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.per10Gram)}
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
          </div>

          {/* 1 Gram Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>1 Gram</h2>
              <div className="price-badge">
                <i className="fas fa-calculator"></i>
                <span>Calculated</span>
              </div>
            </div>

            <div className="price-display">
              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.per1Gram)}
                  </div>
                  <div className="price-unit">per 1 gram</div>
                </div>
              )}

              {!loading && !prices && !error && (
                <div className="price-content">
                  <div className="price-value">--</div>
                  <div className="price-unit">per 1 gram</div>
                </div>
              )}
            </div>
          </div>

          {/* 1 Tola Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>1 Tola</h2>
              <div className="price-badge">
                <i className="fas fa-calculator"></i>
                <span>11.66g</span>
              </div>
            </div>

            <div className="price-display">
              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.per1Tola)}
                  </div>
                  <div className="price-unit">per 1 tola</div>
                </div>
              )}

              {!loading && !prices && !error && (
                <div className="price-content">
                  <div className="price-value">--</div>
                  <div className="price-unit">per 1 tola</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="conversion-info">
            <h3><i className="fas fa-info-circle"></i> Conversion Information</h3>
            <div className="conversion-grid">
              <div className="conversion-item">
                <strong>1 Tola</strong>
                <span>= 11.6638 grams</span>
              </div>
              <div className="conversion-item">
                <strong>10 Grams</strong>
                <span>= 0.8574 tola</span>
              </div>
              <div className="conversion-item">
                <strong>1 Gram</strong>
                <span>= 0.0857 tola</span>
              </div>
            </div>
          </div>

          <div className="price-footer">
            {lastUpdated && (
              <div className="last-updated">
                <i className="fas fa-clock"></i>
                <span>Last Updated: {formatTime(lastUpdated)}</span>
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
    </div>
  );
};

export default Home;