const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//--------------------------------  ENDPOINTS  --------------------------------
//--------------------------------  ENDPOINTS  --------------------------------
router.post('/login', (req, res, next) => {
    console.log('🔍 Login route hit:', req.body); 
    authController.login(req, res, next);
});

router.post('/register', (req, res, next) => {
    console.log('🔍 Register route hit:', req.body);
    authController.register(req, res, next);
});

module.exports = router;