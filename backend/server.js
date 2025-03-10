const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes"); // Import event routes
const authRoutes = require("./routes/authRoutes");   // Import auth routes

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/events", eventRoutes);

// ✅ Auth routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Event Booking & Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
