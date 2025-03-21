import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name.trim()) formErrors.name = 'Full Name is required';
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
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', formData);
        alert(response.data.message);
      } catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed. Try again!');
      }
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" onChange={handleChange} placeholder="Enter your full name" />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={handleChange} placeholder="Enter your email" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange} placeholder="Enter your password" />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" onChange={handleChange} placeholder="Confirm your password" />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" onChange={handleChange}>
                <option value="">Select your role</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
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
