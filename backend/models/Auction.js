const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    startingPrice:{
        type:Number,
        required:true
    },

    currentPrice:{
        type:Number
    },

    highestBidder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    images:[
        {
            type:String
        }
    ],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    startTime:{
        type:Date,
        default:Date.now
    },

    endTime:{
        type:Date,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    },

    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }

},
{timestamps:true}
);

module.exports = mongoose.model("Auction",auctionSchema);