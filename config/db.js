const mongoose = require("mongoose");
require("colors");

const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {}
};

module.exports = DB;
