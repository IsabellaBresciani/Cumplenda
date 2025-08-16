//--------------------------------  imports  --------------------------------
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const checkHealthRoutes = require('./src/routes/checkHealth');
const authRoutes = require('./src/routes/authRoutes');
const birthdayRoutes = require('./src/routes/birthdayRoutes'); // ---> AÑADIDO <---

//--------------------------------  App  --------------------------------
const app = express();

//--------------------------------  Middleware  --------------------------------
const cookieParser = require('cookie-parser');

//--------------------------------  Midelware  ---------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Considera configurar CORS de forma más estricta para producción
app.use(cookieParser());

//--------------------------------  Public Routes  -----------------------
// Rutas que no requieren autenticación
app.use('/api/auth', authRoutes);
app.use('/api/checkhealth', checkHealthRoutes);

//--------------------------------  Private Routes  --------------------
// Rutas que SÍ requieren autenticación.
// El middleware de autenticación se debe aplicar dentro de birthdayRoutes.js
app.use('/api/birthdays', birthdayRoutes); 

//--------------------------------  Global Error Handler  -----------------------
app.use((error, request, response, next) => {
    // Es una buena práctica registrar el error completo para depuración
    console.error(error); 
    
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred.';

    return response
        .status(statusCode)
        .json({ 
            status: 'Error', 
            statusCode, 
            message, 
            details: error.details, // Opcional, para errores de validación
            timestamp: new Date().toISOString(), 
            path: request.originalUrl 
        });
});

//--------------------------------  PORT  -------------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log('API running on port ' + PORT));

module.exports = app;