import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiShoppingBag,
  FiCode,
  FiCpu,
  FiLayers,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useFetch } from "../hooks/useApi";
import ProductCard from "../components/product/ProductCard";
import { SectionHeader, Spinner } from "../components/common/Ui";
import {
  FiMail,
  FiLinkedin,
  FiInstagram,
  FiArrowUpRight,
} from "react-icons/fi";

/* ── Shared styles ─────────────────────────────────────── */

const wrap = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
const section = `${wrap} py-10 sm:py-16`;
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight";

/* ── Content ───────────────────────────────────────────── */

const areas = [
  {
    icon: FiShoppingBag,
    title: "Projects for Sale",
    text: "Production-ready Web & IoT builds with source code and docs.",
    to: "/products",
  },
  {
    icon: FiCode,
    title: "Open Source",
    text: "Free tools, libraries, and frameworks you can use today.",
    to: "/opensource",
  },
  {
    icon: FiCpu,
    title: "R&D Labs",
    text: "Hardware prototypes, experiments, and technical writeups.",
  },
  {
    icon: FiLayers,
    title: "System Design",
    text: "Guides on building scalable systems, messaging, and caching.",
  },
];

const openSourceHighlights = [
  {
    title: "Payguard - Agentic runtime for payment gateways",
    desc: "A Node.js library for building payment gateway integrations with a focus on security and reliability.",
    tags: ["Node.js", "Payment", "Architecture"],
    link: "/opensource",
  },
  {
    title: "Liwebjs - Lightweight real-time communication framework",
    desc: "A lightweight framework for building real-time web applications with WebSocket support.",
    tags: ["Node.js", "Web", "Framework"],
    link: "/opensource",
  },
];

/* ── Small pieces ──────────────────────────────────────── */

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-highlight/40 px-2 py-0.5 text-[10px] font-mono text-highlight shrink-0">
      <FiClock size={10} aria-hidden="true" />
      Soon
    </span>
  );
}

