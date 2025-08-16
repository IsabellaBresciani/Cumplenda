
const Birthday = require('../models/Birthday');
const User = require('../models/User');

class BirthdayDao {
    /**
     * Crea un nuevo registro de cumpleaños para un usuario específico.
     * @param {object} birthdayData - Objeto con los datos del cumpleaños { first_name, last_name, ... }.
     * @param {number} userId - El ID del usuario al que pertenece este cumpleaños.
     * @returns {Promise<Birthday>} La instancia del cumpleaños creado.
     */
    async createBirthday(birthdayData, userId) {
        // Usamos el spread operator para combinar los datos del cumpleaños con el user_id
        return Birthday.create({
            ...birthdayData,
            user_id: userId, 
        });
    }

    /**
     * Obtiene todos los cumpleaños de un usuario específico.
     * @param {number} userId - El ID del usuario.
     * @returns {Promise<Birthday[]>} Un array con los cumpleaños del usuario.
     */
    async getBirthdaysByUserId(userId) {
        return Birthday.findAll({
            where: {
                user_id: userId,
            },
            order: [['birthday_date', 'ASC']], // Opcional: ordenar por fecha
        });
    }

    /**
     * Obtiene un cumpleaños específico por su ID, verificando que pertenezca al usuario.
     * @param {number} id - El ID del cumpleaños.
     * @param {number} userId - El ID del usuario que solicita.
     * @returns {Promise<Birthday|null>} La instancia del cumpleaños o null si no se encuentra.
     */
    async getBirthdayById(id, userId) {
        return Birthday.findOne({
            where: {
                id: id,
                user_id: userId, 
            },
        });
    }

    /**
     * Actualiza un cumpleaños, verificando la propiedad del usuario.
     * @param {number} id - El ID del cumpleaños a actualizar.
     * @param {object} updateData - Los campos a actualizar.
     * @param {number} userId - El ID del usuario.
     * @returns {Promise<[number]>} Retorna un array con el número de filas afectadas (debería ser 1 o 0).
     */
    async updateBirthday(id, updateData, userId) {
        return Birthday.update(updateData, {
            where: {
                id: id,
                user_id: userId, 
            },
        });
    }

    /**
     * Elimina un cumpleaños, verificando la propiedad del usuario.
     * @param {number} id - El ID del cumpleaños a eliminar.
     * @param {number} userId - El ID del usuario.
     * @returns {Promise<number>} El número de filas eliminadas.
     */
    async deleteBirthday(id, userId) {
        return Birthday.destroy({
            where: {
                id: id,
                user_id: userId, 
            },
        });
    }
}

// Exportamos una única instancia (patrón Singleton)
module.exports = new BirthdayDao();