import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;
  console.log("Event data in PaymentSuccess:", event); // Debugging

  if (!event) {
    return <div className="payment-error">Invalid payment session.</div>;
  }

  return (
    <div className="payment-success">
      <h2>🎉 Payment Successful!</h2>
      <p>You have successfully booked a ticket for:</p>
      
      <div className="event-summary">
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.venue}</p>
      </div>

      <p className="confirmation-msg">A confirmation email has been sent to your registered email.</p>

      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default PaymentSuccess;
