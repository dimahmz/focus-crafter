//

class AppError extends Error {
  constructor(message, statusCode, errorResponse) {
    super(message);
    this.customeError = true;
    this.errorResponse = errorResponse || {};
    this.statusCode = statusCode || 401;
  }
}

module.exports = AppError;
