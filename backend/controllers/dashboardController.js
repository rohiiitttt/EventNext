const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Event = require("../models/Event");

exports.getDashboardData = async (req, res) => {
  try {
    // Total Revenue
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: "success" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // Total Tickets Sold
    const totalTickets = await Booking.aggregate([
      { $match: { paymentStatus: "success" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]);

    // Sales Data by Date
    const salesData = await Booking.aggregate([
      { $match: { paymentStatus: "success" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Most Popular Events
    const topEvents = await Booking.aggregate([
      { $match: { paymentStatus: "success" } },
      { $group: { _id: "$event", ticketsSold: { $sum: "$quantity" } } },
      { $sort: { ticketsSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "eventDetails"
        }
      },
      { $unwind: "$eventDetails" } // Ensure eventDetails is an object, not an array
    ]);

    // Upcoming Events
    const upcomingEvents = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(5);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalTickets: totalTickets[0]?.total || 0,
      salesData: salesData.map((item) => ({
        date: item._id,
        revenue: item.revenue
      })),
      topEvents: topEvents.map((item) => ({
        _id: item._id,
        name: item.eventDetails?.title || "Unknown Event", // Fix field name
        ticketsSold: item.ticketsSold
      })),
      upcomingEvents: upcomingEvents.map((event) => ({
        _id: event._id,
        name: event.title, // Fix field name
        date: event.date.toISOString().split("T")[0]
      }))
    });

    console.log("Dashboard Data:", {
      totalRevenue: totalRevenue[0]?.total || 0,
      totalTickets: totalTickets[0]?.total || 0,
      salesData: salesData.map((item) => ({
        date: item._id,
        revenue: item.revenue
      })),
      topEvents: topEvents.map((item) => ({
        _id: item._id,
        name: item.eventDetails?.title || "Unknown Event", // Fix field name
        ticketsSold: item.ticketsSold
      })),
      upcomingEvents: upcomingEvents.map((event) => ({
        _id: event._id,
        name: event.title, // Fix field name
        date: event.date.toISOString().split("T")[0]
      }))
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
