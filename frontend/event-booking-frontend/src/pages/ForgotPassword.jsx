import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email address.");
    } else if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
    } else {
      // Simulate an API call for password reset
      setMessage("Password reset link sent to your email.");
      setEmail("");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Reset your password</h2>
      <p>
        Enter your email and check your inbox for instructions. Please also check your spam folder.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="send-btn">Send</button>
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
