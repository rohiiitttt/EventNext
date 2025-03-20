import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [user, setUser] = useState(() => localStorage.getItem("authToken") || null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for menu dropdown

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        EventNext
      </Link>
      <ul className="nav-links">
        {user ? (
          <li className="user-menu" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="menu-btn">
              ☰
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <Link to="/user-profile">View Profile</Link>
                <Link to="/edit-profile">Edit Profile</Link>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDeleteAccount} className="delete-btn">
                  Delete Account
                </button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        <li>
          <button className="toggle-btn" onClick={toggleTheme}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
