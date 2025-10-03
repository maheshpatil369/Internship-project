// src/components/ProductImage.jsx
import React, { useState } from 'react';
import './ProductImage.css';

const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Jewelry placeholder based on product type
  const getPlaceholder = (alt) => {
    const productType = alt?.toLowerCase() || '';
    
    if (productType.includes('ring')) {
      return (
        <div className="jewelry-placeholder">
          <div className="placeholder-ring">💍</div>
          <span>Ring</span>
        </div>
      );
    } else if (productType.includes('necklace')) {
      return (
        <div className="jewelry-placeholder">
          <div className="placeholder-necklace">📿</div>
          <span>Necklace</span>
        </div>
      );
    } else if (productType.includes('earring')) {
      return (
        <div className="jewelry-placeholder">
          <div className="placeholder-earring">👂</div>
          <span>Earrings</span>
        </div>
      );
    } else if (productType.includes('bracelet')) {
      return (
        <div className="jewelry-placeholder">
          <div className="placeholder-bracelet">📿</div>
          <span>Bracelet</span>
        </div>
      );
    }
    
    return (
      <div className="jewelry-placeholder">
        <div className="placeholder-jewelry">💎</div>
        <span>Jewelry</span>
      </div>
    );
  };

  if (imageError) {
    return (
      <div className={`${className} image-placeholder`}>
        {getPlaceholder(alt)}
      </div>
    );
  }

  return (
    <div className="product-image-wrapper">
      {imageLoading && (
        <div className={`${className} image-loading`}>
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'loading' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default ProductImage;