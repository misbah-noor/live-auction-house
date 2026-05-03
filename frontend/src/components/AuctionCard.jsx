import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction, variants }) => {
  return (
    <motion.div variants={variants}>
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 w-[280px] flex-wrap flex flex-col hover:shadow-xl transition duration-300">

        {/* IMAGE */}
        <div className="h-50 w-full bg-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          {auction.images && auction.images.length > 0 ? (
            <img
              src={auction.images[0]}
              alt={auction.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-500">No Image</span>
          )}
        </div >

        {/* TITLE */}
        <h2 className="text-lg font-bold mb-2">{auction.title}</h2>

        {/* PRICE */}
        <p className="text-yellow-600 font-semibold mb-2">
          Current Bid: Rs {auction.currentPrice}
        </p>

        {/* END TIME */}
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Ends At: {new Date(auction.endTime).toLocaleString()}
        </p>

        {/* BUTTON */}
        <Link to={`/auctions/${auction._id}`}>
          <button className="w-full bg-[var(--color-primary)] hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition">
            Bid Now
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default AuctionCard;