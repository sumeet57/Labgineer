import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiArrowRight,
  FiShoppingBag,
  FiCode,
  FiCpu,
  FiLayers,
  FiClock,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { useFetch } from '../hooks/useApi'
import ProductCard from '../components/product/ProductCard'
import { SectionHeader, Spinner } from '../components/common/UI'

/* ── Shared styles ─────────────────────────────────────── */

const wrap = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
const section = `${wrap} py-10 sm:py-16`
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'

/* ── Content ───────────────────────────────────────────── */

const areas = [
  {
    icon: FiShoppingBag,
    title: 'Projects',
    text: 'Complete web & IoT builds with source code and docs.',
    to: '/products',
  },
  {
    icon: FiCode,
    title: 'Open source',
    text: 'Free tools and libraries you can use in your work.',
    to: '/opensource',
  },
  {
    icon: FiCpu,
    title: 'R&D Labs',
    text: 'Early prototypes, experiments, and notes.',
  },
  {
    icon: FiLayers,
    title: 'System design',
    text: 'Guides on building scalable systems.',
  },
]

const openSourceHighlights = [
  {
    title: 'Payguard - Agentic runtime for payment gateways',
    desc: 'A Node.js library for building payment gateway integrations with a focus on security and reliability.',
    tags: ['Node.js', 'Payment', 'Architecture'],
    link: '/opensource',
  },
  {
    title: 'Liwebjs - Lightweight real-time communication framework',
    desc: 'A lightweight framework for building real-time web applications with WebSocket support.',
    tags: ['Node.js', 'Web', 'Framework'],
    link: '/opensource',
  },
]

/* ── Small pieces ──────────────────────────────────────── */

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-highlight/40 px-2 py-0.5 text-[10px] font-mono text-highlight shrink-0">
      <FiClock size={10} aria-hidden="true" />
      Soon
    </span>
  )
}

