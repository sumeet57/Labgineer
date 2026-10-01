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
} from 'react-icons/fi'
import { useFetch } from '../hooks/useApi'
import ProductCard from '../components/product/ProductCard'
import { SectionHeader, Spinner } from '../components/common/UI'

/* ── Shared styles ─────────────────────────────────────── */

const wrap = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
const section = `${wrap} py-14 sm:py-20`
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'

/* ── Content ───────────────────────────────────────────── */

const areas = [
  {
    icon: FiShoppingBag,
    title: 'Projects',
    text: 'Complete web and IoT builds with source code and docs.',
    to: '/products',
  },
  {
    icon: FiCode,
    title: 'Open source',
    text: 'Free tools and libraries you can use in your own work.',
    to: '/opensource',
  },
  {
    icon: FiCpu,
    title: 'R&D Labs',
    text: 'Early prototypes and experiments, with notes on what we learn.',
  },
  {
    icon: FiLayers,
    title: 'System design',
    text: 'Guides on how scalable systems are built, from messaging to caching.',
  },
]

const openSourceHighlights = [
  {
    title: 'Protocol-First Microservice Toolkit',
    desc: 'A small library for fast, low-delay messaging between services over WebSockets.',
    tags: ['Node.js', 'WebSockets', 'Architecture'],
    link: '/opensource',
  },
  {
    title: 'ESP32 Gateway Firmware',
    desc: 'Ready-to-use firmware template with automatic Wi-Fi setup and clean state handling.',
    tags: ['C++', 'ESP32', 'IoT'],
    link: '/opensource',
  },
]

/* ── Small pieces ──────────────────────────────────────── */

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-highlight/40 px-2.5 py-1 text-xs font-mono text-highlight">
      <FiClock size={11} aria-hidden="true" />
      Coming soon
    </span>
  )
}

function AreaCard({ icon: Icon, title, text, to }) {
  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <Icon size={22} className={to ? 'text-highlight' : 'text-muted'} aria-hidden="true" />
        {!to && <ComingSoonBadge />}
      </div>
      <h3 className="mt-5 flex items-center gap-2 text-lg font-bold font-display text-primary">
        {title}
        {to && (
          <FiArrowRight
            size={15}
            className="text-highlight transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`group block rounded-xl border border-surface bg-card p-5 transition-colors hover:border-highlight ${focusRing}`}
      >
        {inner}
      </Link>
    )
  }

  return <div className="rounded-xl border border-dashed border-surface p-5">{inner}</div>
}

/* ── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  const reduce = useReducedMotion()

  const { data: featuredData, loading: productsLoading } = useFetch('/products/featured')
  const featured = featuredData || [];
 

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
      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <motion.h1
            {...fade(0)}
            className="font-display text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
          >
            Web and IoT projects,{' '}
            <span className="text-highlight">ready to ship.</span>
          </motion.h1>

          <motion.p {...fade(0.1)} className="max-w-md text-base text-muted">
            Buy complete projects with source code and docs.
          </motion.p>

          <motion.div
            {...fade(0.2)}
            className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Link
              to="/products"
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-mono font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
              style={{ backgroundColor: 'var(--color-highlight)' }}
            >
              Browse projects
              <FiArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href="#coming-soon"
              className={`inline-flex items-center justify-center rounded-lg border border-surface px-6 py-3 text-sm font-mono font-semibold text-muted transition-colors hover:border-highlight hover:text-primary ${focusRing}`}
            >
              What&apos;s coming
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── What's here ────────────────────────────── */}
      <section className={`${wrap} pb-14 sm:pb-20`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {areas.map((a) => (
            <AreaCard key={a.title} {...a} />
          ))}
        </div>
      </section>

      {/* ── Featured projects ──────────────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Projects"
            title="Ready-to-use builds"
            subtitle="Source code, schematics, and deployment docs included."
          />
          <Link
            to="/products"
            className={`hidden shrink-0 items-center gap-1.5 text-sm font-mono text-highlight hover:underline sm:flex ${focusRing}`}
          >
            See all <FiArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

        {productsLoading ? (
          <div className="py-16">
            <Spinner size={32} />
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-surface px-6 py-12 text-center">
            <p className="font-display text-lg font-bold text-primary">New projects are being added</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Check back soon, or tell us what you need and we&apos;ll build it for you.
            </p>
            <a
              href="mailto:hi@labgineer.com"
              className={`mt-4 inline-flex items-center gap-2 text-sm font-mono font-semibold text-highlight hover:underline ${focusRing}`}
            >
              <FiMail size={14} aria-hidden="true" /> hi@labgineer.com
            </a>
          </div>
        )}

        <Link
          to="/products"
          className={`mt-6 flex items-center justify-center gap-2 rounded-lg border border-surface py-3 text-sm font-mono text-highlight sm:hidden ${focusRing}`}
        >
          See all projects <FiArrowRight size={13} aria-hidden="true" />
        </Link>
      </section>

      {/* ── Open source ────────────────────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Open source"
            title="Free tools you can use today"
            subtitle="Open repositories and small, reusable modules."
          />
          <Link
            to="/opensource"
            className={`hidden shrink-0 items-center gap-1.5 text-sm font-mono text-highlight hover:underline sm:flex ${focusRing}`}
          >
            See all <FiArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {openSourceHighlights.map((item) => (
            <article
              key={item.title}
              className="flex flex-col justify-between rounded-xl border border-surface bg-card p-5 sm:p-6"
            >
              <div>
                <h3 className="mb-2 text-lg font-bold font-display text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-surface px-2 py-0.5 text-xs font-mono text-muted"
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
          <h2 className="mt-4 font-display text-2xl font-bold text-primary sm:text-3xl">
            R&amp;D Labs and System Design are on the way
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            R&amp;D Labs will share our prototypes and test results. System Design will be a set of
            clear guides on microservices, real-time systems, and IoT messaging.
          </p>
          <a
            href="mailto:hi@labgineer.com?subject=Notify%20me%20about%20R%26D%20and%20System%20Design"
            className={`mt-5 inline-flex items-center gap-2 text-sm font-mono font-semibold text-highlight hover:underline ${focusRing}`}
          >
            <FiMail size={14} aria-hidden="true" /> Email us to get notified
          </a>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
            Need something built for you?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            We build custom IoT firmware, MERN backends, and microservice systems. Tell us what you
            need and we&apos;ll reply with a plan.
          </p>
          <a
            href="mailto:hi@labgineer.com"
            className={`mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-mono font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
            style={{ backgroundColor: 'var(--color-highlight)' }}
          >
            Get in touch <FiArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  )
}