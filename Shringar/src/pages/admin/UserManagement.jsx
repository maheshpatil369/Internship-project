// src/pages/admin/UserManagement.jsx
import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterBy, setFilterBy] = useState('all');

  // Mock user data - replace with real API data
  const users = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      joinDate: "2023-08-15",
      lastActive: "2 hours ago",
      totalOrders: 12,
      totalSpent: 125000,
      favoriteCategories: ["Rings", "Necklaces"],
      status: "active",
      verified: true,
      avatar: "👩"
    },
    {
      id: 2,
      name: "Arjun Patel",
      email: "arjun.patel@email.com",
      phone: "+91 87654 32109",
      location: "Ahmedabad, Gujarat",
      joinDate: "2023-06-20",
      lastActive: "1 day ago",
      totalOrders: 8,
      totalSpent: 89500,
      favoriteCategories: ["Bracelets", "Earrings"],
      status: "active",
      verified: true,
      avatar: "👨"
    },
    {
      id: 3,
      name: "Kavya Reddy",
      email: "kavya.reddy@email.com",
      phone: "+91 76543 21098",
      location: "Hyderabad, Telangana",
      joinDate: "2023-09-10",
      lastActive: "5 minutes ago",
      totalOrders: 15,
      totalSpent: 245000,
      favoriteCategories: ["Traditional", "Gold"],
      status: "active",
      verified: false,
      avatar: "👩"
    },
    {
      id: 4,
      name: "Rohit Kumar",
      email: "rohit.kumar@email.com",
      phone: "+91 65432 10987",
      location: "Delhi, NCR",
      joinDate: "2023-07-05",
      lastActive: "3 days ago",
      totalOrders: 3,
      totalSpent: 45000,
      favoriteCategories: ["Mens Jewelry"],
      status: "inactive",
      verified: true,
      avatar: "👨"
    },
    {
      id: 5,
      name: "Suspicious User",
      email: "suspicious@fake.com",
      phone: "+91 54321 09876",
      location: "Unknown",
      joinDate: "2024-01-10",
      lastActive: "Never",
      totalOrders: 0,
      totalSpent: 0,
      favoriteCategories: [],
      status: "suspended",
      verified: false,
      avatar: "🚫"
    }
  ];

  const getFilteredUsers = () => {
    let filtered = users;

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(user => user.status === activeTab);
    }

    // Filter by verification
    if (filterBy === 'verified') {
      filtered = filtered.filter(user => user.verified);
    } else if (filterBy === 'unverified') {
      filtered = filtered.filter(user => !user.verified);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleSuspendUser = (userId) => {
    console.log('Suspending user:', userId);
    // Handle user suspension
  };

  const handleActivateUser = (userId) => {
    console.log('Activating user:', userId);
    // Handle user activation
  };

  const handleVerifyUser = (userId) => {
    console.log('Verifying user:', userId);
    // Handle user verification
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1>User Management</h1>
          <p>Manage platform users and their activities</p>
        </div>
        <div className="header-actions">
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search users..."
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
              <option value="all">All Users</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="user-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'active').length}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{users.filter(u => u.verified).length}</h3>
            <p>Verified Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'inactive').length}</h3>
            <p>Inactive Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚫</div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'suspended').length}</h3>
            <p>Suspended Users</p>
          </div>
        </div>
      </div>

      <div className="user-tabs">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span className="tab-icon">👥</span>
          All Users ({users.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <span className="tab-icon">✅</span>
          Active ({users.filter(u => u.status === 'active').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`}
          onClick={() => setActiveTab('inactive')}
        >
          <span className="tab-icon">⚠️</span>
          Inactive ({users.filter(u => u.status === 'inactive').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <span className="tab-icon">🚫</span>
          Suspended ({users.filter(u => u.status === 'suspended').length})
        </button>
      </div>

      <div className="users-container">
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            <h3>No users found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <div className="users-grid">
            {filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <div className="user-avatar">{user.avatar}</div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <span className="user-location">📍 {user.location}</span>
                  </div>
                  <div className={`user-status ${getStatusColor(user.status)}`}>
                    {user.status}
                  </div>
                </div>

                <div className="user-stats">
                  <div className="stat">
                    <span className="stat-label">Orders</span>
                    <span className="stat-value">{user.totalOrders}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Spent</span>
                    <span className="stat-value">₹{user.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Last Active</span>
                    <span className="stat-value">{user.lastActive}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Member Since</span>
                    <span className="stat-value">{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="user-badges">
                  {user.verified ? (
                    <span className="badge verified">✅ Verified</span>
                  ) : (
                    <span className="badge unverified">⚠️ Unverified</span>
                  )}
                  {user.favoriteCategories.length > 0 && (
                    <span className="badge categories">
                      {user.favoriteCategories.length} Categories
                    </span>
                  )}
                </div>

                <div className="user-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </button>
                  
                  {user.status === 'active' && (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSuspendUser(user.id)}
                    >
                      Suspend
                    </button>
                  )}
                  
                  {user.status === 'suspended' && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActivateUser(user.id)}
                    >
                      Activate
                    </button>
                  )}
                  
                  {!user.verified && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleVerifyUser(user.id)}
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="user-profile">
                <div className="profile-avatar">{selectedUser.avatar}</div>
                <div className="profile-info">
                  <h3>{selectedUser.name}</h3>
                  <p>{selectedUser.email}</p>
                  <div className={`status-badge ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Contact Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedUser.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{selectedUser.location}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Account Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Join Date:</span>
                    <span className="detail-value">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Active:</span>
                    <span className="detail-value">{selectedUser.lastActive}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Verified:</span>
                    <span className="detail-value">
                      {selectedUser.verified ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Purchase History</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Total Orders:</span>
                    <span className="detail-value">{selectedUser.totalOrders}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Spent:</span>
                    <span className="detail-value">₹{selectedUser.totalSpent.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedUser.favoriteCategories.length > 0 && (
                <div className="detail-section">
                  <h4>Favorite Categories</h4>
                  <div className="categories-list">
                    {selectedUser.favoriteCategories.map((category, index) => (
                      <span key={index} className="category-tag">{category}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;