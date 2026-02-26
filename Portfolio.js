const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  name: String,
  about: String,
  skills: [String],
  projects: [String],
  contact: String,
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
