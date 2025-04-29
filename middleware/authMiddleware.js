const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    try {
        // Use the same secret key for verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Using the same secret here
        req.user = decoded; // Attach decoded token (e.g., id, role) to request
        next(); // Continue to the next middleware/route
    } catch (err) {
        return res.status(403).json({message: 'Invalid or expired token.'});
    }
};

module.exports = authenticateUser;
