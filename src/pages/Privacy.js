import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="page-header">
        <h1><i className="fas fa-shield-alt"></i> Privacy Policy</h1>
        <p className="subtitle">How we protect and handle your information</p>
        <div className="last-updated">
          <i className="fas fa-calendar-alt"></i>
          <span>Last Updated: October 19, 2025</span>
        </div>
      </div>

      <div className="privacy-content">
        <section className="privacy-section">
          <h2><i className="fas fa-info-circle"></i> Information We Collect</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address (anonymized)</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>Voluntarily Provided Information</h3>
              <ul>
                <li>Contact form submissions</li>
                <li>Email correspondence</li>
                <li>Feedback and inquiries</li>
                <li>User preferences (theme settings)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-eye"></i> How We Use Your Information</h2>
          <div className="usage-list">
            <div className="usage-item">
              <i className="fas fa-chart-line"></i>
              <div>
                <h3>Service Improvement</h3>
                <p>To analyze usage patterns and improve our gold and silver price tracking service</p>
              </div>
            </div>
            <div className="usage-item">
              <i className="fas fa-headset"></i>
              <div>
                <h3>Customer Support</h3>
                <p>To respond to your inquiries and provide technical support</p>
              </div>
            </div>
            <div className="usage-item">
              <i className="fas fa-shield-alt"></i>
              <div>
                <h3>Security</h3>
                <p>To protect our service from abuse and ensure system security</p>
              </div>
            </div>
            <div className="usage-item">
              <i className="fas fa-balance-scale"></i>
              <div>
                <h3>Legal Compliance</h3>
                <p>To comply with applicable laws and regulations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-cookie-bite"></i> Cookies and Tracking</h2>
          <div className="cookie-info">
            <div className="cookie-card">
              <h3>Essential Cookies</h3>
              <p>Required for basic functionality and cannot be disabled.</p>
              <div className="cookie-examples">
                <span>Session management</span>
                <span>Security</span>
                <span>Theme preference</span>
              </div>
            </div>
            <div className="cookie-card">
              <h3>Analytics Cookies</h3>
              <p>Help us understand how visitors use our website.</p>
              <div className="cookie-examples">
                <span>Usage statistics</span>
                <span>Performance metrics</span>
                <span>Error tracking</span>
              </div>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-share-alt"></i> Information Sharing</h2>
          <div className="sharing-policy">
            <div className="policy-item positive">
              <i className="fas fa-check-circle"></i>
              <h3>We DO NOT:</h3>
              <ul>
                <li>Sell your personal information</li>
                <li>Share data with advertisers</li>
                <li>Rent or lease your information</li>
                <li>Use your data for unsolicited marketing</li>
              </ul>
            </div>
            <div className="policy-item neutral">
              <i className="fas fa-info-circle"></i>
              <h3>We MAY share information:</h3>
              <ul>
                <li>With service providers (hosting, analytics)</li>
                <li>When required by law</li>
                <li>To protect our rights and safety</li>
                <li>In case of business transfer</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-database"></i> Data Storage and Security</h2>
          <div className="security-measures">
            <div className="measure-card">
              <i className="fas fa-lock"></i>
              <h3>Encryption</h3>
              <p>All data transmission is encrypted using SSL/TLS technology</p>
            </div>
            <div className="measure-card">
              <i className="fas fa-server"></i>
              <h3>Secure Servers</h3>
              <p>Data is stored on secure servers with limited access</p>
            </div>
            <div className="measure-card">
              <i className="fas fa-user-shield"></i>
              <h3>Access Control</h3>
              <p>Strict access controls and authentication measures</p>
            </div>
            <div className="measure-card">
              <i className="fas fa-trash-alt"></i>
              <h3>Data Retention</h3>
              <p>Data is retained only as long as necessary</p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-user-cog"></i> Your Rights</h2>
          <div className="rights-grid">
            <div className="right-card">
              <i className="fas fa-eye"></i>
              <h3>Access</h3>
              <p>Request information about data we hold about you</p>
            </div>
            <div className="right-card">
              <i className="fas fa-edit"></i>
              <h3>Correction</h3>
              <p>Request correction of inaccurate personal information</p>
            </div>
            <div className="right-card">
              <i className="fas fa-eraser"></i>
              <h3>Deletion</h3>
              <p>Request deletion of your personal information</p>
            </div>
            <div className="right-card">
              <i className="fas fa-ban"></i>
              <h3>Opt-out</h3>
              <p>Withdraw consent for data processing</p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-external-link-alt"></i> Third-Party Services</h2>
          <div className="third-party-info">
            <div className="service-card">
              <h3>Precious Metals Data</h3>
              <p>We use market data for gold and silver pricing. These services may have their own privacy policies.</p>
            </div>
            <div className="service-card">
              <h3>Hosting and Infrastructure</h3>
              <p>Our website is hosted on secure cloud infrastructure with their own privacy policies.</p>
              <div className="service-links">
                <a href="https://replit.com/site/privacy" target="_blank" rel="noopener noreferrer">Replit Privacy</a>
              </div>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-ad"></i> Google AdSense and Advertising</h2>
          <div className="adsense-policy">
            <p>
              This website may use Google AdSense, a service for including advertisements from Google Inc. 
              Google AdSense uses "cookies", which are text files placed on your computer, to help analyze 
              how users use the site.
            </p>
            <p>
              You can opt out of personalized advertising by visiting the{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>. 
              Alternatively, you can opt out of third-party vendor use of cookies for personalized 
              advertising by visiting{' '}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
                www.aboutads.info
              </a>.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-child"></i> Children's Privacy</h2>
          <div className="children-policy">
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you are a parent or guardian 
              and believe your child has provided us with personal information, please contact us 
              immediately.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-sync-alt"></i> Changes to This Policy</h2>
          <div className="changes-policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last Updated" 
              date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2><i className="fas fa-envelope"></i> Contact Information</h2>
          <div className="contact-info">
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>Email: privacy@goldsilvertracker.com</span>
              </div>
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

export default Privacy;
