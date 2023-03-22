const mongoose = require("mongoose");

require("../src/models/user.model");
require("../src/models/room.model");
require("../src/models/message.model");

mongoose.Promise = global.Promise;

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

  // console.log("Database MongoDB Connected...");
};

module.exports = connectDB;
