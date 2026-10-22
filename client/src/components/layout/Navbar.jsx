import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { BsSun, BsMoon } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Projects" },
  { to: "/oss", label: "Oss" },
  { to: "/research", label: "Research" },
];

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md border-b border-surface shadow-sm" : ""
      }`}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-bg) 85%, transparent)"
          : "transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-alt text-muted transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-mono font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-surface-alt text-muted hover:text-primary"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isDark ? <BsSun size={18} /> : <BsMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-surface-alt text-muted hover:text-primary transition-colors"
            >
              <IoBagOutline size={19} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white font-mono"
                  style={{ backgroundColor: "var(--color-highlight)" }}
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {/* User State */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-alt transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white overflow-hidden"
                    style={{ backgroundColor: "var(--color-highlight)" }}
                  >
                    {user?.avatar ? (
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={user?.avatar}
                        alt="User"
                      />
                    ) : (
                      user?.name?.[0] || "U"
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-surface bg-card shadow-xl overflow-hidden font-mono text-xs"
                    >
                      <div className="px-3.5 py-2.5 border-b border-surface">
                        <p className="font-semibold text-primary truncate text-sm">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-3.5 py-2 text-muted hover:text-primary hover:bg-surface-alt transition-colors text-xs"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-3.5 py-2 text-muted hover:text-primary hover:bg-surface-alt transition-colors text-xs"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3.5 py-2 border-t border-surface hover:bg-surface-alt transition-colors text-xs"
                        style={{ color: "var(--color-highlight)" }}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-highlight)" }}
              >
                <RiUser3Line size={14} />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-surface bg-card overflow-hidden"
          >
            <div className="px-4 py-3.5 flex flex-col gap-1.5 font-mono text-sm">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-accent bg-surface-alt"
                        : "text-muted hover:text-primary hover:bg-surface-alt"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-3 py-2.5 rounded-lg font-semibold text-center text-white"
                  style={{ backgroundColor: "var(--color-highlight)" }}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
