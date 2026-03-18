import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useState, useEffect } from "react"
import profile from "../assets/images/profile.png"

const ROLES = ["Data Scientist", "Full Stack Developer", "Student"]
const TYPE_SPEED = 80
const DELETE_SPEED = 45
const PAUSE_AFTER_TYPE = 1600

const useTypewriter = (words) => {
  const [display, setDisplay]     = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused]   = useState(false)

  useEffect(() => {
    if (isPaused) return
    const current = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, display.length + 1)
        setDisplay(next)
        if (next === current) {
          setIsPaused(true)
          setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, PAUSE_AFTER_TYPE)
        }
      } else {
        const next = current.slice(0, display.length - 1)
        setDisplay(next)
        if (next === "") { setIsDeleting(false); setWordIndex(i => (i + 1) % words.length) }
      }
    }, isDeleting ? DELETE_SPEED : TYPE_SPEED)
    return () => clearTimeout(timeout)
  }, [display, isDeleting, isPaused, wordIndex, words])

  return display
}

const Hero = () => {
  const typedRole = useTypewriter(ROLES)

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5 text-center md:text-left items-center md:items-start order-2 md:order-1">

          <p className="text-cyan-400 text-base sm:text-lg font-medium tracking-widest uppercase">
            Hello, I'm
          </p>

          <div className="w-full">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight glow-text"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500
                bg-clip-text text-transparent">
                Mohammad Junaid
              </span>
            </h1>

            {/* Typewriter */}
            <div className="mt-3 h-9 flex items-center justify-center md:justify-start">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300">
                I'm a&nbsp;
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400">
                {typedRole}
              </span>
              <span className="typewriter-cursor" />
            </div>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
            I am a passionate Data Scientist and Software Developer who enjoys transforming
            complex data into meaningful insights and building intelligent systems. My journey
            involves developing machine learning models, exploring data-driven solutions, and
            engineering full-stack applications that solve real-world problems. I work with
            modern technologies across both data science and web development ecosystems to
            build impactful digital products.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
            <a href="#projects" className="btn-glow">Projects</a>
            <a href="#contact" className="btn-glow">Contact</a>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center md:justify-start gap-5 text-2xl text-slate-400">
            <a
              href="https://github.com/Mdjunaid06"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-junaid-30564b2a8"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* ── RIGHT — Floating Profile ── */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="profile-float">
            <div className="profile-ring" />
            <img
              src={profile}
              alt="Mohammad Junaid"
              className="relative
                w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px]
                object-cover rounded-full border-4 border-cyan-400
                shadow-[0_0_60px_rgba(34,211,238,0.6),0_0_120px_rgba(34,211,238,0.25)]"
            />
          </div>
        </div>

      </div>

      <style>{`
        .profile-float {
          position: relative;
          animation: floatY 4s ease-in-out infinite;
        }
        .profile-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%);
          transform: scale(1.18);
          animation: pulseRing 4s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-18px); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.5; transform: scale(1.18); }
          50%       { opacity: 1;   transform: scale(1.28); }
        }
        .typewriter-cursor {
          display: inline-block;
          width: 2px;
          height: 1.3rem;
          background: #22d3ee;
          margin-left: 2px;
          border-radius: 1px;
          vertical-align: middle;
          animation: blink 0.75s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .btn-glow {
          display: inline-block;
          width: 145px;
          padding: 0.8rem 0;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          border-radius: 0.4rem;
          cursor: pointer;
          background-color: rgb(14, 14, 26);
          color: rgb(234, 234, 234);
          box-shadow: 0 0 60px #1f4c65;
          transition: all 0.5s ease;
          -webkit-box-reflect: below 8px linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
        }
        .btn-glow:hover {
          background: linear-gradient(270deg, rgba(2,29,78,0.68) 0%, rgba(31,215,232,0.87) 60%);
          color: rgb(4,4,38);
          box-shadow: 0 0 80px rgba(31,215,232,0.7);
        }
        .btn-glow:active { transform: scale(0.93); }
        @media (max-width: 480px) {
          .btn-glow { width: 130px; font-size: 0.8rem; }
        }
      `}</style>
    </section>
  )
}

export default Hero
