const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { userValidation } = require("../validations/");

//  @route POST /auth
//  @access public -- if access token has expired
const Login = asyncHandler(async (req, res, next) => {
  const { username, password } =
    await userValidation.userLoginValidation.validateAsync(req.body);

  const foundUser = await UserModel.findOne({ username }).exec();
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) res.status(401).json({ message: "unauthorized" });
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "600s" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },

    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // send accessToken containing username and roles
  res.json({ accessToken });
});

//  @route GET /auth/refresh
//  @access public
const Refresh = (req, res) => {
    const cookies = req.cookies;
    
};

//  @route POST /auth/logout
//  @access public  --  clear cookie if exist
const Logout = (req, res) => {};

module.exports = {
  Login,
  Refresh,
  Logout,
};