function AreaCard({ icon: Icon, title, text, to }) {
  const content = (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="p-2 sm:p-2.5 rounded-lg bg-surface-alt border border-surface shrink-0 mt-0.5">
        <Icon size={18} className={to ? 'text-highlight' : 'text-muted'} aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm sm:text-base font-bold font-display text-primary flex items-center gap-1.5 truncate">
            {title}
            {to && (
              <FiArrowRight
                size={13}
                className="text-highlight transition-transform group-hover:translate-x-1 shrink-0"
                aria-hidden="true"
              />
            )}
          </h3>
          {!to && <ComingSoonBadge />}
        </div>
        <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">{text}</p>
      </div>
    </div>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`group block rounded-xl border border-surface bg-card p-3.5 sm:p-4 transition-colors hover:border-highlight ${focusRing}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="rounded-xl border border-dashed border-surface p-3.5 sm:p-4 bg-card/40">
      {content}
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  const reduce = useReducedMotion()
  const [carouselIndex, setCarouselIndex] = useState(0)

  const { data: featuredData, loading: productsLoading } = useFetch('/products/featured')
  const featured = featuredData || []

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? Math.max(0, featured.length - 1) : prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => (prev >= featured.length - 1 ? 0 : prev + 1))
  }

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay },
        }

  return (
    <div>
      {/* ── Hero ───────────────────────────────────── */}
      <section className="px-4 py-14 sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <motion.h1
            {...fade(0)}
            className="font-display text-2xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            Web and IoT projects,{' '}
            <span className="text-highlight">ready to ship.</span>
          </motion.h1>

          <motion.p {...fade(0.1)} className="max-w-md text-xs sm:text-sm text-muted">
            Buy complete projects with source code and docs.
          </motion.p>

          <motion.div
            {...fade(0.2)}
            className="mt-2 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row"
          >
            <Link
              to="/products"
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-mono font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
              style={{ backgroundColor: 'var(--color-highlight)' }}
            >
              Browse projects
              <FiArrowRight size={13} aria-hidden="true" />
            </Link>
            <a
              href="#coming-soon"
              className={`inline-flex items-center justify-center rounded-lg border border-surface px-5 py-2.5 text-xs font-mono font-semibold text-muted transition-colors hover:border-highlight hover:text-primary ${focusRing}`}
            >
              What&apos;s coming
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── What's here ────────────────────────────── */}
      <section className={`${wrap} pb-10 sm:pb-16`}>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <AreaCard key={a.title} {...a} />
          ))}
        </div>
      </section>

      {/* ── Featured projects Carousel ──────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Projects"
            title="Ready-to-use builds"
            subtitle="Source code, schematics, and deployment docs included."
          />

          <div className="flex items-center gap-3 shrink-0">
            {featured.length > 0 && !productsLoading && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous projects"
                  className={`p-2 rounded-lg border border-surface bg-card text-muted hover:text-primary hover:border-surface-alt transition-colors ${focusRing}`}
                >
                  <FiChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next projects"
                  className={`p-2 rounded-lg border border-surface bg-card text-muted hover:text-primary hover:border-surface-alt transition-colors ${focusRing}`}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}

            <Link
              to="/products"
              className={`hidden items-center gap-1.5 text-xs font-mono text-highlight hover:underline sm:flex ${focusRing}`}
            >
              See all <FiArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {productsLoading ? (
          <div className="py-16 flex justify-center items-center">
            <Spinner size={32} />
          </div>
        ) : featured.length > 0 ? (
          <div className="relative overflow-hidden">
            <div
              className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc((100%-1.5rem)/2)] md:auto-cols-[calc((100%-3rem)/3)] lg:auto-cols-[calc((100%-4.5rem)/4)] gap-6 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(calc(-${carouselIndex} * (100% + 1.5rem)))`,
              }}
            >
              {featured.map((p, i) => (
                <div key={p._id || i} className="w-full">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-surface px-6 py-12 text-center">
            <p className="font-display text-base font-bold text-primary">New projects are being added</p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted">
              Check back soon, or tell us what you need and we&apos;ll build it for you.
            </p>
            <a
              href="mailto:hi@labgineer.com"
              className={`mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-highlight hover:underline ${focusRing}`}
            >
              <FiMail size={13} aria-hidden="true" /> hi@labgineer.com
            </a>
          </div>
        )}

        <Link
          to="/products"
          className={`mt-6 flex items-center justify-center gap-2 rounded-lg border border-surface py-2.5 text-xs font-mono text-highlight sm:hidden ${focusRing}`}
        >
          See all projects <FiArrowRight size={13} aria-hidden="true" />
        </Link>
      </section>

      {/* ── Open source ────────────────────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Open source"
            title="Free tools you can use today"
            subtitle="Open repositories and small, reusable modules."
          />
          <Link
            to="/opensource"
            className={`hidden shrink-0 items-center gap-1.5 text-xs font-mono text-highlight hover:underline sm:flex ${focusRing}`}
          >
            See all <FiArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {openSourceHighlights.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-surface bg-card p-4 sm:p-5"
            >
              <div>
                <h3 className="mb-1.5 text-base font-bold font-display text-primary">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-surface bg-surface-alt/40 px-2 py-0.5 text-[10px] font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={item.link}
                  className={`flex items-center gap-1 text-xs font-mono font-bold text-highlight hover:underline ${focusRing}`}
                >
                  View source <FiArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Coming soon ────────────────────────────── */}
      <section id="coming-soon" className={`${section} scroll-mt-20 border-t border-surface`}>
        <div className="mx-auto max-w-2xl text-center">
          <ComingSoonBadge />
          <h2 className="mt-3 font-display text-xl font-bold text-primary sm:text-2xl">
            R&amp;D Labs and System Design are on the way
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
            R&amp;D Labs will share our prototypes and test results. System Design will be a set of
            clear guides on microservices, real-time systems, and IoT messaging.
          </p>
          <a
            href="mailto:hi@labgineer.com?subject=Notify%20me%20about%20R%26D%20and%20System%20Design"
            className={`mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-highlight hover:underline ${focusRing}`}
          >
            <FiMail size={13} aria-hidden="true" /> Email us to get notified
          </a>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">
            Need something built for you?
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
            We build custom IoT firmware, backends, and microservice systems. Tell us what you
            need and we&apos;ll reply with a plan.
          </p>
          <a
            href="mailto:hi@labgineer.com"
            className={`mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-mono font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
            style={{ backgroundColor: 'var(--color-highlight)' }}
          >
            Get in touch <FiArrowRight size={13} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  )
}