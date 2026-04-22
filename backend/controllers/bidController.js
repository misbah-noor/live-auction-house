const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Auction = require("../models/Auction");
const { emitNewBid } = require("../socket/socket");

exports.placeBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { auctionId, amount } = req.body;

    const auction = await Auction.findById(auctionId).session(session);

    if (!auction) {
      throw new Error("Auction not found");
    }

    const now = new Date();

    if (now > auction.endTime) {
      throw new Error("Auction ended");
    }

    if (amount <= auction.currentPrice) {
      throw new Error("Bid too low");
    }

    // SNIPER LOGIC FIX
    const timeLeft = auction.endTime.getTime() - now.getTime();

    if (timeLeft <= 30000) {
      auction.endTime = new Date(now.getTime() + 30000);
    }

    const bid = await Bid.create([{
      auction: auctionId,
      bidder: req.user.id,
      amount
    }], { session });

    auction.currentPrice = amount;
    auction.highestBidder = req.user.id;

    await auction.save({ session });

    await session.commitTransaction();
    session.endSession();

    // EMIT AFTER COMMIT
    await emitNewBid(auctionId);

    res.json({
      message: "Bid placed successfully",
      bid: bid[0]
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: error.message || "Transaction failed"
    });
  }
};