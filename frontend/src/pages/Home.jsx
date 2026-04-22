import { useEffect } from "react";
import { useAuctionStore } from "../store/auctionStore";
import { motion } from "framer-motion";
import AuctionCard from "../components/AuctionCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { auctions, fetchAuctions, loading } = useAuctionStore();

  useEffect(() => {
    fetchAuctions();
  }, []);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-yellow-600 text-2xl">
        Loading auctions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 pt-32 pb-16 grid md:grid-cols-2 gap-12 items-center md:h-[650px]"
      >
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-6 leading-tight">
            Discover, Bid & Win <br />
            Exclusive Auctions
          </h1>
          <p className="text-[var(--color-muted)] text-lg max-w-xl mb-8">
            Join live auctions, compete with bidders worldwide, and grab premium items at unbeatable prices. Don't miss your chance ⏳
          </p>
          <Link to="/about">
            <button className="bg-[var(--color-primary)] hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl">
              Explore Now
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80"
            alt="Auction"
            className="w-full max-w-lg rounded-2xl shadow-xl object-cover"
          />
        </div>
      </motion.div>


      {/* AUCTIONS GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto md:pt-20 px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
      >
        <h1 className="text-4xl text-[var(--color-primary)] text-center font-extrabold py-10 col-span-full">View Auctions</h1>
        {auctions.length === 0 ? (
          <p className="text-center col-span-full text-[var(--color-muted)]">
            No auctions available
          </p>
        ) : (
          auctions.map((auction) => (
            <AuctionCard
              key={auction._id}
              auction={auction}
              variants={itemVariants}
            />
          ))
        )}
      </motion.div>

      {/* FEATURES SECTION */}
      <section className="bg-[var(--color-card)] py-16 px-6">
        <h1 className="text-center text-4xl text-[var(--color-primary)] font-bold mb-12">
          Why Choose Auctions?
        </h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border border-[var(--color-border)] rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Real-Time Bidding</h3>
            <p className="text-[var(--color-muted)]">
              Experience live bidding with instant updates.
            </p>
          </div>
          <div className="p-6 border border-[var(--color-border)] rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Fair Competition</h3>
            <p className="text-[var(--color-muted)]">
              Transparent bidding ensures fair pricing for everyone.
            </p>
          </div>
          <div className="p-6 border border-[var(--color-border)] rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Exciting Wins</h3>
            <p className="text-[var(--color-muted)]">
              Win premium items at the best possible price.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;