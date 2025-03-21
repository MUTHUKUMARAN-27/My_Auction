import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

export default function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">ActionMaster</div>
        <div className="nav-links">
          <a href="#products">Products</a>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>   
          <Link to="/login" className="btn-secondary">Sign in</Link> 
          <Link to="/register" className="btn-primary">Register</Link> 
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>Welcome to ActionMaster</h1>
          <p>The ultimate platform for online auctions with role-based management</p>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Bidding</h3>
              <p>Our platform ensures safe and transparent bidding processes for all users</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Easy Listing</h3>
              <p>Sellers can quickly list their items with our user-friendly interface</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Auctions</h3>
              <p>Experience the thrill of live bidding with our real-time auction system</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

