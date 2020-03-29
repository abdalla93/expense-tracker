const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    "mongodb+srv://admin-abdallah:test123@cluster0-57pd9.mongodb.net/expensetracker?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

module.exports = connectDB;
