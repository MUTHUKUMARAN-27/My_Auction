import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cron from "node-cron";
import Item from "./models/Item.js";
import Winner from "./models/Winner.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());
connectToDatabase();


app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);



// Runs every hour
cron.schedule("* * * * *", async () => {
  const currentTime = new Date();

  try {
    const completedItems = await Item.find({
      status: { $ne: "completed" },
      endTime: { $lte: currentTime },
      verificationStatus: "approved"
    });

    for (const item of completedItems) {
      let winnerUsername = item.currentBidder || null;

      item.status = "completed";
      item.winner = winnerUsername;
      await item.save();

      if (winnerUsername) {
        // Save to Winner collection
        const newWinner = new Winner({
          itemId: item._id,
          winnerUsername,
          itemTitle: item.title,
          winningBid: item.currentBid
        });

        await newWinner.save();

        // You can later replace this with a notification logic (email, in-app, etc.)
        console.log(`🎉 Congratulations ${winnerUsername}! You’ve won the auction for '${item.title}'!`);
      }
    }

    console.log("✅ Hourly auction check complete.");
  } catch (err) {
    console.error("Error finalizing winners:", err);
  }
});


cron.schedule("* * * * *", async () => {
    const now = new Date();
    try {
      await Item.updateMany(
        { startTime: { $lte: now }, endTime: { $gt: now }, status: { $ne: "ongoing" } },
        { $set: { status: "ongoing" } }
      );
  
      await Item.updateMany(
        { endTime: { $lte: now }, status: { $ne: "completed" } },
        { $set: { status: "completed" } }
      );
  
      console.log("Auction status updated.");
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



