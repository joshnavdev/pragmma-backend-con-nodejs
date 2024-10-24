import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginValidation, signupValidation } from '../validations/auth.validation.js';

const authController = new AuthController();

const authRouter = express.Router();

authRouter.post('/auth/signup', validate(signupValidation), authController.signup);
authRouter.post('/auth/login', validate(loginValidation), authController.login);
authRouter.post('/auth/google', authController.loginGoogle);

export default authRouter;
