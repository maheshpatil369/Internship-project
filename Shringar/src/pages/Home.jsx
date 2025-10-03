// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [activeModel, setActiveModel] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  const jewelryModels = [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      category: "Rings",
      image: "💍",
      description: "Elegant 24K gold ring with pristine diamond",
      price: "₹1,25,000"
    },
    {
      id: 2,
      name: "Gold Chain Necklace",
      category: "Necklaces",
      image: "📿",
      description: "Traditional 22K gold chain with intricate design",
      price: "₹85,000"
    },
    {
      id: 3,
      name: "Pearl Earrings",
      category: "Earrings",
      image: "👂",
      description: "Classic pearl drop earrings in white gold",
      price: "₹45,000"
    },
    {
      id: 4,
      name: "Silver Bracelet",
      category: "Bracelets",
      image: "🔗",
      description: "Contemporary silver bracelet with modern styling",
      price: "₹12,000"
    }
  ];

  const features = [
    {
      icon: "🎨",
      title: "3D Visualization",
      description: "View jewelry from every angle with our interactive 3D models"
    },
    {
      icon: "📱",
      title: "AR Try-On",
      description: "Try jewelry virtually using your phone's camera"
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description: "Certified jewelry with hallmark guarantee"
    },
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Secure delivery across India with insurance"
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Live gold rates with transparent pricing"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure transactions with encrypted checkout"
    }
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "5000+", label: "Jewelry Pieces" },
    { value: "50+", label: "Cities Covered" },
    { value: "4.8★", label: "Customer Rating" }
  ];

  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setActiveModel((prev) => (prev + 1) % jewelryModels.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isRotating, jewelryModels.length]);

  return (
    <div className="home-page">
      {/* Hero Section with 3D Showcase */}
      <section className="hero-3d">
        <div className="hero-3d-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Experience Jewelry in <span className="gradient-text">3D</span>
            </h1>
            <p className="hero-subtitle">
              Explore our exquisite collection with interactive 3D models. 
              See every detail before you buy.
            </p>
            <div className="hero-actions">
              <Link to="/marketplace" className="btn-primary-3d">
                Explore Collection
              </Link>
              <button className="btn-secondary-3d">
                Try AR Now
              </button>
            </div>
          </div>

          {/* 3D Model Viewer Mockup */}
          <div className="model-viewer-container">
            <div className="model-viewer">
              <div className="model-display">
                <div className="model-icon">
                  {jewelryModels[activeModel].image}
                </div>
                <div className="model-ring"></div>
                <div className="model-shadow"></div>
              </div>
              
              <div className="model-info">
                <h3>{jewelryModels[activeModel].name}</h3>
                <p className="model-category">{jewelryModels[activeModel].category}</p>
                <p className="model-price">{jewelryModels[activeModel].price}</p>
              </div>

              <div className="model-controls">
                <button 
                  className="control-btn"
                  onClick={() => setIsRotating(!isRotating)}
                >
                  {isRotating ? '⏸' : '▶'}
                </button>
                <button className="control-btn">🔄</button>
                <button className="control-btn">🔍</button>
                <button className="control-btn">📱</button>
              </div>
            </div>

            {/* Model Thumbnails */}
            <div className="model-thumbnails">
              {jewelryModels.map((model, index) => (
                <button
                  key={model.id}
                  className={`thumbnail ${index === activeModel ? 'active' : ''}`}
                  onClick={() => {
                    setActiveModel(index);
                    setIsRotating(false);
                  }}
                >
                  {model.image}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header-home">
          <h2>Why Choose Shringar?</h2>
          <p>Your trusted partner for authentic jewelry shopping</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header-home">
          <h2>How It Works</h2>
          <p>Simple steps to find your perfect jewelry</p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">🔍</div>
            <h3>Browse Collection</h3>
            <p>Explore thousands of jewelry pieces with high-quality 3D models</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">📱</div>
            <h3>Try with AR</h3>
            <p>Use augmented reality to see how jewelry looks on you</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">💳</div>
            <h3>Secure Purchase</h3>
            <p>Complete your purchase with secure payment options</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">🎁</div>
            <h3>Receive & Enjoy</h3>
            <p>Get your jewelry delivered safely to your doorstep</p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology-section">
        <div className="tech-content">
          <div className="tech-text">
            <h2>Powered by Advanced Technology</h2>
            <p>
              Our platform uses cutting-edge 3D modeling and augmented reality 
              technology to bring you an immersive shopping experience.
            </p>
            <ul className="tech-features">
              <li>
                <span className="check-icon">✓</span>
                Real-time 3D rendering with photorealistic quality
              </li>
              <li>
                <span className="check-icon">✓</span>
                AR try-on compatible with iOS and Android devices
              </li>
              <li>
                <span className="check-icon">✓</span>
                360° view with zoom and rotation controls
              </li>
              <li>
                <span className="check-icon">✓</span>
                AI-powered size and fit recommendations
              </li>
            </ul>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div className="tech-visual">
            <div className="tech-showcase">
              <div className="tech-icon-large">🎯</div>
              <div className="tech-rings">
                <div className="tech-ring ring-1"></div>
                <div className="tech-ring ring-2"></div>
                <div className="tech-ring ring-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-preview">
        <div className="section-header-home">
          <h2>Shop by Category</h2>
          <p>Find the perfect piece for every occasion</p>
        </div>

        <div className="categories-grid">
          <Link to="/marketplace?category=rings" className="category-card-home">
            <div className="category-icon-large">💍</div>
            <h3>Rings</h3>
            <p>Engagement & Wedding</p>
          </Link>

          <Link to="/marketplace?category=necklaces" className="category-card-home">
            <div className="category-icon-large">📿</div>
            <h3>Necklaces</h3>
            <p>Chains & Pendants</p>
          </Link>

          <Link to="/marketplace?category=earrings" className="category-card-home">
            <div className="category-icon-large">👂</div>
            <h3>Earrings</h3>
            <p>Studs & Drops</p>
          </Link>

          <Link to="/marketplace?category=bracelets" className="category-card-home">
            <div className="category-icon-large">🔗</div>
            <h3>Bracelets</h3>
            <p>Bangles & Chains</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Jewelry?</h2>
          <p>Join thousands of satisfied customers who trust Shringar</p>
          <div className="cta-buttons">
            <Link to="/marketplace" className="cta-btn-primary">
              Start Shopping
            </Link>
            <Link to="/seller/enroll" className="cta-btn-secondary">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;