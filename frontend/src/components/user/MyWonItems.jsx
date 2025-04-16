import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyAuctions.css"; // reuse same styling
import MyItembox from "./MyWonItemBox"; // reuse item card if suitable

export default function MyWonItems() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");

  const [wonItems, setWonItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWonItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/winner/user/${currentUser}`);
        const unpaidItems = response.data.filter((item) => !item.isPaid);
        setWonItems(unpaidItems);
      } catch (error) {
        console.error("Error fetching won items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWonItems();
  }, [currentUser]);

  return (
    <div className="my-auctions-container">
      <div className="my-auctions-header">
        <h1 className="my-auctions-title">My Won Auctions</h1>
        <p className="my-auctions-subtitle">Pay and complete your winning bids</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : wonItems.length === 0 ? (
        <div className="no-auctions">
          <div className="no-auctions-icon">🥇</div>
          <p className="no-auctions-message">You haven't won any unpaid auctions yet.</p>
        </div>
      ) : (
        <>
          <div className="auctions-count">
            You have {wonItems.length} unpaid {wonItems.length === 1 ? "win" : "wins"}
          </div>

          <div className="auctions-grid">
            {wonItems.map((item) => (
              <div key={item._id} className="auction-card">
                <MyItembox item={item.itemId}  showActions={false} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
