// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showARTryOn, setShowARTryOn] = useState(false);

  useEffect(() => {
    const productData = getProductById(id);
    setProduct(productData);
  }, [id]);

  if (!product) {
    return <div className="loading">Product not found</div>;
  }

  const handleARTryOn = () => {
    setShowARTryOn(true);
    // Here you would integrate with AR SDK
    alert('AR Try-On feature would launch here with camera access');
  };

  const handleAffiliateClick = () => {
    // Track click analytics here
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="main-product-image"
            />
            <button className="ar-overlay-btn" onClick={handleARTryOn}>
              <span className="ar-icon">📱</span>
              Try with AR
            </button>
          </div>
          
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <span className="brand">{product.brand}</span>
            <h1 className="product-name">{product.name}</h1>
            <div className="rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="price">
            <span className="currency">₹</span>
            <span className="amount">{product.price.toLocaleString()}</span>
          </div>

          <div className="product-details">
            <div className="detail-item">
              <span className="label">Type:</span>
              <span className="value">{product.type}</span>
            </div>
            <div className="detail-item">
              <span className="label">Material:</span>
              <span className="value">{product.material}</span>
            </div>
            <div className="detail-item">
              <span className="label">Availability:</span>
              <span className={`value ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="actions">
            <button 
              className="ar-try-on-btn"
              onClick={handleARTryOn}
            >
              <span className="ar-icon">🔍</span>
              Virtual Try-On
            </button>
            
            <button 
              className="purchase-btn"
              onClick={handleAffiliateClick}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Buy from Store' : 'Out of Stock'}
            </button>
          </div>

          <div className="seller-info">
            <h4>Sold by</h4>
            <p>{product.brand}</p>
            <small>Verified Seller</small>
          </div>
        </div>
      </div>

      {/* AR Try-On Modal */}
      {showARTryOn && (
        <div className="ar-modal">
          <div className="ar-modal-content">
            <div className="ar-header">
              <h3>AR Try-On</h3>
              <button 
                className="close-ar"
                onClick={() => setShowARTryOn(false)}
              >
                ✕
              </button>
            </div>
            <div className="ar-camera">
              <div className="ar-placeholder">
                <p>📷 AR Camera would be active here</p>
                <p>Point your camera at your hand/face to try on the jewelry</p>
                <div className="ar-controls">
                  <button>Capture</button>
                  <button>Share</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;