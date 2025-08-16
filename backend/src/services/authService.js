const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BadRequestException = require('../exceptions/BadRequestException.js');
const userDao = require('../daos/userDao');

class AuthService {

    async sendEmail(email, confirmationCode){

    }

    async getUser(email, inputPassword){
        const user = await userDao.findUserByEmail(email);
        if (!user) throw new BadRequestException('Invalid Credentials');
         const passwordMatches = bcrypt.compareSync(inputPassword, user.password);

        if (!passwordMatches) throw new BadRequestException('Invalid Credentials');
        
        return user
    }

    async generateAuthToken(email, inputPassword) {

        const user = await userDao.findUserByEmail(email);

        if (!user) throw new BadRequestException('Invalid Credentials');
                    
        const passwordMatches = bcrypt.compareSync(inputPassword, user.password);

        if (!passwordMatches) throw new BadRequestException('Invalid Credentials');

        const payload = { userId: user.id, email: user.email };
        const secretKey = process.env.JWT_SECRET;

        const authToken = jwt.sign(
           payload,
            secretKey,
            { expiresIn: '4h' }
        );

        return authToken;
    }

    async registerUser(data) {

        const { email, password, first_name, last_name} = data;

        const userExist = await userDao.findUserByEmail(email);
        
        if (userExist) 
            throw { message: `Already exist user with email: ${data.email}`, statusCode: 409 };
    
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        const newUser = { 
            email: email, 
            password: hashedPassword ,
            first_name: first_name,
            last_name: last_name
        };

        return userDao.createUser(newUser);
    }
}

module.exports = new AuthService();