import { useEffect, useState } from 'react';
import '../styles/MyBookings.css'; // ✅ Import CSS

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an API call with dummy data
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Dummy bookings data
        const dummyData = [
          {
            _id: '1',
            event: {
              title: 'Coding Bootcamp',
              date: '2025-12-15',
              location: 'London Tech Park',
            },
            createdAt: '2025-04-10',
          },
          


          {
            _id: '2',
            event: {
              title: 'Festival B',
              date: '2025-06-10',
              location: 'Venue B',
            },
            createdAt: '2025-04-12',
          },
        ];
        
        // Simulate a delay
        setTimeout(() => {
          setBookings(dummyData);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-container">
      <h1 className="my-bookings-title">My Bookings</h1>

      {loading && <p>Loading your bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p>No bookings found. Start booking now!</p>
      )}

      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <h2 className="booking-title">{booking.event.title}</h2>
            <p className="booking-info">Date: {new Date(booking.event.date).toLocaleDateString()}</p>
            <p className="booking-info">Location: {booking.event.location}</p>
            <p className="booking-info">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
