import { useNavigate } from "react-router-dom";
import "./styles/ConfirmationPage.css";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmed! 🎉</h2>
      <p>Your booking has been confirmed successfully.</p>
      <p>Check your email for more details.</p>
      <button
        onClick={() => navigate("/my-bookings")}
        aria-label="View My Bookings"
      >
        View My Bookings
      </button>
    </div>
  );
};

export default BookingConfirmation;
