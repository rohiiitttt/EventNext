const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController.js");
const { protect, checkRole, checkEventPermissions } = require("../middleware/authMiddleware");

// ✅ Public Routes (Anyone can view events)
router.get("/", getAllEvents); //done
router.get("/:id", getEventById);//done

// ✅ Private Routes (Only authenticated users)
router.post("/", protect, createEvent); //done

// ✅ Only Admins OR Event Creators can update/delete events
router.put("/:id", protect, checkEventPermissions, updateEvent);
router.delete("/:id", protect, checkEventPermissions, deleteEvent);

module.exports = router;
