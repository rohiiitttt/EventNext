const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Enable JSON body parsing
app.use(cors()); // Enable CORS

// Simple route
app.get("/", (req, res) => {
  res.send("Event Booking & Management API is running...");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
