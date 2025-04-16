import { useState, useEffect } from "react";
import axios from "axios";
import ItemBox from "../user/Itembox";
import "../user/Userhome.css";

export default function ApprovedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

    fetchApprovedItems();
  }, []);

  return (
    <div className="container">
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


