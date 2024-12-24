const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    console.log("Inside signup controller");
  try {
    console.log('Hello Ram')
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({
          message: `User is already exists, you can login`,
          success: false,
        });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(200)
      .json({ message: "Signup successful", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

module.exports = {
    signup
}
