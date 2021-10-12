const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
    });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        //store hash in your DB
        newUser.password = hash;

        newUser
          .save()
          .then((user) => {
            const responseUser = {
              name: user.name,
              email: user.email,
              id: user._id,
              userName: user.userName,
            };
            const authPayload = { _id: user._id };
            const AuthToken = jwt.sign(authPayload, JWT_SECRET);
            return res.json({ success: true, user: responseUser, AuthToken });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Email does not exist" });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res
        .status(400)
        .json({ success: false, error: "Password is incorrect" });
    }
    const responseUser = {
      name: user.name,
      email: user.email,
      id: user._id,
      userName: user.userName,
    };
    const payload = { _id: user._id };
    const AuthToken = jwt.sign(payload, JWT_SECRET);
    return res.json({ success: true, user: responseUser, AuthToken });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          userName: newUsername,
        },
      },
      { new: true }
    );
    let updatedUser = {
      _id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
    };
    res.json({ success: true, updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

exports.updateName = async (req, res) => {
  try {
    const { newName } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { name: newName },
      },
      { new: true }
    );
    let updatedUser = {
      _id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
    };
    res.json({ success: true, updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!(newPassword.length > 6)) {
      return res.status(400).json({
        success: false,
        error: "Password should contain more than 6 characters",
      });
    }
    const user = await User.findById(req.user._id);
    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches) {
      return res
        .status(400)
        .json({ success: false, error: "Incorrect password" });
    }
    const salt = await bcrypt.genSalt(20);
    const newPwdHash = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(req.user._id, {
      $set: { password: newPwdHash },
    });
    res.json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
