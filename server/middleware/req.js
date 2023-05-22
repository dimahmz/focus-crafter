module.exports = function (req, res, next) {
  console.dir(`request on :${req.path}`);
  next();
};
