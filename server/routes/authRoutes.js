import express from "express";
import User from "../models/User.js";
import Item from "../models/Item.js";
import Bid from "../models/Bid.js";
import Transaction from "../models/Transaction.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Winner from "../models/Winner.js";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

  
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });
  
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  

router.get("/items/pending", async (req, res) => {
  try {
    const pendingItems = await Item.find({ verificationStatus: "pending" });
    res.json(pendingItems);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/items/verify/:id", async (req, res) => {
  const { status } = req.body; 
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: status },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item status" });
  }
});

//all auction
router.get("/items/approved", async (req, res) => {
  try {
    const approvedItems = await Item.find({ verificationStatus: "approved" })
    res.json(approvedItems)
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})
 
// Get all users with role 'user'
router.get('/users/role/user', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
 router.get('/transaction/all', async (req, res) => {
    try {
      const transactions = await Transaction.find().populate({
        path: "itemId",
        select: "title", // Only fetch item title
      });
  
      res.json(transactions);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/winners/all", async (req, res) => {
    try {
      const winners = await Winner.find();
      res.json(winners);
    } catch (error) {
      res.status(500).json({ error: "Error fetching winners" });
    }
  });

  //my auction
  router.get("/user/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      const userItems = await Item.find({ username });
      if (userItems.length === 0) {
        return res.status(404).json({ message: "No items found for this user" });
      }
      res.status(200).json(userItems);
    } catch (error) {
      console.error("Failed to fetch user's items:", error);
      res.status(500).json({ message: "Failed to fetch user's items", error: error.message });
    }
  });
 

  //delete
  router.delete("/item/:itemId", async (req, res) => {
    const { itemId } = req.params;
  
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ message: "Item deleted successfully!", deletedItem });
    } catch (error) {
      console.error("Failed to delete item:", error);
      res.status(500).json({ message: "Failed to delete item", error: error.message });
    }
  });


 //edit
  router.get("/:itemId", async (req, res) => {
    const { itemId } = req.params;
  
    try {
      const item = await Item.findById(itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });
  
      res.status(200).json(item);
    } catch (error) {
      console.error("Failed to fetch item:", error);
      res.status(500).json({ message: "Failed to fetch item", error: error.message });
    }
  });

  router.put("/update/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(itemId, updatedData, { new: true });
  
      if (!updatedItem) return res.status(404).json({ message: "Item not found" });
  
      res.status(200).json({ message: "Item updated successfully!", updatedItem });
    } catch (error) {
      console.error("Failed to update item:", error);
      res.status(500).json({ message: "Failed to update item", error: error.message });
    }
  });


  router.post("/items/:itemId/bid", async (req, res) => {
    const { username, bidAmount } = req.body;
    const { itemId } = req.params;
  
    try {
      const item = await Item.findById(itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });
  
      const now = new Date();
      if (now < item.startTime) return res.status(400).json({ message: "Auction hasn't started yet" });
      if (now > item.endTime) return res.status(400).json({ message: "Auction has ended" });
  
      const currentBid = item.currentBid || item.startingBid || 0;
      const numericBid = Number(bidAmount);
      if (numericBid <= currentBid) {
        return res.status(400).json({ message: "Bid must be higher than current bid" });
      }
  
     
      const bidEntry = new Bid({
        itemId,
        bidder: username,
        bidAmount: numericBid,
        timestamp: new Date(), 
      });
      await bidEntry.save();
  
      
      item.bids.push({ bidder: username, bidAmount: numericBid, timestamp: new Date() }); 
      item.currentBid = numericBid;
      item.currentBidder = username;
  
      await item.save();
  
      res.status(200).json({ message: "Bid placed successfully!", item });
    } catch (error) {
      console.error("Failed to place bid:", error);
      res.status(500).json({ message: "Failed to place bid", error: error.message });
    }
  });

  router.get("/items/checkwinner", async (req, res) => {
    try {
      const { username } = req.query;
  
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
      const unpaidWonItem = await Winner.findOne({
        winnerUsername: username,
        isPaid: false,
      });
  
      if (unpaidWonItem) {
        return res.json({ won: true });
      } else {
        return res.json({ won: false });
      }
    } catch (err) {
      console.error("❌ Error checking winner status:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  });
  

  router.get("/winner/user/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      const wonItems = await Winner.find({ winnerUsername: username }).populate("itemId");
  
      if (!wonItems || wonItems.length === 0) {
        return res.status(404).json({ message: "No won items found for this user." });
      }
  
      res.status(200).json(wonItems);
    } catch (err) {
      console.error("Error fetching won items:", err);
      res.status(500).json({ message: "Server error fetching won items", error: err.message });
    }
  });


  router.post('/payments/pay', async (req, res) => {
    try {
      const { itemId, username, amount } = req.body;
      console.log("Incoming payment data:", req.body);
  
      
      const item = await Item.findById(itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });
      
     
      if (item.isPaid) return res.status(400).json({ message: "Item already paid" });
  
      
      const transaction = new Transaction({
        itemId: item._id,
        seller: item.username,
        buyer: username,
        finalPrice: amount,
        paymentStatus: "completed",
      });
      
     
      await transaction.save();
  
      
      item.isPaid = true;
      item.winner = username;
      await item.save();
  
     
      const winner = await Winner.findOneAndUpdate(
        { itemId: item._id },
        { isPaid: true },
        { new: true }
      );
  
      if (!winner) {
        await Winner.create({
          itemId: item._id,
          winnerUsername: username,
          itemTitle: item.title,
          winningBid: amount,
          isPaid: true,
        });
      }
  
      res.status(200).json({ message: "Payment successful", transaction });
    } catch (err) {
      console.error("Payment Error:", err);
      res.status(500).json({ message: "Transaction failed", error: err.message });
    }
  });
  
  router.get("/winner/user/:username/paid", async (req, res) => {
    const { username } = req.params;
  
    try {
      const paidItems = await Winner.find({ winnerUsername: username, isPaid: true }).populate("itemId");
  
      if (!paidItems || paidItems.length === 0) {
        return res.status(404).json({ message: "No paid won items found for this user." });
      }
  
      res.status(200).json(paidItems);
    } catch (err) {
      console.error("Error fetching paid won items:", err);
      res.status(500).json({ message: "Server error fetching paid won items", error: err.message });
    }
  });




  
  
  
export default router;
