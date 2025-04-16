import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  winnerUsername: { type: String, required: true },
  itemTitle: { type: String, required: true },
  winningBid: { type: Number, required: true },
  wonAt: { type: Date, default: Date.now },
  isPaid: { type: Boolean, default: false }
});

const Winner = mongoose.model("Winner", winnerSchema);
export default Winner;
