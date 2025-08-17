const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
    try {
        let token = null;
        
        const authHeader = request.headers.authorization;
        
        // 🔍 DEBUG LOGS
        console.log('🔍 AUTH MIDDLEWARE DEBUG:');
        console.log('- Full headers:', request.headers);
        console.log('- Authorization header:', authHeader);
        console.log('- JWT_SECRET exists:', !!process.env.JWT_SECRET);
        console.log('- JWT_SECRET value:', process.env.JWT_SECRET ? 'Present' : 'Missing');

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        
        console.log('- Extracted token:', token ? `${token.substring(0, 20)}...` : 'No token');
        
        if (!token) {
            console.log('❌ No token provided');
            throw { statusCode: 401, message: 'Authentication required' };
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token verified successfully:', decoded);

        request.user = decoded;
        next();

    } catch (error) {
        console.log('❌ Auth middleware error:', error);
        
        const status = 'Error';
        const statusCode = error.statusCode || (error.name === 'JsonWebTokenError' ? 401 : 500);
        const message = error.message || 'An unexpected error has occurred';
        
        return response
            .status(statusCode)
            .json({ status, statusCode, message });
    }
};

module.exports = authMiddleware;