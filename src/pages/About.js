import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>
          <i className="fas fa-info-circle"></i> About Gold Price Tracker
        </h1>
        <p className="subtitle">Your trusted source for real-time gold prices</p>
      </header>

      <main className="about-main">
        <div className="about-content">
          <section className="about-section">
            <h2><i className="fas fa-target"></i> Our Mission</h2>
            <p>
              Gold Price Tracker is dedicated to providing accurate, real-time gold price information 
              to help investors, traders, and gold enthusiasts make informed decisions. We believe that 
              access to reliable precious metals pricing should be simple, fast, and accessible to everyone.
            </p>
          </section>

          <section className="about-section">
            <h2><i className="fas fa-chart-line"></i> What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-refresh"></i>
                <h3>Real-Time Updates</h3>
                <p>Live gold prices updated every 5 minutes from trusted sources</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-calculator"></i>
                <h3>Multiple Units</h3>
                <p>Prices in grams, tolas, and other regional measurements</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-globe"></i>
                <h3>Global Coverage</h3>
                <p>Both local Pakistani and international gold market prices</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-mobile-alt"></i>
                <h3>Mobile Friendly</h3>
                <p>Responsive design that works perfectly on all devices</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2><i className="fas fa-shield-alt"></i> Data Sources</h2>
            <div className="sources-grid">
              <div className="source-card">
                <h3>Local Market</h3>
                <p>Pakistani gold prices sourced from local market</p>
              </div>
              <div className="source-card">
                <h3>International Market</h3>
                <p>Global gold prices from external sources providing real-time data</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2><i className="fas fa-users"></i> Who We Serve</h2>
            <div className="users-grid">
              <div className="user-card">
                <i className="fas fa-user-tie"></i>
                <h3>Investors</h3>
                <p>Track gold prices for portfolio decisions and market analysis</p>
              </div>
              <div className="user-card">
                <i className="fas fa-store"></i>
                <h3>Dealers</h3>
                <p>Stay updated with current rates for buying and selling gold</p>
              </div>
              <div className="user-card">
                <i className="fas fa-gem"></i>
                <h3>Jewelry Buyers</h3>
                <p>Make informed decisions when purchasing gold jewelry</p>
              </div>
              <div className="user-card">
                <i className="fas fa-graduation-cap"></i>
                <h3>Students</h3>
                <p>Learn about precious metals markets and pricing trends</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2><i className="fas fa-history"></i> Our Commitment</h2>
            <p>
              We are committed to providing accurate, timely, and reliable gold price information. 
              Our team continuously monitors data sources and updates our systems to ensure you 
              receive the most current market information available.
            </p>
            <div className="commitment-list">
              <div className="commitment-item">
                <i className="fas fa-check-circle"></i>
                <span>Accurate pricing data</span>
              </div>
              <div className="commitment-item">
                <i className="fas fa-check-circle"></i>
                <span>Regular updates</span>
              </div>
              <div className="commitment-item">
                <i className="fas fa-check-circle"></i>
                <span>User privacy protection</span>
              </div>
              <div className="commitment-item">
                <i className="fas fa-check-circle"></i>
                <span>Free access to information</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;