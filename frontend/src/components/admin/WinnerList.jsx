import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WinnerList.css"; 
const WinnerList = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/winners/all");
        setWinners(res.data);
      } catch (error) {
        console.error("Failed to fetch winners:", error);
      }
    };

    fetchWinners();
  }, []);

  return (
    <div className="winner-table-container">
      <h2>All Auction Winners</h2>
      <table className="winner-table">
        <thead>
          <tr>
            <th>Item Title</th>
            <th>Winner Username</th>
            <th>Winning Bid (₹)</th>
            <th>Won At</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => (
            <tr key={winner._id}>
              <td>{winner.itemTitle}</td>
              <td>{winner.winnerUsername}</td>
              <td>{winner.winningBid}</td>
              <td>{new Date(winner.wonAt).toLocaleString()}</td>
              <td>{winner.isPaid ? "Paid" : "Not Paid"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinnerList
