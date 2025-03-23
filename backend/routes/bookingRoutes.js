const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  bookEvent,
  confirmPayment,
  getMyBookings,
  cancelBooking,
  getEventBookings,
} = require("../controllers/bookingController");

const router = express.Router();

// ✅ User Routes
router.post("/book", protect, bookEvent); // Initiate booking
router.post("/confirm-payment", protect, confirmPayment); // Confirm payment
router.get("/mybookings", protect, getMyBookings); // Get user's bookings
router.delete("/cancel/:bookingId", protect, cancelBooking); // Cancel a booking

// ✅ Admin Routes
router.get("/event/:eventId/bookings", protect, isAdmin, getEventBookings); // Get all bookings for an event

module.exports = router;
