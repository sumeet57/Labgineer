import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiArrowRight,
  FiX,
  FiMail,
  FiMessageCircle,
  FiInfo,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button, EmptyState } from "../components/common/Ui";

// Platform fee in percent, set in .env as VITE_PLATFORM_FEE_PERCENT (falls back to 4).
const parsedFee = Number(import.meta.env.VITE_PLATFORM_FEE_PERCENT);
const PLATFORM_FEE_PERCENT =
  Number.isFinite(parsedFee) && parsedFee >= 0 ? parsedFee : 4;

const PHONE_NUMBER = "919321635813";
const EMAIL_ADDRESS = "enquiry@labgineer.com";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Fee calculation
  const subtotal = Number(total) || 0;
  const platformFee = Math.round(subtotal * PLATFORM_FEE_PERCENT) / 100;
  const grandTotal = Number((subtotal + platformFee).toFixed(2));

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      toast.info("Please login to checkout");
      navigate("/auth");
      return;
    }
    setShowCheckoutModal(true);
  };

  // Generate standardized order message summary
  const getOrderSummaryText = () => {
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (ID: ${item._id}) - ₹${item.price}`,
      )
      .join("\n");

    return `Hello Labgineer Team,\n\nI would like to place an order for the following project(s):\n\n${itemsList}\n\nSubtotal: ₹${subtotal.toFixed(2)}\nPlatform Fee (${PLATFORM_FEE_PERCENT}%): ₹${platformFee.toFixed(2)}\nGrand Total: ₹${grandTotal.toFixed(2)}\n\nPlease assist me with the manual payment and order processing.`;
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(getOrderSummaryText());
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmailOrder = () => {
    const subject = encodeURIComponent(
      `Order Enquiry - ${cart.length} Project(s)`,
    );
    const body = encodeURIComponent(getOrderSummaryText());
    const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-black font-display text-primary mb-6 sm:mb-8">
        Cart{" "}
        <span className="text-muted text-base font-normal font-mono">
          ({cart.length})
        </span>
      </h1>

      {cart.length === 0 ? (
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add some projects to get started."
          action={
            <Link to="/products">
              <Button>Browse Projects</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-3">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-surface rounded-xl sm:rounded-2xl"
                >
                  <Link
                    to={`/products/${item._id}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-surface-alt flex-shrink-0"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-alt" />
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item._id}`} className="block">
                      <p className="font-bold text-primary text-xs sm:text-sm hover:text-accent transition-colors line-clamp-1">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-[11px] sm:text-xs text-muted mt-0.5 capitalize">
                      {item.category}
                    </p>
                    <p className="text-[10px] font-mono text-muted/70 truncate">
                      ID: {item._id}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="font-mono font-bold text-accent text-xs sm:text-sm">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1.5 rounded-lg text-muted hover:text-red-400 hover:bg-surface-alt transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="sticky top-20 sm:top-24 bg-card border border-surface rounded-xl sm:rounded-2xl p-5 sm:p-6 space-y-4">
              <h2 className="font-bold font-display text-primary text-sm sm:text-base">
                Order Summary
              </h2>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 text-xs">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between gap-2">
                    <span className="text-muted truncate">{item.name}</span>
                    <span className="text-primary font-mono flex-shrink-0">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-surface space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-primary font-mono">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    Platform Fee ({PLATFORM_FEE_PERCENT}%)
                  </span>
                  <span className="text-primary font-mono">
                    ₹{platformFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface flex justify-between font-bold text-primary text-sm sm:text-base">
                <span className="font-display">Total</span>
                <span className="font-mono text-accent text-base sm:text-lg">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              <Button
                className="w-full justify-center text-xs sm:text-sm"
                size="lg"
                onClick={handleCheckoutClick}
              >
                Checkout <FiArrowRight size={14} />
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-xs font-mono text-muted hover:text-red-400 transition-colors pt-1 block text-center"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Order Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-surface rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-alt transition-colors"
                aria-label="Close dialog"
              >
                <FiX size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 text-accent mb-2">
                <FiInfo size={18} />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Order Notice
                </span>
              </div>

              <h3 className="text-lg font-bold font-display text-primary mb-2">
                Automated Payment Coming Soon
              </h3>

              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                Online payment gateways are currently under integration. You can
                easily complete your purchase directly by sending your selected
                projects to our support channels.
              </p>

              {/* Order Methods */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <FiMessageCircle size={16} />
                  Order via WhatsApp
                </button>

                <button
                  onClick={handleEmailOrder}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-surface bg-surface-alt hover:border-highlight text-primary font-mono text-xs sm:text-sm font-semibold transition-colors"
                >
                  <FiMail size={16} />
                  Order via Email
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-surface text-center">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-xs font-mono text-muted hover:text-primary transition-colors"
                >
                  Return to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
