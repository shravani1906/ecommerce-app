import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Flame,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { items } = useSelector((state) => state.cart);
  const cartCount = items.reduce((t, i) => t + i.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully ✨");
    navigate("/login");
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname + location.search === path;

  // ❌ close on ESC
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <nav className="bg-card text-text sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <Flame className="w-7 h-7" />
            Wick & Weave
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/shop"
              className={
                isActive("/shop") ? "text-primary" : "hover:text-primary"
              }
            >
              All
            </Link>

            <Link
              to="/shop?category=candles"
              className={
                location.search.includes("candles")
                  ? "text-primary"
                  : "hover:text-primary"
              }
            >
              Candles
            </Link>

            <Link
              to="/shop?category=crochet"
              className={
                location.search.includes("crochet")
                  ? "text-primary"
                  : "hover:text-primary"
              }
            >
              Crochet
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {token && user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>{user.name?.split(" ")[0]}</span>
                </Link>

                <button onClick={handleLogout}>
                  <LogOut className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-primary text-white px-4 py-2 rounded-xl"
              >
                Login
              </Link>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-card shadow-xl p-6 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setMobileOpen(false)}>
              <X />
            </button>
          </div>

          {/* links */}
          <div className="flex flex-col gap-3 text-base">
            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              All Products
            </Link>

            <Link
              to="/shop?category=candles"
              onClick={() => setMobileOpen(false)}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Candles
            </Link>

            <Link
              to="/shop?category=crochet"
              onClick={() => setMobileOpen(false)}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Crochet
            </Link>

            <hr className="my-3 border-gray-200 dark:border-gray-700" />

            {!token ? (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="p-3 bg-primary text-white rounded-xl text-center"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="p-3 text-red-500 text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
