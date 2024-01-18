const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("Error in connecting to mongodb Atlas", error);
  }
};

module.exports = connectDB;