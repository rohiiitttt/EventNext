const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  verifyOtp,
  resendOtp,
  deleteUser
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware"); // Import the correct function

router.post("/register", registerUser);  // working
router.post("/login", loginUser);  // should work now
router.get("/profile", protect, getUserProfile); // Fixed
router.put("/profile", protect, updateUserProfile);
router.post("/forgot-password", forgotPassword); // working
router.post("/reset-password", resetPassword); // working
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.delete("/deleteUser", protect, deleteUser);

module.exports = router;
