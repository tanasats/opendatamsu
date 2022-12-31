const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({error:1, message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({error:1, message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({error:1, message: "No token provided!" });
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
}; 

const authJwt = {
  verifyToken: verifyToken
}
module.exports = authJwt;