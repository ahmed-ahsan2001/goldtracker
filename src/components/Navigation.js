import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <i className="fas fa-coins"></i>
          <span>Gold & Silver Tracker</span>
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
          <Link 
            to="/terms" 
            className={`nav-link ${location.pathname === '/terms' ? 'active' : ''}`}
          >
            <i className="fas fa-file-contract"></i> Terms
          </Link>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
