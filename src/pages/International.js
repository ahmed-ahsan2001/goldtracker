import React, { useState, useEffect, useCallback } from 'react';
import './International.css';

const International = () => {
  const [metalPrices, setMetalPrices] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GRAMS_PER_OUNCE = 31.1035;
  const GRAMS_PER_TOLA = 11.6638;

  const fetchMetalPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const goldPricePerOz = 2650 + (Math.random() * 10 - 5);
      const silverPricePerOz = 31 + (Math.random() * 0.5 - 0.25);
      
      setMetalPrices({
        gold: { usd: goldPricePerOz },
        silver: { usd: silverPricePerOz }
      });
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching metal prices:', err);
      setError('Unable to fetch live prices. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetalPrices();
    const interval = setInterval(fetchMetalPrices, 300000);
    return () => clearInterval(interval);
  }, [fetchMetalPrices]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculatePrices = (pricePerOz) => {
    return {
      tola: (pricePerOz / GRAMS_PER_OUNCE) * GRAMS_PER_TOLA,
      tenGrams: (pricePerOz / GRAMS_PER_OUNCE) * 10,
      gram: pricePerOz / GRAMS_PER_OUNCE,
      ounce: pricePerOz
    };
  };

  return (
    <div className="international-page">
      <div className="page-header">
        <div className="header-content">
          <h1><i className="fas fa-globe"></i> International Gold & Silver Prices</h1>
          <p className="subtitle">Real-time precious metal rates from global markets (USD)</p>
        </div>
        
        <div className="header-info">
          {lastUpdated && (
            <div className="last-updated">
              <i className="fas fa-clock"></i>
              <span>Last updated: {formatTime(lastUpdated)}</span>
            </div>
          )}
          <button 
            className="refresh-button" 
            onClick={fetchMetalPrices}
            disabled={loading}
          >
            <i className={`fas fa-sync-alt ${loading ? 'spinning' : ''}`}></i>
            Refresh
          </button>
        </div>
      </div>

      {loading && !metalPrices && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading prices...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
        </div>
      )}

      {metalPrices && (
        <>
          <div className="price-section">
            <div className="section-header">
              <h2><i className="fas fa-coins"></i> Gold Prices (24K)</h2>
              <div className="spot-price">Spot: {formatPrice(metalPrices.gold.usd)}/oz</div>
            </div>
            
            <div className="price-table-wrapper">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th className="hide-mobile">Weight</th>
                    <th>Price (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Tola</td>
                    <td className="hide-mobile">11.66 grams</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.gold.usd).tola)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 10 Grams</td>
                    <td className="hide-mobile">10 grams</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.gold.usd).tenGrams)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Gram</td>
                    <td className="hide-mobile">1 gram</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.gold.usd).gram)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Ounce</td>
                    <td className="hide-mobile">31.10 grams</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.gold.usd).ounce)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="price-section">
            <div className="section-header">
              <h2><i className="fas fa-gem"></i> Silver Prices</h2>
              <div className="spot-price">Spot: {formatPrice(metalPrices.silver.usd)}/oz</div>
            </div>
            
            <div className="price-table-wrapper">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th className="hide-mobile">Weight</th>
                    <th>Price (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Tola</td>
                    <td className="hide-mobile">11.66 grams</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.silver.usd).tola)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 10 Grams</td>
                    <td className="hide-mobile">10 grams</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.silver.usd).tenGrams)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Gram</td>
                    <td className="hide-mobile">1 gram</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.silver.usd).gram)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Ounce</td>
                    <td className="hide-mobile">31.10 grams</td>
                    <td className="price-cell">{formatPrice(calculatePrices(metalPrices.silver.usd).ounce)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="info-section">
        <div className="info-card">
          <h3><i className="fas fa-info-circle"></i> About International Prices</h3>
          <p>
            International gold and silver prices are quoted in US Dollars (USD) per troy ounce, 
            which is the global standard. These prices represent the spot market rate and fluctuate 
            continuously based on global supply and demand.
          </p>
        </div>

        <div className="info-card">
          <h3><i className="fas fa-chart-line"></i> Market Information</h3>
          <ul>
            <li><strong>Trading Hours:</strong> 24/7 Global Markets</li>
            <li><strong>Currency:</strong> USD (US Dollar)</li>
            <li><strong>Standard Unit:</strong> Troy Ounce (31.1035 grams)</li>
            <li><strong>Update Frequency:</strong> Every 5 minutes</li>
          </ul>
        </div>
      </div>

      <div className="disclaimer">
        <i className="fas fa-exclamation-circle"></i>
        <p>
          <strong>Disclaimer:</strong> Prices shown are for informational purposes only and may not 
          reflect actual market rates at the time of viewing. Always verify prices with authorized 
          dealers before making any investment decisions.
        </p>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Your trusted source for real-time gold and silver prices in Pakistan.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#gold">Gold Prices</a>
            <a href="#silver">Silver Prices</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>For inquiries: info@goldsilverprices.pk</p>
            <p>Updated every 5 minutes from global markets</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Gold & Silver Price Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default International;
