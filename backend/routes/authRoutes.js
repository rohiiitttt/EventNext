const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  verifyOtp,       // Keep OTP routes
  resendOtp,       // Keep OTP routes
  deleteUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware"); // Import the correct function

router.post("/register", registerUser);  // working
router.post("/login", loginUser);  // should work now
router.get("/profile", protect, getUserProfile); // Fixed
router.put("/profile", protect, updateUserProfile);
router.post("/forgot-password", forgotPassword); // working
router.post("/reset-password", resetPassword); // working
router.post("/verify-otp", verifyOtp);  // Keep OTP route
router.post("/resend-otp", resendOtp);  // Keep OTP route
router.delete("/deleteUser", protect, deleteUser);  // Keep deleteUser route

module.exports = router;