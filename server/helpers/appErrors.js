module.exports = class appError extends Error {
  constructor(message, errorObj) {
    super(message);
    this.errorObj = errorObj;
  }
};
