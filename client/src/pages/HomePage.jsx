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
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiLinkedin,
  FiInstagram,
  FiArrowUpRight,
} from 'react-icons/fi'
import { useFetch } from '../hooks/useApi'
import ProductCard from '../components/product/ProductCard'
import { SectionHeader, Spinner } from '../components/common/UI'

/* ── Shared styles ─────────────────────────────────────── */

const wrap = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
const section = `${wrap} py-10 sm:py-16`
const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

/* ── Content ───────────────────────────────────────────── */

const areas = [
  {
    icon: FiShoppingBag,
    title: 'Projects for Sale',
    text: 'Production-ready Web & IoT builds with source code and docs.',
    to: '/products',
  },
  {
    icon: FiCode,
    title: 'Open Source',
    text: 'Free tools, libraries, and frameworks you can use today.',
    to: '/opensource',
  },
  {
    icon: FiCpu,
    title: 'R&D Labs',
    text: 'Hardware prototypes, experiments, and technical writeups.',
  },
  {
    icon: FiLayers,
    title: 'System Design',
    text: 'Guides on building scalable systems, messaging, and caching.',
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
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] shrink-0"
      style={{
        border: '1px solid var(--color-highlight-dim)',
        color: 'var(--color-highlight)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <FiClock size={10} aria-hidden="true" />
      Soon
    </span>
  )
}

function AreaCard({ icon: Icon, title, text, to }) {
  const content = (
    <div className="flex items-start gap-3 sm:gap-4">
      <div
        className="p-2 sm:p-2.5 rounded-lg shrink-0 mt-0.5"
        style={{
          backgroundColor: 'var(--color-bg-alt)',
          border: '1px solid var(--color-border)',
        }}
      >
        <Icon
          size={18}
          style={{ color: to ? 'var(--color-highlight)' : 'var(--color-text-muted)' }}
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="text-sm sm:text-base font-bold flex items-center gap-1.5 truncate"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            {title}
            {to && (
              <FiArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1 shrink-0"
                style={{ color: 'var(--color-highlight)' }}
                aria-hidden="true"
              />
            )}
          </h3>
          {!to && <ComingSoonBadge />}
        </div>
        <p
          className="mt-1 text-xs leading-relaxed line-clamp-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {text}
        </p>
      </div>
    </div>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`group block rounded-xl p-3.5 sm:p-4 transition-colors ${focusRing}`}
        style={{
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          outlineColor: 'var(--color-highlight)',
        }}
      >
        {content}
      </Link>
    )
  }

  return (
    <div
      className="rounded-xl p-3.5 sm:p-4"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px dashed var(--color-border)',
        opacity: 0.8,
      }}
    >
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
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay },
        }

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      {/* ── Background Grid ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative z-10">
        {/* ── Centered Hero Section ────────────────────────────── */}
        <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
            {/* Eyebrow Platform Badge */}
            <motion.div {...fade(0)} className="inline-flex items-center justify-center">
              <span
                className="px-3 py-1 rounded-full text-[11px] tracking-wide"
                style={{
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg-alt)',
                  color: 'var(--color-highlight)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                The Engineering Platform
              </span>
            </motion.div>

            {/* Core Headline */}
            <motion.h1
              {...fade(0.1)}
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              Engineering builds, R&D, and open source —{' '}
              <span style={{ color: 'var(--color-highlight)' }}>all in one place.</span>
            </motion.h1>

            {/* Platform Subtitle */}
            <motion.p
              {...fade(0.2)}
              className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Labgineer is an engineering hub to explore production-ready Web &amp; IoT projects, open-source libraries, real-world system design guides, and hardware R&amp;D.
            </motion.p>

            {/* Clean Primary Actions */}
            <motion.div
              {...fade(0.3)}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto"
            >
              <Link
                to="/products"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
                style={{
                  backgroundColor: 'var(--color-highlight)',
                  fontFamily: 'var(--font-mono)',
                  outlineColor: 'var(--color-highlight)',
                }}
              >
                Browse Projects
                <FiArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link
                to="/opensource"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold transition-colors ${focusRing}`}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                  outlineColor: 'var(--color-highlight)',
                }}
              >
                Open Source Tools
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Platform Areas Grid ────────────────────────────── */}
        <section className={`${wrap} pb-10 sm:pb-16`}>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((a) => (
              <AreaCard key={a.title} {...a} />
            ))}
          </div>
        </section>

        {/* ── Featured Projects Carousel ──────────────── */}
        <section
          className={`${section}`}
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
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
                    className={`p-2 rounded-lg transition-colors ${focusRing}`}
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-muted)',
                      outlineColor: 'var(--color-highlight)',
                    }}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next projects"
                    className={`p-2 rounded-lg transition-colors ${focusRing}`}
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-muted)',
                      outlineColor: 'var(--color-highlight)',
                    }}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              )}

              <Link
                to="/products"
                className={`hidden items-center gap-1.5 text-xs hover:underline sm:flex ${focusRing}`}
                style={{
                  color: 'var(--color-highlight)',
                  fontFamily: 'var(--font-mono)',
                  outlineColor: 'var(--color-highlight)',
                }}
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
            <div
              className="rounded-xl px-6 py-12 text-center"
              style={{
                border: '1px dashed var(--color-border)',
                backgroundColor: 'var(--color-bg-card)',
              }}
            >
              <p
                className="text-base font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                New projects are being added
              </p>
              <p
                className="mx-auto mt-1 max-w-sm text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Check back soon, or tell us what you need and we&apos;ll build it for you.
              </p>
              <a
                href="mailto:hi@labgineer.com"
                className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold hover:underline ${focusRing}`}
                style={{
                  color: 'var(--color-highlight)',
                  fontFamily: 'var(--font-mono)',
                  outlineColor: 'var(--color-highlight)',
                }}
              >
                <FiMail size={13} aria-hidden="true" /> hi@labgineer.com
              </a>
            </div>
          )}

          <Link
            to="/products"
            className={`mt-6 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:hidden ${focusRing}`}
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-highlight)',
              fontFamily: 'var(--font-mono)',
              outlineColor: 'var(--color-highlight)',
            }}
          >
            See all projects <FiArrowRight size={13} aria-hidden="true" />
          </Link>
        </section>

        {/* ── Open Source ────────────────────────────── */}
        <section
          className={`${section}`}
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <SectionHeader
              eyebrow="Open source"
              title="Free tools you can use today"
              subtitle="Open repositories and small, reusable modules."
            />
            <Link
              to="/opensource"
              className={`hidden shrink-0 items-center gap-1.5 text-xs hover:underline sm:flex ${focusRing}`}
              style={{
                color: 'var(--color-highlight)',
                fontFamily: 'var(--font-mono)',
                outlineColor: 'var(--color-highlight)',
              }}
            >
              See all <FiArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {openSourceHighlights.map((item) => (
              <article
                key={item.title}
                className="flex flex-col justify-between rounded-xl p-4 sm:p-5"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <h3
                    className="mb-1.5 text-base font-bold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md px-2 py-0.5 text-[10px]"
                        style={{
                          backgroundColor: 'var(--color-bg-alt)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={item.link}
                    className={`flex items-center gap-1 text-xs font-bold hover:underline ${focusRing}`}
                    style={{
                      color: 'var(--color-highlight)',
                      fontFamily: 'var(--font-mono)',
                      outlineColor: 'var(--color-highlight)',
                    }}
                  >
                    View source <FiArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Coming Soon ────────────────────────────── */}
        <section
          id="coming-soon"
          className={`${section} scroll-mt-20 relative overflow-hidden`}
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: 'var(--color-highlight-dim)' }}
          />

          <div className="mx-auto max-w-2xl relative z-10">
            <div className="text-center space-y-3 mb-8">
              <ComingSoonBadge />
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                R&amp;D Labs &amp; System Design
              </h2>
              <p
                className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Get notified when we publish hardware prototypes, test logs, microservice guides, and IoT messaging blueprints.
              </p>
            </div>

            <div
              className="p-2 sm:p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <FiMail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                  <input
                    type="email"
                    readOnly
                    value="subscribe@labgineer.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl focus:outline-none cursor-default select-all"
                    style={{
                      backgroundColor: 'var(--color-bg-alt)',
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-mono)',
                      border: '1px solid transparent',
                    }}
                  />
                </div>

                <a
                  href="mailto:subscribe@labgineer.com?subject=subscribe"
                  className={`w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all shadow-md hover:opacity-90 ${focusRing}`}
                  style={{
                    backgroundColor: 'var(--color-highlight)',
                    fontFamily: 'var(--font-mono)',
                    outlineColor: 'var(--color-highlight)',
                  }}
                >
                  Send "Subscribe"
                  <FiArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>

            <p
              className="mt-3 text-center text-[11px]"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              Clicking opens your default mail client with{' '}
              <span style={{ color: 'var(--color-text)' }}>"subscribe"</span> pre-filled.
            </p>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────── */}
        <section
          className={`${section}`}
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12 shadow-2xl"
            style={{
              backgroundColor: 'var(--color-highlight)',
              color: 'var(--color-bg)',
            }}
          >
            {/* Decorative background grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  color: 'var(--color-bg)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Custom Engineering
              </span>

              <h2
                className="text-2xl sm:text-4xl font-black tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg)' }}
              >
                Need something custom built for you?
              </h2>

              <p
                className="text-xs sm:text-sm font-medium leading-relaxed max-w-lg mx-auto"
                style={{ color: 'rgba(17, 15, 14, 0.85)' }}
              >
                We architect custom IoT firmware, high-throughput backends, and full-stack microservice systems. Reach out directly across any of our channels with your project scope.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:hi@labgineer.com"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-transform hover:-translate-y-0.5 shadow-lg active:translate-y-0"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <FiMail size={15} />
                  Email Us
                </a>

                <a
                  href="https://linkedin.com/company/labgineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors"
                  style={{
                    border: '1px solid rgba(17, 15, 14, 0.2)',
                    backgroundColor: 'rgba(17, 15, 14, 0.1)',
                    color: 'var(--color-bg)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <FiLinkedin size={15} />
                  LinkedIn
                  <FiArrowUpRight size={13} />
                </a>

                <a
                  href="https://instagram.com/labgineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors"
                  style={{
                    border: '1px solid rgba(17, 15, 14, 0.2)',
                    backgroundColor: 'rgba(17, 15, 14, 0.1)',
                    color: 'var(--color-bg)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <FiInstagram size={15} />
                  Instagram
                  <FiArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}