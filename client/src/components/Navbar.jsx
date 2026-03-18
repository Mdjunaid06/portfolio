import { useState } from "react"
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa"
import { HiMenu, HiX } from "react-icons/hi"

const NAV_LINKS = ["Home", "Projects", "Skills", "Contact"]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-black/40 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <h1
          className="text-xl font-bold text-cyan-400 tracking-wide flex-shrink-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Junaid.dev
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
              {link}
            </a>
          ))}
        </div>

        {/* Desktop Right: Social + CV */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Mdjunaid06"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all duration-200 text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammad-junaid-30564b2a8"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all duration-200 text-xl"
          >
            <FaLinkedin />
          </a>

          <div className="w-px h-5 bg-slate-700" />

          <a href="/cv.pdf" download className="cv-btn">
            <FaDownload className="text-xs flex-shrink-0" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-300 text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-5
          text-slate-300 text-sm font-medium border-t border-slate-800">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <a href="/cv.pdf" download onClick={() => setMenuOpen(false)} className="cv-btn w-fit">
            <FaDownload className="text-xs flex-shrink-0" />
            <span>Download CV</span>
          </a>
          <div className="flex gap-5 text-xl pt-1">
            <a href="https://github.com/Mdjunaid06" target="_blank" rel="noreferrer"
              className="hover:text-cyan-400 transition"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/mohammad-junaid-30564b2a8" target="_blank" rel="noreferrer"
              className="hover:text-cyan-400 transition"><FaLinkedin /></a>
          </div>
        </div>
      )}

      <style>{`
        .cv-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          border: 1.5px solid #f97316;
          color: #f97316;
          background: transparent;
          box-shadow: 0 0 12px rgba(249,115,22,0.25);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .cv-btn:hover {
          background: #f97316;
          color: #000;
          box-shadow: 0 0 28px rgba(249,115,22,0.7);
          transform: translateY(-1px);
        }
        .cv-btn:active { transform: scale(0.95); }
      `}</style>
    </nav>
  )
}

export default Navbar
