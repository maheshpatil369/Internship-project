// Backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Enable express to parse JSON bodies from incoming requests
app.use(express.json());

// --- API Routes ---

// Default route
app.get('/', (req, res) => {
  res.send('Shringar API is running...');
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const userRoutes = require('./routes/userRoutes');

// Mount routes
// Any request starting with /api/auth will be handled by the authRoutes router.
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/users', userRoutes);


// --- Error Handling Middleware ---
// These should be the last middleware to be used
app.use(notFound);
app.use(errorHandler);


// --- Port Configuration ---
const PORT = process.env.PORT || 8000;

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

