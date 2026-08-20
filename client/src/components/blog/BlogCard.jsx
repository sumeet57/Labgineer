import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiClock } from 'react-icons/fi'

export default function BlogCard({ post, index = 0, variant = 'default' }) {
  const isFeature = variant === 'feature'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`group bg-card border border-surface rounded-2xl overflow-hidden hover:border-highlight/30 transition-all duration-300 hover:-translate-y-1 ${
        isFeature ? 'md:flex' : ''
      }`}
    >
      {/* Cover */}
      {post.cover && (
        <Link
          to={`/blog/${post.slug}`}
          className={`block overflow-hidden bg-surface-alt ${
            isFeature ? 'md:w-1/2 h-48 md:h-auto' : 'aspect-video'
          }`}
        >
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}

      {/* Content */}
      <div className={`p-5 flex flex-col ${isFeature ? 'md:w-1/2 md:p-8 justify-center' : ''}`}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span className="tag-pill">{post.category}</span>
          )}
          <span className="flex items-center gap-1 text-xs text-muted font-mono">
            <FiClock size={11} />
            {post.readTime || '5 min read'}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className={`font-bold font-display text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug ${
            isFeature ? 'text-2xl mb-3' : 'text-base mb-2'
          }`}>
            {post.title}
          </h3>
        </Link>

        <p className={`text-muted leading-relaxed ${isFeature ? 'text-sm mb-6 line-clamp-3' : 'text-xs mb-4 line-clamp-2'}`}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-surface-alt flex items-center justify-center text-xs font-bold text-accent">
              {post.author?.[0]?.toUpperCase() || 'S'}
            </div>
            <span className="text-xs text-muted font-mono">{post.author || 'Sumeet'}</span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-mono text-accent hover:gap-2 transition-all"
          >
            Read <FiArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}