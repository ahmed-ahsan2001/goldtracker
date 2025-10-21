import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import International from './pages/International';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import './App.css';
import usePageTracking from './pages/usePageTracking'; // ✅

const App = () => {
  return (
    <Router>
      {/* ✅ Move the hook inside the Router */}
      <PageTrackingWrapper />

      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/international" element={<International />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </Router>
  );
};

// ✅ Small helper component so hook runs inside Router
function PageTrackingWrapper() {
  usePageTracking();
  return null;
}

export default App;
