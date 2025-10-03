// src/pages/admin/SellerManagement.jsx
import React, { useState } from 'react';
import './SellerManagement.css';

const SellerManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);

  // Mock data - replace with real API data
  const activeSellers = [
    {
      id: 1,
      name: "Rajesh Jewelers",
      email: "rajesh@jewelersltd.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      joinDate: "2023-06-15",
      totalProducts: 45,
      totalSales: 2850000,
      rating: 4.8,
      status: "active",
      verificationStatus: "verified",
      documents: ["GST Certificate", "Business License", "Identity Proof"]
    },
    {
      id: 2,
      name: "Golden Elegance",
      email: "contact@goldenelegance.in",
      phone: "+91 87654 32109",
      location: "Delhi, NCR",
      joinDate: "2023-04-20",
      totalProducts: 67,
      totalSales: 4250000,
      rating: 4.9,
      status: "active",
      verificationStatus: "verified",
      documents: ["GST Certificate", "Business License", "Identity Proof"]
    },
    {
      id: 3,
      name: "Ocean Treasures",
      email: "info@oceantreasures.com",
      phone: "+91 76543 21098",
      location: "Chennai, Tamil Nadu",
      joinDate: "2023-08-10",
      totalProducts: 23,
      totalSales: 1650000,
      rating: 4.6,
      status: "active",
      verificationStatus: "pending",
      documents: ["GST Certificate", "Business License"]
    }
  ];

  const pendingApplications = [
    {
      id: 4,
      name: "Royal Gems Palace",
      email: "royal@gemspalace.in",
      phone: "+91 65432 10987",
      location: "Jaipur, Rajasthan",
      applicationDate: "2024-01-15",
      businessType: "Traditional Jewelry",
      experience: "15 years",
      status: "pending",
      verificationStatus: "under_review",
      documents: ["GST Certificate", "Business License", "Identity Proof", "Experience Certificate"]
    },
    {
      id: 5,
      name: "Crystal Clear Diamonds",
      email: "info@crystalclear.com",
      phone: "+91 54321 09876",
      location: "Pune, Maharashtra",
      applicationDate: "2024-01-18",
      businessType: "Diamond Jewelry",
      experience: "8 years",
      status: "pending",
      verificationStatus: "documents_pending",
      documents: ["Business License", "Identity Proof"]
    }
  ];

  const suspendedSellers = [
    {
      id: 6,
      name: "Fake Jewels Inc",
      email: "fake@jewels.com",
      phone: "+91 43210 98765",
      location: "Unknown",
      suspensionDate: "2024-01-10",
      reason: "Fraudulent activities detected",
      status: "suspended",
      verificationStatus: "failed"
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'active':
        return activeSellers;
      case 'pending':
        return pendingApplications;
      case 'suspended':
        return suspendedSellers;
      default:
        return [];
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
      case 'under_review':
        return 'warning';
      case 'documents_pending':
        return 'info';
      case 'failed':
      case 'suspended':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const handleApprove = (sellerId) => {
    // Handle seller approval
    console.log('Approving seller:', sellerId);
  };

  const handleReject = (sellerId) => {
    // Handle seller rejection
    console.log('Rejecting seller:', sellerId);
  };

  const handleSuspend = (sellerId) => {
    // Handle seller suspension
    console.log('Suspending seller:', sellerId);
  };

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
  };

  const filteredData = getCurrentData().filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seller-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Seller Management</h1>
          <p>Manage jewelry sellers and their applications</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div className="seller-tabs">
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <span className="tab-icon">✅</span>
          Active Sellers ({activeSellers.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <span className="tab-icon">⏳</span>
          Pending Applications ({pendingApplications.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <span className="tab-icon">🚫</span>
          Suspended ({suspendedSellers.length})
        </button>
      </div>

      <div className="sellers-container">
        {filteredData.length === 0 ? (
          <div className="no-sellers">
            <h3>No sellers found</h3>
            <p>Try adjusting your search criteria or check other tabs.</p>
          </div>
        ) : (
          <div className="sellers-grid">
            {filteredData.map(seller => (
              <div key={seller.id} className="seller-card">
                <div className="seller-header">
                  <div className="seller-info">
                    <h3>{seller.name}</h3>
                    <p>{seller.email}</p>
                    <span className="seller-location">📍 {seller.location}</span>
                  </div>
                  <div className={`seller-status ${getStatusColor(seller.verificationStatus)}`}>
                    {seller.verificationStatus}
                  </div>
                </div>

                <div className="seller-stats">
                  {seller.totalProducts !== undefined && (
                    <div className="stat">
                      <span className="stat-label">Products</span>
                      <span className="stat-value">{seller.totalProducts}</span>
                    </div>
                  )}
                  {seller.totalSales !== undefined && (
                    <div className="stat">
                      <span className="stat-label">Revenue</span>
                      <span className="stat-value">₹{seller.totalSales.toLocaleString()}</span>
                    </div>
                  )}
                  {seller.rating !== undefined && (
                    <div className="stat">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">⭐ {seller.rating}</span>
                    </div>
                  )}
                  {seller.experience && (
                    <div className="stat">
                      <span className="stat-label">Experience</span>
                      <span className="stat-value">{seller.experience}</span>
                    </div>
                  )}
                </div>

                <div className="seller-documents">
                  <h4>Documents</h4>
                  <div className="documents-list">
                    {seller.documents.map((doc, index) => (
                      <span key={index} className="document-tag">{doc}</span>
                    ))}
                  </div>
                </div>

                <div className="seller-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewDetails(seller)}
                  >
                    View Details
                  </button>
                  
                  {activeTab === 'pending' && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(seller.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(seller.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {activeTab === 'active' && (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSuspend(seller.id)}
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSeller && (
        <div className="modal-overlay" onClick={() => setSelectedSeller(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Seller Details</h2>
              <button className="close-btn" onClick={() => setSelectedSeller(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Basic Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedSeller.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedSeller.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedSeller.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{selectedSeller.location}</span>
                  </div>
                </div>
              </div>
              
              {selectedSeller.totalProducts !== undefined && (
                <div className="detail-section">
                  <h3>Business Metrics</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Products:</span>
                      <span className="detail-value">{selectedSeller.totalProducts}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Sales:</span>
                      <span className="detail-value">₹{selectedSeller.totalSales?.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Rating:</span>
                      <span className="detail-value">⭐ {selectedSeller.rating}</span>
                    </div>
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

export default SellerManagement;