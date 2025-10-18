import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  const [scraper] = useState(() => new GoldPriceScraper());
  const refreshIntervalMs = 300000; // 5 minutes

  const GRAMS_PER_TOLA = 11.6638;

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

  const handleManualRefresh = useCallback(() => {
    if (loading) return;
    setSpinning(true);
    fetchGoldPrice().finally(() => {
      setTimeout(() => setSpinning(false), 500);
    });
  }, [fetchGoldPrice, loading]);

  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const calculatePrices = useCallback((perTolaPrice) => {
    if (!perTolaPrice) return null;
    return {
      per10Gram: (perTolaPrice / GRAMS_PER_TOLA) * 10,
      perGram: perTolaPrice / GRAMS_PER_TOLA,
      perTola: perTolaPrice,
    };
  }, []);

  useEffect(() => {
    fetchGoldPrice();

    const refreshInterval = setInterval(fetchGoldPrice, refreshIntervalMs);
    let countdownTime = refreshIntervalMs / 1000;
    setCountdown(countdownTime);

    const countdownInterval = setInterval(() => {
      countdownTime -= 1;
      setCountdown(countdownTime <= 0 ? refreshIntervalMs / 1000 : countdownTime);
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, [fetchGoldPrice, refreshIntervalMs]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) fetchGoldPrice();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchGoldPrice]);

  const formatCountdown = useCallback((seconds) => {
    if (seconds <= 0) return 'Refreshing...';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const prices = calculatePrices(goldPrice);

  // Converter state
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('tola');
  const [toUnit, setToUnit] = useState('gram');
  const [convertedValue, setConvertedValue] = useState(null);

  const handleConvert = () => {
    if (!inputValue || !prices) return;
    let valueInTola;
    if (fromUnit === 'tola') valueInTola = parseFloat(inputValue);
    if (fromUnit === 'gram') valueInTola = parseFloat(inputValue) / GRAMS_PER_TOLA;
    if (fromUnit === '10gram') valueInTola = parseFloat(inputValue) / (GRAMS_PER_TOLA / 10);

    let result;
    if (toUnit === 'tola') result = valueInTola;
    if (toUnit === 'gram') result = valueInTola * GRAMS_PER_TOLA;
    if (toUnit === '10gram') result = (valueInTola * GRAMS_PER_TOLA) / 10;

    setConvertedValue(result.toFixed(2));
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1><i className="fas fa-coins"></i> Gold Price Tracker</h1>
        <p className="subtitle">Live Pakistani gold prices updated according to bullion</p>
      </header>

      <main className="home-main">
        <div className="price-cards-container">
          {/* Tola */}
          <div className="price-card">
            <div className="price-header">
              <h2>24 Karat (1 Tola)</h2>
              <button className={`refresh-btn ${spinning ? 'spinning' : ''}`} onClick={handleManualRefresh}>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            <div className="price-display">
              {loading && !goldPrice && (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Fetching latest gold prices...</p>
                </div>
              )}
              {!loading && prices && (
                <div className="price-content">
                  <div className="price-value">{formatPrice(prices.perTola)}</div>
                  <div className="price-unit">per Tola</div>
                </div>
              )}
              {!loading && error && !goldPrice && (
                <div className="error-message">
                  <p>{error}</p>
                  <button className="retry-btn" onClick={fetchGoldPrice}>Try Again</button>
                </div>
              )}
            </div>
          </div>

          {/* 1 Gram */}
          <div className="price-card">
            <div className="price-header">
              <h2>1 Gram</h2>
            </div>
            <div className="price-display">
              <div className="price-content">
                <div className="price-value">{prices ? formatPrice(prices.perGram) : '--'}</div>
                <div className="price-unit">per gram</div>
              </div>
            </div>
          </div>

          {/* 10 Gram */}
          <div className="price-card">
            <div className="price-header">
              <h2>10 Gram</h2>
            </div>
            <div className="price-display">
              <div className="price-content">
                <div className="price-value">{prices ? formatPrice(prices.per10Gram) : '--'}</div>
                <div className="price-unit">per 10 grams</div>
              </div>
            </div>
          </div>
        </div>

        <div className="converter-section">
          <h3><i className="fas fa-exchange-alt"></i> Gold Unit Converter</h3>
          <p>Convert between tola, gram, and 10 grams instantly using live prices.</p>
          <div className="converter-grid">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              <option value="tola">Tola</option>
              <option value="gram">Gram</option>
              <option value="10gram">10 Grams</option>
            </select>
            <span>to</span>
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              <option value="tola">Tola</option>
              <option value="gram">Gram</option>
              <option value="10gram">10 Grams</option>
            </select>
            <button onClick={handleConvert}>Convert</button>
          </div>
          {convertedValue && (
            <div className="converter-result">
              Result: <strong>{convertedValue}</strong> {toUnit}
            </div>
          )}
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
            {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h4>Gold Price Tracker</h4>
            <p>Stay updated with the latest bullion rates in Pakistan.</p>
          </div>

          <div className="footer-center">
            <a href="/" className="footer-link">Home</a>
            <a href="#converter" className="footer-link">Converter</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>

          <div className="footer-right">
            <span className="footer-dev">Developed by <a href="https://codevente.com" target="_blank" rel="noopener noreferrer">Codevente</a></span>
            <div className="footer-icons">
              <a href="https://github.com/ahmed-ahsan2001" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/ahmed-ahsan2001" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Gold Price Tracker — All Rights Reserved</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
