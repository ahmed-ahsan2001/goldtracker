import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <i className="fas fa-coins"></i>
          <span>Gold Tracker</span>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i> Home
          </Link>
          <Link 
            to="/international" 
            className={`nav-link ${location.pathname === '/international' ? 'active' : ''}`}
          >
            <i className="fas fa-globe"></i> International
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            <i className="fas fa-info-circle"></i> About
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            <i className="fas fa-envelope"></i> Contact
          </Link>
          <Link 
            to="/privacy" 
            className={`nav-link ${location.pathname === '/privacy' ? 'active' : ''}`}
          >
            <i className="fas fa-shield-alt"></i> Privacy
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;