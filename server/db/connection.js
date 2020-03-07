// connection.js
const mongoose = require("mongoose");
const User = require("./models/User");
const connection = "mongodb://mongo:27017/database";
const connectDb = () => {
  return mongoose.connect(connection);
};
module.exports = connectDb;
