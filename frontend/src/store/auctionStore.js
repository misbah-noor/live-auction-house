import { create } from "zustand";
import axios from "../api/axios";

export const useAuctionStore = create((set) => ({
  auctions: [],
  singleAuction: null,
  loading: false,
  error: null,

  fetchAuctions: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/auctions");
      set({ auctions: res.data });
    } catch (error) {
      set({ error: "Failed to fetch auctions" });
    } finally {
      set({ loading: false });
    }
  },

  getAuctionById: async (id) => {
    try {
      set({ loading: true });
      const res = await axios.get(`/auctions/${id}`);
      set({ singleAuction: res.data });
    } catch (error) {
      console.log("Fetch Auction Error", error);
      set({ singleAuction: null, error: "Failed to fetch auction" });
    } finally {
      set({ loading: false });
    }
  },

  createAuction: async (data) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("token");

      const res = await axios.post("/auctions/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Create failed",
      });
      return null;
    } finally {
      set({ loading: false });
    }
  },

 placeBid: async (data) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post("/bids/place", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: res.data }; 
  } catch (error) {
    console.log("BID ERROR:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Bid failed",
    };
  }
}

}));