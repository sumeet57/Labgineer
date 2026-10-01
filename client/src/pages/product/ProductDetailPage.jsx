import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiCheck, FiExternalLink } from 'react-icons/fi'
import { BsWifi, BsCode } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useFetch, useMutation } from '../../hooks/useApi'
import { productAPI, paymentAPI } from '../../api/services'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { Button, Badge, PageLoader, Spinner } from '../../components/common/UI'
import { useEffect } from 'react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const { addToCart, isInCart } = useCart()

  const { data, loading, error } = useFetch(`/products/${id}`)
  useEffect(() => {
    console.log('Fetched product data:', data)
  }, [])
  const { mutate: purchase, loading: purchasing } = useMutation(
    (productId) => paymentAPI.createOrder({ productId })
  )

  if (loading) return <PageLoader />
  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-muted">Product not found.</p>
        <Link to="/products" className="text-accent text-sm font-mono mt-4 inline-block">← Back to products</Link>
      </div>
    )
  }

  const product = data;
  
  const inCart = isInCart(product._id)

  const handleBuy = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to purchase')
      return
    }
    try {
      const order = await purchase(product._id)
      // Integrate Razorpay here using order.data
      toast.success('Redirecting to payment...')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-mono text-muted hover:text-accent transition-colors mb-8">
        <FiArrowLeft size={14} /> Back to projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden border border-surface aspect-video bg-surface-alt mb-8"
          >
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BsCode size={60} style={{ color: 'var(--color-highlight)', opacity: 0.2 }} />
              </div>
            )}
          </motion.div>

          {/* name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-black font-display text-primary mb-4"
          >
            {product.name}
          </motion.h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.category && <Badge>{product.category}</Badge>}
            {product.tags?.map(t => (
              <span key={t} className="text-xs font-mono text-muted bg-surface-alt px-2.5 py-1 rounded-full">#{t}</span>
            ))}
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none text-muted leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* What's included */}
          {product.includes?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">What's included</h3>
              <ul className="space-y-2">
                {product.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-primary">
                    <FiCheck size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-highlight)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="sticky top-24 bg-card border border-surface rounded-2xl p-6"
          >
            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-black font-mono" style={{ color: 'var(--color-highlight)' }}>
                {product.price === 0 ? 'Free' : `₹${product.price}`}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 text-lg text-muted line-through font-mono">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mb-6">
              {product.price === 0 ? (
                <Button size="lg" className="w-full">
                  <FiDownload size={15} /> Download Free
                </Button>
              ) : (
                <>
                  <Button size="lg" className="w-full" loading={purchasing} onClick={handleBuy}>
                    Buy Now — ₹{product.price}
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" onClick={() => addToCart(product)} disabled={inCart}>
                    {inCart ? '✓ In Cart' : 'Add to Cart'}
                  </Button>
                </>
              )}
            </div>

            {/* Meta */}
            <div className="space-y-3 pt-4 border-t border-surface text-sm">
              {product.techStack?.length > 0 && (
                <div className="flex gap-2">
                  <span className="text-muted font-mono w-24 flex-shrink-0">Stack</span>
                  <span className="text-primary">{product.techStack.join(', ')}</span>
                </div>
              )}
              {product.demoUrl && (
                <div className="flex gap-2 items-center">
                  <span className="text-muted font-mono w-24 flex-shrink-0">Demo</span>
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="text-accent inline-flex items-center gap-1 text-sm hover:underline">
                    Live demo <FiExternalLink size={11} />
                  </a>
                </div>
              )}
              {product.createdAt && (
                <div className="flex gap-2">
                  <span className="text-muted font-mono w-24 flex-shrink-0">Updated</span>
                  <span className="text-primary">{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}