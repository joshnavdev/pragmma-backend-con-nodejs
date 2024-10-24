import { body } from 'express-validator';

const validateConfirmPassword = (value, { req }) => {
  return value === req.body.password;
};

export const signupValidation = [
  body('email').notEmpty().withMessage('Correo requerido').isEmail().withMessage('Correo inválido'),
  body('password')
    .notEmpty()
    .withMessage('Contraseña requerida')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirmación de contraseña requerida')
    .custom(validateConfirmPassword)
    .withMessage('Las contraseñas no coinciden'),
];

export const loginValidation = [
  body('email').notEmpty().withMessage('Correo requerido').isEmail().withMessage('Correo inválido'),
  body('password').notEmpty().withMessage('Contraseña requerida'),
];
