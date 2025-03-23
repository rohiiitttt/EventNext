const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ticketPrices: [
      {
        ticketType: { 
          type: String, 
          required: true, 
          enum: ["General", "VIP", "Early Bird", "Standard", "Economy"] 
        },
        price: { type: Number, required: true, min: 0 }, // 0 for free events
      },
    ],
    availableTickets: [
      {
        ticketType: { 
          type: String,
          required: true, 
          enum: ["General", "VIP", "Early Bird", "Standard", "Economy"] 
        },
        quantity: { type: Number, required: true, min: 0 }, // Number of tickets available
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
