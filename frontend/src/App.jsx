import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

// pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuctionDetail from "./pages/AuctionDetail";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAuction from "./pages/CreateAuction";
import About from "./pages/About";

function App() {
  const user = useAuthStore((state) => state.user);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if(localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);
  
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
   localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <>
    <ToastContainer position="bottom-right" />

    {
      location.pathname !== "/" &&
     (<Navbar darkMode={darkMode} toggleTheme={toggleTheme} />)
    }
     

      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />

          <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/admin-dashboard" : "/home"}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/about" element={<About />} />

        <Route path="/auctions/:id" element={<AuctionDetail />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/admin-dashboard/create-auction" element={<CreateAuction />} />
        </Route>

      </Routes>

      {
        location.pathname !== "/" &&
        location.pathname !== "/login" &&
        (<Footer />)
      }
    </>
  );
};

export default App;