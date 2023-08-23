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
    return res.status(401).json({ message: "no user found" });
  }
  console.log("foundUser:", foundUser);
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "credentials mismatch" });
  console.log("match:", match);
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },

    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
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

  if (!cookies?.jwt) return res.status(401).json({ message: "unauthorized" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "forbidden" });
      const foundUser = await UserModel.findOne({ username: decoded.username });
      if (!foundUser) return res.status(401).json({ message: "unauthorized" });
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    })
  );
};

//  @route POST /auth/logout
//  @access public  --  clear cookie if exist
const Logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //no content
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  Login,
  Refresh,
  Logout,
};
