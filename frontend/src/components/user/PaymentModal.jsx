import "./Itemdetails.css"; // Reuse same styles
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function PaymentModal({ item, onClose }) {
  const { currentUser } = useContext(UserContext);

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handlePayment = async () => {
    try {
      const confirmPay = window.confirm("Are you sure you want to pay?");
      if (!confirmPay) return;

     
      const response = await fetch("http://localhost:5000/api/auth/payments/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item._id,
          username: currentUser,
          amount: item.currentBid,
        }),
      });

      const data = await response.json();
      alert("✅ Payment successful!");
      onClose();
    } catch (err) {
      console.error("Payment failed", err);
      alert("❌ Payment failed.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="item-details">
          <div className="item-image-container">
            {item.imageUrl ? (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.title}
                className="item-image"
              />
            ) : (
              <div className="item-placeholder">
                <div className="item-placeholder-icon">📦</div>
                <span>{item.title}</span>
              </div>
            )}
          </div>

          <div className="item-content">
            <h2 className="item-title">Pay for: {item.title}</h2>
            <p className="item-category">Category: {item.category}</p>

            <div className="item-details-grid">
              <div className="detail-item">
                <span className="detail-label">Seller</span>
                <span className="detail-value">{item.username}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Final Bid</span>
                <span className="detail-value">{formatCurrency(item.currentBid)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value">Pending Payment</span>
              </div>
            </div>

            <div className="bid-button-row" style={{ marginTop: "20px" }}>
              <button className="bid-now-button" onClick={handlePayment}>
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
