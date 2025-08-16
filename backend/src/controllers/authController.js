const BadRequestException = require('../exceptions/BadRequestException');
const InternalServerExcepcion = require('../exceptions/InternalServerExcepcion');
const authService = require('../services/AuthService'); 

class AuthController {

    constructor(authService) {
        this.authService = authService;
    }
        
    login = async (request, response) => {

        const { email, password } = request.body;
    
        if (!email || !password) throw new BadRequestException('Email and password required');

        if (!process.env.JWT_SECRET) 
            throw new InternalServerExcepcion('JWT secret key missing in current enviorment');

        const authToken = await this.authService.generateAuthToken(email, password);
        const currentUser = await this.authService.getUser(email, password);
  
        return response
        .status(200)
        .json({ 
            status: 'Success',
            message: 'User successfully login',
            authToken: authToken, 
            currentUser: currentUser
        });
    };

    register = async (request, response) => {

        const { first_name, last_name, email, password } = request.body;

        if (!email || !password) throw new BadRequestException('Email and password required');

        const data = { email, password, first_name, last_name };

        await this.authService.registerUser(data);
        
        return response
        .status(201)
        .json({ 
            status: 'Success',
            message: 'User successfully created'
        });
    };
}

module.exports = new AuthController(authService);