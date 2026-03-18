import { useEffect, useRef, useState } from "react"
import { dataSkills, fullstackSkills, otherSkills } from "../data/skills"

/* ── Single Skill Card ─────────────────────────────── */
const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon
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

  return (
    <div
      ref={ref}
      className="skill-card"
      style={{
        "--skill-color": skill.color,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <div className="skill-icon-wrap">
        <Icon className="skill-icon" style={{ color: skill.color }} />
      </div>
      <span className="skill-name">{skill.name}</span>
      <div className="skill-glow" style={{ background: skill.color }} />
    </div>
  )
}

/* ── Skill Group ───────────────────────────────────── */
const SkillGroup = ({ badge, title, skills, visible }) => (
  <div
    className="skill-group"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}
  >
    <div className="skill-group-header">
      <span className="skill-badge">{badge}</span>
      <h3 className="skill-group-title">{title}</h3>
    </div>
    <div className="skills-grid">
      {skills.map((skill, i) => (
        <SkillCard key={skill.name} skill={skill} index={i} />
      ))}
    </div>
  </div>
)

/* ── Main Section ──────────────────────────────────── */
const Skills = () => {
  const [headingVisible, setHeadingVisible] = useState(false)
  const [groupsVisible, setGroupsVisible]   = useState(false)
  const headingRef = useRef(null)
  const groupsRef  = useRef(null)

  useEffect(() => {
    const obs = (ref, setter) =>
      new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true) },
        { threshold: 0.15 }
      )

    const h = obs(headingRef, setHeadingVisible)
    const g = obs(groupsRef,  setGroupsVisible)

    if (headingRef.current) h.observe(headingRef.current)
    if (groupsRef.current)  g.observe(groupsRef.current)

    return () => { h.disconnect(); g.disconnect() }
  }, [])

  return (
    <section id="skills" className="section-wrapper">

      {/* Heading */}
      <div
        ref={headingRef}
        style={{
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2 className="section-title">Skills &amp; Technologies</h2>
        <p className="section-subtitle">
          Tools and technologies I use across data science and full-stack development
        </p>
      </div>

      {/* Three groups */}
      <div ref={groupsRef} className="skills-groups-wrap">
        <SkillGroup
          badge="🧠 AI / ML"
          title="Data Science & Machine Learning"
          skills={dataSkills}
          visible={groupsVisible}
        />
        <SkillGroup
          badge="💻 Web Dev"
          title="Full Stack Development"
          skills={fullstackSkills}
          visible={groupsVisible}
        />
        <SkillGroup
          badge="🛠 Other"
          title="Languages & Other Tools"
          skills={otherSkills}
          visible={groupsVisible}
        />
      </div>

      <style>{`
        /* ── Groups layout ── */
        .skills-groups-wrap {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        /* ── Group header ── */
        .skill-group-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .skill-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.7rem;
          border-radius: 99px;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(34,211,238,0.22);
          color: #22d3ee;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .skill-group-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-weight: 700;
          color: #e2e8f0;
        }

        /* ── Grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 0.9rem;
        }
        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
            gap: 0.65rem;
          }
        }

        /* ── Card ── */
        .skill-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 1.1rem 0.65rem;
          border-radius: 0.85rem;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(34,211,238,0.12);
          backdrop-filter: blur(10px);
          overflow: hidden;
          cursor: default;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-7px) scale(1.04);
          border-color: var(--skill-color, #22d3ee);
          box-shadow: 0 0 22px color-mix(in srgb, var(--skill-color, #22d3ee) 35%, transparent);
        }

        /* ── Icon ── */
        .skill-icon-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 0.65rem;
          background: rgba(0,0,0,0.22);
          transition: background 0.3s ease;
        }
        .skill-card:hover .skill-icon-wrap {
          background: rgba(255,255,255,0.05);
        }
        .skill-icon {
          font-size: 1.75rem;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .skill-card:hover .skill-icon {
          transform: scale(1.18);
          filter: drop-shadow(0 0 7px var(--skill-color, #22d3ee));
        }

        /* ── Name ── */
        .skill-name {
          position: relative;
          z-index: 1;
          font-size: 0.68rem;
          font-weight: 600;
          color: #94a3b8;
          text-align: center;
          letter-spacing: 0.02em;
          line-height: 1.2;
          transition: color 0.3s ease;
        }
        .skill-card:hover .skill-name { color: #e2e8f0; }

        /* ── Glow blob ── */
        .skill-glow {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(22px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }
        .skill-card:hover .skill-glow { opacity: 0.16; }
      `}</style>
    </section>
  )
}

export default Skills
