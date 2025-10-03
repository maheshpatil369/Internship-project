// Backend/controllers/userController.js
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const Product = require('../models/productModel');
const asyncHandler = require('../middleware/asyncHandler');

// Get all users (Admin)
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).populate('sellerProfile', 'businessName status');
    res.status(200).json(users);
});

// Delete a user (Admin)
exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.role === 'seller' && user.sellerProfile) {
        const seller = await Seller.findById(user.sellerProfile);
        if (seller) {
            await Product.deleteMany({ seller: seller._id });
            await seller.deleteOne();
        }
    }
    
    await user.deleteOne();

    res.status(200).json({ message: 'User and associated data removed' });
});


// --- Wishlist Functionality ---

// Get user's wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('favorites');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user.favorites);
});

// Add a product to wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $addToSet: { favorites: productId } },
        { new: true }
    ).populate('favorites');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user.favorites);
});

// Remove a product from wishlist
exports.removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { favorites: productId } },
        { new: true }
    ).populate('favorites');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user.favorites);
});
