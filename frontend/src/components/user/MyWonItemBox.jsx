import { useState } from "react";
import ItemDetails from "./Itemdetails";
import PaymentModal from "./PaymentModal";
import "./Itembox.css";

export default function MyWonItembox({ item }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTimeRemaining = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();

    if (now > end) return "Auction ended";

    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h`;
  };

  return (
    <>
      <div className="item-card">
        <div className="item-image-container">
          {item.imageUrl && !item.imageUrl.includes("example.com") ? (
            <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} className="item-image" />
          ) : (
            <div className="item-placeholder">
              <div className="item-placeholder-icon">📷</div>
              <span className="item-placeholder-text">{item.title}</span>
            </div>
          )}
        </div>

        <div className="item-header">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-category">Category: {item.category}</p>
        </div>

        <div className="item-content">
          <p className="item-description">{item.description}</p>
          <div className="item-details">
            <div className="detail-row">
              <span className="detail-label">Starting bid:</span>
              <span className="detail-value">{formatCurrency(item.startingBid)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Current bid:</span>
              <span className="detail-value current-bid">
                {item.currentBid > 0 ? formatCurrency(item.currentBid) : "No bids yet"}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time remaining:</span>
              <span className="detail-value">{getTimeRemaining(item.endTime)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Seller:</span>
              <span className="detail-value">{item.username}</span>
            </div>
          </div>
        </div>

        <div className="item-footer">
          <button onClick={() => setShowDetails(true)} className="view-details-button">
            View Details
          </button>

          {/* Only show Pay Now if not already paid */}
          {!item.isPaid && (
            <button className="create-auction-button mt-2" onClick={() => setShowPaymentModal(true)}>
              💳 Pay Now
            </button>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal item={item} onClose={() => setShowPaymentModal(false)} />
      )}

      {showDetails && <ItemDetails item={item} onClose={() => setShowDetails(false)} />}
    </>
  );
}
