import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import "./styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
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
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">EventNext</Link>
      <ul className="nav-links">
        <li className="user-menu" ref={menuRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)} className="menu-btn">
            ☰
          </button>

          {/* Dropdown menu with 'open' class for animation */}
          <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            ) : (
              <>
                <Link to="/user-profile" onClick={() => setMenuOpen(false)}>View Profile</Link>
                <Link to="/edit-profile" onClick={() => setMenuOpen(false)}>Edit Profile</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
              </>
            )}
          </div>
        </li>

        <li>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <MdLightMode size={24} color="yellow" />
            ) : (
              <MdDarkMode size={24} color="black" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;