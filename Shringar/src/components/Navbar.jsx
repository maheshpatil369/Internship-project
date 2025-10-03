// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">💎</span>
          <span className="logo-text">Shringar</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">Market Place</Link>
          <Link to="/categories/rings" className="nav-link">Rings</Link>
          <Link to="/categories/necklaces" className="nav-link">Necklaces</Link>
          <Link to="/categories/earrings" className="nav-link">Earrings</Link>
          <Link to="/categories/bracelets" className="nav-link">Bracelets</Link>
        </div>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </div>
        </form>

        {/* User Actions */}
        <div className="nav-actions">
          <button className="nav-btn ar-btn">
            <span className="btn-icon">📱</span>
            <span className="btn-text">AR Try-On</span>
          </button>
          <button className="nav-btn account-btn">
            <span className="btn-icon">👤</span>
            <span className="btn-text">Account</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link">Market Place</Link>
          <Link to="/categories/rings" className="mobile-nav-link">Rings</Link>
          <Link to="/categories/necklaces" className="mobile-nav-link">Necklaces</Link>
          <Link to="/categories/earrings" className="mobile-nav-link">Earrings</Link>
          <Link to="/categories/bracelets" className="mobile-nav-link">Bracelets</Link>
          <div className="mobile-actions">
            <button className="mobile-btn">📱AR Try-On</button>
            <button className="mobile-btn">👤 Account</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;