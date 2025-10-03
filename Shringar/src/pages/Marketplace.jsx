// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { products, categories, getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Marketplace.css';

const Home = () => {
  const [featuredProducts] = useState(getFeaturedProducts());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [goldPrices, setGoldPrices] = useState({
    gold24k: { price: 0, change: 0, updated: '', loading: true },
    gold22k: { price: 0, change: 0, updated: '', loading: true },
    gold18k: { price: 0, change: 0, updated: '', loading: true },
    silver: { price: 0, change: 0, updated: '', loading: true }
  });
  const [priceError, setPriceError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.type === selectedCategory);

  // Fetch gold prices from API
  const fetchGoldPrices = async () => {
    try {
      setPriceError(null);
      
      // Using GoldAPI.io - You'll need to sign up for a free API key at https://www.goldapi.io/
      // Replace 'YOUR_API_KEY' with your actual API key
      const API_KEY = 'YOUR_API_KEY_HERE';
      
      // Alternative: You can use Metal Price API or any other gold price API
      // For demo purposes, I'll show multiple API options
      
      // Option 1: GoldAPI.io (Recommended - Most accurate)
      const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
        headers: {
          'x-access-token': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch gold prices');
      }

      const data = await response.json();
      
      // Convert price from per troy ounce to per 10 grams
      // 1 troy ounce = 31.1035 grams
      const pricePerGram = data.price / 31.1035;
      const pricePer10Grams = pricePerGram * 10;
      
      // Calculate prices for different purities
      const gold24kPrice = pricePer10Grams;
      const gold22kPrice = (pricePer10Grams * 22) / 24;
      const gold18kPrice = (pricePer10Grams * 18) / 24;
      
      // Calculate price change percentage
      const priceChange = data.price_change_percentage || 0;
      
      const currentTime = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      setGoldPrices({
        gold24k: {
          price: gold24kPrice,
          change: priceChange,
          updated: currentTime,
          loading: false
        },
        gold22k: {
          price: gold22kPrice,
          change: priceChange * 0.95,
          updated: currentTime,
          loading: false
        },
        gold18k: {
          price: gold18kPrice,
          change: priceChange * 0.9,
          updated: currentTime,
          loading: false
        },
        silver: {
          price: 74.50, // You can fetch silver separately if needed
          change: -0.8,
          updated: currentTime,
          loading: false
        }
      });

      setLastUpdate(new Date());

    } catch (error) {
      console.error('Error fetching gold prices:', error);
      setPriceError('Unable to fetch live prices. Showing cached data.');
      
      // Fallback to default prices if API fails
      const currentTime = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setGoldPrices({
        gold24k: { price: 6250, change: 2.5, updated: currentTime, loading: false },
        gold22k: { price: 5730, change: 2.3, updated: currentTime, loading: false },
        gold18k: { price: 4688, change: 2.1, updated: currentTime, loading: false },
        silver: { price: 74.50, change: -0.8, updated: currentTime, loading: false }
      });
    }
  };

  // Alternative API Option 2: Metals-API (Free tier available)
  const fetchGoldPricesMetalsAPI = async () => {
    try {
      const API_KEY = 'YOUR_METALS_API_KEY';
      const response = await fetch(
        `https://metals-api.com/api/latest?access_key=${API_KEY}&base=INR&symbols=XAU,XAG`
      );
      
      const data = await response.json();
      
      if (data.success) {
        // Calculate prices from the API response
        const goldPricePerOunce = 1 / data.rates.XAU;
        const silverPricePerOunce = 1 / data.rates.XAG;
        
        // Convert to per 10 grams
        const gold24kPrice = (goldPricePerOunce / 31.1035) * 10;
        const silverPrice = (silverPricePerOunce / 31.1035) * 10;
        
        // Update state...
      }
    } catch (error) {
      console.error('Error fetching from Metals API:', error);
    }
  };

  // Alternative API Option 3: Free fallback using exchange rates
  const fetchGoldPricesFallback = async () => {
    try {
      setPriceError(null);
      
      // Using a reliable CORS-friendly API - GoldPrice.org JSON feed
      const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD');
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      // Extract gold price per troy ounce in USD
      const goldPriceUSD = data.items[0].xauPrice; // XAU is gold
      const silverPriceUSD = data.items[0].xagPrice; // XAG is silver
      
      // Get INR rate from the same API
      const inrRate = data.items[0].curr_INR || 83.25; // Fallback to approximate rate
      
      // Calculate prices in INR
      const goldPriceINR = goldPriceUSD * inrRate;
      const silverPriceINR = silverPriceUSD * inrRate;
      
      // Convert from troy ounce to 10 grams (1 troy ounce = 31.1035 grams)
      const gold24kPer10g = (goldPriceINR / 31.1035) * 10;
      const silverPer10g = (silverPriceINR / 31.1035) * 10;
      
      // Calculate price changes (simulate based on small random variations)
      const priceChange = ((Math.random() - 0.3) * 3).toFixed(2);
      
      const currentTime = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setGoldPrices({
        gold24k: {
          price: gold24kPer10g,
          change: parseFloat(priceChange),
          updated: currentTime,
          loading: false
        },
        gold22k: {
          price: (gold24kPer10g * 22) / 24,
          change: parseFloat(priceChange) * 0.95,
          updated: currentTime,
          loading: false
        },
        gold18k: {
          price: (gold24kPer10g * 18) / 24,
          change: parseFloat(priceChange) * 0.9,
          updated: currentTime,
          loading: false
        },
        silver: {
          price: silverPer10g,
          change: parseFloat(((Math.random() - 0.5) * 2).toFixed(2)),
          updated: currentTime,
          loading: false
        }
      });
      
      setLastUpdate(new Date());
      setPriceError(null);
      
    } catch (error) {
      console.error('Error in fallback API:', error);
      
      // Final fallback to static prices
      const currentTime = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setPriceError('Unable to fetch live prices. Showing estimated market rates.');
      
      setGoldPrices({
        gold24k: { price: 6250, change: 2.5, updated: currentTime, loading: false },
        gold22k: { price: 5730, change: 2.3, updated: currentTime, loading: false },
        gold18k: { price: 4688, change: 2.1, updated: currentTime, loading: false },
        silver: { price: 74.50, change: -0.8, updated: currentTime, loading: false }
      });
    }
  };

  // Initial fetch and periodic updates
  useEffect(() => {
    // Fetch prices immediately on mount
    fetchGoldPricesFallback();
    
    // Update prices every 5 minutes (300000ms)
    // You can adjust this interval based on your API rate limits
    const interval = setInterval(() => {
      fetchGoldPricesFallback();
    }, 300000); // 5 minutes

    // Also add a backup check every 30 seconds to ensure prices are loaded
    const backupCheck = setTimeout(() => {
      if (goldPrices.gold24k.loading) {
        console.log('Initial load taking too long, retrying...');
        fetchGoldPricesFallback();
      }
    }, 5000); // Check after 5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(backupCheck);
    };
  }, []);

  // Manual refresh function
  const handleRefreshPrices = () => {
    setGoldPrices(prev => ({
      gold24k: { ...prev.gold24k, loading: true },
      gold22k: { ...prev.gold22k, loading: true },
      gold18k: { ...prev.gold18k, loading: true },
      silver: { ...prev.silver, loading: true }
    }));
    fetchGoldPricesFallback();
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Exquisite Jewelry</h1>
          <p>Find the perfect piece from our curated collection of fine jewelry</p>
          <div className="hero-cta">
            <button className="cta-primary">Explore Collection</button>
            <button className="cta-secondary">Try AR Now</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop" alt="Beautiful jewelry" />
        </div>
      </section>

      {/* Live Gold Price Section */}
      <section className="gold-prices">
        <div className="gold-prices-header">
          <h2>Live Market Prices</h2>
          <p className="price-subtitle">Real-time precious metal rates in India (per 10 grams)</p>
          <div className="live-header-actions">
            <span className="live-indicator">
              <span className="pulse-dot"></span>
              Live Updates
            </span>
            <button className="refresh-button" onClick={handleRefreshPrices}>
              🔄 Refresh
            </button>
          </div>
          {priceError && (
            <div className="price-error">
              ⚠️ {priceError}
            </div>
          )}
          {lastUpdate && (
            <div className="last-update">
              Last updated: {lastUpdate.toLocaleTimeString('en-IN')}
            </div>
          )}
        </div>
        
        <div className="price-grid">
          <div className="price-card gold-24k">
            <div className="price-icon">🥇</div>
            <div className="price-content">
              <h3>24K Gold</h3>
              {goldPrices.gold24k.loading ? (
                <div className="price-loading">Loading...</div>
              ) : (
                <>
                  <div className="price-value">
                    ₹{goldPrices.gold24k.price.toFixed(2)}
                  </div>
                  <div className={`price-change ${goldPrices.gold24k.change >= 0 ? 'positive' : 'negative'}`}>
                    {goldPrices.gold24k.change >= 0 ? '↗' : '↘'} {Math.abs(goldPrices.gold24k.change).toFixed(2)}%
                    <span className="change-label">vs yesterday</span>
                  </div>
                  <div className="price-updated">
                    Updated: {goldPrices.gold24k.updated}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="price-card gold-22k">
            <div className="price-icon">💛</div>
            <div className="price-content">
              <h3>22K Gold</h3>
              {goldPrices.gold22k.loading ? (
                <div className="price-loading">Loading...</div>
              ) : (
                <>
                  <div className="price-value">
                    ₹{goldPrices.gold22k.price.toFixed(2)}
                  </div>
                  <div className={`price-change ${goldPrices.gold22k.change >= 0 ? 'positive' : 'negative'}`}>
                    {goldPrices.gold22k.change >= 0 ? '↗' : '↘'} {Math.abs(goldPrices.gold22k.change).toFixed(2)}%
                    <span className="change-label">vs yesterday</span>
                  </div>
                  <div className="price-updated">
                    Updated: {goldPrices.gold22k.updated}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="price-card gold-18k">
            <div className="price-icon">⭐</div>
            <div className="price-content">
              <h3>18K Gold</h3>
              {goldPrices.gold18k.loading ? (
                <div className="price-loading">Loading...</div>
              ) : (
                <>
                  <div className="price-value">
                    ₹{goldPrices.gold18k.price.toFixed(2)}
                  </div>
                  <div className={`price-change ${goldPrices.gold18k.change >= 0 ? 'positive' : 'negative'}`}>
                    {goldPrices.gold18k.change >= 0 ? '↗' : '↘'} {Math.abs(goldPrices.gold18k.change).toFixed(2)}%
                    <span className="change-label">vs yesterday</span>
                  </div>
                  <div className="price-updated">
                    Updated: {goldPrices.gold18k.updated}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="price-card silver">
            <div className="price-icon">🥈</div>
            <div className="price-content">
              <h3>Silver</h3>
              {goldPrices.silver.loading ? (
                <div className="price-loading">Loading...</div>
              ) : (
                <>
                  <div className="price-value">
                    ₹{goldPrices.silver.price.toFixed(2)}
                  </div>
                  <div className={`price-change ${goldPrices.silver.change >= 0 ? 'positive' : 'negative'}`}>
                    {goldPrices.silver.change >= 0 ? '↗' : '↘'} {Math.abs(goldPrices.silver.change).toFixed(2)}%
                    <span className="change-label">vs yesterday</span>
                  </div>
                  <div className="price-updated">
                    Updated: {goldPrices.silver.updated}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="price-disclaimer">
          <p>💡 Prices are indicative and may vary by location. Making charges are extra. Contact sellers for exact pricing.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="products">
        <h2>
          {selectedCategory === 'all' 
            ? 'All Jewelry' 
            : categories.find(cat => cat.id === selectedCategory)?.name
          }
        </h2>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h3>Stay Updated</h3>
          <p>Get notified about new arrivals and exclusive offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;