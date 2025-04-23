import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Import login API function
import "./styles/Login.css";
import { Eye, EyeOff } from "lucide-react"; // ✅ For showing/hiding password icon

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      console.log("🟢 Sending Login Request:", formData);
      const response = await loginUser(formData);
      console.log("🟢 Login Response:", response);

      if (response.token) {
        localStorage.setItem("authToken", response.token); // ✅ Store token
        console.log(localStorage.getItem("authToken"));
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000); // Redirect after login
      } else {
        setMessage(response.message || "Login failed.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setMessage(error.response?.data?.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>} {/* ✅ Display messages */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        {/* ✅ Password Input with Show/Hide Toggle */}
        <div className="password-container">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    className="password-input"
  />
  <button
    type="button"
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>



        <button type="submit">Login</button>
      </form>

      <Link to="/forgot-password" className="forgot-password-link">
        Forgot Password?
      </Link>
      <p className="create-account-link">
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
