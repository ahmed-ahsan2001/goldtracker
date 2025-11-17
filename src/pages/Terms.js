import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="page-header">
        <h1><i className="fas fa-file-contract"></i> Terms of Service</h1>
        <p className="subtitle">Terms and conditions for using our service</p>
        <div className="last-updated">
          <i className="fas fa-calendar-alt"></i>
          <span>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="terms-content">
        <section className="terms-section">
          <h2><i className="fas fa-handshake"></i> Acceptance of Terms</h2>
          <p>
            By accessing and using Gold & Silver Price Tracker ("the Service", "we", "us", or "our"), 
            you accept and agree to be bound by the terms and provision of this agreement. If you do 
            not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-info-circle"></i> Description of Service</h2>
          <p>
            Gold & Silver Price Tracker provides real-time and historical precious metals pricing 
            information, including gold and silver prices in various currencies and units. Our service 
            includes:
          </p>
          <ul>
            <li>Live gold and silver price updates</li>
            <li>Price conversions across multiple units (grams, tolas, ounces)</li>
            <li>Market information and educational content</li>
            <li>Price tracking and historical data visualization</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-shield-alt"></i> Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on Gold & Silver Price Tracker's 
            website for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-exclamation-triangle"></i> Disclaimer</h2>
          <p>
            The materials on Gold & Silver Price Tracker's website are provided on an 'as is' basis. 
            Gold & Silver Price Tracker makes no warranties, expressed or implied, and hereby disclaims 
            and negates all other warranties including, without limitation, implied warranties or conditions 
            of merchantability, fitness for a particular purpose, or non-infringement of intellectual 
            property or other violation of rights.
          </p>
          <p>
            <strong>Financial Disclaimer:</strong> The information provided on this website is for 
            informational and educational purposes only. It is not intended as financial, investment, 
            or trading advice. Gold and silver prices are subject to market fluctuations and may vary 
            from the prices displayed. Always verify current prices with authorized dealers before making 
            any investment or trading decisions. We are not responsible for any financial losses or 
            damages resulting from the use of this information.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-chart-line"></i> Price Accuracy</h2>
          <p>
            While we strive to provide accurate and up-to-date pricing information, we cannot guarantee 
            the accuracy, completeness, or timeliness of the prices displayed. Prices are updated 
            periodically and may not reflect real-time market conditions. Local prices may vary based on:
          </p>
          <ul>
            <li>Dealer premiums and making charges</li>
            <li>Local taxes and regulations</li>
            <li>Market conditions and supply/demand</li>
            <li>Currency exchange rates</li>
          </ul>
          <p>
            Always verify prices with authorized dealers or financial institutions before making any 
            transactions.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-ban"></i> Limitations</h2>
          <p>
            In no event shall Gold & Silver Price Tracker or its suppliers be liable for any damages 
            (including, without limitation, damages for loss of data or profit, or due to business 
            interruption) arising out of the use or inability to use the materials on Gold & Silver 
            Price Tracker's website, even if Gold & Silver Price Tracker or a Gold & Silver Price 
            Tracker authorized representative has been notified orally or in writing of the possibility 
            of such damage.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-link"></i> Links to Third-Party Sites</h2>
          <p>
            Our website may contain links to third-party websites or services that are not owned or 
            controlled by Gold & Silver Price Tracker. We have no control over, and assume no 
            responsibility for, the content, privacy policies, or practices of any third-party websites 
            or services. You acknowledge and agree that Gold & Silver Price Tracker shall not be 
            responsible or liable for any damage or loss caused by or in connection with the use of 
            any such content, goods, or services available on or through any such websites or services.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-user-shield"></i> User Conduct</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit any harmful, offensive, or illegal content</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the Service</li>
            <li>Use automated systems to access the Service without permission</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-copyright"></i> Intellectual Property</h2>
          <p>
            All content, features, and functionality of the Service, including but not limited to text, 
            graphics, logos, icons, images, audio clips, digital downloads, and software, are the 
            exclusive property of Gold & Silver Price Tracker or its content suppliers and are protected 
            by international copyright, trademark, patent, trade secret, and other intellectual property 
            laws.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-sync-alt"></i> Changes to Terms</h2>
          <p>
            Gold & Silver Price Tracker reserves the right to revise these terms of service at any time 
            without notice. By using this website, you are agreeing to be bound by the then current 
            version of these terms of service. We encourage you to review this page periodically for 
            any updates.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-gavel"></i> Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with applicable laws. 
            Any disputes relating to these terms and conditions will be subject to the exclusive 
            jurisdiction of the courts of the jurisdiction in which Gold & Silver Price Tracker operates.
          </p>
        </section>

        <section className="terms-section">
          <h2><i className="fas fa-envelope"></i> Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>Phone: +92 312 2739457</span>
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
            <p>For inquiries: Whatsapp: +92 312 2739457</p>
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

export default Terms;




