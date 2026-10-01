import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiArrowRight } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { paymentAPI } from '../api/services'
import { Button, EmptyState } from '../components/common/UI'

// Platform fee in percent, set in .env as VITE_PLATFORM_FEE_PERCENT (falls back to 4).
const parsedFee = Number(import.meta.env.VITE_PLATFORM_FEE_PERCENT)
const PLATFORM_FEE_PERCENT = Number.isFinite(parsedFee) && parsedFee >= 0 ? parsedFee : 4

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)

  // Fee is rounded to 2 decimals (paise), then added to the cart total.
  const subtotal = Number(total) || 0
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PERCENT) / 100
  const grandTotal = Number((subtotal + platformFee).toFixed(2))

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to checkout')
      navigate('/auth')
      return
    }
    setProcessing(true)
    try {
      // Create order for all cart items
      const productIds = cart.map(i => i._id)
      const res = await paymentAPI.createOrder({
        productIds,
        subtotal,
        platformFee,
        total: grandTotal, // final amount the customer pays
      })
      // Integrate Razorpay SDK here with res.data.order
      toast.success('Redirecting to payment...')
    } catch (err) {
      toast.error('Failed to initiate payment')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-black font-display text-primary mb-8">
        Cart <span className="text-muted text-lg font-normal font-mono">({cart.length})</span>
      </h1>

      {cart.length === 0 ? (
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add some projects to get started."
          action={<Link to="/products"><Button>Browse Projects</Button></Link>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-3">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4 p-4 bg-card border border-surface rounded-2xl"
                >
                  <Link to={`/products/${item._id}`} className="w-16 h-16 rounded-xl overflow-hidden bg-surface-alt flex-shrink-0">
                    {item.imageUrl
                      ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-surface-alt" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item._id}`} className="block">
                      <p className="font-bold text-primary text-sm hover:text-accent transition-colors line-clamp-1">{item.name}</p>
                    </Link>
                    <p className="text-xs text-muted mt-0.5">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-accent">₹{item.price}</span>
                    <button onClick={() => removeFromCart(item._id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-surface-alt transition-colors">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-card border border-surface rounded-2xl p-6 space-y-4">
              <h3 className="font-bold font-display text-primary text-base">Order summary</h3>
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between gap-3 text-sm">
                    <span className="text-muted truncate">{item.name}</span>
                    <span className="text-primary font-mono">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-surface space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-primary font-mono">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Platform fee ({PLATFORM_FEE_PERCENT}%)</span>
                  <span className="text-primary font-mono">₹{platformFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface flex justify-between font-bold text-primary">
                <span className="font-display">Total</span>
                <span className="font-mono text-accent text-lg">₹{grandTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout} loading={processing}>
                Checkout <FiArrowRight size={14} />
              </Button>
              <button onClick={clearCart} className="w-full text-xs font-mono text-muted hover:text-red-400 transition-colors">
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}