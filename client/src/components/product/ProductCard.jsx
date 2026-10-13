import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineDownload, HiOutlineShoppingBag } from "react-icons/hi";
import { BsWifi, BsCode } from "react-icons/bs";
import { useCart } from "../../context/CartContext";
import { Badge } from "../common/Ui";

const categoryIcons = {
  IoT: BsWifi,
  Web: BsCode,
  default: BsCode,
};

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, isInCart, removeFromCart } = useCart();
  const inCart = isInCart(product._id);
  const Icon = categoryIcons[product.category] || categoryIcons.default;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="group relative bg-card border border-surface rounded-2xl overflow-hidden hover:border-highlight/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ "--shadow-color": "rgba(249,115,22,0.08)" }}
    >
      {/* Thumbnail */}
      <Link
        to={`/products/${product._id}`}
        className="block aspect-video overflow-hidden relative bg-surface-alt"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon
              size={40}
              style={{ color: "var(--color-highlight)", opacity: 0.3 }}
            />
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.category && <Badge>{product.category}</Badge>}
          {product.isFeatured && <Badge color="green">Featured</Badge>}
        </div>

        {/* Price chip */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-surface bg-card/80 text-sm font-mono font-bold text-accent">
          {product.price === 0 ? "Free" : `₹${product.price}`}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        {product.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-muted bg-surface-alt px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link to={`/products/${product._id}`} className="block mb-2">
          <h3 className="font-bold font-display text-primary text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (inCart) {
                removeFromCart(product._id);
              } else {
                addToCart(product);
              }
            }}
            disabled={inCart}
            className="flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-white disabled:opacity-70"
            style={{ backgroundColor: "var(--color-highlight)" }}
          >
            <HiOutlineShoppingBag size={13} />
            {inCart ? "In Cart" : "Add to Cart"}
          </motion.button>
          {/* <Link
            to={`/products/${product._id}/do`}
            className="p-2 rounded-lg border border-surface hover:border-highlight text-muted hover:text-accent transition-colors"
          >
            <HiOutlineDownload size={15} />
          </Link> */}
        </div>
      </div>
    </motion.article>
  );
}
