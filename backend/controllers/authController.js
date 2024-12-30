const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

const forgotPassword = async (req, res) => {
  console.log("request forgot password", req.body);
  // Transporter setup for sending emails
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or any other email service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  console.log("transporter", transporter);
  // POST: Forgot Password
  const { email } = req.body;
  console.log("EMAIL POST", email);
  try {
    const user = await UserModel.findOne({ email }); // Find user by email
    if (!user) return res.status(404).send("User not found");

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 3600000; // 1-hour expiry

    // Save the token and expiry to the user's record
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // Send email
    const resetURL = `http://localhost:5173/reset-password?token=${token}`;
    const message = `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}">${resetURL}</a>
      `;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: message,
    });

    res.status(200).json({
      data: {
        title: "Password Reset Email Sent Successfully",
        message: "Please check your email for the password reset link",
      },
      success: true,
    });
  } catch (err) {
    res.status(500).send("Error in processing request");
  }
};

const resetPassword = async (req, res) => {
  console.log("request reset password", req.body);
  const { password: newPassword } = req.body;
  const { token } = req.query;
  try {
    // Find user by token and check expiry
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send("Invalid or expired token");

    // Hash the new password and update the user's record
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; // Clear the token
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).send({
      success: true,
      data: {
        title: "Your password has been reset successfully",
        message: "Please login with your new password",
      },
    });
  } catch (err) {
    res.status(500).send("Error in processing request");
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
