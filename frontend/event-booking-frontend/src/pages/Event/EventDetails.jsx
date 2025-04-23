import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // 👈 Get passed-in state
  const event = state?.event; // 👈 Access event from state

  const isLoggedIn = !!localStorage.getItem("authToken");

  if (!event) {
    return <div className="event-details-error">Event not found</div>;
  }

  const handleBooking = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/payment/${id}`, { state: { event } });
    // 👈 Pass event to payment page
    }
  };

  return (
    <div>
      <div
        className="event-background"
        style={{ backgroundImage: `url(${event.image})` }}
      />

      <div className="event-details">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-info">📅 Date: {event.date}</p>
        <p className="event-info">📍 Venue: {event.venue}</p>
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
