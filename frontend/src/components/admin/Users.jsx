import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css'; // Optional: style your table

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersWithRoleUser();
  }, []);

  const fetchUsersWithRoleUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/users/role/user');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <div className="user-list-container">
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
