
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Plan, Discover & Book Events</h1>
        <p>Find the best events around you and make unforgettable memories.</p>
        
        {/* Use Link to redirect to /events */}
        <Link to="/Events">
          <button className="explore-btn">Explore Events</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
