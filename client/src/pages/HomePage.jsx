import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiZap } from 'react-icons/fi'
import { BsWifi, BsCode, BsFileText, BsFlask } from 'react-icons/bs'
import { productAPI, blogAPI } from '../api/services'
import { useFetch } from '../hooks/useApi'
import ProductCard from '../components/product/ProductCard'
import BlogCard from '../components/blog/BlogCard'
import { SectionHeader, Spinner } from '../components/common/UI'

import {
  FiSettings,
  FiCpu,
  FiCode,
  FiTool,
  FiDatabase,
  FiHardDrive,
} from "react-icons/fi";

const floatingIcons = [
  { Icon: FiSettings, x: -180, y: -80, delay: 0 },
  { Icon: FiCpu, x: 180, y: -100, delay: 0.8 },
  { Icon: FiCode, x: -220, y: 90, delay: 1.6 },
  { Icon: FiTool, x: 220, y: 80, delay: 2.4 },
  { Icon: FiDatabase, x: -90, y: 180, delay: 3.2 },
  { Icon: FiHardDrive, x: 120, y: 170, delay: 4 },
];

const staggerChildren = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stats = [
  { value: '14+', label: 'Projects shipped' },
  { value: '10+', label: 'IoT builds' },
  { value: '100%', label: 'Open docs' },
]

const categories = [
  { icon: BsWifi, label: 'IoT & Embedded', href: '/products?category=iot', color: 'from-orange-500/20 to-amber-500/10' },
  { icon: BsCode, label: 'Web Projects', href: '/products?category=web', color: 'from-blue-500/20 to-cyan-500/10' },
  { icon: BsFileText, label: 'Blog & Guides', href: '/blog', color: 'from-emerald-500/20 to-teal-500/10' },
  { icon: BsFlask, label: 'Research Papers', href: '/research', color: 'from-purple-500/20 to-indigo-500/10' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const { data: featuredData, loading: productsLoading } = useFetch('/products/featured')
  const { data: blogsData, loading: blogsLoading } = useFetch('/blog', { params: { limit: 3 } })

  const featured = featuredData?.products || []
  const blogs = blogsData?.posts || []

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="
          relative
          overflow-hidden
          flex
          items-center
          justify-center
          px-5
          py-20
          sm:py-24
          lg:min-h-screen
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[280px]
            h-[280px]
            md:w-[500px]
            md:h-[500px]
            rounded-full
            blur-[100px]
            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(circle, rgba(43,20,4,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Floating Engineering Icons */}
        {floatingIcons.map(({ Icon, x, y, delay }, index) => (
          <motion.div
            key={index}
            className="absolute text-highlight/20 md:text-highlight/40 pointer-events-none"
            initial={{
              opacity: 0,
              scale: 0.5,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.5, 1, 0.7],
              x,
              y,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-5 h-5 md:w-7 md:h-7 opacity-50" />
          </motion.div>
        ))}

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center gap-3 sm:gap-4"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="tag-pill ">
                <FiZap size={10} className="mr-1" />
                Engineering Projects & Research
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="
                font-display
                font-black
                tracking-tight
                leading-[1.1]
                py-2
              "
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
              }}
            >
              <span style={{ color: "var(--color-text)" }}>
                Build.
              </span>{" "}
              <span style={{ color: "var(--color-text)" }}>
                Learn.
              </span>
              <br />
              <span style={{ color: "var(--color-highlight)" }}>
                Ship.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="
                max-w-xl
                text-sm
                sm:text-base
                md:text-lg
                text-muted
                leading-relaxed
              "
            >
              Premium IoT projects, engineering research,
              embedded systems, web applications, and
              practical real-world builds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                mt-2
              "
            >
              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  font-mono
                  font-semibold
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                  glow-orange
                "
                style={{
                  backgroundColor: "var(--color-highlight)",
                }}
              >
                Browse Projects
                <FiArrowRight size={14} />
              </Link>

              <Link
                to="/blog"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  font-mono
                  font-semibold
                  border
                  border-surface
                  text-muted
                  hover:text-primary
                  hover:border-highlight
                  transition-all
                "
              >
                Read Blog
              </Link>
            </motion.div>

            {/* Modern Stats Pills */}
            <motion.div
              variants={fadeUp}
              className="
                flex
                flex-wrap
                justify-center
                gap-2
                mt-4
                max-w-xl
              "
            >
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-surface
                    bg-surface/30
                    backdrop-blur-sm
                  "
                >
                  <span className="font-bold text-accent">
                    {value}
                  </span>
                  <span className="ml-1 text-sm text-muted">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            hidden
            md:block
          "
        >
          <div
            className="w-px h-8 bg-gradient-to-b from-highlight to-transparent"
            style={{
              "--highlight": "var(--color-highlight)",
            }}
          />
        </motion.div>
      </section>

      {/* ── Categories ────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(({ icon: Icon, label, href, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={href}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border border-surface bg-gradient-to-br ${color} hover:border-highlight/40 transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className="p-3 rounded-xl bg-surface-alt group-hover:bg-card transition-colors border border-surface">
                  <Icon size={22} style={{ color: 'var(--color-highlight)' }} />
                </div>
                <span className="text-sm font-mono font-bold text-primary text-center leading-tight">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            eyebrow="Projects"
            title="Featured builds"
            subtitle="Handpicked IoT and web projects, production-ready with full docs."
          />
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-mono text-accent hover:gap-3 transition-all"
          >
            All projects <FiArrowRight size={13} />
          </Link>
        </div>

        {productsLoading ? (
          <div className="py-20"><Spinner size={32} /></div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        ) : (
          /* Placeholder cards during development */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-surface rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-surface-alt" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-surface-alt rounded w-1/3" />
                  <div className="h-4 bg-surface-alt rounded w-3/4" />
                  <div className="h-3 bg-surface-alt rounded w-full" />
                  <div className="h-8 bg-surface-alt rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Blog preview ─────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            eyebrow="Blog"
            title="Latest posts"
            subtitle="Deep dives, tutorials, and engineering notes."
          />
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-mono text-accent hover:gap-3 transition-all"
          >
            All posts <FiArrowRight size={13} />
          </Link>
        </div>

        {blogsLoading ? (
          <div className="py-20"><Spinner size={32} /></div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((p, i) => <BlogCard key={p._id} post={p} index={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-surface rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-surface-alt" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-surface-alt rounded w-1/4" />
                  <div className="h-4 bg-surface-alt rounded w-2/3" />
                  <div className="h-3 bg-surface-alt rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-surface overflow-hidden p-12 text-center grid-bg"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <span className="tag-pill mb-4 inline-block">Open to work & collabs</span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-primary mb-4">
              Got a project idea?
            </h2>
            <p className="text-muted max-w-lg mx-auto mb-8 leading-relaxed">
              Whether it's a custom IoT build, web project, or research collab — let's make it happen.
            </p>
            <a
              href="mailto:hi@labgineer.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-mono font-bold text-white transition-all hover:opacity-90 hover:-translate-y-1 glow-orange"
              style={{ backgroundColor: 'var(--color-highlight)' }}
            >
              Get in touch <FiArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}