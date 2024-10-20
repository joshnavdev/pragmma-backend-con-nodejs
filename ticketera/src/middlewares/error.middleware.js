import ApiError from '../utils/errorApi.js';

export const errorConverter = (error, req, res, next) => {
  let handledError = error;

  if (!(handledError instanceof ApiError)) {
    handledError = new ApiError(500, error.message, false);
    handledError.stack = error.stack;
  }

  next(handledError);
};

export const errorHandler = (error, req, res, next) => {
  const { message, statusCode, isOperational, stack } = error;

  console.error(error);

  return res.status(statusCode).json({
    status: 'fail',
    message: isOperational ? message : 'Error interno',
    isOperational: isOperational,
    stack: stack, // solo en desarrolloi
    data: null,
  });
};
