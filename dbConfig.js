// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
// const DB_NAME = process.env.DB_NAME;

// let state = {
//   db: null,
// };

// const connect = (callback) => {
//   let options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };
//   MongoClient.connect(DB_URI, (err, data) => {
//     if (err) return callback(err);
//     state.db = data.db(DB_NAME);
//   });
//   callback();
// };

// const get = () => {
//   return state.db;
// };
// module.exports = { connect, get };

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
