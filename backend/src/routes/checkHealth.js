const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

router.get('/', async (req, res) => {

  let status = 'Success';
  let message = 'API is running';

  try {

    await sequelize.authenticate();

  } catch (error) {
    
    status = 'Error';
    message = error.message;

  } finally {
      return res
      .status(200)
      .json({ status, message });
  }  
});

module.exports = router;