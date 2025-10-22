import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Home.css';
import axios from "axios";

const Home = () => {
  const { theme } = useTheme();
  const [metalPrices, setMetalPrices] = useState({
    gold: { usd: 0, pkr: 0 },
    silver: { usd: 0, pkr: 0 }
  });
  const [loadingGoldPK, setLoadingGoldPK] = useState(true);
const [loadingGoldIntl, setLoadingGoldIntl] = useState(true);
const [loadingSilverIntl, setLoadingSilverIntl] = useState(true);

  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const USD_TO_PKR = 278;
  const GRAMS_PER_TOLA = 11.6638;
  const GRAMS_PER_OUNCE = 31.1035;

const fetchMetalPrices = async () => {
  setError(null);

  const apiURL = "https://api-zqweriy4ka-uc.a.run.app";

  // Reset
  setMetalPrices({
    gold: { usd: 0, pkr24k: 0, pkr22k: 0 },
    silver: { usd: 0, pkr: 0 },
  });

  // Start spinners
  setLoadingGoldPK(true);
  setLoadingGoldIntl(true);
  setLoadingSilverIntl(true);

  try {
    // 🔹 Gold (Pakistan)
    axios
      .get(`${apiURL}/api/gold-price/pk`)
      .then((res) => {
        if (res.data.success) {
          setMetalPrices((prev) => ({
            ...prev,
            gold: {
              ...prev.gold,
              pkr24k: res.data.data.rate24k,
              pkr22k: res.data.data.rate22k,
            },
          }));
        }
      })
      .catch((err) => console.error("❌ PK Gold fetch failed", err))
      .finally(() => setLoadingGoldPK(false));

    // 🔹 Gold (International)
    axios
      .get(`${apiURL}/api/gold-price/intl`)
      .then((res) => {
        if (res.data.success) {
          setMetalPrices((prev) => ({
            ...prev,
            gold: { ...prev.gold, usd: res.data.data },
          }));
        }
      })
      .catch((err) => console.error("❌ Intl Gold fetch failed", err))
      .finally(() => setLoadingGoldIntl(false));

    // 🔹 Silver (International)
    axios
      .get(`${apiURL}/api/silver-price/intl`)
      .then((res) => {
        if (res.data.success) {
          setMetalPrices((prev) => ({
            ...prev,
            silver: { ...prev.silver, usd: res.data.data },
          }));
        }
      })
      .catch((err) => console.error("❌ Intl Silver fetch failed", err))
      .finally(() => setLoadingSilverIntl(false));
  } catch (err) {
    console.error("❌ Error fetching metal prices:", err);
    setError("Unable to fetch live prices. Please try again later.");
  } finally {
    setLastUpdated(new Date());
  }
};


  useEffect(() => {
    fetchMetalPrices();
    const interval = setInterval(fetchMetalPrices, 300000);
    return () => clearInterval(interval);
  }, []);


const goldPrices24K = {
  perTola: metalPrices.gold.pkr24k,
  per10Gram: (metalPrices.gold.pkr24k / GRAMS_PER_TOLA) * 10,
  perGram: metalPrices.gold.pkr24k / GRAMS_PER_TOLA,
  perOunce: metalPrices.gold.pkr24k * (GRAMS_PER_OUNCE / GRAMS_PER_TOLA),
};

const goldPrices22K = {
  perTola: metalPrices.gold.pkr22k,
  per10Gram: (metalPrices.gold.pkr22k / GRAMS_PER_TOLA) * 10,
  perGram: metalPrices.gold.pkr22k / GRAMS_PER_TOLA,
  perOunce: metalPrices.gold.pkr22k * (GRAMS_PER_OUNCE / GRAMS_PER_TOLA),
};
  const silverPrices = metalPrices.silver.usd

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatUSD = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="main-title">
          <i className="fas fa-coins"></i> Live Gold & Silver Prices in Pakistan
        </h1>
        <p className="subtitle">Real-time precious metal rates updated every 5 minutes from global markets</p>
        <div className="update-info">
          {lastUpdated && (
            <span className="last-update">
              <i className="fas fa-clock"></i> Last updated: {lastUpdated.toLocaleTimeString('en-US')}
            </span>
          )}
       <button
  className="refresh-btn"
  onClick={fetchMetalPrices}
  disabled={loadingGoldPK || loadingGoldIntl || loadingSilverIntl}
>
  <i
    className={`fas fa-sync-alt ${
      loadingGoldPK || loadingGoldIntl || loadingSilverIntl ? 'spinning' : ''
    }`}
  ></i>{" "}
  Refresh
</button>


        </div>
      </div>

      {error && (
        <div className="error-banner">
          <i className="fas fa-exclamation-triangle"></i> {error}
        </div>
      )}

      <div className="prices-section">
     <div className="section-header">
  <h2><i className="fas fa-gem"></i> Gold Prices (24K)</h2>
  {loadingGoldIntl ? (
    <span className="spot-price">
      <div className="spinner-inline"></div>fetching live rate...
    </span>
  ) : (
    <span className="spot-price">
      Spot: {formatUSD(metalPrices.gold.usd)}/oz
    </span>
  )}
</div>
        
        <div className="table-container">
          <table className="price-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Weight</th>
                <th>Price (PKR)</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {loadingGoldPK ? (
                <tr>
                  <td colSpan="4" className="loading-cell">
                    <div className="spinner"></div> Loading...
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Tola</td>
                    <td>11.66 grams</td>
                    <td className="price-value">{formatPrice(goldPrices24K.perTola)}</td>
                    <td>{formatUSD(goldPrices24K.perTola / USD_TO_PKR)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 10 Grams</td>
                    <td>10 grams</td>
                    <td className="price-value">{formatPrice(goldPrices24K.per10Gram)}</td>
                    <td>{formatUSD(goldPrices24K.per10Gram / USD_TO_PKR)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Gram</td>
                    <td>1 gram</td>
                    <td className="price-value">{formatPrice(goldPrices24K.perGram)}</td>
                    <td>{formatUSD(goldPrices24K.perGram / USD_TO_PKR)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Ounce</td>
                    <td>31.10 grams</td>
                    <td className="price-value">{formatPrice(goldPrices24K.perOunce)}</td>
                    <td>{formatUSD(goldPrices24K.perOunce / USD_TO_PKR)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="section-header mt-40">
          <h2><i className="fas fa-gem"></i> Gold Prices (22K)</h2>
          <span className="spot-price">91.67% Pure</span>
        </div>
        <div className="table-container">
          <table className="price-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Weight</th>
                <th>Price (PKR)</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {loadingGoldPK ? (
                <tr>
                  <td colSpan="4" className="loading-cell">
                    <div className="spinner"></div> Loading...
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Tola</td>
                    <td>11.66 grams</td>
                    <td className="price-value">{formatPrice(goldPrices22K.perTola)}</td>
                    <td>{formatUSD(goldPrices22K.perTola / USD_TO_PKR)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 10 Grams</td>
                    <td>10 grams</td>
                    <td className="price-value">{formatPrice(goldPrices22K.per10Gram)}</td>
                    <td>{formatUSD(goldPrices22K.per10Gram / USD_TO_PKR)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Gram</td>
                    <td>1 gram</td>
                    <td className="price-value">{formatPrice(goldPrices22K.perGram)}</td>
                    <td>{formatUSD(goldPrices22K.perGram / USD_TO_PKR)}</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Ounce</td>
                    <td>31.10 grams</td>
                    <td className="price-value">{formatPrice(goldPrices22K.perOunce)}</td>
                    <td>{formatUSD(goldPrices22K.perOunce / USD_TO_PKR)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="section-header mt-40">
  <h2>
    <i className="fas fa-circle"></i> Silver Prices
  </h2>

  {loadingSilverIntl ? (
    <span className="spot-price">
      <div className="spinner-inline"></div>fetching live rate...
    </span>
  ) : (
    <span className="spot-price">
      Spot: {formatUSD(metalPrices.silver.usd)}/oz
    </span>
  )}
</div>

        <div className="table-container">
          <table className="price-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Weight</th>
                <th>Price (PKR)</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {loadingSilverIntl ? (
                <tr>
                  <td colSpan="4" className="loading-cell">
                    <div className="spinner"></div> Loading...
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Tola</td>
                    <td>11.66 grams</td>
                    <td className="price-value">Rates are not stable in Pakistan</td>
                    <td>Rates are not stable in Pakistan</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 10 Grams</td>
                    <td>10 grams</td>
                    <td className="price-value">Rates are not stable in Pakistan</td>
                    <td>Rates are not stable in Pakistan</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Gram</td>
                    <td>1 gram</td>
                    <td className="price-value">Rates are not stable in Pakistan</td>
                    <td>Rates are not stable in Pakistan</td>
                  </tr>
                  <tr>
                    <td><i className="fas fa-weight"></i> 1 Ounce</td>
                    <td>31.10 grams</td>
                    <td className="price-value">Rates are not stable in Pakistan</td>
                    <td>Rates are not stable in Pakistan</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div className="info-grid">
          <div className="info-card">
            <h3><i className="fas fa-chart-line"></i> Why Track Gold & Silver Prices?</h3>
            <p>
              Gold and silver are valuable precious metals used for investment, jewelry, and industrial purposes. 
              Tracking their prices helps investors make informed decisions, jewelers price their products accurately, 
              and individuals understand market trends. Prices fluctuate based on global economic conditions, currency values, 
              and supply-demand dynamics.
            </p>
          </div>

          <div className="info-card">
            <h3><i className="fas fa-university"></i> Understanding Gold Purity</h3>
            <p>
              <strong>24 Karat (24K):</strong> Pure gold (99.9% purity), most valuable but softer.<br/>
              <strong>22 Karat (22K):</strong> 91.6% pure gold, commonly used in jewelry in Pakistan and India.<br/>
              <strong>18 Karat (18K):</strong> 75% pure gold, more durable, popular in Western countries.<br/>
              Higher karat means more gold content and higher price per gram.
            </p>
          </div>

          <div className="info-card">
            <h3><i className="fas fa-balance-scale"></i> Common Weight Units</h3>
            <p>
              <strong>Tola:</strong> Traditional unit in South Asia, equals 11.6638 grams.<br/>
              <strong>Gram:</strong> Metric unit, most common worldwide for small quantities.<br/>
              <strong>Ounce (Troy):</strong> International standard for precious metals, equals 31.1035 grams.<br/>
              <strong>Kilogram:</strong> Used for large transactions, equals 1000 grams or 85.74 tolas.
            </p>
          </div>

          <div className="info-card">
            <h3><i className="fas fa-question-circle"></i> Frequently Asked Questions</h3>
            <div className="faq-item">
              <strong>Q: How often are prices updated?</strong>
              <p>A: Our prices are updated every 5 minutes from live global market data.</p>
            </div>
            <div className="faq-item">
              <strong>Q: Why do prices vary between cities?</strong>
              <p>A: Local prices may include making charges, taxes, and dealer premiums that vary by location.</p>
            </div>
            <div className="faq-item">
              <strong>Q: Is silver a good investment?</strong>
              <p>A: Silver is more affordable than gold and has industrial uses, making it a popular diversification option.</p>
            </div>
          </div>

          <div className="info-card">
            <h3><i className="fas fa-shield-alt"></i> Investment Tips</h3>
            <ul className="tips-list">
              <li><i className="fas fa-check"></i> Buy from certified and reputable dealers only</li>
              <li><i className="fas fa-check"></i> Check purity hallmarks before purchasing</li>
              <li><i className="fas fa-check"></i> Compare prices across multiple sources</li>
              <li><i className="fas fa-check"></i> Consider making charges separately from metal value</li>
              <li><i className="fas fa-check"></i> Store precious metals securely in bank lockers or safes</li>
            </ul>
          </div>

          <div className="info-card">
            <h3><i className="fas fa-globe"></i> Global Market Factors</h3>
            <p>
              Gold and silver prices are influenced by various global factors including:
              US Dollar strength, inflation rates, central bank policies, geopolitical tensions, 
              mining production, industrial demand, and investment trends. Understanding these 
              factors helps in making better investment decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <i className="fas fa-info-circle"></i>
        <p>
          <strong>Disclaimer:</strong> Prices shown are simulated based on recent market trends and are for informational and demonstration purposes only. 
          For live pricing, integrate with a premium API service like GoldAPI or MetalPriceAPI. 
          Always verify current prices with authorized dealers before making any transactions. We are not responsible for any 
          financial decisions made based on this information.
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

export default Home;
