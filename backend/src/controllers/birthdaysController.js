// controllers/birthdaysController.js
const birthdayDao = require('../daos/BirthdayDao');

class BirthdaysController {
    async createBirthday(req, res) {
        try {
            const userId = req.user.userId; 
            const birthdayData = req.body;

            if (!birthdayData.first_name || !birthdayData.birthday_date) {
                return res.status(400).json({ message: 'First name and birthday date are required.' });
            }

            const newBirthday = await birthdayDao.createBirthday(birthdayData, userId);
            res.status(201).json(newBirthday); // 201 Created
        } catch (error) {
            console.error('Error creating birthday:', error);
            res.status(500).json({ message: 'An error occurred while creating the birthday.' });
        }
    }

    async getAllBirthdays(req, res) {
    try {
        // Validar que el usuario esté autenticado
        console.log(req.user.userId)

        const userId = req.user.userId;
        console.log(`Fetching birthdays for user ID: ${userId}`);
        
        const birthdays = await birthdayDao.getBirthdaysByUserId(userId);
        
        // Validar que se obtuvieron datos
        if (!birthdays) {
            return res.status(404).json({ 
                message: 'No se encontraron cumpleaños para este usuario.' 
            });
        }

        // Respuesta exitosa con metadatos útiles
        res.status(200).json({
            success: true,
            count: birthdays.length,
            data: birthdays,
            message: birthdays.length === 0 ? 'No hay cumpleaños registrados' : 'Cumpleaños obtenidos exitosamente'
        });

    } catch (error) {
        console.error('Error fetching birthdays:', error);
        
        // Diferentes tipos de errores
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Error de validación en los datos.',
                error: error.message 
            });
        }
        
        if (error.name === 'DatabaseError') {
            return res.status(503).json({ 
                message: 'Error de base de datos. Intenta más tarde.' 
            });
        }
        
        // Error genérico
        res.status(500).json({ 
            message: 'Ocurrió un error interno del servidor.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
}

    /**
     * Obtiene un cumpleaños específico por su ID.
     * Valida que el cumpleaños pertenezca al usuario autenticado.
     */
    async getBirthdayById(req, res) {
        try {
            const userId = req.user.userId;
            const { id } = req.params; // Obtiene el ID de la URL (ej: /birthdays/123)

            const birthday = await birthdayDao.getBirthdayById(id, userId);

            if (!birthday) {
                return res.status(404).json({ message: 'Birthday not found.' }); // 404 Not Found
            }

            res.status(200).json(birthday);
        } catch (error) {
            console.error('Error fetching birthday by ID:', error);
            res.status(500).json({ message: 'An error occurred while fetching the birthday.' });
        }
    }

    /**
     * Actualiza un cumpleaños específico.
     * Valida que el cumpleaños pertenezca al usuario autenticado.
     */
    async updateBirthday(req, res) {
        try {
            const userId = req.user.userId;
            const { id } = req.params;
            const updateData = req.body;

            const [affectedRows] = await birthdayDao.updateBirthday(id, updateData, userId);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Birthday not found or you do not have permission to update it.' });
            }

            // Opcional: Devolver el objeto actualizado
            const updatedBirthday = await birthdayDao.getBirthdayById(id, userId);
            res.status(200).json(updatedBirthday);

        } catch (error) {
            console.error('Error updating birthday:', error);
            res.status(500).json({ message: 'An error occurred while updating the birthday.' });
        }
    }

    /**
     * Elimina un cumpleaños específico.
     * Valida que el cumpleaños pertenezca al usuario autenticado.
     */
    async deleteBirthday(req, res) {
        try {
            const userId = req.user.userId;
            const { id } = req.params;

            const affectedRows = await birthdayDao.deleteBirthday(id, userId);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Birthday not found or you do not have permission to delete it.' });
            }
            
            // 204 No Content es la respuesta estándar para un DELETE exitoso.
            // No se envía cuerpo en la respuesta.
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting birthday:', error);
            res.status(500).json({ message: 'An error occurred while deleting the birthday.' });
        }
    }
}

// Exportamos una única instancia del controlador
module.exports = new BirthdaysController();