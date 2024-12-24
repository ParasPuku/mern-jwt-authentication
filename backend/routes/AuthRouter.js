const router = require("express").Router();
const { signup } = require("../controllers/authController");
const { signupValidation, loginValidation } = require("../middlewares/signupValidation");

// router.post("/login", loginValidation, login);
console.log('Hello Ram33')
router.post("/signup", signupValidation, signup);

module.exports = router;
