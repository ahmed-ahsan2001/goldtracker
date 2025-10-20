import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1><i className="fas fa-info-circle"></i> About Gold & Silver Tracker</h1>
        <p className="subtitle">Your trusted source for real-time precious metals prices</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2><i className="fas fa-target"></i> Our Mission</h2>
          <p>
            Gold & Silver Price Tracker is dedicated to providing accurate, real-time precious metals price information 
            to help investors, traders, and enthusiasts make informed decisions. We believe that access to reliable 
            gold and silver pricing should be simple, fast, and accessible to everyone.
          </p>
        </section>

        <section className="about-section">
          <h2><i className="fas fa-chart-line"></i> What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-refresh"></i>
              <h3>Real-Time Updates</h3>
              <p>Live gold and silver prices updated every 5 minutes from global markets</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-calculator"></i>
              <h3>Multiple Units</h3>
              <p>Prices in grams, tolas, ounces, and other regional measurements</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-globe"></i>
              <h3>Global Coverage</h3>
              <p>Both local Pakistani and international precious metals market prices</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile Friendly</h3>
              <p>Responsive design that works perfectly on all devices</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2><i className="fas fa-shield-alt"></i> Data Quality</h2>
          <div className="sources-grid">
            <div className="source-card">
              <h3>Pakistan Market</h3>
              <p>Local gold and silver prices based on current market rates in PKR and USD</p>
            </div>
            <div className="source-card">
              <h3>International Market</h3>
              <p>Global precious metals prices from leading markets in US Dollars</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2><i className="fas fa-users"></i> Who We Serve</h2>
          <div className="users-grid">
            <div className="user-card">
              <i className="fas fa-user-tie"></i>
              <h3>Investors</h3>
              <p>Track precious metals prices for portfolio decisions and market analysis</p>
            </div>
            <div className="user-card">
              <i className="fas fa-store"></i>
              <h3>Dealers</h3>
              <p>Stay updated with current rates for buying and selling gold and silver</p>
            </div>
            <div className="user-card">
              <i className="fas fa-gem"></i>
              <h3>Jewelry Buyers</h3>
              <p>Make informed decisions when purchasing gold and silver jewelry</p>
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
            We are committed to providing accurate, timely, and reliable gold and silver price information. 
            Our platform continuously monitors market data to ensure you receive the most current 
            precious metals information available.
          </p>
          <div className="commitment-list">
            <div className="commitment-item">
              <i className="fas fa-check-circle"></i>
              <span>Accurate pricing data</span>
            </div>
            <div className="commitment-item">
              <i className="fas fa-check-circle"></i>
              <span>Regular updates every 5 minutes</span>
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

export default About;
