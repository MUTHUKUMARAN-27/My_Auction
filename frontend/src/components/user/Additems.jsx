import React, { useState } from "react";
import axios from "axios";
import "./Additems.css"; 

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    description: "",
    price: "",
    startingBid: "",
    category: "General",
    startTime: "",
    endTime: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (image) {
      data.append("image", image);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/items/add-item", data);
      alert("Item added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error uploading item:", err);
      alert("Failed to add item");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add New Auction Item</h2>
      <p className="subheading">Fill in the details below to create a new auction item</p>

      <label>Username *</label>
      <input type="text" name="username" value={formData.username} onChange={handleChange} required />

      <label>Title *</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Description *</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      <div className="two-columns">
        <div>
          <label>Price ($) *</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Starting Bid ($) *</label>
          <input type="number" name="startingBid" value={formData.startingBid} onChange={handleChange} required />
        </div>
      </div>

      <label>Item Image</label>
      <div className="upload-box" onClick={() => document.getElementById("fileInput").click()}>
        <img src="https://www.svgrepo.com/show/50441/camera.svg" alt="camera" />
        <p><span className="upload-link">Click to upload</span> or drag and drop</p>
        <small>PNG, JPG, GIF up to 10MB</small>
        <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} hidden />
      </div>

      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="General">General</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Art">Art</option>
      </select>

      <div className="two-columns">
        <div>
          <label>Start Time *</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div>
          <label>End Time *</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </div>
      </div>

      <label>Status</label>
      <input type="text" value="Upcoming" disabled className="readonly" />
      <small className="note">(Default for new items)</small>

      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
