import React from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* ✅ Forgot Password Link */}
      <Link to="/forgot-password" className="forgot-password-link">
        Forgot Password?
      </Link>

      {/* ✅ Added Create Account Link */}
      <p className="create-account-link">
        Don't have an account? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
