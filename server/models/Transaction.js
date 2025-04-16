import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  seller: { type: String, required: true },  // Seller username
  buyer: { type: String, required: true },   // Buyer username
  finalPrice: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
