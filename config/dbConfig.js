const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const connect = () => {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(DB_URI, options, () => {
    console.log("Database connected");
  });
};
module.exports = { connect };
