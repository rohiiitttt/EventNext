import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentDone, setPaymentDone] = useState(false);

  const event = state?.event;
  const ticketCount = state?.ticketCount || 1;
  const pricePerTicket = event?.price || 0;
  const totalPrice = pricePerTicket * ticketCount;

  if (!event) {
    return <div className="payment-error">Invalid payment session.</div>;
  }

  const handlePayment = () => {
    // Simulate payment success
    setPaymentDone(true);
  };

  return (
    <div className="payment-success">
      {!paymentDone ? (
        <>
          <h2>🧾 Booking Summary</h2>
          <h3>{event.title}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.venue}</p>
          <p><strong>Tickets:</strong> {ticketCount}</p>
          <p><strong>Price per Ticket:</strong> ₹{pricePerTicket}</p>
          <h4>Total: ₹{totalPrice}</h4>
          <button onClick={handlePayment}>Pay Now</button>
        </>
      ) : (
        <>
          <h2>🎉 Payment Successful!</h2>
          <p>You have successfully booked a ticket for:</p>

          <div className="event-summary">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.venue}</p>
            <p><strong>Tickets:</strong> {ticketCount}</p>
            <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
          </div>

          <p className="confirmation-msg">A confirmation email has been sent to your registered email.</p>
          <button onClick={() => navigate("/my-bookings")}>View bookings</button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
