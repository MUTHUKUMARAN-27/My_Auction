import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import './App.css';
import Aution from './Aution';
import Contact from './Contact';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/autions" element={<Aution />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;