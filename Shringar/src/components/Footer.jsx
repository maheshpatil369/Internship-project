// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">💎</span>
              <span className="logo-text">Shringar</span>
            </div>
            <p className="footer-description">
              Discover exquisite jewelry from trusted sellers worldwide. 
              Try before you buy with our revolutionary AR technology.
            </p>
          
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories/rings">Rings</Link></li>
              <li><Link to="/categories/necklaces">Necklaces</Link></li>
              <li><Link to="/categories/earrings">Earrings</Link></li>
              <li><Link to="/categories/bracelets">Bracelets</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3 className="footer-title">For Admins</h3>
            <ul className="footer-links">
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
              <li><Link to="/product-management">Product Management</Link></li>
              <li><Link to="/seller-management">Seller Management</Link></li>
              <li><Link to="/user-management">User Manegement</Link></li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="footer-section">
            <h3 className="footer-title">For Sellers</h3>
            <ul className="footer-links">
              <li><Link to="/become-seller">Become a Seller</Link></li>
              <li><Link to="/seller-dashboard">Seller Dashboard</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h3 className="footer-title">Stay Updated</h3>
            <p>Subscribe to get special offers and latest jewelry trends</p>
            <div className="newsletter-signup">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2024 Shringar. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;