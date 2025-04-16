import React from "react";
import "./Itembox.css";

export default function Itembox({ item, isAdmin, onVerify }) {
    console.log("Image URL:", item.imageUrl);

  const formatBid = (value) => `$${parseFloat(value || 0).toFixed(2)}`;

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
    <div className="item-box">
     
      <div className="item-image-container">
        {item.imageUrl ? (
          <img src={`http://localhost:5000${item.imageUrl}`} alt={item.title} className="item-image" />
        ) : (
          <div className="item-no-image">📷</div>
        )}
      </div>

      <div className="item-body">
        <h3 className="item-title">{item.title}</h3>

        <p><span className="detail-label">Category:</span> <span className="detail-value">{item.category}</span></p>
        <p className="item-description">{item.description}</p>

        <p><span className="detail-label">Starting bid:</span> <span className="detail-value">{formatBid(item.startingBid)}</span></p>
        <p><span className="detail-label">Current bid:</span> <span className="current-bid">{formatBid(item.currentBid)}</span></p>
        <p><span className="detail-label">Time remaining:</span> <span className="detail-value">{getTimeRemaining(item.endTime)}</span></p>
        <p><span className="detail-label">Seller:</span> <span className="item-seller">{item.username}</span></p>
      </div>

      {isAdmin ? (
        <div className="admin-buttons">
          <button className="approve-button" onClick={() => onVerify(item._id, "approved")}>Approve</button>
          <button className="reject-button" onClick={() => onVerify(item._id, "rejected")}>Reject</button>
        </div>
      ) : (
        <div className="item-footer">
          <button className="details-button">View Details</button>
        </div>
      )}
    </div>
  );
}
