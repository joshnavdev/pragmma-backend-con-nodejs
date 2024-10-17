import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { loginValidation, signupValidation } from '../validations/auth.validation.js';
import { validate } from '../middlewares/validate.middleware.js';

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post('/signup', validate(signupValidation), authController.signup);
authRouter.post('/login', validate(loginValidation), authController.login);

export default authRouter;
