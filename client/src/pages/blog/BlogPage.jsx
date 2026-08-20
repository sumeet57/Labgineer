import { useState } from 'react'
import { usePagination } from '../../hooks/useApi'
import BlogCard from '../../components/blog/BlogCard'
import { SectionHeader, Spinner, Button, EmptyState } from '../../components/common/UI'

const categories = ['All', 'Tutorial', 'IoT', 'Web', 'Research', 'Opinion']

export default function BlogPage() {
  const [active, setActive] = useState('All')
  const { data: posts, loading, hasMore, loadMore, applyFilters } = usePagination('/blog', 9)

  const handleCategory = (cat) => {
    setActive(cat)
    applyFilters({ category: cat === 'All' ? '' : cat })
  }

  const [featured, ...rest] = posts

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        eyebrow="Blog"
        title="Notes & guides"
        subtitle="Engineering write-ups, tutorials, and whatever I'm exploring."
      />

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              active === cat
                ? 'text-white'
                : 'border border-surface text-muted hover:border-highlight hover:text-accent'
            }`}
            style={active === cat ? { backgroundColor: 'var(--color-highlight)' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && posts.length === 0 ? (
        <div className="py-24"><Spinner size={36} /></div>
      ) : posts.length === 0 ? (
        <EmptyState icon="✍️" title="No posts yet" description="Check back soon!" />
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <div className="mb-8">
              <BlogCard post={featured} variant="feature" />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button onClick={loadMore} loading={loading} variant="outline">
                Load more posts
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}