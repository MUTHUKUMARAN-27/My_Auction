import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  bidder: { type: String, required: true }, // Username of bidder
  bidAmount: { type: Number, required: true, min: 0 },
  timestamp: { type: Date, default: Date.now },
});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
