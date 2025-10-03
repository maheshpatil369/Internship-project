// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data - replace with real API data
  const stats = {
    totalUsers: 2847,
    activeSellers: 156,
    totalProducts: 892,
    pendingApplications: 23,
    todayRevenue: 85650,
    monthlyGrowth: 12.5
  };

  const recentActivities = [
    { id: 1, type: 'seller_application', message: 'New seller application from Rajesh Jewelers', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'product_added', message: 'Diamond Ring added by Golden Elegance', time: '4 hours ago', status: 'approved' },
    { id: 3, type: 'user_registered', message: '5 new users registered today', time: '6 hours ago', status: 'info' },
    { id: 4, type: 'product_reported', message: 'Product reported by user for incorrect pricing', time: '1 day ago', status: 'warning' }
  ];

  const topProducts = [
    { id: 1, name: 'Diamond Solitaire Ring', seller: 'Elegant Jewels', views: 1250, sales: 45, revenue: 562500 },
    { id: 2, name: '18K Gold Chain Necklace', seller: 'Golden Elegance', views: 980, sales: 32, revenue: 272000 },
    { id: 3, name: 'Pearl Drop Earrings', seller: 'Ocean Treasures', views: 750, sales: 28, revenue: 420000 },
    { id: 4, name: 'Diamond Tennis Bracelet', seller: 'Royal Gems', views: 650, sales: 15, revenue: 292500 }
  ];

  const systemHealth = {
    serverStatus: 'healthy',
    databaseStatus: 'healthy',
    apiResponse: '245ms',
    uptime: '99.8%',
    errorRate: '0.2%'
  };

  return (
    <div className="admin-dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card gold">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
            <span className="stat-growth positive">+{stats.monthlyGrowth}%</span>
          </div>
        </div>

        <div className="stat-card silver">
          <div className="stat-icon">🏪</div>
          <div className="stat-content">
            <h3>{stats.activeSellers}</h3>
            <p>Active Sellers</p>
            <span className="stat-growth positive">+8.2%</span>
          </div>
        </div>

        <div className="stat-card copper">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
            <span className="stat-growth positive">+15.3%</span>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.pendingApplications}</h3>
            <p>Pending Applications</p>
            <span className="stat-growth">Needs Review</span>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        {/* Recent Activities */}
        <div className="dashboard-card activities-card">
          <div className="card-header">
            <h3>Recent Activities</h3>
            <div className="time-range-selector">
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.status}`}>
                <div className="activity-content">
                  <p className="activity-message">{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className={`activity-status ${activity.status}`}>
                  {activity.status === 'pending' && '⏳'}
                  {activity.status === 'approved' && '✅'}
                  {activity.status === 'info' && 'ℹ️'}
                  {activity.status === 'warning' && '⚠️'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="dashboard-card system-health-card">
          <div className="card-header">
            <h3>System Health</h3>
            <div className="health-overall">
              <span className="health-indicator healthy">●</span>
              All Systems Operational
            </div>
          </div>
          <div className="health-metrics">
            <div className="health-metric">
              <span className="metric-label">Server Status</span>
              <span className={`metric-value ${systemHealth.serverStatus}`}>
                {systemHealth.serverStatus === 'healthy' ? '✅ Healthy' : '❌ Down'}
              </span>
            </div>
            <div className="health-metric">
              <span className="metric-label">Database</span>
              <span className={`metric-value ${systemHealth.databaseStatus}`}>
                {systemHealth.databaseStatus === 'healthy' ? '✅ Healthy' : '❌ Down'}
              </span>
            </div>
            <div className="health-metric">
              <span className="metric-label">API Response</span>
              <span className="metric-value">{systemHealth.apiResponse}</span>
            </div>
            <div className="health-metric">
              <span className="metric-label">Uptime</span>
              <span className="metric-value">{systemHealth.uptime}</span>
            </div>
            <div className="health-metric">
              <span className="metric-label">Error Rate</span>
              <span className="metric-value">{systemHealth.errorRate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="dashboard-card top-products-card">
        <div className="card-header">
          <h3>Top Performing Products</h3>
          <button className="view-all-btn">View All Products</button>
        </div>
        <div className="products-table">
          <div className="table-header">
            <div className="col">Product</div>
            <div className="col">Seller</div>
            <div className="col">Views</div>
            <div className="col">Sales</div>
            <div className="col">Revenue</div>
          </div>
          {topProducts.map((product, index) => (
            <div key={product.id} className="table-row">
              <div className="col product-col">
                <span className="product-rank">#{index + 1}</span>
                <span className="product-name">{product.name}</span>
              </div>
              <div className="col">{product.seller}</div>
              <div className="col">{product.views.toLocaleString()}</div>
              <div className="col">{product.sales}</div>
              <div className="col revenue">₹{product.revenue.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn gold">
            <span className="action-icon">📝</span>
            <span>Review Applications</span>
          </button>
          <button className="action-btn silver">
            <span className="action-icon">💎</span>
            <span>Manage Products</span>
          </button>
          <button className="action-btn copper">
            <span className="action-icon">👥</span>
            <span>User Management</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;