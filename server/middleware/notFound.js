module.exports = function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
};
