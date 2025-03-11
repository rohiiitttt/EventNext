import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added `useNavigate` for redirection
import { registerUser } from "../services/api"; // ✅ Imported API function to handle registration
import "./styles/Register.css";

const Register = () => {
  const navigate = useNavigate(); // ✅ Initialized `useNavigate` for redirection
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => { // ✅ Made `handleSubmit` async to handle API call
    e.preventDefault();
    const { fullName, email, password, confirmPassword, role } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(password)) {
      setMessage("Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    try {
      console.log("🟢 Sending API Request:", { name: fullName, email, password, role }); // ✅ Log API request data

    const response = await registerUser({ name: fullName, email, password, role });
    console.log("🟢 Received API Response:", response); // ✅ Log API response

      // ✅ Check if `_id` exists in the response instead of `response.success`
    if (response._id) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000); // ✅ Redirects user after successful registration
      } else {
        setMessage(response.message || "Registration failed."); // ✅ Handled API error response
      }
    } catch (error) {
      setMessage("Error registering. Please try again."); // ✅ Added error handling for API call
    }
  };

  return (
    <div className="register">
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <div className="dropdown-container">
          <label htmlFor="role">Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} id="role" required>
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>

      <p className="create-account-link">
        Already a member? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
