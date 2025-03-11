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

// ✅ Configure CORS correctly
app.use(
  cors({
    origin: "http://localhost:5174", // Allow only your frontend
    credentials: true, // Allow cookies, tokens, etc.
  })
);

// ✅ Routes
app.use("/api/events", eventRoutes);

// ✅ Auth routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Event Booking & Management API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err); // Log detailed error in backend
  res.status(500).json({ message: "Internal Server Error" });
});
