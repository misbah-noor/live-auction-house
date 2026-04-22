import { create } from "zustand";
import axios from "../api/axios";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,

  loading: false,
  error: null,

  // CLEAR ERROR
  clearError: () => set({ error: null }),

  // REGISTER
  register: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("/auth/register", data);

      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Registration failed",
      });
    } finally {
      set({ loading: false });
    }
  },

  // LOGIN
  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("/auth/login", data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
      });

      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
      });
    } finally {
      set({ loading: false });
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
}));