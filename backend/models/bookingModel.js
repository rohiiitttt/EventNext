const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketType: {
      type: String,
      required: true,
      enum: ["General", "VIP", "Early Bird", "Standard", "Economy"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      default: null, // Transaction ID from the payment gateway
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed", "canceled"],
      default: "pending",
    },
    cancellationReason: {
      type: String,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 10 * 60 * 1000); // Expires after 10 minutes
      },
      index: { expires: "10m" }, // MongoDB auto-deletes after 10 min
    },
    used: {
      type: Boolean,
      default: false, // Marks if the ticket is used at the event
    },
  },
  { timestamps: true }
);

// ✅ Remove `expiresAt` if booking is confirmed
bookingSchema.pre("save", function (next) {
  if (this.status === "confirmed") {
    this.expiresAt = undefined; // Prevent deletion of confirmed bookings
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
