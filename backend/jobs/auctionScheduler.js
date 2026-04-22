const cron = require("node-cron");
const Auction = require("../models/Auction");
const { getIO } = require("../socket/socket");
const { sendWinnerEmail } = require("../services/emailService");

const runAuctionScheduler = () => {
  cron.schedule("*/5 * * * * *", async () => {
    try {
      const now = new Date();

      const auctions = await Auction.find({
        endTime: { $lte: now },
        isActive: true,
      }).populate("highestBidder", "name email");

      const io = getIO();

      for (let auction of auctions) {
        auction.isActive = false;

        if (auction.highestBidder) {
          auction.winner = auction.highestBidder;

          // 📧 SEND EMAIL HERE
          await sendWinnerEmail(
            auction.highestBidder.email,
            auction
          );
        }

        await auction.save();

        console.log("Auction ended:", auction._id);

        // SOCKET EVENT
        io.to(auction._id.toString()).emit("auctionEnded", {
          auctionId: auction._id,
          winner: auction.highestBidder,
        });
      }
    } catch (err) {
      console.log("Scheduler error:", err);
    }
  });
};

module.exports = runAuctionScheduler;