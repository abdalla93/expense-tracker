const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI ||
      "mongodb+srv://admin-abdallah:test123@cluster0-57pd9.mongodb.net/expensetracker?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

module.exports = connectDB;
