// src/pages/seller/SellerDashboard.jsx
import React, { useState } from 'react';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock seller data - replace with real API data
  const sellerInfo = {
    name: "Rajesh Jewelers",
    email: "rajesh@jewelersltd.com",
    memberSince: "June 2023",
    verificationStatus: "verified",
    rating: 4.8,
    totalProducts: 45,
    activeProducts: 42,
    soldProducts: 128
  };

  const analytics = {
    totalViews: 12450,
    totalClicks: 892,
    conversionRate: 7.2,
    totalRevenue: 2850000,
    thisMonth: {
      views: 3250,
      clicks: 234,
      sales: 18,
      revenue: 425000
    },
    lastMonth: {
      views: 2980,
      clicks: 198,
      sales: 15,
      revenue: 378000
    }
  };

  const topProducts = [
    {
      id: 1,
      name: "Diamond Solitaire Engagement Ring",
      image: "💍",
      views: 1250,
      clicks: 89,
      sales: 5,
      revenue: 125000,
      affiliateUrl: "https://affiliate.example.com/diamond-ring",
      status: "active"
    },
    {
      id: 2,
      name: "18K Gold Chain Necklace",
      image: "📿",
      views: 890,
      clicks: 67,
      sales: 8,
      revenue: 96000,
      affiliateUrl: "https://affiliate.example.com/gold-chain",
      status: "active"
    },
    {
      id: 3,
      name: "Pearl Drop Earrings",
      image: "👂",
      views: 650,
      clicks: 45,
      sales: 3,
      revenue: 45000,
      affiliateUrl: "https://affiliate.example.com/pearl-earrings",
      status: "active"
    },
    {
      id: 4,
      name: "Silver Bracelet Set",
      image: "🔗",
      views: 420,
      clicks: 28,
      sales: 2,
      revenue: 18000,
      affiliateUrl: "https://affiliate.example.com/silver-bracelet",
      status: "pending"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "sale",
      product: "Diamond Solitaire Ring",
      message: "New sale generated ₹25,000 commission",
      time: "2 hours ago",
      amount: 25000
    },
    {
      id: 2,
      type: "view",
      product: "Gold Chain Necklace",
      message: "Product viewed 45 times today",
      time: "4 hours ago",
      count: 45
    },
    {
      id: 3,
      type: "click",
      product: "Pearl Drop Earrings",
      message: "12 affiliate clicks recorded",
      time: "6 hours ago",
      count: 12
    },
    {
      id: 4,
      type: "approval",
      product: "Ruby Ring Collection",
      message: "Product approved and live",
      time: "1 day ago"
    }
  ];

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sale': return '💰';
      case 'view': return '👁️';
      case 'click': return '🖱️';
      case 'approval': return '✅';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="seller-dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="seller-greeting">
          <h1>Welcome back, {sellerInfo.name}!</h1>
          <p>Here's how your jewelry business is performing</p>
          <div className="seller-badges">
            <span className={`verification-badge ${sellerInfo.verificationStatus}`}>
              ✅ Verified Seller
            </span>
            <span className="rating-badge">
              ⭐ {sellerInfo.rating} Rating
            </span>
            <span className="member-badge">
              📅 Member since {sellerInfo.memberSince}
            </span>
          </div>
        </div>
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="stat-value">{sellerInfo.totalProducts}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="quick-stat">
            <span className="stat-value">{sellerInfo.activeProducts}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="quick-stat">
            <span className="stat-value">{sellerInfo.soldProducts}</span>
            <span className="stat-label">Sold</span>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="analytics-grid">
        <div className="analytics-card primary">
          <div className="card-header">
            <h3>Total Views</h3>
            <span className="card-icon">👁️</span>
          </div>
          <div className="card-content">
            <div className="main-stat">{analytics.totalViews.toLocaleString()}</div>
            <div className="sub-stat">
              <span className={`growth ${calculateGrowth(analytics.thisMonth.views, analytics.lastMonth.views) >= 0 ? 'positive' : 'negative'}`}>
                {calculateGrowth(analytics.thisMonth.views, analytics.lastMonth.views) >= 0 ? '↗' : '↘'} {Math.abs(calculateGrowth(analytics.thisMonth.views, analytics.lastMonth.views))}%
              </span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="analytics-card secondary">
          <div className="card-header">
            <h3>Affiliate Clicks</h3>
            <span className="card-icon">🖱️</span>
          </div>
          <div className="card-content">
            <div className="main-stat">{analytics.totalClicks.toLocaleString()}</div>
            <div className="sub-stat">
              <span className={`growth ${calculateGrowth(analytics.thisMonth.clicks, analytics.lastMonth.clicks) >= 0 ? 'positive' : 'negative'}`}>
                {calculateGrowth(analytics.thisMonth.clicks, analytics.lastMonth.clicks) >= 0 ? '↗' : '↘'} {Math.abs(calculateGrowth(analytics.thisMonth.clicks, analytics.lastMonth.clicks))}%
              </span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="analytics-card success">
          <div className="card-header">
            <h3>Conversion Rate</h3>
            <span className="card-icon">📈</span>
          </div>
          <div className="card-content">
            <div className="main-stat">{analytics.conversionRate}%</div>
            <div className="sub-stat">
              <span className="growth positive">↗ 0.8%</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="analytics-card revenue">
          <div className="card-header">
            <h3>Total Revenue</h3>
            <span className="card-icon">💰</span>
          </div>
          <div className="card-content">
            <div className="main-stat">₹{analytics.totalRevenue.toLocaleString()}</div>
            <div className="sub-stat">
              <span className={`growth ${calculateGrowth(analytics.thisMonth.revenue, analytics.lastMonth.revenue) >= 0 ? 'positive' : 'negative'}`}>
                {calculateGrowth(analytics.thisMonth.revenue, analytics.lastMonth.revenue) >= 0 ? '↗' : '↘'} {Math.abs(calculateGrowth(analytics.thisMonth.revenue, analytics.lastMonth.revenue))}%
              </span>
              <span>vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Top Products */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Top Performing Products</h2>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-selector"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          
          <div className="products-table">
            <div className="table-header">
              <div className="col">Product</div>
              <div className="col">Views</div>
              <div className="col">Clicks</div>
              <div className="col">Sales</div>
              <div className="col">Revenue</div>
              <div className="col">Status</div>
            </div>
            
            {topProducts.map((product, index) => (
              <div key={product.id} className="table-row">
                <div className="col product-info">
                  <span className="product-rank">#{index + 1}</span>
                  <span className="product-image">{product.image}</span>
                  <div className="product-details">
                    <span className="product-name">{product.name}</span>
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="affiliate-link">
                      🔗 View Link
                    </a>
                  </div>
                </div>
                <div className="col">{product.views.toLocaleString()}</div>
                <div className="col">{product.clicks}</div>
                <div className="col">{product.sales}</div>
                <div className="col revenue">₹{product.revenue.toLocaleString()}</div>
                <div className="col">
                  <span className={`status-badge ${product.status}`}>{product.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
          </div>
          
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                <div className="activity-content">
                  <div className="activity-title">{activity.product}</div>
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
                {activity.amount && (
                  <div className="activity-amount">+₹{activity.amount.toLocaleString()}</div>
                )}
                {activity.count && (
                  <div className="activity-count">{activity.count}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card add-product">
            <div className="action-icon">➕</div>
            <div className="action-content">
              <h3>Add New Product</h3>
              <p>Upload your latest jewelry pieces</p>
            </div>
          </button>
          
          <button className="action-card manage-products">
            <div className="action-icon">💎</div>
            <div className="action-content">
              <h3>Manage Products</h3>
              <p>Edit existing listings</p>
            </div>
          </button>
          
          <button className="action-card view-analytics">
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h3>Detailed Analytics</h3>
              <p>View comprehensive reports</p>
            </div>
          </button>
          
          <button className="action-card profile-settings">
            <div className="action-icon">⚙️</div>
            <div className="action-content">
              <h3>Profile Settings</h3>
              <p>Update your information</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;