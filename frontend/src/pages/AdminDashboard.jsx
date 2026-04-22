import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    activeAuctions: 0,
    completedAuctions: 0,
    totalBids: 0,
  });

  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);
const [editAuction, setEditAuction] = useState(null);

const fetchAuctions = async () => {
  try {
    const res = await axios.get("/auctions");
    setAuctions(res.data);
  } catch (err) {
    console.log(err);
  }
};

fetchAuctions();

  useEffect(() => {
    const fetchStats = async () => {
      try {
       const res = await axios.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.log("Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: "Active", value: stats.activeAuctions },
    { name: "Completed", value: stats.completedAuctions },
    { name: "Bids", value: stats.totalBids },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pt-28">

      {/* HEADER */}
      <header className="px-8 py-6 border-b border-[var(--color-primary)]/40 mx-20">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Manage auctions & monitor activity
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mb-10">

          <Link to="/admin-dashboard/create-auction">
            <button className="bg-[var(--color-primary)] hover:bg-yellow-500 text-[var(--color-text)] px-6 py-3 rounded-xl font-semibold shadow-lg transition">
              ➕ Create Auction
            </button>
          </Link>

          <Link to="/home">
            <button className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-text)] px-6 py-3 rounded-xl font-semibold transition">
              🌐 View Site
            </button>
          </Link>

        </div>

        {loading ? (
          <div className="text-center text-xl text-[var(--color-primary)]">
            Loading...
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-card)] p-6 rounded-2xl shadow-lg text-[var(--color-text)]">
                <p className="text-md">Active Auctions</p>
                <h2 className="text-4xl font-bold mt-2 text-yellow-600">
                  {stats.activeAuctions}
                </h2>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-card)] p-6 rounded-2xl shadow-lg text-[var(--color-text)]">
                <p className="text-md">Total Bids</p>
                <h2 className="text-4xl font-bold mt-2 text-green-600">
                  {stats.totalBids}
                </h2>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-card)] p-6 rounded-2xl shadow-lg text-[var(--color-text)]">
                <p className="text-md">Completed Auctions</p>
                <h2 className="text-4xl font-bold mt-2 text-blue-600">
                  {stats.completedAuctions}
                </h2>
              </motion.div>

            </div>

            {/* CHART */}
            <div className="bg-[var(--color-card)] rounded-2xl p-6 shadow-lg mb-10 text-[var(--color-text)]">
              <h2 className="text-xl font-bold mb-4 text-[var(--color-primary)]">
                Auction Analytics
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#eab308"
                    fill="url(#colorValue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>


{/* Auction Table */}
  <div className="hidden lg:block bg-[var(--color-card)] rounded-2xl p-6 shadow-lg text-[var(--color-text)]">
  <h2 className="text-xl font-bold mb-4 text-[var(--color-primary)]">
    Recent Auctions
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-[var(--color-text)]">
          <th className="py-2 text-left">Title</th>
          <th>Price</th>
          <th>Status</th>
          <th>End Time</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {auctions.map((auction) => (
          <tr key={auction._id} className="border-b">

            <td className="py-2 font-semibold">{auction.title}</td>

            <td>Rs {auction.currentPrice}</td>

            <td>
              {auction.isActive ? (
                <span className="text-green-600 font-semibold">Active</span>
              ) : (
                <span className="text-red-500 font-semibold">Ended</span>
              )}
            </td>

            <td>
              {new Date(auction.endTime).toLocaleString()}
            </td>

            <td className="flex gap-2 my-4 justify-center">

              {/* EDIT */}
              <button
                onClick={() => setEditAuction(auction)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={async () => {
                  if (!confirm("Delete this auction?")) return;

                  await axios.delete(
                    `/auctions/${auction._id}`
                  );

                  setAuctions((prev) =>
                    prev.filter((a) => a._id !== auction._id)
                  );

                  toast.success("Deleted successfully");
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>

            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{editAuction && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white p-10 rounded-xl w-[400px] text-black">

      <h2 className="text-2xl font-bold text-yellow-500 mb-4">Edit Auction</h2>

      <input
        type="text"
        value={editAuction.title}
        onChange={(e) =>
          setEditAuction({ ...editAuction, title: e.target.value })
        }
        className="w-full border border-[var(--color-border)] p-2 mb-3 rounded"
      />

      <input
        type="number"
        value={editAuction.startingPrice}
        onChange={(e) =>
          setEditAuction({ ...editAuction, startingPrice: e.target.value })
        }
        className="w-full border border-[var(--color-border)] p-2 mb-3 rounded"
      />

      <input
        type="datetime-local"
        value={editAuction.endTime?.slice(0, 16)}
        onChange={(e) =>
          setEditAuction({ ...editAuction, endTime: e.target.value })
        }
        className="w-full border border-[var(--color-border)] p-2 mb-3 rounded"
      />

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setEditAuction(null)}
          className="px-4 py-2 bg-gray-400 rounded"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await axios.put(
              `/auctions/${editAuction._id}`,
              editAuction
            );

            setEditAuction(null);
            toast.success("Updated!");

            // refresh
            const res = await axios.get("/auctions");
            setAuctions(res.data);
          }}
          className="px-4 py-2 bg-yellow-500 text-black rounded"
        >
          Save
        </button>

      </div>
    </div>
  </div>
)}

            {/* SIMPLE INFO SECTION */}
            <div className="mt-20 text-center text-[var(--color-text)]">
              <p>
                Use the "Create Auction" button to add new auctions.
              </p>
            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;