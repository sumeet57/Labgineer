import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { usePagination, useSearch } from '../../hooks/useApi'
import ProductCard from "../../components/product/ProductCard"
import { SectionHeader, Spinner, Button, EmptyState } from '../../components/common/UI'

const categories = ['All', 'IoT', 'Web', 'Embedded', 'AI/ML']
const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('latest')
  const [showSearch, setShowSearch] = useState(false)

  const { query, setQuery, results: searchResults, loading: searchLoading } = useSearch('/products/search')
  const {
    data: products,
    loading,
    hasMore,
    loadMore,
    applyFilters,
  } = usePagination('/products', 12)

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    applyFilters({ category: cat === 'All' ? '' : cat, sort })
  }

  const handleSortChange = (s) => {
    setSort(s)
    applyFilters({ category: activeCategory === 'All' ? '' : activeCategory, sort: s })
  }

  const isSearching = query.trim().length > 0
  const displayedProducts = isSearching ? searchResults : products

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <SectionHeader
        eyebrow="Projects"
        title="Engineering builds"
        subtitle="IoT systems, web apps, and embedded projects — all fully documented and production-ready."
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? 'text-white'
                  : 'border border-surface text-muted hover:border-highlight hover:text-accent'
              }`}
              style={activeCategory === cat ? { backgroundColor: 'var(--color-highlight)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Search */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowSearch(s => !s)}
            className="p-2 rounded-lg border border-surface text-muted hover:text-accent hover:border-highlight transition-colors"
          >
            {showSearch ? <FiX size={15} /> : <FiSearch size={15} />}
          </button>
          <select
            value={sort}
            onChange={e => handleSortChange(e.target.value)}
            className="px-3 py-2 text-xs font-mono rounded-lg border border-surface bg-surface-alt text-muted focus:outline-none focus:border-highlight transition-colors"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <FiSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects..."
              autoFocus
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface bg-surface-alt text-primary placeholder-muted text-sm font-mono focus:outline-none focus:border-highlight transition-colors"
            />
            {searchLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2"><Spinner size={16} /></div>
            )}
          </div>
        </motion.div>
      )}

      {/* Grid */}
      {loading && products.length === 0 ? (
        <div className="py-24"><Spinner size={36} /></div>
      ) : displayedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedProducts.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>

          {/* Load more */}
          {!isSearching && hasMore && (
            <div className="flex justify-center mt-12">
              <Button onClick={loadMore} loading={loading} variant="outline">
                Load more projects
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon="🔧"
          title="No projects found"
          description={isSearching ? `No results for "${query}"` : 'No projects in this category yet.'}
        />
      )}
    </div>
  )
}