import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiRazorpay } from 'react-icons/si'

const footerLinks = {
  Platform: [
    { to: '/products', label: 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/research', label: 'Research' },
    { to: '/about', label: 'About' },
  ],
  Legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Use' },
    { to: '/refund', label: 'Refund Policy' },
  ],
}

const socials = [
  { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:hi@labgineer.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight font-display" style={{ color: 'var(--color-text)' }}>
                lab<span style={{ color: 'var(--color-highlight)' }}>gineer</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Engineering projects, IoT builds & research — built by a maker, for makers.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg border border-surface hover:border-highlight transition-all hover:-translate-y-0.5 text-muted hover:text-accent"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-muted hover:text-accent link-underline transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Stay updated</h4>
            <p className="text-sm text-muted mb-3">Get notified on new projects & research drops.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 text-sm rounded-lg border border-surface bg-surface-alt text-primary placeholder-muted focus:outline-none focus:border-highlight transition-colors font-mono"
              />
              <button
                className="w-full py-2 text-sm font-mono font-bold rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-highlight)' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-surface flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted font-mono">
            © {new Date().getFullYear()} labgineer.com — All rights reserved
          </p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>Payments secured by</span>
            <SiRazorpay size={14} style={{ color: 'var(--color-highlight)' }} />
            <span className="font-mono">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}