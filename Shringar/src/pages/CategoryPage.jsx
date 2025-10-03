// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products, brands, materials, priceRanges } from '../data/products';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: 'all',
    material: 'all',
    priceRange: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');

  // Category display names
  const categoryNames = {
    rings: 'Rings',
    necklaces: 'Necklaces', 
    earrings: 'Earrings',
    bracelets: 'Bracelets'
  };

  // Convert URL category to product type
  const getProductType = (urlCategory) => {
    const typeMap = {
      rings: 'ring',
      necklaces: 'necklace',
      earrings: 'earrings',
      bracelets: 'bracelet'
    };
    return typeMap[urlCategory] || urlCategory;
  };

  useEffect(() => {
    const productType = getProductType(category);
    let categoryProducts = products.filter(product => product.type === productType);
    
    // Apply filters
    if (filters.brand !== 'all') {
      categoryProducts = categoryProducts.filter(product => product.brand === filters.brand);
    }
    if (filters.material !== 'all') {
      categoryProducts = categoryProducts.filter(product => product.material === filters.material);
    }
    if (filters.priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        categoryProducts = categoryProducts.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        categoryProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        categoryProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        categoryProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        categoryProducts.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        categoryProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    setFilteredProducts(categoryProducts);
  }, [category, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: 'all',
      material: 'all',
      priceRange: 'all'
    });
    setSortBy('featured');
  };

  const categoryName = categoryNames[category] || 'Products';
  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all') || sortBy !== 'featured';

  return (
    <div className="category-page">
      {/* Header */}
      <div className="category-header">
        <div className="category-hero">
          <h1>{categoryName}</h1>
          <p>Discover our exquisite collection of {categoryName.toLowerCase()}</p>
          <div className="category-stats">
            <span className="product-count">{filteredProducts.length} Products</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="category-content">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>
          
          {/* Brand Filter */}
          <div className="filter-group">
            <h4>Brand</h4>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div className="filter-group">
            <h4>Material</h4>
            <select
              value={filters.material}
              onChange={(e) => handleFilterChange('material', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Materials</option>
              {materials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>

          {/* Quick Filters */}
          <div className="quick-filters">
            <h4>Quick Filters</h4>
            <div className="quick-filter-buttons">
              <button 
                className={`quick-filter-btn ${sortBy === 'featured' ? 'active' : ''}`}
                onClick={() => setSortBy('featured')}
              >
                Featured
              </button>
              <button 
                className={`quick-filter-btn ${filters.priceRange === '0-500' ? 'active' : ''}`}
                onClick={() => handleFilterChange('priceRange', '0-500')}
              >
                Under ₹500
              </button>
              <button 
                className={`quick-filter-btn ${sortBy === 'rating' ? 'active' : ''}`}
                onClick={() => setSortBy('rating')}
              >
                Top Rated
              </button>
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="products-main">
          {/* Sort Controls */}
          <div className="sort-header">
            <div className="results-info">
              <h2>{categoryName}</h2>
              <span className="results-count">{filteredProducts.length} products</span>
            </div>
            <div className="sort-controls">
              <label htmlFor="sort">Sort by:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-content">
                <h3>No products found</h3>
                <p>Try adjusting your filters or check back later for new arrivals</p>
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;