function AreaCard({ icon: Icon, title, text, to }) {
  const content = (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="p-2 sm:p-2.5 rounded-lg bg-surface-alt border border-surface shrink-0 mt-0.5">
        <Icon
          size={18}
          className={to ? "text-highlight" : "text-muted"}
          aria-hidden="true"
        />
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
        <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
          {text}
        </p>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`group block rounded-xl border border-surface bg-card p-3.5 sm:p-4 transition-colors hover:border-highlight ${focusRing}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-surface p-3.5 sm:p-4 bg-card/40">
      {content}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  const reduce = useReducedMotion();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { data: featuredData, loading: productsLoading } =
    useFetch("/products/featured");
  const featured = featuredData || [];

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? Math.max(0, featured.length - 1) : prev - 1,
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev >= featured.length - 1 ? 0 : prev + 1));
  };

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay },
        };

  return (
    <div>
      {/* ── Centered Hero Section ────────────────────────────── */}
      <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          {/* Eyebrow Platform Badge */}
          <motion.div
            {...fade(0)}
            className="inline-flex items-center justify-center"
          >
            <span className="px-3 py-1 rounded-full border border-surface bg-surface-alt text-[11px] font-mono text-highlight tracking-wide">
              The Engineering Platform
            </span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            {...fade(0.1)}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-primary leading-[1.15]"
          >
            Engineering builds, R&D, and open source —{" "}
            <span className="text-highlight">all in one place.</span>
          </motion.h1>

          {/* Platform Subtitle */}
          <motion.p
            {...fade(0.2)}
            className="text-xs sm:text-sm text-muted max-w-xl mx-auto leading-relaxed"
          >
            Labgineer is an engineering hub to explore production-ready Web
            &amp; IoT projects, open-source libraries, real-world system design
            guides, and hardware R&amp;D.
          </motion.p>

          {/* Clean Primary Actions */}
          <motion.div
            {...fade(0.3)}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto"
          >
            <Link
              to="/products"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-mono font-semibold text-white transition-opacity hover:opacity-90 ${focusRing}`}
              style={{ backgroundColor: "var(--color-highlight)" }}
            >
              Browse Projects
              <FiArrowRight size={13} aria-hidden="true" />
            </Link>
            <Link
              to="/opensource"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-surface bg-card px-6 py-2.5 text-xs font-mono font-semibold text-muted transition-colors hover:border-highlight hover:text-primary ${focusRing}`}
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
            <p className="font-display text-base font-bold text-primary">
              New projects are being added
            </p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted">
              Check back soon, or tell us what you need and we&apos;ll build it
              for you.
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

      {/* ── Open Source ────────────────────────────── */}
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
                <h3 className="mb-1.5 text-base font-bold font-display text-primary">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {item.desc}
                </p>
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

      {/* ── Coming Soon ────────────────────────────── */}
      <section
        id="coming-soon"
        className={`${section} scroll-mt-20 border-t border-surface relative overflow-hidden`}
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-2xl relative z-10">
          {/* Badge & Title */}
          <div className="text-center space-y-3 mb-8">
            <ComingSoonBadge />
            <h2 className="font-display text-2xl sm:text-3xl font-black text-primary tracking-tight">
              R&amp;D Labs &amp; System Design
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
              Get notified when we publish hardware prototypes, test logs,
              microservice guides, and IoT messaging blueprints.
            </p>
          </div>

          {/* Glassmorphism Interactive Bar */}
          <div className="p-2 sm:p-2.5 rounded-2xl border border-surface/80 bg-card/30 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <FiMail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="email"
                  readOnly
                  value="subscribe@labgineer.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl border border-transparent bg-surface-alt/60 text-muted focus:outline-none cursor-default select-all"
                />
              </div>

              <a
                href="mailto:subscribe@labgineer.com?subject=subscribe"
                className={`w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-mono font-semibold text-white transition-all shadow-md hover:opacity-90 ${focusRing}`}
                style={{ backgroundColor: "var(--color-highlight)" }}
              >
                Send "Subscribe"
                <FiArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] font-mono text-muted/70">
            Clicking opens your default mail client with{" "}
            <span className="text-primary">"subscribe"</span> pre-filled.
          </p>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────── */}
      <section className={`${section} border-t border-surface`}>
        <div className="relative overflow-hidden rounded-3xl bg-orange-500 p-8 sm:p-12 text-slate-950 shadow-2xl">
          {/* Decorative background grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            {/* Eye-catching Badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-slate-950/10 text-slate-950 font-mono text-[11px] font-bold tracking-wider uppercase">
              Custom Engineering
            </span>

            {/* Main Heading */}
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
              Need something custom built for you?
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm font-medium text-slate-900/80 leading-relaxed max-w-lg mx-auto">
              We architect custom IoT firmware, high-throughput backends, and
              full-stack microservice systems. Reach out directly across any of
              our channels with your project scope.
            </p>

            {/* Action Channels */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              {/* Email CTA */}
              <a
                href="mailto:hi@labgineer.com"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-mono font-bold text-white transition-transform hover:-translate-y-0.5 shadow-lg active:translate-y-0"
              >
                <FiMail size={15} />
                Email Us
              </a>

              {/* LinkedIn Link */}
              <a
                // href="https://linkedin.com/company/labgineer"
                href="https://linkedin.com/in/sumeet-umbalkar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-950/20 bg-slate-950/10 px-4 py-2.5 text-xs font-mono font-bold text-slate-950 transition-colors hover:bg-slate-950 hover:text-white"
              >
                <FiLinkedin size={15} />
                LinkedIn
                <FiArrowUpRight size={13} />
              </a>

              {/* Instagram Link */}
              <a
                href="https://instagram.com/labgineer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-950/20 bg-slate-950/10 px-4 py-2.5 text-xs font-mono font-bold text-slate-950 transition-colors hover:bg-slate-950 hover:text-white"
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
  );
}
