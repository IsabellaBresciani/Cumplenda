const  User  = require('../models/User.js');

class UserDAO {

    findUserByEmail = (email) => User.findOne({ where: { email }, attributes: ['id', 'email', 'password', 'first_name', 'last_name'] });

    createUser = (user) => {
        const { email, password, first_name,  last_name } = user;
        return User.create({
            email,
            password,
            first_name, 
            last_name
        });
    }
}

module.exports = new UserDAO();