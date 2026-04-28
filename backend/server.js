require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

//Routes
const authRoutes = require("./routes/authRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const bidRoutes = require("./routes/bidRoutes");
const adminRoutes = require("./routes/adminRoutes");


//Socket 
const { initSocket } = require("./socket/socket");

const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//Middleware
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/auctions",auctionRoutes);
app.use("/api/bids",bidRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/",(req,res)=>{
    res.send("Live Auction Backend Running")
});

// Create http server
const server = http.createServer(app);

//Initialize Socket.io
initSocket(server);

//Background Job
const runAuctionScheduler = require("./jobs/auctionScheduler");
runAuctionScheduler();

//server running
const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});