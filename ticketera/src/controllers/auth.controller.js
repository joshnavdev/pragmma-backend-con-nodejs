import AuthService from '../services/auth.service.js';
import { catchAsync } from '../utils/controller.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  signup = catchAsync(async (req, res) => {
    await this.authService.signup(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado',
      data: null,
    });
  });

  login = catchAsync(async (req, res) => {
    const tokens = await this.authService.login(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        tokens,
      },
    });
  });

  loginGoogle = catchAsync(async (req, res) => {
    const { code } = req.body;

    const tokens = await this.authService.loginGoogle(code);

    res.status(200).json({
      status: 'success',
      data: {
        tokens,
      },
    });
  });
}

export default AuthController;
