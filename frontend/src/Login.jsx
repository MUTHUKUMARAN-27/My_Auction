import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
     
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="login-page">
      <nav className="navbar">
        <div className="logo">ActionMaster</div>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/" className="btn-secondary">Home</Link> 
          <button className="btn-primary">Register</button>
        </div>
      </nav>
      <main>
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </form>
          <a href="/forgot-password" className="forgot-password">
            Forgot password?
          </a>
        </div>
      </main>
    </div>
  );
};

export default Login;
