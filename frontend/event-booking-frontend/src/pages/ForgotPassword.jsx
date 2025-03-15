import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/api"; // Import the API function
import "./styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(email); // Call the API function

      if (response.status === 200) {
        setMessage(response.data.message); // Backend sends "Reset link sent to email"
      } else {
        setMessage(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send reset link. Try again later.");
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Reset your password</h2>
      <p>Enter your email and check your inbox for instructions. Please also check your spam folder.</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="send-btn" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <p className="login-redirect">
        Already a member?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
