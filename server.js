const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ------------------ Middleware ------------------ */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

/* ------------------ MongoDB Connection ------------------ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:");
    console.log(err.message);
  });

/* ------------------ Routes ------------------ */
/* ------------------ Routes ------------------ */
const portfolioRoutes = require("./portfolio");
app.use("/", portfolioRoutes);

/* ------------------ Server ------------------ */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
