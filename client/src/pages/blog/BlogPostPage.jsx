import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi'
import { useFetch } from '../../hooks/useApi'
import { PageLoader, Badge } from '../../components/common/UI'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { data, loading, error } = useFetch(`/blog/${slug}`)

  if (loading) return <PageLoader />
  if (error || !data?.post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-muted">Post not found.</p>
        <Link to="/blog" className="text-accent text-sm font-mono mt-4 inline-block">← Back to blog</Link>
      </div>
    )
  }

  const { post } = data

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mb-8">
        <FiArrowLeft size={14} /> Back to blog
      </Link>

      {/* Cover */}
      {post.cover && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl overflow-hidden border border-surface aspect-video mb-8"
        >
          <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {post.category && <Badge>{post.category}</Badge>}
        <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
          <FiClock size={11} />{post.readTime || '5 min'}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted font-mono">
          <FiCalendar size={11} />{new Date(post.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-black font-display text-primary leading-tight mb-6"
      >
        {post.title}
      </motion.h1>

      {/* Author */}
      <div className="flex items-center gap-3 pb-8 border-b border-surface mb-8">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: 'var(--color-highlight)' }}>
          {post.author?.[0]?.toUpperCase() || 'S'}
        </div>
        <div>
          <p className="text-sm font-bold text-primary">{post.author || 'Sumeet'}</p>
          <p className="text-xs text-muted font-mono">@sumeet · engineeor.com</p>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose-content text-primary leading-relaxed"
        style={{ fontSize: '1rem', lineHeight: '1.8' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-12 pt-8 border-t border-surface flex flex-wrap gap-2">
          {post.tags.map(t => (
            <span key={t} className="text-xs font-mono text-muted bg-surface-alt px-3 py-1.5 rounded-full">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}