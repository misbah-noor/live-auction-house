const Auction = require("../models/Auction");
const Bid = require("../models/Bid");

exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();

    const activeAuctions = await Auction.countDocuments({
      endTime: { $gt: now },
    });

    const completedAuctions = await Auction.countDocuments({
      endTime: { $lte: now },
    });

    const totalBids = await Bid.countDocuments();

    res.json({
      activeAuctions,
      completedAuctions,
      totalBids,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};