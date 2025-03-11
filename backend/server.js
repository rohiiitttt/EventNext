require("dotenv").config(); // ✅ Already loaded here

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ Configure CORS correctly
// ✅ Configure CORS correctly
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ✅ Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Event Booking & Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
