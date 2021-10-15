const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  profilePic: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  github: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});
module.exports = mongoose.model("users", userSchema);
