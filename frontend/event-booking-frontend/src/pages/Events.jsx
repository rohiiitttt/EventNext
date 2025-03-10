import React from "react";
import EventCard from "./EventCard"; // Import EventCard component
import events from "./EventsData"; // ✅ Import from separate file
import "./styles/Events.css";

const Events = () => {
  return (
    <div className="events-page">
      <h2>Explore Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} /> // ✅ EventCard should work now
        ))}
      </div>
    </div>
  );
};

export default Events; // ✅ Export the component only
