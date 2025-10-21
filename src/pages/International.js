import React, { useState, useEffect, useCallback } from "react";
import "./International.css";

const International = () => {
  const [metalPrices, setMetalPrices] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GRAMS_PER_OUNCE = 31.1035;
  const GRAMS_PER_TOLA = 11.6638;

  // 👆 Replace this with your actual endpoint (same as Pakistan page)

 const fetchMetalPrices = useCallback(async () => {
  setLoading(true);
  setError(null);

  const API_URL = "https://api-zqweriy4ka-uc.a.run.app/api/gold-price/intl"; // your Firebase Function URL

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch international gold price");

    const json = await res.json();

    // Extract data from backend response
    const intlGoldPriceUSD = json?.data;
    const timestamp = json?.timestamp || Date.now();

    if (!intlGoldPriceUSD) throw new Error("Missing international gold price");

    // Simulated silver price (you can replace with API later)
    const silverPricePerOz = 31 + (Math.random() * 0.5 - 0.25);

    // Update React state
    setMetalPrices({
      gold: { usd: intlGoldPriceUSD },
      silver: { usd: silverPricePerOz },
    });

    setLastUpdated(new Date(timestamp));
  } catch (err) {
    console.error("❌ Error fetching metal prices:", err);
    setError("Unable to fetch live prices. Please try again later.");
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchMetalPrices();
    const interval = setInterval(fetchMetalPrices, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, [fetchMetalPrices]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const calculatePrices = (pricePerOz) => ({
    tola: (pricePerOz / GRAMS_PER_OUNCE) * GRAMS_PER_TOLA,
    tenGrams: (pricePerOz / GRAMS_PER_OUNCE) * 10,
    gram: pricePerOz / GRAMS_PER_OUNCE,
    ounce: pricePerOz,
  });

  return (
    <div className="international-page">
      <div className="page-header">
        <div className="header-content">
          <h1><i className="fas fa-globe"></i> International Gold & Silver Prices</h1>
          <p className="subtitle">Real-time global market prices (USD)</p>
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
            <i className={`fas fa-sync-alt ${loading ? "spinning" : ""}`}></i>
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
          {/* GOLD TABLE */}
          <div className="price-section">
            <div className="section-header">
              <h2><i className="fas fa-coins"></i> Gold Prices (24K)</h2>
              <div className="spot-price">
                Spot: {formatPrice(metalPrices.gold.usd)}/oz
              </div>
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
                  {Object.entries({
                    "1 Tola": calculatePrices(metalPrices.gold.usd).tola,
                    "10 Grams": calculatePrices(metalPrices.gold.usd).tenGrams,
                    "1 Gram": calculatePrices(metalPrices.gold.usd).gram,
                    "1 Ounce": calculatePrices(metalPrices.gold.usd).ounce,
                  }).map(([unit, price]) => (
                    <tr key={unit}>
                      <td><i className="fas fa-weight"></i> {unit}</td>
                      <td className="hide-mobile">
                        {unit === "1 Ounce"
                          ? "31.10 grams"
                          : unit === "1 Tola"
                          ? "11.66 grams"
                          : unit === "10 Grams"
                          ? "10 grams"
                          : "1 gram"}
                      </td>
                      <td className="price-cell">{formatPrice(price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SILVER TABLE */}
          <div className="price-section">
            <div className="section-header">
              <h2><i className="fas fa-gem"></i> Silver Prices</h2>
              <div className="spot-price">
                Spot: {formatPrice(metalPrices.silver.usd)}/oz
              </div>
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
                  {Object.entries({
                    "1 Tola": calculatePrices(metalPrices.silver.usd).tola,
                    "10 Grams": calculatePrices(metalPrices.silver.usd).tenGrams,
                    "1 Gram": calculatePrices(metalPrices.silver.usd).gram,
                    "1 Ounce": calculatePrices(metalPrices.silver.usd).ounce,
                  }).map(([unit, price]) => (
                    <tr key={unit}>
                      <td><i className="fas fa-weight"></i> {unit}</td>
                      <td className="hide-mobile">
                        {unit === "1 Ounce"
                          ? "31.10 grams"
                          : unit === "1 Tola"
                          ? "11.66 grams"
                          : unit === "10 Grams"
                          ? "10 grams"
                          : "1 gram"}
                      </td>
                      <td className="price-cell">{formatPrice(price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* INFO SECTION */}
      <div className="info-section">
        <div className="info-card">
          <h3><i className="fas fa-info-circle"></i> About International Prices</h3>
          <p>
            International gold and silver prices are quoted in USD per troy ounce (31.1035g), 
            reflecting the spot market rate and updated in real-time based on global demand and supply.
          </p>
        </div>

        <div className="info-card">
          <h3><i className="fas fa-chart-line"></i> Market Information</h3>
          <ul>
            <li><strong>Trading Hours:</strong> 24/7 Global Markets</li>
            <li><strong>Currency:</strong> USD (US Dollar)</li>
            <li><strong>Standard Unit:</strong> Troy Ounce</li>
            <li><strong>Update Frequency:</strong> Every 5 minutes</li>
          </ul>
        </div>
      </div>

      <div className="disclaimer">
        <i className="fas fa-exclamation-circle"></i>
        <p>
          <strong>Disclaimer:</strong> Prices shown are for informational purposes only and may not reflect real-time trading values. 
          Verify rates with authorized dealers before investment decisions.
        </p>
      </div>
    </div>
  );
};

export default International;
