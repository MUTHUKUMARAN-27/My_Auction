import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyItembox from "./MyItembox"
import "./MyAuctions.css";
import axios from "axios";

export default function MyAuctions() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");

  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth//user/${currentUser}`); 
        const filtered = response.data.filter((item) => item.username === currentUser);
        setUserItems(filtered);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [currentUser]);

  const handleEdit = (itemId) => {
    navigate(`/edit-auction/${itemId}`);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this auction?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/item/${itemId}`);
        setUserItems(userItems.filter((item) => item._id !== itemId));
      } catch (err) {
        console.error("Failed to delete item:", err);
      }
    }
  };

  return (
    <div className="my-auctions-container">
      <div className="my-auctions-header">
        <h1 className="my-auctions-title">My Auctions</h1>
        <p className="my-auctions-subtitle">Manage all the items you've posted for auction</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : userItems.length === 0 ? (
        <div className="no-auctions">
          <div className="no-auctions-icon">📦</div>
          <p className="no-auctions-message">You haven't posted any auctions yet.</p>
          <button className="create-auction-button" onClick={() => navigate("/autions/sell")}>
            Create Your First Auction
          </button>
        </div>
      ) : (
        <>
          <div className="auctions-count">
            You have {userItems.length} {userItems.length === 1 ? "auction" : "auctions"}
          </div>

          <div className="auctions-grid">
            {userItems.map((item) => (
              <div key={item._id} className="auction-card">
                <MyItembox item={item} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
