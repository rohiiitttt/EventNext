const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔹 Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

  // ✅ Register User
  exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      console.log("Received Data:", req.body);

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create New User
      const newUser = await User.create({ name, email, password, role: role || "user" }); // 👈 Default role
      console.log("🟢 New user created:", newUser); // ✅ Log created user

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id),
        role: newUser.role,
      });
    } catch (error) {
      console.error("Server Error:", error); // ✅ Log exact error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    console.log("Received Login Request: ", req.body); // Debug request body

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Finding user with email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found!");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password); // ✅ CORRECT

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);
    console.log("Password Match Result:", isPasswordValid);
    


    if (isPasswordValid) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      console.log("Password incorrect!");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error: ", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete User (Protected Route)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extract ID from JWT token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: userId });

    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    // Extract token from the Authorization header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;

    // Fetch user from database, excluding password field
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "User profile fetched successfully",
      data: user 
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    res.status(500).json({ 
      success: false, 
      message: "Internal server error", 
      error: error.message 
    });
  }
};


// ✅ Update User Profile (Protected Route)
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Forgot Password (Send Reset Link)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate Reset Token (Dummy for Now)
    const resetToken = generateToken(user._id);

    res.json({ message: "Reset link sent to email", resetToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Reset Password

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Verify the token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token", error: error.message });
  }
};
