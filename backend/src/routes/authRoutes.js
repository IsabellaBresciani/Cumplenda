const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//--------------------------------  ENDPOINTS  --------------------------------
//--------------------------------  ENDPOINTS  --------------------------------
router.post('/login', async (req, res, next) => {
    try {
        console.log('🔍 Login route hit:', req.body); 
        await authController.login(req, res, next);
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

router.post('/register', async (req, res, next) => {
    try {
        console.log('🔍 Register route hit:', req.body);
        await authController.register(req, res, next);
    } catch (error) {
        console.error('❌ Register error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

module.exports = router;