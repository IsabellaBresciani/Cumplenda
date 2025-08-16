const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {

    try {
       
        let token = null;
        
        const authHeader = request.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) 
            token = authHeader.split(' ')[1];
    
        if (!token) 
            throw { statusCode: 401, message: 'Authentication required' };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;

        next();

    } catch (error) {
        const status = 'Error';
        const statusCode = error.statusCode || 500;
        const message = error.message || 'An unexpected error has occurred';
        return response
        .status(statusCode)
        .json({ status, statusCode, message });
    }
};

module.exports = authMiddleware;