const express = require("express");
const router = express.Router();
const multer = require("multer");
const Portfolio = require("../models/Portfolio");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", upload.single("photo"), async (req, res) => {
  const newPortfolio = new Portfolio({
    name: req.body.name,
    about: req.body.about,
    skills: req.body.skills.split(","),
    projects: req.body.projects.split(","),
    contact: req.body.contact,
    photo: req.file ? "/uploads/" + req.file.filename : null,
  });

  const saved = await newPortfolio.save();

  res.redirect(`/portfolio/${saved._id}`);
});

router.get("/portfolio/:id", async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  res.render("portfolio", { user: portfolio });
});

module.exports = router;
