import { useState } from "react";
import CreateEventForm from "./CreateEventForm";

const initialEvents = [
  {
    id: 1,
    title: "Spring Concert",
    date: "2025-05-01",
    location: "City Hall",
    capacity: 200,
    status: "Active",
  },
  {
    id: 2,
    title: "Art Gallery Opening",
    date: "2025-06-10",
    location: "Downtown Gallery",
    capacity: 150,
    status: "Active",
  },
  // Add more dummy events for display
];

export default function ManageEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleDelete = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const toggleCreateEventForm = () => {
    setShowCreateEvent(!showCreateEvent);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Events</h1>

      <button
        onClick={toggleCreateEventForm}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6 hover:bg-green-700"
      >
        {showCreateEvent ? "Cancel" : "Create New Event"}
      </button>

      {showCreateEvent && <CreateEventForm />}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>{event.date} | {event.location}</p>
            <p>Capacity: {event.capacity}</p>
            <p>Status: <span className="font-bold text-green-500">{event.status}</span></p>

            <div className="mt-2">
              <button
                onClick={() => alert(`Editing event ${event.id}`)} // Replace with edit logic
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
