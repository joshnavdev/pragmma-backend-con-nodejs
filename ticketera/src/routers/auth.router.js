import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const authController = new AuthController();

const authRouter = express.Router();

authRouter.post('/auth/signup', authController.signup);
authRouter.post('/auth/login', authController.login);
authRouter.post('/auth/google', authController.loginGoogle);

export default authRouter;
