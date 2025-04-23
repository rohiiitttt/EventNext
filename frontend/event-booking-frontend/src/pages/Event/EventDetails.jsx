import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import events from "./EventsData";
import "../styles/EventDetails.css";


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Example way to check login state (replace with actual state management)
  const isLoggedIn = !!localStorage.getItem("token"); // Example: Check login status from local storage

  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div className="event-details-error">Event not found</div>;
  }

  const handleBooking = () => {
    if (!isLoggedIn) {
      // ✅ Redirect to login page if not logged in
      navigate("/login");
    } else {
      // ✅ Redirect to payment page if logged in
      navigate(`/payment/${id}`);
    }
  };

  return (
    <div>
      {/* Blurred Background */}
      <div
        className="event-background"
        style={{ backgroundImage: `url(${event.image})` }}
      />

      {/* Event Details */}
      <div className="event-details">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-info">📅 Date: {event.date}</p>
        <p className="event-info">📍 Venue: {event.location}</p>
        <p className="event-info">👤 Organizer: {event.organizer || "N/A"}</p>
        <p className="event-description">
          {event.description || "No description available."}
        </p>
        <button className="book-ticket-btn" onClick={handleBooking}>
          Book My Ticket
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
