const User = require("../models/user");

const validateSignup = async (req, res, next) => {
  try {
    const { name, userName, email, password } = req.body;
    if (!name || !userName || !email || !password) {
      return res.json({
        success: false,
        error: {
          code: "val/inp-inv",
          message:
            "Invalid inputs passed. Please check documentation and pass data in appropriate format",
        },
      });
    }
    // validation checks
    const usernameExists = await User.findOne({ userName: userName });
    const emailExists = await User.findOne({ email: email });
    const emailIsValid = validateEmail(email);
    const passwordIsValid = password.length > 6 ? true : false;

    function validateEmail(emailInput) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(emailInput).toLowerCase());
    }
    if (usernameExists) {
      return res.json({
        success: false,
        error: {
          code: "val/un-tkn",
          message: "This username is already taken",
        },
      });
    }
    if (emailExists) {
      return res.json({
        success: false,
        error: {
          code: "val/em-ex",
          message: "This email already exists",
        },
      });
    }
    if (!emailIsValid) {
      return res.json({
        success: false,
        error: {
          code: "val/em-inv",
          message: "Email is in invalid format",
        },
      });
    }
    if (!passwordIsValid) {
      return res.json({
        success: false,
        error: {
          code: "val/pwd-len",
          message: "Password should be more than 6 characters long",
        },
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message:
          "Internal server error. Contact backend team with code 'VAL70'",
      },
    });
  }
};
module.exports = validateSignup;
