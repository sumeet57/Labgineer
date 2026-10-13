import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiDownload,
  FiCheck,
  FiExternalLink,
  FiShield,
  FiPackage,
  FiCpu,
  FiTag,
  FiClock,
} from "react-icons/fi";
import { BsCode } from "react-icons/bs";
import { toast } from "react-toastify";
import { useFetch, useMutation } from "../../hooks/useApi";
import { paymentAPI } from "../../api/services";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { Button, Badge, PageLoader } from "../../components/common/Ui";
import { useEffect } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart } = useCart();

  const { data, loading, error } = useFetch(`/products/${id}`);

  useEffect(() => {
    console.log("Fetched product data:", data);
  }, [data]);

  const { mutate: purchase, loading: purchasing } = useMutation((productId) =>
    paymentAPI.createOrder({ productId }),
  );

  if (loading) return <PageLoader />;
  if (error || !data) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-muted text-sm">Product not found.</p>
        <Link
          to="/products"
          className="text-accent text-xs font-mono mt-3 inline-block hover:underline"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  const product = data;
  const inCart = isInCart(product._id);

  const handleBuy = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to purchase");
      return;
    }
    try {
      await purchase(product._id);
      toast.success("Redirecting to payment...");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Navigation */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
        >
          <FiArrowLeft size={13} /> Back to projects
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Preview & Project Narrative */}
        <div className="lg:col-span-7 space-y-6">
          {/* Image Container */}
          <div className="rounded-xl overflow-hidden border border-surface aspect-video bg-surface-alt relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BsCode size={40} className="text-muted opacity-40" />
              </div>
            )}
          </div>

          {/* Title & Short Context */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.category && <Badge>{product.category}</Badge>}
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-md border ${
                  product.stock > 0
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-primary leading-snug">
              {product.name}
            </h1>
            {product.projectContext && (
              <p className="text-xs font-mono text-accent mt-1.5 leading-normal">
                {product.projectContext}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-surface pt-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-2">
              Description
            </h2>
            <p className="text-sm text-primary leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="border-t border-surface pt-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-3 flex items-center gap-1.5">
                <FiCpu size={13} className="text-accent" /> Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-primary bg-surface-alt/40 border border-surface/60 p-2.5 rounded-lg"
                  >
                    <FiCheck
                      size={13}
                      className="text-emerald-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included Deliverables */}
          {product.includes?.length > 0 && (
            <div className="border-t border-surface pt-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold mb-3 flex items-center gap-1.5">
                <FiPackage size={13} className="text-accent" /> Package
                Deliverables
              </h2>
              <ul className="space-y-1.5">
                {product.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-primary"
                  >
                    <FiCheck
                      size={13}
                      className="text-emerald-500 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="border-t border-surface pt-4 flex flex-wrap items-center gap-1.5">
              <FiTag size={12} className="text-muted mr-1" />
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono text-muted bg-surface-alt border border-surface px-2 py-0.5 rounded-md"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Checkout & Spec Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div className="bg-card border border-surface rounded-xl p-5 shadow-sm space-y-5">
            {/* Price Header */}
            <div>
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">
                Total Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-primary">
                  {product.price === 0 ? "Free" : `₹${product.price}`}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-sm text-muted line-through font-mono">
                      ₹{product.originalPrice}
                    </span>
                  )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              {product.price === 0 ? (
                <Button size="md" className="w-full justify-center text-xs">
                  <FiDownload size={14} /> Download Free
                </Button>
              ) : (
                <>
                  <Button
                    size="md"
                    className="w-full justify-center text-xs font-semibold"
                    loading={purchasing}
                    onClick={handleBuy}
                  >
                    Buy Now — ₹{product.price}
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    className="w-full justify-center text-xs"
                    onClick={() => addToCart(product)}
                    disabled={inCart}
                  >
                    {inCart ? "✓ Added to Cart" : "Add to Cart"}
                  </Button>
                </>
              )}
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-3 border-t border-surface space-y-1.5 text-[11px] font-mono text-muted">
              <div className="flex items-center gap-1.5">
                <FiShield size={12} className="text-accent" /> Includes verified
                working source files
              </div>
              <div className="flex items-center gap-1.5">
                <FiPackage size={12} className="text-accent" /> Ready for
                submission & documentation
              </div>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="bg-card/50 border border-surface rounded-xl p-4 space-y-2 text-xs font-mono">
            <h3 className="text-[11px] uppercase tracking-wider text-muted font-semibold border-b border-surface pb-2">
              Specifications
            </h3>

            {product.techStack?.length > 0 && (
              <div className="flex justify-between items-start gap-2 pt-1">
                <span className="text-muted">Tech Stack</span>
                <span className="text-primary text-right">
                  {product.techStack.join(", ")}
                </span>
              </div>
            )}

            {product.demoUrl && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted">Live Demo</span>
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent inline-flex items-center gap-1 hover:underline"
                >
                  View Demo <FiExternalLink size={11} />
                </a>
              </div>
            )}

            {product.createdAt && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted inline-flex items-center gap-1">
                  <FiClock size={11} /> Updated
                </span>
                <span className="text-primary">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
