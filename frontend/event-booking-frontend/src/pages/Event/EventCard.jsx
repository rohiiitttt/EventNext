import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/EventCard.css";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`, { state: { event } }); // 👈 send event as state
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-overlay">
        <div className="event-details">
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
