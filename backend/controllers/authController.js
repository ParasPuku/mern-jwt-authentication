const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  console.log("Inside signup controller");
  try {
    console.log("Hello Ram");
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: `User is already exists, you can login`,
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(200).json({ message: "Signup successful", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

const login = async (req, res) => {
  console.log("Inside login controller");
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const erroMsg = `User not found, please check your email and password`;
    if (!user) {
      return res.status(403).json({
        message: erroMsg,
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: erroMsg, success: false });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({ message: "Login Success", success: true,jwtToken, email: user.email, name: user.name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

module.exports = {
  signup,
  login,
};
