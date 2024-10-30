export default class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, errorDetails = undefined) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorDetails = errorDetails;
  }
}
