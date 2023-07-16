function createResponseObject(statusCode, title, description, errorLevel) {
  const response = {
    statusCode,
    title,
    description,
    errorLevel,
  };
  return response;
}

module.exports = { createResponseObject };
