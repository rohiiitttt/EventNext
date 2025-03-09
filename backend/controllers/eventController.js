const Event = require("../models/Event");

// ✅ Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      venue
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the event creator can update
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this event" });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.venue = req.body.venue || event.venue;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the event creator can delete
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
