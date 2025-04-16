import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionTable.css'; // optional
   
      const TransactionTable = () => {
        const [transactions, setTransactions] = useState([]);
      
        useEffect(() => {
          const fetchTransactions = async () => {
            try {
              const res = await axios.get('http://localhost:5000/api/auth/transaction/all');
              setTransactions(res.data);
            } catch (err) {
              console.error("Error fetching transactions:", err);
            }
          };
      
          fetchTransactions();
        }, []);
      
        return (
          <div className="transaction-table-container">
            <h2>All Transactions</h2>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Seller</th>
                  <th>Buyer</th>
                  <th>Final Price</th>
                  <th>Payment Status</th>
                  <th>Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id}>
                    <td>{txn.itemId?.title || "Item not found"}</td>
                    <td>{txn.seller}</td>
                    <td>{txn.buyer}</td>
                    <td>₹{txn.finalPrice}</td>
                    <td>{txn.paymentStatus}</td>
                    <td>{new Date(txn.transactionDate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };
      
      export default TransactionTable;
      