import React from 'react';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  return (
    <main className="content">
      <h1>Welcome, {username}!</h1>
      <p>Your auction journey starts here!</p>
    </main>
  );
};

export default Dashboard;