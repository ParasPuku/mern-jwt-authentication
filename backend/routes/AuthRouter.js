const router = require("express").Router();
const { signup, login, forgotPassword, resetPassword } = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} = require("../middlewares/signupValidation");

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

module.exports = router;
