const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Booking = require('../models/bookingModel');

const router = express.Router();

router.get('/mybookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

module.exports = router;
