const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
createAuction,
getAllAuctions,
getSingleAuction, 
deleteAuction,
updateAuction
} = require("../controllers/auctionController");

const adminOnly = (req,res,next)=>{
if(req.user.role !== "admin"){
    return res.status(403).json({message:"Admin only"});
}
next();
};

router.post(
    "/create",protect,adminOnly,
    upload.array("images", 5),createAuction);

router.get("/",getAllAuctions);

router.get("/:id",getSingleAuction);
router.delete("/:id", deleteAuction);
router.put("/:id", updateAuction);

module.exports = router;