const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create a new review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all reviews for a doctor
router.get('/:doctorName', async (req, res) => {
  try {
    const reviews = await Review.find({ doctorName: req.params.doctorName });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
