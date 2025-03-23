import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <nav className="navbar">
      <Link to="/" className="logo">EventNext</Link>
      <ul className="nav-links">
        <li className="user-menu" ref={menuRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)} className="menu-btn">
            ☰
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              {!user ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              ) : (
                <>
                  <Link to="/user-profile">View Profile</Link>
                  <Link to="/edit-profile">Edit Profile</Link>
                  <button onClick={logout}>Logout</button>
                </>
              )}
            </div>
          )}
        </li>

        <li>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
            {darkMode ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
