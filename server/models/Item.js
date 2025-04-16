import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }, 
  imageUrl: { type: String },
  category: { type: String, default: "General" }, 
  startingBid: { type: Number, required: [true, "Starting bid is required!"] },
  currentBid: { type: Number, default: 0 }, 
  currentBidder: { type: String, default: null }, 
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }, 
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" }, 
  bids: [
    {
      bidder: { type: String },
      bidAmount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  verificationStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending"},
  createdAt: { type: Date, default: Date.now },

  winner: { type: String, default: null },
  isPaid: { type: Boolean, default: false },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
