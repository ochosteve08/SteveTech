const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//  @route POST /auth
//  @access public -- if access token has expired
const Login = asyncHandler(async (req, res, next) => {});

//  @route GET /auth/refresh
//  @access public
const Refresh = (req, res) => {};

//  @route POST /auth/logout 
//  @access public  --  clear cookie if exist
const Logout = (req, res) => {};

module.exports = {
  Login,
  Refresh,
  Logout,
};
