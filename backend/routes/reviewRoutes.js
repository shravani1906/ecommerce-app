const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// CREATE REVIEW
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const review = await Review.create({
      name,
      message,
      rating,
    });

    res.status(201).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving review" });
  }
});

module.exports = router;
