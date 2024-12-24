const router = require("express").Router();
const { signup, login } = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/signupValidation");

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
