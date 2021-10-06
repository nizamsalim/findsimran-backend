const User = require("../models/user");

const validateSignup = async (req, res, next) => {
  const { name, userName, email, password } = req.body;
  if (!name || !userName || !email || !password) {
    return res.status(400).json({ success: false, error: "Invalid inputs" });
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
    return res
      .status(400)
      .json({ success: false, error: "Username is already taken" });
  }
  if (emailExists) {
    return res
      .status(400)
      .json({ success: false, error: "Email is already taken" });
  }
  if (!emailIsValid) {
    return res
      .status(400)
      .json({ success: false, error: "Email is not valid" });
  }
  if (!passwordIsValid) {
    return res.status(400).json({
      success: false,
      error: "Password should contain more than 6 characters",
    });
  }
  next();
};
module.exports = validateSignup;