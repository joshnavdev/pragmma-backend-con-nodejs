import { validationResult } from 'express-validator';
import ApiError from '../utils/errorApi.js';

export const validate = (validations = []) => {
  return async (req, res, next) => {
    const asyncValidations = validations.map((validation) => validation.run(req));

    await Promise.all(asyncValidations);

    const errorsValidated = validationResult(req);

    if (errorsValidated.isEmpty()) {
      return next();
    }

    const errorMapped = errorsValidated.mapped();

    const errors = Object.keys(errorMapped).map((key) => {
      const { msg, path } = errorMapped[key];
      return { path, message: msg };
    });

    return next(new ApiError(400, 'Error de validación', true, errors));
  };
};
