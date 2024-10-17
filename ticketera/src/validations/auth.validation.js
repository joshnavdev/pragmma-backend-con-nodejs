import { body } from 'express-validator';

const validateEmail = body('email')
  .notEmpty()
  .withMessage('Email es requerido')
  .isEmail()
  .withMessage('Email no es valido');

export const signupValidation = [
  validateEmail,
  body('password')
    .notEmpty()
    .withMessage('Contraseña es requerido')
    .isLength({ min: 8 })
    .withMessage('Contraseña debe tener al menos 8 caracteres'),
  body('confirmPassword').notEmpty().withMessage('Confirmacion de contraseña es requerido'),
];

export const loginValidation = [validateEmail, body('password').notEmpty().withMessage('Contraseña es requerido')];
