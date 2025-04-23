import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getAllEvents } from "../../services/api"; // Import API function
import "../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]); // Stores events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents(); // API call
        console.log("Fetched events response:", response); // Debugging

        // Ensure response is correctly formatted
        if (response?.events && Array.isArray(response.events)) {
          setEvents(response.events);
        } else if (Array.isArray(response)) {
          setEvents(response); // If API directly returns an array
        } else {
          console.error("Unexpected response format:", response);
          setError("Unexpected response format");
          setEvents([]);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to fetch events. Please try again.");
        setEvents([]);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEvents();
  }, []); // Runs only on mount

  return (
    <div className="events-page">
      <h2>Explore Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event._id || event.id} event={event} />)
          ) : (
            <p>No events available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
