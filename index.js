require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// ================== MONGODB CONNECTION ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================== MIDDLEWARE ==================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================== STATIC FOLDER ==================
app.use(express.static(path.join(__dirname, "public")));

// ================== VIEW ENGINE ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================== ROUTES ==================
const portfolioRoutes = require("./routes/portfolio");
app.use("/", portfolioRoutes);

// Export app
module.exports = app;
