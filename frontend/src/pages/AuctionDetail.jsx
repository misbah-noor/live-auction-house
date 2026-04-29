import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuctionStore } from "../store/auctionStore";
import { useAuthStore } from "../store/authStore";
import socket from "../socket/socket";
import { toast } from "react-toastify";

const AuctionDetail = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { singleAuction, getAuctionById, placeBid } = useAuctionStore();

  const [bidAmount, setBidAmount] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [highestBidder, setHighestBidder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [bids, setBids] = useState([]);

  // Fetch
  useEffect(() => {
    if (id) getAuctionById(id);
  }, [id]);

  // Init
  useEffect(() => {
    if (singleAuction) {
      setActiveImage(singleAuction.images?.[0] || "");
      setCurrentPrice(singleAuction.currentPrice);
      setHighestBidder(singleAuction.highestBidder);
      setBids(singleAuction.bids || []);

      setEndTime(new Date(singleAuction.endTime).getTime());
    }
  }, [singleAuction]);

  // Timer
  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const diff = endTime - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  // Socket
  useEffect(() => {
    if (!id) return;

    socket.emit("joinAuction", id);

    socket.on("newBid", (data) => {
      if (data.auctionId.toString() === id) {
        setCurrentPrice(data.currentPrice);
        setHighestBidder(data.highestBidder);
        setBids(data.bids || []);

        if (data.endTime) {
          const newEnd = new Date(data.endTime).getTime();

          setEndTime((prev) => {
            if (prev && newEnd > prev) {
              toast.info("⏳ Auction extended!");
            }
            return newEnd;
          });
        }
      }
    });

    socket.on("auctionEnded", (data) => {
      if (data.auctionId.toString() === id) {
        setTimeLeft(0);
        toast.success("Auction Ended!");
        if (data.winner) toast.info(`Winner: ${data.winner.name}`);
      }
    });

    return () => {
      socket.emit("leaveAuction", id);
      socket.off("newBid");
      socket.off("auctionEnded");
    };
  }, [id]);

  const handlePlaceBid = async () => {
    if (timeLeft <= 0) return toast.error("Auction ended");

    if (!bidAmount || Number(bidAmount) <= currentPrice)
      return toast.error("Bid must be higher");

    const res = await placeBid({
      auctionId: id,
      amount: Number(bidAmount),
    });

    if (!res) return toast.error("Bid failed");

    toast.success("Bid placed!");
    setBidAmount("");
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00:00";

    const total = Math.floor(ms / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  if (!singleAuction) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-yellow-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen me-2 overflow-x-hidden px-6 pt-36 pb-18 text-[var(--color-text)]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[var(--color-primary)] mb-4">
          Let's Start Bidding!
        </h1>
        <p className="text-[var(--color-muted)] text-lg md:text-xl max-w-3xl mx-auto">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure expedita consectetur, adipisci aut itaque fugit, recusandae nesciunt saepe voluptas qui ducimus ut sint!
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT - IMAGE */}
        <div className="space-y-4">
          <img
            src={activeImage}
            className="rounded-2xl shadow-xl md:w-full w-[320px] h-[300px] md:h-[350px] object-cover"
          />

          <div className="flex gap-2 flex-wrap">
            {singleAuction.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`md:w-16 md:h-16 h-12 w-12 rounded cursor-pointer border transition hover:scale-105 ${
                  activeImage === img ? "border-yellow-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* CENTER - DETAILS */}
        <div className="bg-[var(--color-card)] w-[300px] md:w-full p-4 rounded-2xl shadow-lg">

          <p className="text-xs text-green-500 mb-2">
            🔴 LIVE AUCTION
          </p>

          <h1 className="text-3xl font-extrabold text-[var(--color-primary)] mb-3">
            {singleAuction.title}
          </h1>

          <p className="text-gray-400 mb-5">
            {singleAuction.description}
          </p>

          {/* PRICE */}
          <div className="bg-[var(--color-bg)] p-4 rounded-xl mb-4">
            <p className="text-md text-gray-400">Current Bid</p>
            <h2 className="text-4xl font-extrabold text-[var(--color-primary)]">
              Rs {currentPrice}
            </h2>
          </div>

          {/* LEADER */}
          {highestBidder?.name && (
            <div className="mb-4">
              <p className="text-lg text-gray-400">Leading Bidder</p>
              <p className="text-green-500 font-semibold">
                🏆 {highestBidder.name}
              </p>

              {highestBidder?._id === user?._id && (
                <p className="text-sm text-green-400 mt-1">
                  ✅ You are winning!
                </p>
              )}
            </div>
          )}

          {/* TIMER */}
          <div className="mb-5">
            <p className="text-sm text-gray-400">Time Left</p>
            <h2
              className={`text-3xl font-bold ${
                timeLeft <= 0
                  ? "text-red-500"
                  : timeLeft <= 30000
                  ? "text-yellow-400 animate-pulse"
                  : "text-gray-400"
              }`}
            >
              {timeLeft <= 0 ? "Auction Ended" : formatTime(timeLeft)}
            </h2>

            {timeLeft <= 30000 && timeLeft > 0 && (
              <p className="text-xs text-red-400 mt-1 animate-bounce">
                ⚠ Hurry! Auction ending soon
              </p>
            )}
          </div>

          {/* BID BOX */}
          <div className="flex md:gap-3">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter bid..."
              className="md:flex-1 md:px-4 md:py-3 px-2 py-1 rounded bg-gray-100 text-black outline-none"
            />

            <button
              onClick={handlePlaceBid}
              disabled={timeLeft <= 0}
              className="bg-yellow-600 hover:bg-yellow-700 active:scale-95 transition text-white md:px-6 px-3 md:py-3 py-1 rounded-lg font-bold shadow-md disabled:bg-gray-500"
            >
              {timeLeft <= 0 ? "Ended" : "Bid Now"}
            </button>
          </div>
        </div>

        {/* RIGHT - LIVE BIDS */}
        <div className="bg-[var(--color-card)] p-6 me-2 w-[300px] md:w-full rounded-2xl shadow-lg">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[var(--color-primary)]">
              Live Bids
            </h2>
            <span className="text-sm text-green-400">🔄 Live</span>
          </div>

          <div className="max-h-[400px] overflow-y-auto">

            {bids.length === 0 ? (
              <p className="text-gray-400">No bids yet</p> 
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th>#</th>
                    <th>Bidder</th>
                    <th>Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {bids.map((bid, index) => (
                    <tr
                      key={bid._id}
                      className={`border-b transition ${
                        index === 0
                          ? "bg-yellow-500/20 text-[var(--color-primary)] font-bold"
                          : "hover:bg-white/5 text-gray-400"
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>{bid.bidder?.name || "User"}</td>
                      <td>Rs {bid.amount}</td>
                      <td>{new Date(bid.createdAt).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuctionDetail;