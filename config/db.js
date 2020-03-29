const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://admin-abdallah:test123@cluster0-57pd9.mongodb.net/expensetracker?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error:${err.massage}`);
    process.exit(1);
  }
};

module.exports = connectDB;
