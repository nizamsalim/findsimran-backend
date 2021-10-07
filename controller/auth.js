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
            const authToken = jwt.sign(authPayload, JWT_SECRET);
            return res.json({ sucess: true, user: responseUser, authToken });
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
    const authToken = jwt.sign(payload, JWT_SECRET);
    return res.json({ success: true, user: responseUser, authToken });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//Here goes the login controller
