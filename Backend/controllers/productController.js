// Backend/controllers/productController.js
const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');
const asyncHandler = require('../middleware/asyncHandler');

// Fetch all approved products
exports.getProducts = asyncHandler(async (req, res) => {
  const query = { status: 'approved' };
  
  if (req.query.keyword) {
    query.$text = { $search: req.query.keyword };
  }
  
  if (req.query.category) {
    query.category = req.query.category;
  }

  const products = await Product.find(query).populate('seller', 'businessName');
  res.status(200).json(products);
});

// Fetch a single product by ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('seller', 'businessName rating');
  
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a new product (for Sellers or Admins)
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, material, images, affiliateUrl, arModelUrl } = req.body;

  // Find the seller profile associated with the logged-in user
  const seller = await Seller.findOne({ user: req.user._id });

  if (!seller) {
      res.status(400);
      throw new Error('User is not a registered seller or seller profile not found.');
  }
  
  // Ensure the seller is approved before they can create products
  if (seller.status !== 'approved') {
      res.status(403);
      throw new Error('Seller is not yet approved to add products.');
  }

  const product = new Product({
    name,
    seller: seller._id,
    description,
    price,
    category,
    material,
    images,
    affiliateUrl,
    arModelUrl,
    status: 'pending', // All new products require admin approval
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


// Update a product
exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check if the user is an admin or the seller who owns the product
    if (req.user.role !== 'admin') {
      const seller = await Seller.findOne({ user: req.user._id });
      if (!seller || product.seller.toString() !== seller._id.toString()) {
          res.status(403);
          throw new Error('User not authorized to update this product');
      }
    }

    const { name, description, price, category, material, images, affiliateUrl, inStock, isFeatured, arModelUrl, status } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.material = material || product.material;
    product.images = images || product.images;
    product.affiliateUrl = affiliateUrl || product.affiliateUrl;
    product.arModelUrl = arModelUrl || product.arModelUrl;
    product.inStock = inStock !== undefined ? inStock : product.inStock;

    // Only admins can change featured status or product status
    if (req.user.role === 'admin') {
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.status = status || product.status;
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
});

// Delete a product (Admin only)
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.status(200).json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Track a product view
exports.trackProductView = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.status(200).json({ message: 'View tracked' });
});

// Track an affiliate click
exports.trackAffiliateClick = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { clickCount: 1 } });
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.status(200).json({ message: 'Click tracked' });
});
