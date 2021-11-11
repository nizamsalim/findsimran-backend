const mongoose = require("mongoose");
const schema = mongoose.Schema;
const GoogleUserSchema = new schema({
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
});
module.exports = mongoose.model("googleUsers", GoogleUserSchema);
