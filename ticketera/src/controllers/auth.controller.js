import { matchedData } from 'express-validator';
import AuthService from '../services/auth.service.js';
import { catchAsync } from '../utils/controller.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  signup = catchAsync(async (req, res) => {
    // // Mostrar eso en un principio
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   console.log(errors.array());
    //   throw new Error('Validation Error');
    // }

    const matchedBody = matchedData(req, { locations: ['body'] });
    await this.authService.signup(matchedBody);

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado',
      data: null,
    });
  });

  login = catchAsync(async (req, res) => {
    const matchedBody = matchedData(req, { locations: ['body'] });
    const tokens = await this.authService.login(matchedBody);

    res.status(200).json({
      status: 'success',
      message: 'Usuario logueado',
      data: tokens,
    });
  });
}

export default AuthController;
