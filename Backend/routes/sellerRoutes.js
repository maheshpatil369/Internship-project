// Backend/routes/sellerRoutes.js
const express = require('express');
const router = express.Router();
const { 
    registerSeller, 
    getSellerDashboard, 
    getSellers, 
    approveSeller, 
    suspendSeller 
} = require('../controllers/sellerController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   POST /api/sellers/register
// @desc    Register a new seller
// @access  Public
router.post('/register', registerSeller);

// @route   GET /api/sellers/dashboard
// @desc    Get dashboard data for the logged-in seller
// @access  Private (Seller)
router.get('/dashboard', protect, authorize('seller'), getSellerDashboard);

// --- Admin Routes for Seller Management ---

// @route   GET /api/sellers
// @desc    Get all sellers (for admin panel)
// @access  Private (Admin)
router.get('/', protect, authorize('admin'), getSellers);

// @route   PUT /api/sellers/:id/approve
// @desc    Approve a seller application (uses USER ID)
// @access  Private (Admin)
router.put('/:id/approve', protect, authorize('admin'), approveSeller);

// @route   PUT /api/sellers/:id/suspend
// @desc    Suspend a seller's account (uses USER ID)
// @access  Private (Admin)
router.put('/:id/suspend', protect, authorize('admin'), suspendSeller);


module.exports = router;
