const express = require("express");

const authroute = express.Router();
const AuthController = require("../Controllers/AuthController");
authroute.post("/register",AuthController.Register);
authroute.post("/login",AuthController.Login);

module.exports = authroute