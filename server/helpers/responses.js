function createResponseObject({
  statusCode = 200,
  title = "",
  description = "",
  errorLevel = 0,
}) {
  const response = {
    statusCode,
    title,
    description,
    errorLevel,
  };
  return response;
}

module.exports = { createResponseObject };
