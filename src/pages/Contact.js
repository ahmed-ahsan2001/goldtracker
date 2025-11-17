import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a production environment, this would send the form data to a backend service
    alert('Thank you for your message! We have received your inquiry and will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1><i className="fas fa-envelope"></i> Contact Us</h1>
        <p className="subtitle">Get in touch with our team</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2><i className="fas fa-info-circle"></i> Get In Touch</h2>
          <p>
            We'd love to hear from you! Whether you have questions about our gold and silver price data, 
            suggestions for improvement, or need technical support, our team is here to help.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+92 312 2739457</p>
              </div>
            </div>
            <div className="contact-method">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>Karachi, Pakistan</p>
              </div>
            </div>
            <div className="contact-method">
              <i className="fas fa-clock"></i>
              <div>
                <h3>Support Hours</h3>
                <p>Mon-Fri: 9:00 AM - 6:00 PM PST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2><i className="fas fa-paper-plane"></i> Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i> Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                <i className="fas fa-tag"></i> Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="data">Data Accuracy</option>
                <option value="feature">Feature Request</option>
                <option value="business">Business Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment"></i> Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Please describe your inquiry in detail..."
              />
            </div>

            <button type="submit" className="submit-btn">
              <i className="fas fa-paper-plane"></i>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h2><i className="fas fa-question-circle"></i> Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How often are prices updated?</h3>
            <p>Our gold and silver prices are updated every 5 minutes to reflect current market conditions.</p>
          </div>
          <div className="faq-item">
            <h3>Are the prices accurate?</h3>
            <p>Yes, our prices are based on current market rates and fluctuate to simulate real market movements for demonstration purposes.</p>
          </div>
          <div className="faq-item">
            <h3>Is this service free?</h3>
            <p>Yes, our basic gold and silver price tracking service is completely free to use.</p>
          </div>
          <div className="faq-item">
            <h3>Can I use this data commercially?</h3>
            <p>Please contact us for commercial licensing options and data usage terms.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer historical data?</h3>
            <p>Currently, we focus on real-time pricing. Historical data features are planned for future releases.</p>
          </div>
          <div className="faq-item">
            <h3>How do I report an issue?</h3>
            <p>You can report issues through this contact form or reach out to us directly via phone or email.</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Your trusted source for real-time gold and silver prices in Pakistan.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/international">International Prices</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
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

export default Contact;
