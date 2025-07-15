import React, { useState, useEffect, useCallback } from 'react';
import GoldPriceScraper from '../utils/goldPriceScraper';
import './Home.css';

const Home = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const scraper = new GoldPriceScraper();
  const refreshIntervalMs = 300000; // 5 minutes

  // Conversion constants
  const GRAMS_PER_TOLA = 11.6638;

  // Fetch Pakistan gold price
  const fetchGoldPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsOnline(false);

    try {
      const price = await scraper.fetchPakistanGoldPrice();

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
  }, [scraper]);

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

  // Calculate prices for different units
  const calculatePrices = useCallback((per10GramPrice) => {
    if (!per10GramPrice) return null;
    
    return {
      per10Gram: per10GramPrice,
      perGram: per10GramPrice / 10,
      perTola: (per10GramPrice / 10) * GRAMS_PER_TOLA
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
          <i className="fas fa-coins"></i> Gold Price Tracker
        </h1>
        <p className="subtitle">Live Pakistani gold prices updated every 5 minutes</p>
      </header>

      <main className="home-main">
        <div className="price-cards-container">
          {/* 10 Grams Price Card */}
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
        </div>

        <div className="info-section">
          <div className="conversion-info">
            <h3><i className="fas fa-info-circle"></i> Price Conversion Information</h3>
            <div className="conversion-grid">
              <div className="conversion-item">
                <strong>1 Tola</strong>
                <span>= 11.6638 grams</span>
              </div>
              <div className="conversion-item">
                <strong>1 Gram</strong>
                <span>= 0.0858 tola</span>
              </div>
              <div className="conversion-item">
                <strong>10 Grams</strong>
                <span>= 0.858 tola</span>
              </div>
              <div className="conversion-item">
                <strong>Pakistani Standard</strong>
                <span>Tola is traditional unit</span>
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