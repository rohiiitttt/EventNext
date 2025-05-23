const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Event = require("../models/Event");

// ✅ Middleware to protect routes (Authentication)
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// ✅ Middleware to check roles (Authorization)
exports.checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied: You do not have permission" });
    }
    next();
  };
};

// ✅ Middleware to check if user is event creator or admin
exports.checkEventPermissions = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event Data:", event);
console.log("Event Creator:", event.createdBy);
console.log("User ID:", req.user._id);

    // Ensure event.creator exists before calling `.toString()`
    if (!event.createdBy) {
      return res.status(500).json({ message: "Event creator is missing in database" });
    }

    // Convert both IDs to strings before comparison
    if (req.user.role === "admin" || req.user._id.toString() === event.createdBy.toString()) {
      return next();
    }

    res.status(403).json({ message: "Access Denied: Not authorized" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
      next();
  } else {
      res.status(403).json({ message: "Access Denied: Admins only" });
  }
};
