const { Server } = require("socket.io");
const Auction = require("../models/Auction");
const Bid = require("../models/Bid");

let io;

// INIT SOCKET
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://live-auction-house.vercel.app",
      // "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinAuction", (auctionId) => {
      socket.join(auctionId);
    });

    socket.on("leaveAuction", (auctionId) => {
      socket.leave(auctionId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

const emitNewBid = async (auctionId) => {
  try {
    const auction = await Auction.findById(auctionId)
      .populate("highestBidder", "name email");

    const bids = await Bid.find({ auction: auctionId })
      .populate("bidder", "name")
      .sort({ createdAt: -1 });

    if (auction && io) {
      io.to(auctionId).emit("newBid", {
        auctionId: auction._id.toString(),
        currentPrice: auction.currentPrice,
        highestBidder: auction.highestBidder,
        endTime: auction.endTime,
        bids,
      });
    }
  } catch (error) {
    console.log("Emit New Bid Error:", error);
  }
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
  emitNewBid,
};