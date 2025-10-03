// Backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    deleteUser,
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// --- Admin Routes ---

// Get all users
router.get('/', protect, authorize('admin'), getUsers);

// Delete a user
router.delete('/:id', protect, authorize('admin'), deleteUser);


// --- Wishlist Routes ---

// Get my wishlist
router.get('/wishlist', protect, getWishlist);

// Add to my wishlist
router.post('/wishlist', protect, addToWishlist);

// Remove from my wishlist
router.delete('/wishlist/:productId', protect, removeFromWishlist);


module.exports = router;
