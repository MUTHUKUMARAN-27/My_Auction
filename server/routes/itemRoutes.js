import express from "express";
import Item from "../models/Item.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/add-item", upload.single("image"), async (req, res) => {
  try {
    const {
      username, title, description, price,
      category, startingBid, startTime, endTime,
    } = req.body;

    const newItem = new Item({
      username,
      title,
      description,
      price,
      category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      startingBid,
      currentBid: startingBid,
      startTime,
      endTime,
      status: "upcoming",
      verificationStatus: "pending",
      bids: [],
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Failed to add item", error: error.message });
  }
});

export default router;
