import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { login, register, loading, error, user, clearError } = useAuthStore();
  const navigate = useNavigate();

  // Clear error when switching form
  useEffect(() => {
    clearError();
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    if (isLogin) {
  res = await login({ email: form.email, password: form.password });

  if (!res) return;

  const loggedUser = res.user;

  const hasLoggedInBefore = localStorage.getItem(`hasLoggedIn_${loggedUser.email}`);

  if (!hasLoggedInBefore) {
    toast.success(`Welcome ${loggedUser.name}! 🎉`);
    localStorage.setItem(`hasLoggedIn_${loggedUser.email}`, "true");
  } else {
    toast.success(`Welcome back ${loggedUser.name}! 👋`);
  }
} else {
      res = await register(form);

      if (!res) return;

      toast.success(`Account created! Please login.`);
      setIsLogin(true);
      return;
    }

    // SAFE NAVIGATION
    const loggedUser = res.user;

    if (loggedUser?.role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-bg)] text-white px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-card)] border border-[var(--color-border)] p-8 rounded-2xl w-full max-w-sm shadow-xl"
      >
        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* NAME */}
        {!isLogin && (
          <div className="flex items-center bg-[var(--color-bg)] text-[var(--color-text)] rounded-lg px-4 py-1 mb-3">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 bg-transparent outline-none placeholder:text-[var(--color-muted)]"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="flex items-center bg-[var(--color-bg)] text-[var(--color-text)] rounded-lg px-4 py-1 mb-3">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 bg-transparent outline-none placeholder:text-[var(--color-muted)]"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center bg-[var(--color-bg)] text-[var(--color-text)] rounded-lg px-4 py-1 mb-4">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-transparent outline-none placeholder:text-[var(--color-muted)]"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] w-full py-3 font-bold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          {loading
            ? isLogin
              ? "Logging in..."
              : "Creating account..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </motion.button>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-center text-sm mt-3">
            {error}
          </p>
        )}

        {/* TOGGLE */}
        <p className="text-center text-gray-400 mt-4">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[var(--color-primary)] font-semibold underline ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

      </form>
    </div>
  );
};

export default Login;