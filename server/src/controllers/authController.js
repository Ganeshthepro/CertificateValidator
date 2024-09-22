// packages
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// model
const userModel = require("../models/userModel.js");
const config = require("../config/config.js");

const generateAccessToken = (id) => {
   const token = jwt.sign({ sub: id }, config.jwtSecret, { expiresIn: "30d" });
   return token;
};

const register = async (req, res) => {
   try {
      const { email, username, fullname, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });

      if (isEmailExist)
         return res
            .status(400)
            .json({ status: "error", msg: "email already exist" });

      const trimUsername = username.replace(/ /g, "_").toLowerCase();

      const isUsernameExist = await userModel.findOne({
         username: trimUsername,
      });

      if (isUsernameExist)
         return res
            .status(400)
            .json({ status: "error", msg: "username already taken" });

      const salt = 10;
      const hash = await bcrypt.genSalt(salt);
      const hashPassword = await bcrypt.hash(password, hash);

      const newUser = new userModel({
         email,
         fullname,
         username: trimUsername,
         password: hashPassword,
      });

      await newUser.save();
      const token = generateAccessToken(newUser._id);

      res.cookie("token", token, {
         httpOnly: true, // Prevents access to the cookie via client-side JavaScript
         secure: true, // Ensures the cookie is sent only over HTTPS
         sameSite: "strict", // Helps prevent CSRF attacks
         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({ status: "success", user: newUser });
   } catch (error) {
      res.status(500).json({ status: "error", msg: error.message });
   }
};
const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user)
         return res
            .status(400)
            .json({ status: "error", msg: "invalid credential" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
         return res
            .status(400)
            .json({ status: "error", msg: "invalid credential" });

      const token = generateAccessToken(user._id);

      res.cookie("token", token, {
         httpOnly: true, // Prevents access to the cookie via client-side JavaScript
         secure: true, // Ensures the cookie is sent only over HTTPS
         sameSite: "strict", // Helps prevent CSRF attacks
         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({ status: "success", user });
   } catch (error) {
      res.status(500).json({ status: "error", msg: error.message });
   }
};

module.exports = { register, login };
