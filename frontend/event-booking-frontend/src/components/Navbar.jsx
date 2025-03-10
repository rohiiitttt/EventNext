import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
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

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        EventNext
      </Link>
      <ul className="nav-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        {/* Toggle button */}
        <li>
          <button className="toggle-btn" onClick={toggleTheme}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
