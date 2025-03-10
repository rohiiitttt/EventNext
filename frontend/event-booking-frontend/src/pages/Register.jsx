import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Register.css";

const Register = () => {
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

  const handleSubmit = (e) => {
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
      setMessage(
        "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    // Simulate registration process
    setMessage(`Registered as ${role} successfully!`);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });
  };

  return (
    <div className="register">
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="dropdown-container">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            id="role"
            required
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>

      {/* ✅ Added Already a Member Link */}
      <p className="create-account-link">
        Already a member? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
