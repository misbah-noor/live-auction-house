import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = ({ darkMode, toggleTheme }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 bg-[var(--color-card)] border-b border-[var(--color-border)] px-3 md:px-24 py-5 flex justify-between items-center shadow-sm">

      {/* LOGO */}
      <Link to="/home" className="text-xl md:text-2xl font-bold text-[var(--color-primary)]">
        AuctionX
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-1 md:gap-6">

        {/* USER INFO */}
        {user && (
          <span className="text-md text-[var(--color-muted)]">
            {user.name}
          </span>
        )}

        {/* DARK MODE TOGGLE */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg)] transition"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* AUTH BUTTON */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] font-semibold text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-1 rounded-lg"
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;