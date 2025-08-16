// routes/birthdays.js

const express = require('express');
const router = express.Router();
const birthdaysController = require('../controllers/birthdaysController');
const authMiddleware = require('../middleware/authMiddleware'); // ¡Importante! Middleware para proteger rutas

// --- Todas las rutas están protegidas y requieren que el usuario esté logueado ---
router.use(authMiddleware);

// --- Rutas CRUD para Cumpleaños ---

// POST /birthdays/ -> Crear un nuevo cumpleaños
router.post('/', birthdaysController.createBirthday);

// GET /birthdays/ -> Obtener TODOS los cumpleaños del usuario logueado
router.get('/', birthdaysController.getAllBirthdays);

// GET /birthdays/:id -> Obtener UN cumpleaños específico por su ID
router.get('/:id', birthdaysController.getBirthdayById);

// PUT /birthdays/:id -> Actualizar un cumpleaños específico por su ID
router.put('/:id', birthdaysController.updateBirthday);

// DELETE /birthdays/:id -> Eliminar un cumpleaños específico por su ID
router.delete('/:id', birthdaysController.deleteBirthday);

module.exports = router;