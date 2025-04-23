import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css"; // optional, for styling

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!event) {
    return <div className="payment-error">Event not found</div>;
  }

  const handlePayNow = () => {
    setIsProcessing(true);

    // Fake payment delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Auto-redirect after success
      setTimeout(() => {
        navigate("/mybookings");
      }, 2000); // 2s delay before redirect
    }, 1500); // Simulated payment processing time
  };

  return (
    <div className="payment-page">
      <h2>Confirm Your Payment</h2>

      <div className="event-summary-card">
        <img src={event.image} alt={event.title} />
        <h3>{event.title}</h3>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Organizer: {event.organizer || "N/A"}</p>
        <p className="price">Price: ₹499</p> {/* 👈 Temporary static price */}
      </div>

      <button className="pay-now-btn" onClick={handlePayNow} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      {paymentSuccess && (
        <div className="popup success">
          🎉 Payment Successful! Redirecting to your bookings...
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
