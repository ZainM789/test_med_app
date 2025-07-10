const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  doctorName: { type: String, required: true },
  rating: { type: Number, required: true },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
