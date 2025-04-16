import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ItemBox from "./Itembox";
import "./Userhome.css";
import { UserContext } from "../../contexts/UserContext"; // Import UserContext

export default function Userhome() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winnerMessage, setWinnerMessage] = useState(""); // New state for winner message

  const { currentUser } = useContext(UserContext); // Get currentUser from context

  useEffect(() => {
    const fetchApprovedItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/items/approved");
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching approved items:", err);
        setLoading(false);
      }
    };

    const checkWinner = async () => {
      if (currentUser) {
        try {
          console.log("🔍 Checking winner for:", currentUser);
          const res = await axios.get("http://localhost:5000/api/auth/items/checkwinner", {
            params: { username: currentUser }
          });
          console.log("✅ Winner check response:", res.data);
    
          if (res.data.won) {
            setWinnerMessage("🎉 Congratulations! You’ve won this auction!");
          }
        } catch (err) {
          console.error("❌ Error checking winner status:", err.response?.data || err.message);
        }
      }
    };
    

    if (currentUser) {
      fetchApprovedItems();
      checkWinner(); 
    }

  }, [currentUser]);

  return (
    <div className="container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to ActionMaster, {currentUser}!</h1>
        <p className="welcome-message">
          Discover unique treasures and place your bids on exceptional items. Happy bidding and may the best offer win!
        </p>
      </div>

      {/* Display Winner Message if the user has won */}
      {winnerMessage && <div className="winner-message">{winnerMessage}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>
          <h2 className="items-heading">Available Auction Items</h2>
          <div className="items-grid">
            {items.length === 0 ? (
              <p>No approved items available at the moment.</p>
            ) : (
              items.map((item) => <ItemBox key={item._id} item={item} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
