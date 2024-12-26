const checkAuthentication = require("../middlewares/checkAuthentication");
const router = require("express").Router();
router.get("/getAllProducts", checkAuthentication, (req, res) => {
    console.log("-----Logged In User Details---", req.user)
    res.status(200).json({
      success: true,
      data: [
        {
          name: "paras",
          email: "paraspuru143@gmail.com",
          mobile: 9940494245,
        },
        {
          name: "anku",
          email: "anku143@gmail.com",
          mobile: 7645823769,
        },
      ],
    });
  });

  module.exports = router