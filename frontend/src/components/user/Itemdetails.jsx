import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Itemdetails.css";
import { UserContext } from "../../contexts/UserContext";

export default function Itemdetails({ item, onClose }) {
  const [bidAmount, setBidAmount] = useState(
    item.currentBid > 0 ? item.currentBid + 1 : item.startingBid || 1
  );
  const [currentItem, setCurrentItem] = useState(item);
  const [loading, setLoading] = useState(false);
  const [showBidInput, setShowBidInput] = useState(false);


  const { currentUser } = useContext(UserContext);

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTimeRemaining = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();

    if (now > end) return "Auction ended";

    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const handlePlaceBid = async () => {
    if (!currentUser) {
      alert("You must be logged in to place a bid.");
      return;
    }

    if (bidAmount <= (currentItem.currentBid || currentItem.startingBid || 0)) {
      alert("Your bid must be higher than the current bid!");
      return;
    }

    const confirmBid = window.confirm(
      `Are you sure you want to place a bid of $${bidAmount}?`
    );
    if (!confirmBid) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/items/${currentItem._id}/bid`,
        {
          username: currentUser,
          bidAmount,
        }
      );

      alert("Bid placed successfully!");
      const updatedItem = response.data.item;
      setCurrentItem(updatedItem);
      setBidAmount(updatedItem.currentBid + 1);
    } catch (error) {
      console.error("Bid failed:", error);
      alert(error.response?.data?.message || "Failed to place bid.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="item-details">
          <div className="item-image-container">
            {currentItem.imageUrl && !currentItem.imageUrl.includes("example.com") ? (
              <img
                src={`http://localhost:5000${currentItem.imageUrl}`}
                alt={currentItem.title}
                className="item-image"
              />
            ) : (
              <div className="item-placeholder">
                <div className="item-placeholder-icon">📷</div>
                <span>{currentItem.title}</span>
              </div>
            )}
            <div className="item-status">
              {currentItem.status?.charAt(0).toUpperCase() +
                currentItem.status?.slice(1)}
            </div>
          </div>

          <div className="item-content">
            <div className="item-header">
              <h2 className="item-title">{currentItem.title}</h2>
              <p className="item-category">Category: {currentItem.category}</p>
            </div>

            <div className="item-description">
              <p>{currentItem.description}</p>
            </div>

            <div className="item-details-grid">
              <div className="detail-item">
                <span className="detail-label">Seller</span>
                <span className="detail-value">{currentItem.username}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price</span>
                <span className="detail-value">{formatCurrency(currentItem.price)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Starting Bid</span>
                <span className="detail-value">
                  {formatCurrency(currentItem.startingBid)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Bid</span>
                <span className="detail-value">
                  {currentItem.currentBid > 0
                    ? formatCurrency(currentItem.currentBid)
                    : "No bids yet"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Bidder</span>
                <span className="detail-value">
                  {currentItem.currentBidder || "None yet"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time Remaining</span>
                <span className="detail-value">
                  {getTimeRemaining(currentItem.endTime)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Start Time</span>
                <span className="detail-value">
                  {formatDate(currentItem.startTime)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">End Time</span>
                <span className="detail-value">
                  {formatDate(currentItem.endTime)}
                </span>
              </div>
            </div>

            <div className="bid-history-title">Bid History</div>
{currentItem.bids && currentItem.bids.length > 0 ? (
  <div className="bid-history">
    {currentItem.bids
      .slice(-3) // gets the last 3 bids
      .reverse() // to show the latest one on top
      .map((bid, index) => (
        <div key={index} className="bid-record">
          {bid.bidder} bid {formatCurrency(bid.bidAmount)} at{" "}
          {formatDate(bid.timestamp)}
        </div>
      ))}
  </div>
) : (
  <p className="no-bids">No bids have been placed yet.</p>
)}
          </div>

          <div className="bid-section">
          {currentItem.status === "ongoing" ? (
  <div className="bid-section">
    {!showBidInput ? (
      <button
        className="bid-now-button"
        onClick={() => setShowBidInput(true)}
      >
        Bid Now
      </button>
    ) : (
      <>
        <div className="bid-label">Enter Your Bid</div>
        <div className="bid-input-row">
          <input
            type="number"
            min={
              currentItem.currentBid > 0
                ? currentItem.currentBid + 1
                : currentItem.startingBid
            }
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="bid-input"
            disabled={loading}
          />
        </div>
        <div className="bid-button-row">
          <button
            className="bid-now-button"
            onClick={handlePlaceBid}
            disabled={loading}
          >
            {loading ? "PLACING BID..." : "PLACE BID"}
          </button>
        </div>
      </>
    )}
  </div>
) : (
  <div className="bid-section">
    <p className="bid-closed-message">
      {currentItem.status === "upcoming"
        ? "Bidding has not started yet."
        : "This auction has ended."}
    </p>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
}
