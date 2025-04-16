import React, { useEffect, useState } from "react";
import axios from "axios";
import Itembox from "./Itembox";
import "./AdminDashboard.css"; // Make sure this file exists and is linked

export default function AdminDashboard() {
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const fetchPendingItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/items/pending");
      setPendingItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleVerification = async (itemId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/items/verify/${itemId}`, { status });
      alert(`Item ${status === "approved" ? "Approved" : "Rejected"} successfully!`);
      fetchPendingItems();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Pending Auction Approvals</h2>
      {pendingItems.length === 0 ? (
        <p className="admin-empty">No pending items found.</p>
      ) : (
        <div className="admin-item-grid">
          {pendingItems.map((item) => (
            <Itembox
              key={item._id}
              item={item}
              isAdmin={true}
              onVerify={handleVerification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
