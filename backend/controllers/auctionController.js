const Auction = require("../models/Auction");

// CREATE AUCTION
exports.createAuction = async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path);

    const { title, description, startingPrice, endTime } = req.body;

    if (!endTime) {
      return res.status(400).json({ message: "End time is required" });
    }

    const auction = new Auction({
      title,
      description,
      startingPrice,
      currentPrice: startingPrice,
      startTime: new Date(), // current time
      endTime: new Date(endTime), 
      images: imageUrls,
      createdBy: req.user.id,
    });

    await auction.save();

    res.status(201).json(auction);
  } catch (error) {
    console.log("CREATE AUCTION ERROR:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};


//DELETE AUCTION
exports.deleteAuction = async (req, res) => {
  try {
    await Auction.findByIdAndDelete(req.params.id);
    res.json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};


//UPDATE Auction
exports.updateAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, endTime } = req.body;

    const updated = await Auction.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        startingPrice,
        endTime,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// GET ALL AUCTIONS
exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("highestBidder", "name");
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE AUCTION
exports.getSingleAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate("highestBidder", "name");
    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};