import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyAuctions.css"; // Reuse existing styles
import MyItembox from "./MyWonItemBox"; // Same card

export default function MyWons() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");

  const [paidItems, setPaidItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaidItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/winner/user/${currentUser}/paid`);
        setPaidItems(response.data);
      } catch (error) {
        console.error("Error fetching paid won items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaidItems();
  }, [currentUser]);

  return (
    <div className="my-auctions-container">
      <div className="my-auctions-header">
        <h1 className="my-auctions-title">🏆 My Paid Auctions</h1>
        <p className="my-auctions-subtitle">These items are all yours!</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : paidItems.length === 0 ? (
        <div className="no-auctions">
          <div className="no-auctions-icon">📦</div>
          <p className="no-auctions-message">You haven’t completed payment for any items yet.</p>
        </div>
      ) : (
        <>
          <div className="auctions-count">
            You’ve successfully won and paid for {paidItems.length} {paidItems.length === 1 ? "item" : "items"} 🎉
          </div>

          <div className="auctions-grid">
            {paidItems.map((item) => (
              <div key={item._id} className="auction-card">
                <MyItembox item={item.itemId} showActions={false} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
