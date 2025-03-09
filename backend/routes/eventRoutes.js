const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController.js");

// ✅ Routes (Without Authentication)
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);  // Removed authMiddleware
router.put("/:id", updateEvent);  // Removed authMiddleware
router.delete("/:id", deleteEvent);  // Removed authMiddleware

module.exports = router;
