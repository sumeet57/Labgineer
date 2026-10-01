import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiSliders, FiX, FiCheck } from 'react-icons/fi'
import { useFetch } from '../../hooks/useApi'
import ProductCard from '../../components/product/ProductCard'
import { Spinner, EmptyState } from '../../components/common/UI'

const categories = ['all', 'iot', 'web', 'embedded', 'ai/ml']
const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('latest')
  const [query, setQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const { data: featuredData, loading: productsLoading } = useFetch('/products/featured')
  const [displayedProducts, setDisplayedProducts] = useState([])

  useEffect(() => {
    const rawList = featuredData?.payload || (Array.isArray(featuredData) ? featuredData : [])
    
    let result = activeCategory === 'all' 
      ? rawList 
      : rawList.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase())

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q)
      )
    }

    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    setDisplayedProducts(result)
  }, [featuredData, activeCategory, query, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">
          Catalog
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary mt-1">
          Explore Projects
        </h1>
        <p className="text-sm text-muted mt-1 max-w-xl">
          Hardware builds, IoT solutions, and software templates ready for deployment.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-card border border-surface rounded-xl p-3 mb-8 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-colors flex-shrink-0 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-muted hover:text-primary hover:bg-surface-alt'
                  }`}
                  style={isActive ? { backgroundColor: 'var(--color-highlight)' } : {}}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                showSearch || query
                  ? 'border-highlight text-accent bg-surface-alt'
                  : 'border-surface text-muted hover:text-primary hover:border-surface-alt'
              }`}
            >
              {showSearch ? <FiX size={14} /> : <FiSearch size={14} />}
              <span className="hidden sm:inline">{showSearch ? 'Close' : 'Search'}</span>
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-mono rounded-lg border border-surface bg-surface-alt text-primary focus:outline-none focus:border-highlight transition-colors cursor-pointer"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <FiSliders size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Collapsible Search Drawer */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-2 border-t border-surface"
            >
              <div className="relative">
                <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type to search projects by name or keyword..."
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-lg border border-surface bg-surface-alt text-primary placeholder-muted focus:outline-none focus:border-highlight"
                />
                {query && (
                  <button 
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                  >
                    <FiX size={13} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid Content */}
      {productsLoading ? (
        <div className="py-20 flex justify-center items-center">
          <Spinner size={32} />
        </div>
      ) : displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((p, i) => (
            <ProductCard key={p._id || i} product={p} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No matching projects"
          description={
            query 
              ? `No results matching "${query}"` 
              : `There are currently no projects listed under the "${activeCategory}" category.`
          }
        />
      )}
    </div>
  )
}