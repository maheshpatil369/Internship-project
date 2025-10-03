// src/components/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ userType = 'admin' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard', description: 'Overview & Analytics' },
    { path: '/admin/sellers', icon: '👥', label: 'Sellers', description: 'Manage Sellers' },
    { path: '/admin/products', icon: '💎', label: 'Products', description: 'Manage Listings' },
    { path: '/admin/users', icon: '👤', label: 'Users', description: 'User Management' },
    { path: '/admin/applications', icon: '📝', label: 'Applications', description: 'Seller Applications' },
    { path: '/admin/analytics', icon: '📈', label: 'Analytics', description: 'Site Analytics' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings', description: 'System Settings' }
  ];

  const sellerMenuItems = [
    { path: '/seller/dashboard', icon: '📊', label: 'Dashboard', description: 'My Analytics' },
    { path: '/seller/products', icon: '💎', label: 'My Products', description: 'Manage Listings' },
    { path: '/seller/add-product', icon: '➕', label: 'Add Product', description: 'New Listing' },
    { path: '/seller/analytics', icon: '📈', label: 'Analytics', description: 'Performance' },
    { path: '/seller/profile', icon: '👤', label: 'Profile', description: 'Account Settings' }
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : sellerMenuItems;
  const title = userType === 'admin' ? 'Admin Panel' : 'Seller Portal';

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="admin-logo">
            <span className="logo-icon">💎</span>
            {!sidebarCollapsed && <span className="logo-text">Shringar</span>}
          </Link>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <div className="sidebar-title">
          {!sidebarCollapsed && (
            <>
              <h2>{title}</h2>
              <p>{userType === 'admin' ? 'System Management' : 'Seller Dashboard'}</p>
            </>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <div className="nav-content">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="back-to-site">
            <span className="nav-icon">🏠</span>
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main ${sidebarCollapsed ? 'expanded' : ''}`}>
        <header className="admin-header">
          <div className="header-left">
            <h1>Welcome to {title}</h1>
            <p>Manage your jewelry business with ease</p>
          </div>
          <div className="header-right">
            <div className="admin-profile">
              <div className="profile-info">
                <span className="profile-name">John Admin</span>
                <span className="profile-role">{userType === 'admin' ? 'Administrator' : 'Seller'}</span>
              </div>
              <div className="profile-avatar">👤</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;