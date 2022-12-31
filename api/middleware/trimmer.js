exports.trimmer = function (req, res, next) {
  if (req.body) {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") {
        req.body[key] = value.trim();
      }
    }
  }
  next();
};