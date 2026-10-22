import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiStar,
  FiGitBranch,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiSearch,
  FiGithub,
  FiPackage,
  FiX,
} from "react-icons/fi";

/* ── Sample Open Source Repositories Data ─────────────────── */
const ossProjects = [
  {
    id: "payguard",
    title: "Payguard",
    tagline: "Agentic runtime & SDK for secure payment gateway integrations",
    description:
      "A lightweight Node.js library designed to structure payment gateway flows with high resilience, automated retries, and strict transaction state validation.",
    tags: ["Node.js", "Payment", "TypeScript", "Security"],
    stars: 2,
    forks: 0,
    installCommand: "npm install payguard",
    githubUrl: "https://github.com/sumeet57/payguard",
    docsUrl: "https://payguard.sumeet.app",
    featured: true,
  },
  {
    id: "liwebjs",
    title: "Liwebjs",
    tagline: "Lightweight real-time communication framework",
    description:
      "Minimalist framework for managing high-throughput, low-latency WebSocket connections with automatic reconnects and pub/sub routing.",
    tags: ["Node.js", "WebSockets", "Real-Time", "Framework", "TypeScript"],
    stars: 2,
    forks: 1,
    installCommand: "npm install liwebjs",
    githubUrl: "https://github.com/sumeet57/liwebjs",
    docsUrl: "https://liwebjs.sumeet.app",
    featured: true,
  },
];

/* ── Copy Command Button Sub-Component ───────────────────── */
function CopySnippet({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-surface-alt/70 border border-surface text-xs font-mono text-muted">
      <span className="truncate text-primary">{code}</span>
      <button
        onClick={handleCopy}
        className="p-1 rounded hover:bg-surface text-muted hover:text-primary transition-colors shrink-0"
        aria-label="Copy command"
      >
        {copied ? (
          <FiCheck size={13} className="text-emerald-500" />
        ) : (
          <FiCopy size={13} />
        )}
      </button>
    </div>
  );
}

/* ── Main OSS Page Component ─────────────────────────────── */
export default function OSSPage() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Extract all unique tags
  const allTags = ["all", ...new Set(ossProjects.flatMap((p) => p.tags))];

  // Filter projects based on search query and selected tag
  const filteredProjects = ossProjects.filter((project) => {
    const matchesQuery =
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

    const matchesTag =
      selectedTag === "all" ||
      project.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesQuery && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-surface bg-surface-alt text-[11px] font-mono text-highlight font-semibold">
          <FiCode size={12} /> Open Source Software
        </span>

        <h1 className="text-2xl sm:text-4xl font-black font-display text-primary tracking-tight">
          Free Tools &amp; Libraries
        </h1>

        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Open-source repositories, lightweight runtime toolkits, and firmwares
          maintained by Labgineer for developers and makers.
        </p>
      </div>

      {/* Control Bar: Search & Tag Filters */}
      <div className="bg-card border border-surface rounded-xl p-3.5 mb-8 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools or tags..."
              className="w-full pl-9 pr-8 py-1.5 text-xs font-mono rounded-lg border border-surface bg-surface-alt text-primary placeholder-muted focus:outline-none focus:border-highlight"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
              >
                <FiX size={13} />
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {allTags.map((tag) => {
              const isActive = selectedTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono capitalize transition-colors shrink-0 ${
                    isActive
                      ? "bg-highlight text-white font-semibold"
                      : "bg-surface-alt/50 border border-surface text-muted hover:text-primary"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--color-highlight)" }
                      : {}
                  }
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col justify-between bg-card border border-surface rounded-xl p-5 shadow-sm hover:border-highlight/50 transition-colors"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <FiPackage size={18} className="text-highlight shrink-0" />
                    <h2 className="text-base font-bold font-display text-primary">
                      {project.title}
                    </h2>
                  </div>

                  {/* GitHub Repo Metrics */}
                  <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
                    <span className="flex items-center gap-1">
                      <FiStar size={12} className="text-amber-400" />{" "}
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitBranch size={12} /> {project.forks}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-mono text-accent mb-2">
                  {project.tagline}
                </p>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Quick Install Command */}
                {project.installCommand && (
                  <CopySnippet code={project.installCommand} />
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-4 border-t border-surface/70 flex flex-wrap items-center justify-between gap-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-surface bg-surface-alt/40 px-2 py-0.5 text-[10px] font-mono text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:text-accent transition-colors"
                    >
                      <FiGithub size={13} /> GitHub
                    </a>
                  )}

                  {project.docsUrl && (
                    <a
                      href={project.docsUrl}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-highlight hover:underline"
                    >
                      Docs <FiExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty Filter State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-dashed border-surface rounded-xl bg-card/30">
          <FiCode size={28} className="mx-auto text-muted mb-2" />
          <p className="text-sm font-bold text-primary">
            No open source projects found
          </p>
          <p className="text-xs text-muted mt-1">
            Try clearing your search query or tag filter.
          </p>
        </div>
      )}
    </div>
  );
}
