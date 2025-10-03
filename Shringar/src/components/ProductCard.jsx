// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const handleQuickAR = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick AR try-on without navigation
    alert(`Quick AR try-on for ${product.name}`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <ProductImage 
          src={product.images[0]} 
          alt={product.name}
          className="product-image"
        />
        {product.featured && (
          <span className="featured-badge">Featured</span>
        )}
        <div className="product-overlay">
          <button 
            className="quick-ar-btn"
            onClick={handleQuickAR}
            title="Quick AR Try-On"
          >
            <span className="ar-icon">📱</span>
          </button>
        </div>
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            <span>Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="brand-name">{product.brand}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-type">{product.type}</span>
          <span className="product-material">{product.material}</span>
        </div>
        <div className="rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="price">
          <span className="currency">₹</span>
          <span className="amount">{product.price.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;