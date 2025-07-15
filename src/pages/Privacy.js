import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>
          <i className="fas fa-shield-alt"></i> Privacy Policy
        </h1>
        <p className="subtitle">How we protect and handle your information</p>
        <div className="last-updated">
          <i className="fas fa-calendar-alt"></i>
          <span>Last Updated: July 15, 2025</span>
        </div>
      </header>

      <main className="privacy-main">
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
                  <li>User preferences (if any)</li>
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
                  <p>To analyze usage patterns and improve our gold price tracking service</p>
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
                  <span>User preferences</span>
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
                  <li>Use your data for marketing</li>
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
                <h3>Gold Price Data Sources</h3>
                <p>We use external APIs to fetch gold price data. These services may collect their own analytics.</p>
                <div className="service-links">
                  <a href="https://gold.pk" target="_blank" rel="noopener noreferrer">Gold.pk</a>
                  <a href="https://api-ninjas.com" target="_blank" rel="noopener noreferrer">API Ninjas</a>
                </div>
              </div>
              <div className="service-card">
                <h3>Hosting and Infrastructure</h3>
                <p>Our website is hosted on secure cloud infrastructure with their own privacy policies.</p>
                <div className="service-links">
                  <a href="https://replit.com" target="_blank" rel="noopener noreferrer">Replit</a>
                </div>
              </div>
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
                  <span>Email: privacy@goldpricetracker.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Address: Karachi, Pakistan</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;