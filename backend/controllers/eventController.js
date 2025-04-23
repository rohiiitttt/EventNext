const Event = require("../models/Event");

// ✅ Get all events (No authentication required)
exports.getAllEvents = async (req, res) => {
  try {
    const { search, startDate, endDate, minPrice, maxPrice, category, sortBy, order, page = 1, limit = 10 } = req.query;
    let query = {};

    // 🔍 Search by event title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 📅 Filter by date range
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    // 🎟️ Filter by ticket price range
    if (minPrice && maxPrice) {
      query["ticketPrices.price"] = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query["ticketPrices.price"] = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query["ticketPrices.price"] = { $lte: parseFloat(maxPrice) };
    }

    // 🏷️ Filter by category
    if (category) {
      query.category = category;
    }

    // 📌 Sorting logic (default: sort by newest events)
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    } else {
      sortOptions.date = -1; // Default: newest events first
    }

    // 🛠 Pagination (default: 10 events per page)
    const skip = (page - 1) * limit;

    // Get total matching events count
    const totalEvents = await Event.countDocuments(query);

    // Fetch events from MongoDB
    const events = await Event.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Return response with total count
    res.json({
      total: totalEvents,
      page: parseInt(page),
      limit: parseInt(limit),
      events,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Get a single event by ID (No authentication required)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Create a new event (Requires authentication)
exports.createEvent = async (req, res) => {
  try {
    console.log("🔹 [START] Creating Event");

    const { title, description, venue, ticketPrices, availableTickets } = req.body;
    const userId = req.user.id; // Ensure user is authenticated
    const date = new Date(req.body.date); // Convert input to Date object

    console.log("📌 Request Data:", { title, description, date, venue, ticketPrices, availableTickets, userId });

    // ✅ Validate ticketPrices format
    if (!Array.isArray(ticketPrices) || ticketPrices.some(tp => !tp.ticketType || tp.price == null)) {
      console.error("❌ Invalid ticketPrices format:", ticketPrices);
      return res.status(400).json({ message: "Invalid ticketPrices format" });
    }

    // ✅ Create new event
    const newEvent = new Event({
      title,
      description,
      date, // Stored as Date object
      venue,
      ticketPrices,
      availableTickets,
      createdBy: userId,
    });

    // ✅ Save event to DB
    await newEvent.save();
    console.log("✅ Event created successfully:", newEvent._id);

    res.status(201).json({
      message: "Event created successfully",
      event: {
        ...newEvent._doc,
        date: newEvent.date.toISOString().replace("T", " ").slice(0, 16) // Format response
      },
    });

    console.log("🔹 [END] Creating Event");
  } catch (error) {
    console.error("❌ Server error while creating event:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Update an event (Only event creator can update)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    
    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.venue = req.body.venue || event.venue;

    // Update ticket prices if provided
    if (req.body.ticketPrices) {
      if (!Array.isArray(req.body.ticketPrices) || req.body.ticketPrices.some(tp => !tp.type || tp.price == null)) {
        return res.status(400).json({ message: "Invalid ticketPrices format" });
      }
      event.ticketPrices = req.body.ticketPrices;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete an event (Only event creator can delete)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
