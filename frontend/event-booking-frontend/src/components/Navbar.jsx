import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [user, setUser] = useState(() => localStorage.getItem("authToken"));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for menu dropdown

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleTheme = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/";
  }, []);

  const handleDeleteAccount = useCallback(() => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/";
    }
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        EventNext
      </Link>
      <ul className="nav-links">
        {user ? (
          <li className="user-menu" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="menu-btn"
              aria-label="User Menu"
            >
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
          <button className="toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {darkMode ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
