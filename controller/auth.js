const User = require("../models/user");
const GoogleUser = require("../models/googleUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const admin = require("firebase-admin");

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

        newUser.save().then((user) => {
          const responseUser = {
            name: user.name,
            email: user.email,
            _id: user._id,
            userName: user.userName,
          };
          const authPayload = { _id: user._id };
          const AuthToken = jwt.sign(authPayload, JWT_SECRET);
          return res.json({ success: true, user: responseUser, AuthToken });
        });
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message:
          "Internal server error. Contact backend team with code AUTH-SU",
        body: req.body,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        error: {
          code: "auth/em-inc",
          message: "Email does not exist",
        },
      });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.json({
        success: false,
        error: {
          code: "auth/pwd-inc",
          message: "Password is incorrect",
        },
      });
    }
    const responseUser = {
      name: user.name,
      email: user.email,
      _id: user._id,
      userName: user.userName,
    };
    const payload = { _id: user._id };
    const AuthToken = jwt.sign(payload, JWT_SECRET);
    return res.json({ success: true, user: responseUser, AuthToken });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code AU-LG",
        body: req.body,
      },
    });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const getUsernameFromEmail = (email) => {
      let username = email.split("@")[0];
      username = username.split(".").join("");
      return username;
    };
    if (!req.body.idToken) {
      return res.json({
        success: false,
        error: {
          code: "auth/id-abs",
          message: "id Token is not present in request body",
        },
      });
    }

    let response = {
      success: true,
      user: {},
      AuthToken: null,
    };

    const gUser = await admin.auth().verifyIdToken(req.body.idToken);
    const { name, picture, email } = gUser;
    const userExistsInDb = await GoogleUser.findOne({ email });
    if (userExistsInDb) {
      const authPayload = {
        _id: userExistsInDb._id,
      };
      const AuthToken = jwt.sign(authPayload, JWT_SECRET);
      response.user = userExistsInDb;
      response.AuthToken = AuthToken;
    } else {
      const user = await GoogleUser.create({
        name,
        profilePic: picture,
        email,
        userName: getUsernameFromEmail(email),
      });
      const authPayload = { _id: user._id };
      const AuthToken = jwt.sign(authPayload, JWT_SECRET);
      response.user = user;
      response.AuthToken = AuthToken;
    }
    res.json(response);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "server/ise",
          message:
            "Internal server error. Contact backend team with code AU-GL",
        },
      });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    if (!newUsername)
      return res.json({
        success: false,
        error: {
          code: "user/unm-abs",
          message: "New username is not present in request body",
        },
      });
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
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code UP-UNM",
        body: req.body,
      },
    });
  }
};

exports.updateName = async (req, res) => {
  try {
    const { newName } = req.body;
    if (!newName)
      return res.json({
        success: false,
        error: {
          code: "user/nm-abs",
          message: "New name is not present in request body",
        },
      });
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
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message: "Internal server error. Contact backend team with code UP-NM",
        body: req.body,
      },
    });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!(newPassword.length > 6)) {
      return res.json({
        success: false,
        error: {
          code: "val/pwd-len",
          message: "Password should be more than 6 characters long",
        },
      });
    }
    if (!oldPassword || !newPassword) {
      return res.json({
        success: false,
        error: {
          code: "auth/pwd-abs",
          message: "Old password or new password missing in request body",
        },
      });
    }
    const user = await User.findById(req.user._id);
    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches) {
      return res.json({
        success: false,
        error: {
          code: "auth/pwd-inc",
          message: "Password is incorrect",
        },
      });
    }
    const salt = await bcrypt.genSalt(20);
    const newPwdHash = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(req.user._id, {
      $set: { password: newPwdHash },
    });
    res.json({ success: true });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message:
          "Internal server error. Contact backend team with code AU-PWDCH",
        body: req.body,
      },
    });
  }
};

exports.getCurrentUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.json({
        success: false,
        error: {
          code: "user/nf",
          message: "User not found",
        },
      });
    }
    res.json({ success: true, user });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        code: "server/ise",
        message:
          "Internal server error. Contact backend team with code AU-CUSD",
        body: req.body,
      },
    });
  }
};
