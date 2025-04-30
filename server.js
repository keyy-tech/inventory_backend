// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/Users'); // Import the User model

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Validate essential environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('❌ MONGO_URI or JWT_SECRET missing in .env file');
    process.exit(1);
}

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: 'Invalid or expired token.'});
    }
};

/// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    const {username, email, password, name, phone, address, role} = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists.'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database with all fields
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name,
            phone,
            address,
            role
        });
        await newUser.save();

        res.status(201).json({message: 'User registered successfully.', user: newUser});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post('/api/auth/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials.'});
        }

        // Generate JWT
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({message: 'Login successful.', token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Profile Route
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        // Fetch the authenticated user's details
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('📦 Inventory Management API is running...');
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({message: 'This is a protected route.', user: req.user});
});

// Routes
const productRoutes = require('./routes/ProductRoutes');
const supplierRoutes = require('./routes/SupplierRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const inventoryTransactionRoutes = require('./routes/Inventory_TransactionRoutes');
const purchaseOrderRoutes = require('./routes/PurchaseOrderRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const invoiceRoutes = require('./routes/InvoiceRoutes');
const notificationRoutes = require('./routes/NotificationRoutes');

// Mount routes with proper namespaces
app.use('/api', authenticateToken, productRoutes);
app.use('/api', authenticateToken, supplierRoutes);
app.use('/api', authenticateToken, customerRoutes);
app.use('/api', authenticateToken, orderRoutes);
app.use('/api', authenticateToken, inventoryTransactionRoutes);
app.use('/api', authenticateToken, purchaseOrderRoutes);
app.use('/api', authenticateToken, paymentRoutes);
app.use('/api', authenticateToken, invoiceRoutes);
app.use('/api', authenticateToken, notificationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown on CTRL+C
process.on('SIGINT', async () => {
    console.log('\n🛑 Gracefully shutting down...');
    await mongoose.connection.close();
    server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
    });
});