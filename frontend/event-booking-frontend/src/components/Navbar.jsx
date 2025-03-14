import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to homepage after logout
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        EventNext
      </Link>
      <ul className="nav-links">
        {user ? (
          <>
            {/* If logged in, show user profile and logout */}
            <li className="user-profile">
              <span>👤 {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* If not logged in, show login and register */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {/* Dark/Light mode toggle */}
        <li>
          <button className="toggle-btn" onClick={toggleTheme}>
            {darkMode ? '♘' : '♞'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
