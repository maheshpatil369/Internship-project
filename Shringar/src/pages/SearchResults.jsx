// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts, categories, brands, materials, priceRanges } from '../data/products';
import ProductCard from '../components/ProductCard';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    material: 'all',
    priceRange: 'all'
  });
  const [sortBy, setSortBy] = useState('relevance');

  const query = searchParams.get('q') || '';

  useEffect(() => {
    let filteredResults = query ? searchProducts(query) : [];
    
    // Apply filters
    if (filters.category !== 'all') {
      filteredResults = filteredResults.filter(product => product.type === filters.category);
    }
    if (filters.brand !== 'all') {
      filteredResults = filteredResults.filter(product => product.brand === filters.brand);
    }
    if (filters.material !== 'all') {
      filteredResults = filteredResults.filter(product => product.material === filters.material);
    }
    if (filters.priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        filteredResults = filteredResults.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredResults.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredResults.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredResults.sort((a, b) => b.id - a.id);
        break;
      default:
        // relevance - keep original order
        break;
    }

    setResults(filteredResults);
  }, [query, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="search-results">
      <div className="search-header">
        <h1>Search Results</h1>
        {query && <p className="search-query">Results for "{query}"</p>}
        <p className="results-count">{results.length} products found</p>
      </div>

      <div className="search-content">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat.id !== 'all').map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <h4>Brand</h4>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
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
            >
              <option value="all">All Prices</option>
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Results */}
        <main className="results-main">
          <div className="results-header">
            <div className="sort-controls">
              <label htmlFor="sort">Sort by:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="results-grid">
              {results.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;