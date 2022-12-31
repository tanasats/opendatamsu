exports.showuri = function (req, res, next) {
  console.log(req.method.toUpperCase() +' '+req.protocol + "://" + req.get("host") + req.originalUrl);
  next();
};