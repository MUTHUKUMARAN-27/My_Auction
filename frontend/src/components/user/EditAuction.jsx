import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Additems.css"; 

const EditAuction = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

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
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch item on mount
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/${itemId}`);
        const {
          username,
          title,
          description,
          price,
          startingBid,
          category,
          startTime,
          endTime,
          imageUrl,
        } = res.data;

        setFormData({
          username,
          title,
          description,
          price,
          startingBid,
          category,
          startTime: new Date(startTime).toISOString().slice(0, 16),
          endTime: new Date(endTime).toISOString().slice(0, 16),
        });

        setPreviewImage(`http://localhost:5000${imageUrl}`);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load item.");
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
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
      await axios.put(`http://localhost:5000/api/auth/update/${itemId}`, data);
      alert("Auction updated!");
      navigate("/autions/myauction");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update auction");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Edit Auction Item</h2>
      <p className="subheading">Update the details of your auction item below</p>

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
        {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: "100%", marginBottom: "10px" }} />}
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
      <input type="text" value="Editing..." disabled className="readonly" />
      <small className="note">(Status remains the same unless handled separately)</small>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditAuction;
