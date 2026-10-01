import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { BsSun, BsMoon } from 'react-icons/bs'
import { IoBagOutline } from 'react-icons/io5'
import { RiUser3Line } from 'react-icons/ri'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { to: '/products', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/research', label: 'Research' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md border-b border-surface' : ''
      }`}
      style={{ backgroundColor: scrolled ? 'color-mix(in srgb, var(--color-bg) 90%, transparent)' : 'transparent' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-black tracking-tight font-display w-35 h-35" >
              <img src="./LOGO.png" className="w-full h-full object-cover" alt="" srcset="" />
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-mono link-underline transition-colors ${
                    isActive ? 'text-accent' : 'text-muted hover:text-primary'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-surface-alt text-muted hover:text-primary"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <BsSun size={17} /> : <BsMoon size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-surface-alt text-muted hover:text-primary transition-colors">
              <IoBagOutline size={18} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--color-highlight)' }}
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-alt transition-colors"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white overflow-hidden cursor-pointer"
                    style={{ backgroundColor: 'var(--color-highlight)' }}
                  >
                    <img className='rounded-full' src={user?.avatar} alt="U" />
                  </div>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-surface bg-card shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-surface">
                        <p className="text-sm font-semibold text-primary truncate">{user?.name}</p>
                        <p className="text-xs text-muted truncate">{user?.email}</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-primary hover:bg-surface-alt transition-colors">
                        Dashboard
                      </Link>
                      <Link to="/dashboard/orders" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted hover:text-primary hover:bg-surface-alt transition-colors">
                        My Orders
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-surface-alt transition-colors border-t border-surface"
                        style={{ color: 'var(--color-highlight)' }}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-mono font-bold transition-all hover:opacity-90 text-white"
                style={{ backgroundColor: 'var(--color-highlight)' }}
              >
                <RiUser3Line size={14} />
                Login
              </Link>
            )}

            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-alt text-muted transition-colors"
            >
              {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-surface bg-card overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-mono transition-colors ${
                      isActive ? 'text-accent bg-surface-alt' : 'text-muted hover:text-primary hover:bg-surface-alt'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <Link to="/auth/login" onClick={() => setOpen(false)}
                  className="mt-2 px-3 py-2.5 rounded-lg text-sm font-mono font-bold text-center text-white"
                  style={{ backgroundColor: 'var(--color-highlight)' }}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}