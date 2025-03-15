// Function to generate a 6-digit OTP
exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
  };
  
  // Function to verify OTP (Optional: If using expiry time, implement additional logic)
  exports.verifyOTP = (userOtp, storedOtp) => {
    return userOtp === storedOtp;
  };
  