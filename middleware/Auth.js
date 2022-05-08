const jwt = require("jsonwebtoken");
const { secretKey } = require("../constants");
require("dotenv").config({ path: `..${__dirname}/.env` });
const { AuthFailureResponse } = require("../helper/helper");
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
     
    return res.status(401).send(AuthFailureResponse(300,"A token is required for authentication"));
  }else{
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send(AuthFailureResponse(401,"Invalid Token"));
    }
    return next();
  }
};

module.exports = verifyToken;