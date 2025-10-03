// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import CategoryPage from './pages/CategoryPage';
import BecomeSeller from './pages/seller/SellerEnrollment';
import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProdManagement from './pages/admin/ProductManagement'
import SellerManagement from './pages/admin/SellerManagement'
import UserManagement from './pages/admin/UserManagement'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Main site routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/categories/:category" element={<CategoryPage />} />

            {/* Seller route */}
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/become-seller" element={<BecomeSeller />} />

            {/* Admin route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/product-management" element={<ProdManagement />} />
            <Route path="/seller-management" element={<SellerManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            

            {/* 404 page */}
            <Route path="*" element={<div className="not-found">Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

