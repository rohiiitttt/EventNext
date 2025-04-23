import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyBookings.css'; // ✅ Import CSS

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/bookings/mybookings', config);
        setBookings(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bookings');
      } finally {
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
