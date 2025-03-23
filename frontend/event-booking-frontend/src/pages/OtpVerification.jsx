import { useState } from "react";
import { verifyOtp, resendOtp } from "../api";
import "../Styles/OtpVerification.css";  // ✅ Correct path


const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);

  const handleVerifyOtp = async () => {
    try {
      const data = await verifyOtp(email, otp);
      setMessage(data.message);
      setError("");
      setShowResend(false);
    } catch (err) {
      setError(err.message);
      if (err.allowResend) {
        setShowResend(true);
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendOtp(email);
      setMessage(data.message);
      setError("");
      setShowResend(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <p className="otp-instruction">Enter the OTP sent to your email.</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="otp-input"
      />
      <button onClick={handleVerifyOtp} className="otp-button">
        Verify OTP
      </button>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {showResend && (
        <button onClick={handleResendOtp} className="resend-button">
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OtpVerification;
