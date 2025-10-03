// Backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  trackProductView,
  trackAffiliateClick,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

// --- Public Routes ---

// @route   GET /api/products
// @desc    Fetch all products with filtering and searching
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Fetch a single product by ID
// @access  Public
router.get('/:id', getProductById);


// --- Analytics Routes ---

// @route   POST /api/products/:id/view
// @desc    Track a view for a product
// @access  Public
router.post('/:id/view', trackProductView);

// @route   POST /api/products/:id/click
// @desc    Track an affiliate link click for a product
// @access  Public
router.post('/:id/click', trackAffiliateClick);


// --- Protected Seller & Admin Routes ---

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Seller or Admin)
router.post('/', protect, authorize('seller', 'admin'), createProduct);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Seller who owns it, or Admin)
router.put('/:id', protect, authorize('seller', 'admin'), updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteProduct);


module.exports = router;
