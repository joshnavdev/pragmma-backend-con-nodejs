import { validationResult } from 'express-validator';
import ApiError from '../utils/errorApi.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errorsValidated = validationResult(req);

    if (errorsValidated.isEmpty()) {
      return next();
    }

    // errors.mapped() => {email: {msg: 'Email no es valido', param: 'email', location: 'body'}}
    const errorsMapped = errorsValidated.mapped();

    const errors = Object.keys(errorsMapped).map((key) => {
      const { msg: message, path } = errorsMapped[key];

      return { path, message };
    });

    next(new ApiError(400, 'Error en validacion', true, errors));
  };
};
