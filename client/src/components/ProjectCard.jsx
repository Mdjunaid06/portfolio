import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"

// ──────────────────────────────────────────────────────────────────
//  BADGE CONFIG — controls how each status looks visually
//  You do NOT need to edit this. Change status in projects.js only.
// ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  // Yellow badge for projects still being built
  working: {
    label:  "Work In Progress",
    bg:     "rgba(234,179,8,0.15)",
    border: "rgba(234,179,8,0.4)",
    color:  "#facc15",
    dot:    "#facc15",
  },
  // Purple badge for projects being improved/refactored
  updating: {
    label:  "Currently Improving",
    bg:     "rgba(99,102,241,0.15)",
    border: "rgba(99,102,241,0.4)",
    color:  "#818cf8",
    dot:    "#818cf8",
  },
  // No badge for completed projects — card stays clean
  completed: null,
}

// ──────────────────────────────────────────────────────────────────
//  ProjectCard Component
//  Receives a single `project` object from projects.js
//  You don't need to edit this file — edit projects.js instead
// ──────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {

  // Scroll-reveal: card fades in when it enters the viewport
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Get badge config based on project.status from projects.js
  const badge = STATUS_CONFIG[project.status]

  return (
    <>
      <div
        ref={ref}
        className="pcard"
        style={{
          // Staggered entrance: each card delays slightly after the previous
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
        }}
      >

        {/* ── Animated orb — decorative hover effect ── */}
        {/* This circle starts blurred top-left and slides to center-right on hover */}
        <div className="pcard-orb" />

        {/* ────────────────────────────────────────────────────────
            IMAGE STRIP
            Set  image: "/projects/your-file.png"  in projects.js
            If image is empty, a styled placeholder is shown instead
        ──────────────────────────────────────────────────────── */}
        <div className="pcard-img-wrap">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="pcard-img"
            />
          ) : (
            // Placeholder shown when no image is provided
            <div className="pcard-img-placeholder">
              <span>No Preview Available</span>
            </div>
          )}

          {/* ── Status badge ── */}
          {/* Badge sits at the BOTTOM of the image so it never overlaps the title */}
          {/* Controlled by  status: "working" | "updating" | "completed"  in projects.js */}
          {badge && (
            <div
              className="pcard-badge"
              style={{
                background: badge.bg,
                border:     `1px solid ${badge.border}`,
                color:      badge.color,
              }}
            >
              {/* Pulsing dot indicator */}
              <span
                className="pcard-badge-dot"
                style={{ background: badge.dot }}
              />
              {badge.label}
            </div>
          )}
        </div>

        {/* ────────────────────────────────────────────────────────
            CARD BODY — title, description, tags
            All values come from projects.js
        ──────────────────────────────────────────────────────── */}
        <div className="pcard-body">

          {/* Project name — edit  title: ""  in projects.js */}
          <h3 className="pcard-title">{project.title}</h3>

          {/* Short description — edit  description: ""  in projects.js */}
          <p className="pcard-desc">{project.description}</p>

          {/* Tech stack pills — edit  tags: []  array in projects.js */}
          <div className="pcard-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="pcard-tag">{tag}</span>
            ))}
          </div>

        </div>

        {/* ────────────────────────────────────────────────────────
            ACTION BAR — GitHub + Live Demo buttons
            ● GitHub button → edit  github: "your-repo-url"  in projects.js
            ● Live button   → edit  live: "your-live-url"    in projects.js
            ● Set either to ""  to show it as disabled/greyed out
        ──────────────────────────────────────────────────────── */}
        <div className="pcard-actions">

          {/* GitHub / Code button */}
          {project.github ? (
            // Has a github link — show as clickable
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="pcard-btn"
              title="View source code on GitHub"
            >
              <FaGithub className="pcard-btn-icon" />
              <span>Code</span>
            </a>
          ) : (
            // No github link — show as disabled
            <span className="pcard-btn pcard-btn--disabled" title="Repository not available">
              <FaGithub className="pcard-btn-icon" />
              <span>Code</span>
            </span>
          )}

          {/* Live Demo button */}
          {project.live ? (
            // Has a live link — show as clickable
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="pcard-btn pcard-btn--live"
              title="View live demo"
            >
              <FaExternalLinkAlt className="pcard-btn-icon" />
              <span>Live Demo</span>
            </a>
          ) : (
            // No live link — show as disabled
            <span className="pcard-btn pcard-btn--disabled" title="Live demo not available">
              <FaExternalLinkAlt className="pcard-btn-icon" />
              <span>Live Demo</span>
            </span>
          )}

        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`

        /* Card shell */
        .pcard {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          background: rgba(34, 211, 238, 0.04);
          border: 1px solid rgba(34, 211, 238, 0.15);
          overflow: hidden;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .pcard:hover {
          transform: translateY(-7px);
          border-color: rgba(34, 211, 238, 0.45);
          box-shadow:
            0 0 0 1px rgba(34,211,238,0.08),
            0 0 40px rgba(34,211,238,0.1),
            0 16px 48px rgba(0,0,0,0.45);
        }

        /* Animated orb — decorative blob that moves on hover */
        .pcard-orb {
          position: absolute;
          width: 110px;
          height: 110px;
          top: -42%;
          left: -18%;
          border-radius: 50%;
          border: 32px solid rgba(34, 211, 238, 0.08);
          filter: blur(6px);
          transition: all 0.75s ease;
          pointer-events: none;
          z-index: 0;
        }
        .pcard:hover .pcard-orb {
          width: 155px;
          height: 155px;
          top: -28%;
          left: 48%;
          filter: blur(0px);
          border-color: rgba(34, 211, 238, 0.16);
        }

        /* Image strip */
        .pcard-img-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 185px;
          overflow: hidden;
          flex-shrink: 0;
          background: rgba(0,0,0,0.25);
        }
        .pcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .pcard:hover .pcard-img { transform: scale(1.05); }

        /* Placeholder when no image provided */
        .pcard-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(34,211,238,0.04),
            rgba(59,130,246,0.04)
          );
          color: #334155;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── STATUS BADGE ──
           Pinned to BOTTOM of the image area so it never overlaps the title.
           Controlled by  status  field in projects.js */
        .pcard-badge {
          position: absolute;
          bottom: 0.6rem;       /* bottom of image, not top */
          left: 0.7rem;         /* left-aligned */
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.38rem;
          padding: 0.25rem 0.65rem;
          border-radius: 99px;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        /* Pulsing dot inside the badge */
        .pcard-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: dotPulse 1.8s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(1.5); }
        }

        /* Card body */
        .pcard-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 1.1rem 1.1rem 0.8rem;
        }

        /* Project title */
        .pcard-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.3;
        }

        /* Description */
        .pcard-desc {
          font-size: 0.78rem;
          color: rgba(148,163,184,0.9);
          line-height: 1.65;
          flex: 1;
        }

        /* Tech stack tag pills */
        .pcard-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: 0.1rem;
        }
        .pcard-tag {
          font-size: 0.62rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: 99px;
          background: rgba(34,211,238,0.07);
          border: 1px solid rgba(34,211,238,0.18);
          color: #22d3ee;
          letter-spacing: 0.04em;
        }

        /* Action bar — bottom strip with Code + Live Demo buttons */
        .pcard-actions {
          position: relative;
          z-index: 1;
          display: flex;
          border-top: 1px solid rgba(34,211,238,0.1);
          border-radius: 0 0 16px 16px;
          overflow: hidden;
        }

        /* Individual button */
        .pcard-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.65rem 0;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(226,232,240,0.65);
          background: rgba(255,255,255,0.03);
          border: none;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .pcard-btn + .pcard-btn {
          border-left: 1px solid rgba(34,211,238,0.1);
        }
        .pcard-btn:hover {
          background: rgba(34,211,238,0.1);
          color: #22d3ee;
        }

        /* Live Demo button gets a slightly stronger hover */
        .pcard-btn--live:hover {
          background: rgba(34,211,238,0.15);
          color: #22d3ee;
        }

        /* Disabled button — no link available */
        .pcard-btn--disabled {
          opacity: 0.28;
          cursor: not-allowed;
          pointer-events: none;
        }

        .pcard-btn-icon { font-size: 0.82rem; }

      `}</style>
    </>
  )
}

export default ProjectCard
