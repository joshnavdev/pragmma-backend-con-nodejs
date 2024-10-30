import ApiError from '../utils/errorApi.js';

export const errorConverter = (error, req, res, next) => {
  let handledError = error;

  if (!(handledError instanceof ApiError)) {
    handledError = new ApiError(500, error.message, false);
    handledError.stack = error.stack;
  }

  next(handledError);
};

export const errorHandler = (error, req, res, _next) => {
  const { message, statusCode, isOperational, stack, errorDetails } = error;

  console.error(error);

  return res.status(statusCode).json({
    status: 'fail',
    message: isOperational ? message : 'Error interno',
    isOperational: isOperational,
    errorDetails,
    stack: stack, // solo en desarrollo
    data: null,
  });
};
