import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails"; // ✅ Make sure this is imported
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword"; // ✅ Import ForgotPassword
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const toggleTheme = () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <main style={{ minHeight: "80vh", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} /> {/* ✅ Route for details */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Forgot Password Route */}
            <Route path="/user-profile" element={<UserProfile />} /> {/* ✅ Forgot Password Route */}

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
