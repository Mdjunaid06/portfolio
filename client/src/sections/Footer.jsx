import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from "react-icons/fa"
import { SiReact, SiVite, SiTailwindcss } from "react-icons/si"
import { useState, useEffect } from "react"

const FOOTER_CONFIG = {
  name:     "Mohammad Junaid",
  tagline:  "Data Scientist & Full Stack Developer",
  email:    "mdjunaid.200606@gmail.com",
  github:   "https://github.com/Mdjunaid06",
  linkedin: "https://www.linkedin.com/in/mohammad-junaid-30564b2a8",
}

const NAV_LINKS = [
  { label: "Home",        href: "#home"         },
  { label: "Skills",      href: "#skills"       },
  { label: "ML Projects", href: "#ml-projects"  },
  { label: "Full Stack",  href: "#projects"     },
  { label: "Stats",       href: "#stats"        },
  { label: "Contact",     href: "#contact"      },
]

const Footer = () => {
  const [showTop, setShowTop] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      <footer className="footer">
        <div className="footer-glow-line" />

        <div className="footer-inner">

          {/* ── Top row ── */}
          <div className="footer-top">

            {/* Brand */}
            <div className="footer-brand">
              <span className="footer-logo">Junaid.dev</span>
              <p className="footer-tagline">{FOOTER_CONFIG.tagline}</p>
              <p className="footer-desc">
                Building intelligent systems and modern web applications.
                Open to freelance, internships and collaborations.
              </p>
              <div className="footer-socials">
                <a href={FOOTER_CONFIG.github} target="_blank" rel="noreferrer"
                  className="footer-social-btn" title="GitHub">
                  <FaGithub />
                </a>
                <a href={FOOTER_CONFIG.linkedin} target="_blank" rel="noreferrer"
                  className="footer-social-btn" title="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href={`mailto:${FOOTER_CONFIG.email}`}
                  className="footer-social-btn" title="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="footer-nav">
              <p className="footer-nav-title">Quick Links</p>
              <ul className="footer-nav-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-nav-link">
                      <span className="footer-nav-arrow">→</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <p className="footer-nav-title">Get In Touch</p>
              <div className="footer-contact-items">
                <a href={`mailto:${FOOTER_CONFIG.email}`} className="footer-contact-item">
                  <FaEnvelope className="footer-contact-icon" />
                  <span>{FOOTER_CONFIG.email}</span>
                </a>
                <a href={FOOTER_CONFIG.github} target="_blank" rel="noreferrer"
                  className="footer-contact-item">
                  <FaGithub className="footer-contact-icon" />
                  <span>github.com/Mdjunaid06</span>
                </a>
                <a href={FOOTER_CONFIG.linkedin} target="_blank" rel="noreferrer"
                  className="footer-contact-item">
                  <FaLinkedin className="footer-contact-icon" />
                  <span>Mohammad Junaid</span>
                </a>
              </div>
              <a href="/cv.pdf" download className="footer-cv-btn">
                ↓ Download CV
              </a>
            </div>

          </div>

          <div className="footer-divider" />

          {/* ── Bottom row ── */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {year} {FOOTER_CONFIG.name}. All rights reserved.
            </p>
            <div className="footer-built">
              <span>Built with</span>
              <FaHeart className="footer-heart" />
              <span>using</span>
              <span className="footer-tech-pill">
                <SiReact style={{ color: "#61DAFB" }} /> React
              </span>
              <span className="footer-tech-pill">
                <SiVite style={{ color: "#646CFF" }} /> Vite
              </span>
              <span className="footer-tech-pill">
                <SiTailwindcss style={{ color: "#06B6D4" }} /> Tailwind
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="scroll-top-btn"
        style={{
          opacity:       showTop ? 1 : 0,
          transform:     showTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          pointerEvents: showTop ? "auto" : "none",
          transition:    "all 0.3s ease",
        }}
        title="Back to top"
      >
        <FaArrowUp />
      </button>

      <style>{`
        .footer {
          position: relative;
          background: rgba(2,8,23,0.95);
          border-top: 1px solid rgba(34,211,238,0.1);
          margin-top: 2rem;
        }
        .footer-glow-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(34,211,238,0.5) 30%,
            rgba(59,130,246,0.5) 70%, transparent 100%);
        }
        .footer-inner {
          max-width: 1152px; margin: 0 auto;
          padding: 3.5rem 1.5rem 2rem;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 3rem; margin-bottom: 2.5rem;
        }
        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
        }
        .footer-brand { display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-logo {
          font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800;
          background: linear-gradient(90deg, #22d3ee, #3b82f6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .footer-tagline { font-size: 0.78rem; color: #22d3ee; font-weight: 600; letter-spacing: 0.04em; }
        .footer-desc { font-size: 0.8rem; color: #64748b; line-height: 1.7; max-width: 280px; margin-top: 0.15rem; }
        .footer-socials { display: flex; gap: 0.6rem; margin-top: 0.5rem; }
        .footer-social-btn {
          width: 36px; height: 36px; border-radius: 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(34,211,238,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #64748b; font-size: 0.95rem; text-decoration: none;
          transition: all 0.25s ease;
        }
        .footer-social-btn:hover {
          color: #22d3ee; border-color: rgba(34,211,238,0.35);
          background: rgba(34,211,238,0.08); transform: translateY(-3px);
        }
        .footer-nav-title {
          font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700;
          color: #f1f5f9; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem;
        }
        .footer-nav-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-nav-link {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.8rem; color: #64748b; text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }
        .footer-nav-link:hover { color: #22d3ee; gap: 0.6rem; }
        .footer-nav-arrow { font-size: 0.7rem; color: #334155; transition: color 0.2s; }
        .footer-nav-link:hover .footer-nav-arrow { color: #22d3ee; }
        .footer-contact { display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-contact-items { display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-contact-item {
          display: flex; align-items: center; gap: 0.55rem;
          font-size: 0.78rem; color: #64748b; text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-item:hover { color: #22d3ee; }
        .footer-contact-icon { font-size: 0.8rem; color: #22d3ee; flex-shrink: 0; }
        .footer-cv-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          margin-top: 0.5rem; width: fit-content;
          padding: 0.45rem 1rem; border-radius: 0.4rem;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; border: 1.5px solid #f97316; color: #f97316;
          transition: all 0.3s ease;
        }
        .footer-cv-btn:hover {
          background: #f97316; color: #000;
          box-shadow: 0 0 20px rgba(249,115,22,0.5);
        }
        .footer-divider {
          height: 1px; margin-bottom: 1.5rem;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent);
        }
        .footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
        }
        .footer-copy { font-size: 0.75rem; color: #334155; }
        .footer-built {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.72rem; color: #334155; flex-wrap: wrap;
        }
        .footer-heart {
          color: #f43f5e; font-size: 0.65rem;
          animation: heartbeat 1.4s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.3); }
        }
        .footer-tech-pill {
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding: 0.15rem 0.5rem; border-radius: 99px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #475569; font-size: 0.68rem; font-weight: 600;
        }
        .scroll-top-btn {
          position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 99;
          width: 42px; height: 42px; border-radius: 0.6rem;
          background: rgba(34,211,238,0.12);
          border: 1px solid rgba(34,211,238,0.3);
          color: #22d3ee; font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 0 16px rgba(34,211,238,0.15);
        }
        .scroll-top-btn:hover {
          background: rgba(34,211,238,0.22);
          box-shadow: 0 0 28px rgba(34,211,238,0.35);
          transform: translateY(-3px) !important;
        }
        @media (max-width: 480px) {
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  )
}

export default Footer
