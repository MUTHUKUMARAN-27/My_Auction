import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username.trim()) formErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Invalid email format';
    }
    if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) {
      formErrors.role = 'Please select a role';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData, 
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Registration successful:", response.data);
      setSuccessMessage('Registration successful! You can now log in.');
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }
  };
  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="logo">ActionMaster</div>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="btn-secondary">Sign in</button>
          <Link to="/" className="btn-primary">Home</Link>
        </div>
      </nav>
      <main>
        <div className="register-container">
          <h1>Register</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" value={formData.role} onChange={handleChange}>
                <option value="">Select your role</option>
                <option value="user">User</option>
              </select>
              {errors.role && <p className="error">{errors.role}</p>}
            </div>
            <button type="submit" className="register-btn">Register</button>
          </form>
          <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </main>
    </div>
  );
};

export default Register;
