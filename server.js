const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "./config/config.env" });

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://admin-abdallah:test123@cluster0-57pd9.mongodb.net/expensetracker?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(error => console.log(`failed to connect !!! ${error}`));

const transactions = require("./app/routes/transactions");

const app = express();
app.use(express.json());

app.use("/api/v1/transactions", transactions);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
