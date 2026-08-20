import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiFileText } from 'react-icons/fi'
import { usePagination } from "../hooks/useApi"
import { SectionHeader, Spinner, Button, EmptyState, Badge } from '../components/common/UI'

function ResearchCard({ paper, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group p-6 bg-card border border-surface rounded-2xl hover:border-highlight/30 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl border border-surface bg-surface-alt flex-shrink-0">
          <FiFileText size={18} style={{ color: 'var(--color-highlight)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-2">
            {paper.category && <Badge>{paper.category}</Badge>}
            {paper.year && <span className="text-xs font-mono text-muted">{paper.year}</span>}
          </div>
          <Link to={`/research/${paper.slug}`}>
            <h3 className="font-bold font-display text-primary group-hover:text-accent transition-colors mb-2 leading-snug">
              {paper.title}
            </h3>
          </Link>
          <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">{paper.abstract}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {paper.tags?.slice(0, 3).map(t => (
                <span key={t} className="text-[10px] font-mono text-muted bg-surface-alt px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
            <Link
              to={`/research/${paper.slug}`}
              className="flex items-center gap-1 text-xs font-mono text-accent hover:gap-2 transition-all"
            >
              Read <FiArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function ResearchPage() {
  const { data: papers, loading, hasMore, loadMore } = usePagination('/research', 10)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        eyebrow="Research"
        title="Papers & findings"
        subtitle="Technical research, experiments, and engineering analysis."
      />

      {loading && papers.length === 0 ? (
        <div className="py-24"><Spinner size={36} /></div>
      ) : papers.length === 0 ? (
        <EmptyState icon="🔬" title="No papers yet" description="Research coming soon." />
      ) : (
        <>
          <div className="space-y-4">
            {papers.map((p, i) => <ResearchCard key={p._id} paper={p} index={i} />)}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button onClick={loadMore} loading={loading} variant="outline">Load more</Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}