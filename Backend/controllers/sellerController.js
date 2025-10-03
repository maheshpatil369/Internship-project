// Backend/controllers/sellerController.js
const Seller = require('../models/sellerModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');

// @desc    Register a new seller
// @route   POST /api/sellers/register
// @access  Public
exports.registerSeller = asyncHandler(async (req, res) => {
    const { 
        name, email, password, businessName, 
        gstNumber, panNumber, address 
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('A user with this email already exists.');
    }

    const user = await User.create({
        name,
        email,
        password,
        role: 'seller'
    });

    if (!user) {
        res.status(400);
        throw new Error('Failed to create user account.');
    }

    try {
        const seller = await Seller.create({
            user: user._id,
            businessName,
            gstNumber,
            panNumber,
            address
        });

        user.sellerProfile = seller._id;
        await user.save();

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            sellerId: seller._id,
            businessName: seller.businessName,
            token: generateToken(user._id, user.role),
        });

    } catch (error) {
        await User.findByIdAndDelete(user._id);
        res.status(400);
        throw new Error(`Failed to create seller profile: ${error.message}`);
    }
});

// @desc    Get dashboard data for the logged-in seller
// @route   GET /api/sellers/dashboard
// @access  Private (Seller)
exports.getSellerDashboard = asyncHandler(async (req, res) => {
    const seller = await Seller.findOne({ user: req.user._id });

    if (!seller) {
        res.status(404);
        throw new Error('Seller profile not found.');
    }

    const products = await Product.find({ seller: seller._id });

    const totalProducts = products.length;
    const totalViews = products.reduce((acc, p) => acc + p.viewCount, 0);
    const totalClicks = products.reduce((acc, p) => acc + p.clickCount, 0);
    const totalRevenue = 0; 

    res.status(200).json({
        seller,
        stats: {
            totalProducts,
            totalViews,
            totalClicks,
            totalRevenue,
        },
        products,
    });
});

// @desc    Get all sellers (for admin)
// @route   GET /api/sellers
// @access  Private (Admin)
exports.getSellers = asyncHandler(async (req, res) => {
    const sellers = await Seller.find({}).populate('user', 'name email');
    res.status(200).json(sellers);
});

// @desc    Approve a seller application by their USER ID
// @route   PUT /api/sellers/:userId/approve
// @access  Private (Admin)
exports.approveSeller = asyncHandler(async (req, res) => {
    // Find the seller profile using the USER ID from the route params
    const seller = await Seller.findOneAndUpdate(
        { user: req.params.id }, 
        { status: 'approved' }, 
        { new: true }
    );

    if (!seller) {
        res.status(404);
        throw new Error('Seller not found');
    }
    res.status(200).json(seller);
});

// @desc    Suspend a seller's account by their USER ID
// @route   PUT /api/sellers/:userId/suspend
// @access  Private (Admin)
exports.suspendSeller = asyncHandler(async (req, res) => {
    // Find the seller profile using the USER ID from the route params
    const seller = await Seller.findOneAndUpdate(
        { user: req.params.id }, 
        { status: 'suspended' }, 
        { new: true }
    );
    
    if (!seller) {
        res.status(404);
        throw new Error('Seller not found');
    }
    res.status(200).json(seller);
});
