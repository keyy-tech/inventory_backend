// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        // Use the same JWT_SECRET across your app
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: 'Invalid or expired token.'});
    }
};

// In-memory user storage (replace with a database in production)
const users = [];

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    const {username, email, password} = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({message: 'User already exists.'});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = {id: Date.now(), username, email, password: hashedPassword};
    users.push(newUser);

    res.status(201).json({message: 'User registered successfully.'});
});

app.post('/api/auth/login', async (req, res) => {
    const {email, password} = req.body;

    // Find user
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({message: 'User not found.'});
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid credentials.'});
    }

    // Generate JWT
    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h',
    });

    res.status(200).json({message: 'Login successful.', token});
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
const auditLogRoutes = require('./routes/AuditLogRoutes');
const userRoutes = require('./routes/Auth');

// Mount routes with proper namespaces
app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/suppliers', authenticateToken, supplierRoutes);
app.use('/api/customers', authenticateToken, customerRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/inventory-transactions', authenticateToken, inventoryTransactionRoutes);
app.use('/api/purchase-orders', authenticateToken, purchaseOrderRoutes);
app.use('/api/payments', authenticateToken, paymentRoutes);
app.use('/api/audit-logs', authenticateToken, auditLogRoutes);
app.use('/api/users', authenticateToken, userRoutes);

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
