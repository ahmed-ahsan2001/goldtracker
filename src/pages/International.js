import React, { useState, useEffect, useCallback } from 'react';
import './International.css';

const International = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // Fetch international gold price
  const fetchInternationalGoldPrice = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Using API Ninjas Gold Price API
      const response = await fetch('https://api.api-ninjas.com/v1/goldprice', {
        headers: {
          'X-Api-Key': process.env.REACT_APP_API_NINJAS_KEY || 'DEMO_KEY'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.price && data.price > 0) {
        setGoldPrice(data.price);
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid price data received');
      }
    } catch (error) {
      console.error('Error fetching international gold price:', error);
      setError('Unable to fetch international gold price. Please check your API key.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Manual refresh
  const handleManualRefresh = useCallback(() => {
    setSpinning(true);
    fetchInternationalGoldPrice().finally(() => {
      setSpinning(false);
    });
  }, [fetchInternationalGoldPrice]);

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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }, []);

  // Calculate different unit prices
  const calculatePrices = useCallback((perOuncePrice) => {
    if (!perOuncePrice) return null;
    
    const GRAMS_PER_OUNCE = 31.1035;
    const GRAMS_PER_TOLA = 11.6638;
    
    return {
      perOunce: perOuncePrice,
      perGram: perOuncePrice / GRAMS_PER_OUNCE,
      perTola: (perOuncePrice / GRAMS_PER_OUNCE) * GRAMS_PER_TOLA,
      per10Gram: (perOuncePrice / GRAMS_PER_OUNCE) * 10
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchInternationalGoldPrice();
  }, [fetchInternationalGoldPrice]);

  const prices = calculatePrices(goldPrice);

  return (
    <div className="international-container">
      <header className="international-header">
        <h1>
          <i className="fas fa-globe"></i> International Gold Prices
        </h1>
        <p className="subtitle">Live international gold prices from global markets</p>
      </header>

      <main className="international-main">
        <div className="api-notice">
          <div className="notice-content">
            <i className="fas fa-key"></i>
            <div>
              <h3>API Key Required</h3>
              <p>To display live international gold prices, you need an API key from API Ninjas. 
                 This ensures real-time, accurate pricing data from global markets.</p>
              <a href="https://api.api-ninjas.com" target="_blank" rel="noopener noreferrer" className="api-link">
                Get Free API Key →
              </a>
            </div>
          </div>
        </div>

        <div className="price-cards-container">
          {/* Per Ounce Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>Per Ounce</h2>
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
                  <p>Fetching international gold prices...</p>
                </div>
              )}

              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.perOunce)}
                  </div>
                  <div className="price-unit">per troy ounce</div>
                </div>
              )}

              {!loading && error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  <p>{error}</p>
                  <button className="retry-btn" onClick={fetchInternationalGoldPrice}>
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Per Gram Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>Per Gram</h2>
              <div className="price-badge">
                <i className="fas fa-calculator"></i>
                <span>Calculated</span>
              </div>
            </div>

            <div className="price-display">
              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.perGram)}
                  </div>
                  <div className="price-unit">per gram</div>
                </div>
              )}

              {!loading && !prices && !error && (
                <div className="price-content">
                  <div className="price-value">--</div>
                  <div className="price-unit">per gram</div>
                </div>
              )}
            </div>
          </div>

          {/* Per Tola Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>Per Tola</h2>
              <div className="price-badge">
                <i className="fas fa-calculator"></i>
                <span>11.66g</span>
              </div>
            </div>

            <div className="price-display">
              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.perTola)}
                  </div>
                  <div className="price-unit">per tola</div>
                </div>
              )}

              {!loading && !prices && !error && (
                <div className="price-content">
                  <div className="price-value">--</div>
                  <div className="price-unit">per tola</div>
                </div>
              )}
            </div>
          </div>

          {/* Per 10 Grams Price Card */}
          <div className="price-card">
            <div className="price-header">
              <h2>Per 10 Grams</h2>
              <div className="price-badge">
                <i className="fas fa-calculator"></i>
                <span>Calculated</span>
              </div>
            </div>

            <div className="price-display">
              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">
                    {formatPrice(prices.per10Gram)}
                  </div>
                  <div className="price-unit">per 10 grams</div>
                </div>
              )}

              {!loading && !prices && !error && (
                <div className="price-content">
                  <div className="price-value">--</div>
                  <div className="price-unit">per 10 grams</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="conversion-info">
            <h3><i className="fas fa-info-circle"></i> International Gold Standards</h3>
            <div className="conversion-grid">
              <div className="conversion-item">
                <strong>1 Troy Ounce</strong>
                <span>= 31.1035 grams</span>
              </div>
              <div className="conversion-item">
                <strong>1 Tola</strong>
                <span>= 11.6638 grams</span>
              </div>
              <div className="conversion-item">
                <strong>1 Troy Ounce</strong>
                <span>= 2.67 tolas</span>
              </div>
              <div className="conversion-item">
                <strong>Global Standard</strong>
                <span>Troy ounce for trading</span>
              </div>
            </div>
          </div>

          <div className="market-info">
            <h3><i className="fas fa-chart-line"></i> Market Information</h3>
            <div className="market-grid">
              <div className="market-item">
                <strong>Trading Hours</strong>
                <span>24/7 Global Markets</span>
              </div>
              <div className="market-item">
                <strong>Primary Markets</strong>
                <span>COMEX, LBMA, Shanghai</span>
              </div>
              <div className="market-item">
                <strong>Currency</strong>
                <span>USD (US Dollar)</span>
              </div>
              <div className="market-item">
                <strong>Update Frequency</strong>
                <span>Real-time</span>
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
              <span>Source: API Ninjas / Global Markets</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default International;