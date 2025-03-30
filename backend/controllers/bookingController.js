const Booking = require("../models/bookingModel");
const Event = require("../models/Event");

// ✅ 1️⃣ Book an Event (Initiate Booking)
exports.bookEvent = async (req, res) => {
  try {
    console.log("🔹 [START] Booking Event");

    const { eventId, ticketType, quantity } = req.body;
    const userId = req.user._id;

    console.log("📌 Request Data:", { eventId, ticketType, quantity, userId });

    // ✅ Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      console.error("❌ Event not found:", eventId);
      return res.status(404).json({ message: "Event not found" });
    }
    console.log("✅ Event found:", event._id, "Title:", event.title);

    // ✅ Check if ticket type exists in availableTickets
    const availableTicket = event.availableTickets.find(
      (ticket) => ticket.ticketType === ticketType
    );
    if (!availableTicket) {
      console.error("❌ Invalid ticket type:", ticketType);
      return res.status(400).json({ message: "Invalid ticket type" });
    }

    // ✅ Check if enough tickets are available
    if (availableTicket.quantity < quantity) {
      console.error("❌ Not enough tickets available:", {
        available: availableTicket.quantity,
        requested: quantity,
      });
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    // ✅ Find ticket price
    const ticketPriceEntry = event.ticketPrices.find(
      (ticket) => ticket.ticketType === ticketType
    );
    if (!ticketPriceEntry) {
      console.error("❌ Ticket price not found for type:", ticketType);
      return res.status(400).json({ message: "Ticket price not available" });
    }

    // ✅ Calculate total price
    const totalPrice = ticketPriceEntry.price * quantity;
    console.log("💰 Total Price Calculated:", totalPrice);

    // ✅ Create a pending booking
    const booking = new Booking({
      user: userId,
      event: eventId,
      ticketType,
      quantity,
      totalPrice,
      paymentStatus: "pending",
    });

    // ✅ Save the pending booking
    await booking.save();
    console.log("✅ Booking saved successfully:", booking._id);

    res.status(201).json({
      message: "Booking created. Complete payment to confirm.",
      booking,
    });

    console.log("🔹 [END] Booking Event");
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ 2️⃣ Confirm Payment (After Payment is Successful)
exports.confirmPayment = async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure booking is still pending
    if (booking.paymentStatus !== "pending") {
      return res.status(400).json({ message: "Booking is already processed" });
    }

    // Update booking status
    booking.paymentStatus = "success";
    booking.status = "confirmed";
    booking.paymentId = paymentId;
    booking.expiresAt = undefined; // Prevent deletion of confirmed bookings

    await booking.save();

    // Reduce available tickets
    const event = await Event.findById(booking.event);
    event.availableTickets[booking.ticketType] -= booking.quantity;
    await event.save();

    res.json({ message: "Payment confirmed. Booking successful.", booking });
  } catch (error) {
    res.status(500).json({ message: "Payment confirmation failed", error: error.message });
  }
};

// ✅ 3️⃣ Get User's Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event", "name date location")
      .select("-expiresAt");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// ✅ 4️⃣ Cancel a Booking (Only If Not Used)
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure user owns the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to cancel this booking" });
    }

    // Ensure the ticket hasn't been used
    if (booking.status === "confirmed" && booking.used) {
      return res.status(400).json({ message: "Cannot cancel a used booking" });
    }

    // Increase available tickets
    const event = await Event.findById(booking.event);
    event.availableTickets[booking.ticketType] += booking.quantity;
    await event.save();

    // Delete booking
    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ 5️⃣ Admin Fetches All Bookings for an Event
exports.getEventBookings = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch bookings
    const bookings = await Booking.find({ event: eventId })
      .populate("user", "name email")
      .select("-expiresAt");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// ✅ 6️⃣ Get Ticket Sales Summary (For Dashboard)
exports.getTicketSales = async (req, res) => {
  try {
    const salesData = await Booking.aggregate([
      {
        $match: { paymentStatus: "success" }, // Only count successful bookings
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }, // Sum of all successful payments
          totalTickets: { $sum: "$quantity" }, // Total tickets sold
        },
      },
    ]);

    const result = salesData.length > 0 ? salesData[0] : { totalRevenue: 0, totalTickets: 0 };

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching ticket sales:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
