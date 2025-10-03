// src/pages/admin/ProductManagement.jsx
import React, { useState } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock product data - replace with real API data
  const products = [
    {
      id: 1,
      name: "Diamond Solitaire Engagement Ring",
      description: "Elegant 1-carat diamond solitaire ring in 18K white gold",
      seller: "Rajesh Jewelers",
      sellerId: 1,
      category: "Rings",
      type: "Diamond",
      priceRange: "₹50,000 - ₹75,000",
      actualPrice: 62500,
      images: ["💍"],
      affiliateUrl: "https://affiliate.example.com/diamond-ring",
      views: 1250,
      clicks: 89,
      sales: 5,
      revenue: 125000,
      status: "active",
      featured: true,
      createdDate: "2023-12-15",
      lastUpdated: "2024-01-10",
      tags: ["engagement", "diamond", "luxury"],
      specifications: {
        material: "18K White Gold",
        gemstone: "Diamond",
        weight: "3.2g",
        size: "Adjustable"
      }
    },
    {
      id: 2,
      name: "18K Gold Chain Necklace",
      description: "Beautiful traditional gold chain perfect for daily wear",
      seller: "Golden Elegance",
      sellerId: 2,
      category: "Necklaces",
      type: "Gold",
      priceRange: "₹25,000 - ₹35,000",
      actualPrice: 30000,
      images: ["📿"],
      affiliateUrl: "https://affiliate.example.com/gold-chain",
      views: 890,
      clicks: 67,
      sales: 8,
      revenue: 96000,
      status: "active",
      featured: false,
      createdDate: "2023-11-20",
      lastUpdated: "2024-01-08",
      tags: ["traditional", "gold", "daily-wear"],
      specifications: {
        material: "18K Gold",
        weight: "12.5g",
        length: "20 inches"
      }
    },
    {
      id: 3,
      name: "Pearl Drop Earrings",
      description: "Elegant freshwater pearl drop earrings with silver base",
      seller: "Ocean Treasures",
      sellerId: 3,
      category: "Earrings",
      type: "Pearl",
      priceRange: "₹8,000 - ₹12,000",
      actualPrice: 10000,
      images: ["👂"],
      affiliateUrl: "https://affiliate.example.com/pearl-earrings",
      views: 650,
      clicks: 45,
      sales: 3,
      revenue: 45000,
      status: "pending",
      featured: false,
      createdDate: "2024-01-05",
      lastUpdated: "2024-01-05",
      tags: ["pearl", "elegant", "occasion-wear"],
      specifications: {
        material: "925 Silver",
        gemstone: "Freshwater Pearl",
        weight: "4.2g"
      }
    },
    {
      id: 4,
      name: "Silver Bracelet Set",
      description: "Handcrafted silver bracelet set with intricate designs",
      seller: "Artisan Crafts",
      sellerId: 4,
      category: "Bracelets",
      type: "Silver",
      priceRange: "₹5,000 - ₹8,000",
      actualPrice: 6500,
      images: ["🔗"],
      affiliateUrl: "https://affiliate.example.com/silver-bracelet",
      views: 420,
      clicks: 28,
      sales: 2,
      revenue: 18000,
      status: "inactive",
      featured: false,
      createdDate: "2023-10-12",
      lastUpdated: "2023-12-20",
      tags: ["silver", "handcrafted", "set"],
      specifications: {
        material: "925 Silver",
        weight: "25g",
        pieces: "3 bracelets"
      }
    },
    {
      id: 5,
      name: "Fake Diamond Ring",
      description: "Suspicious listing with unclear specifications",
      seller: "Questionable Seller",
      sellerId: 5,
      category: "Rings",
      type: "Diamond",
      priceRange: "₹100,000 - ₹150,000",
      actualPrice: 125000,
      images: ["💍"],
      affiliateUrl: "https://suspicious-site.com/fake-diamond",
      views: 50,
      clicks: 2,
      sales: 0,
      revenue: 0,
      status: "suspended",
      featured: false,
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-01",
      tags: ["suspicious"],
      specifications: {
        material: "Unknown",
        gemstone: "Unknown"
      }
    }
  ];

  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(product => product.status === activeTab);
    }

    // Filter by category/type
    if (filterBy !== 'all') {
      if (['Rings', 'Necklaces', 'Earrings', 'Bracelets'].includes(filterBy)) {
        filtered = filtered.filter(product => product.category === filterBy);
      } else if (['Diamond', 'Gold', 'Silver', 'Pearl'].includes(filterBy)) {
        filtered = filtered.filter(product => product.type === filterBy);
      } else if (filterBy === 'featured') {
        filtered = filtered.filter(product => product.featured);
      }
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'oldest':
          return new Date(a.createdDate) - new Date(b.createdDate);
        case 'price-high':
          return b.actualPrice - a.actualPrice;
        case 'price-low':
          return a.actualPrice - b.actualPrice;
        case 'popular':
          return b.views - a.views;
        case 'revenue':
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'neutral';
      case 'suspended':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleApproveProduct = (productId) => {
    console.log('Approving product:', productId);
    // Handle product approval
  };

  const handleRejectProduct = (productId) => {
    console.log('Rejecting product:', productId);
    // Handle product rejection
  };

  const handleSuspendProduct = (productId) => {
    console.log('Suspending product:', productId);
    // Handle product suspension
  };

  const handleToggleFeatured = (productId) => {
    console.log('Toggling featured status for product:', productId);
    // Handle featured toggle
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="product-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Product Management</h1>
          <p>Manage jewelry listings and their status</p>
        </div>
        <div className="header-actions">
          <div className="controls-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <optgroup label="Categories">
                <option value="Rings">Rings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Earrings">Earrings</option>
                <option value="Bracelets">Bracelets</option>
              </optgroup>
              <optgroup label="Types">
                <option value="Diamond">Diamond</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Pearl">Pearl</option>
              </optgroup>
              <option value="featured">Featured Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="popular">Most Popular</option>
              <option value="revenue">Highest Revenue</option>
            </select>
          </div>
        </div>
      </div>

      <div className="product-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <h3>{products.filter(p => p.status === 'active').length}</h3>
            <p>Active Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{products.filter(p => p.status === 'pending').length}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{products.filter(p => p.featured).length}</h3>
            <p>Featured Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚫</div>
          <div className="stat-content">
            <h3>{products.filter(p => p.status === 'suspended').length}</h3>
            <p>Suspended</p>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span className="tab-icon">💎</span>
          All Products ({products.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <span className="tab-icon">✅</span>
          Active ({products.filter(p => p.status === 'active').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <span className="tab-icon">⏳</span>
          Pending ({products.filter(p => p.status === 'pending').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <span className="tab-icon">🚫</span>
          Suspended ({products.filter(p => p.status === 'suspended').length})
        </button>
      </div>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <div className="product-image">
                    {product.images[0]}
                  </div>
                  <div className="product-badges">
                    {product.featured && (
                      <span className="badge featured">⭐ Featured</span>
                    )}
                    <span className={`badge status ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="seller">👤 {product.seller}</span>
                    <span className="category">🏷️ {product.category}</span>
                    <span className="type">💎 {product.type}</span>
                  </div>
                </div>

                <div className="product-pricing">
                  <div className="price-range">{product.priceRange}</div>
                  <div className="actual-price">₹{product.actualPrice.toLocaleString()}</div>
                </div>

                <div className="product-stats">
                  <div className="stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">{product.views}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Clicks</span>
                    <span className="stat-value">{product.clicks}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Sales</span>
                    <span className="stat-value">{product.sales}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Revenue</span>
                    <span className="stat-value">₹{product.revenue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="product-tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="product-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </button>
                  
                  {product.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleApproveProduct(product.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRejectProduct(product.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {product.status === 'active' && (
                    <>
                      <button
                        className={`btn ${product.featured ? 'btn-warning' : 'btn-primary'}`}
                        onClick={() => handleToggleFeatured(product.id)}
                      >
                        {product.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleSuspendProduct(product.id)}
                      >
                        Suspend
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Product Details</h2>
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="product-overview">
                <div className="product-image-large">
                  {selectedProduct.images[0]}
                </div>
                <div className="product-details">
                  <h3>{selectedProduct.name}</h3>
                  <p>{selectedProduct.description}</p>
                  <div className={`status-badge ${getStatusColor(selectedProduct.status)}`}>
                    {selectedProduct.status}
                  </div>
                </div>
              </div>

              <div className="detail-sections">
                <div className="detail-section">
                  <h4>Seller Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Seller:</span>
                      <span className="detail-value">{selectedProduct.seller}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{selectedProduct.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Type:</span>
                      <span className="detail-value">{selectedProduct.type}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Pricing</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Price Range:</span>
                      <span className="detail-value">{selectedProduct.priceRange}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Actual Price:</span>
                      <span className="detail-value">₹{selectedProduct.actualPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Performance Metrics</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Total Views:</span>
                      <span className="detail-value">{selectedProduct.views.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Clicks:</span>
                      <span className="detail-value">{selectedProduct.clicks}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Sales:</span>
                      <span className="detail-value">{selectedProduct.sales}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Revenue:</span>
                      <span className="detail-value">₹{selectedProduct.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Specifications</h4>
                  <div className="detail-grid">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="detail-item">
                        <span className="detail-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span className="detail-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Links & Tags</h4>
                  <div className="detail-item">
                    <span className="detail-label">Affiliate URL:</span>
                    <a href={selectedProduct.affiliateUrl} target="_blank" rel="noopener noreferrer" className="affiliate-link">
                      {selectedProduct.affiliateUrl}
                    </a>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tags:</span>
                    <div className="tags-list">
                      {selectedProduct.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;