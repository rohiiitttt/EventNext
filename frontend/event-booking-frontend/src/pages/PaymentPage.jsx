import { useState } from "react";
import "./styles/PaymentPage.css";


const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    // TODO: Backend integration ke time API call yahan add krenge
    console.log("Processing payment...");
  };

  return (
    <div className="payment-container">
      <h2>Secure Payment</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9101 1121"
            required
          />
        </div>
        <div>
          <label>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="***"
            required
          />
        </div>
        <div>
          <label>Cardholder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
