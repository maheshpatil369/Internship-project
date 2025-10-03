// Backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/userModel');

// Middleware to protect routes that require a logged-in user
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the token is in the headers and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Get token from header (e.g., "Bearer <token>" -> "<token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database by the ID from the token payload
      // We exclude the password field from the result for security
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // 4. Proceed to the next middleware or the route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

// Middleware to authorize based on user role(s)
// Example usage: authorize('admin') or authorize('seller', 'admin')
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // This middleware should run AFTER the `protect` middleware,
    // so we will have access to `req.user`.
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // 403 Forbidden
      throw new Error(
        `User role '${req.user ? req.user.role : 'guest'}' is not authorized to access this route`
      );
    }
    next();
  };
};
