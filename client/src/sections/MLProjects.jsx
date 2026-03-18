import { useEffect, useRef, useState } from "react"
import ProjectCard from "../components/ProjectCard"
import { mlProjects } from "../data/projects"

const MLProjects = () => {
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
    <section id="ml-projects" className="section-wrapper">

      {/* Heading */}
      <div
        ref={ref}
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="projects-label">
          <span className="projects-label-line" />
          <span className="projects-label-text">🧠 Machine Learning</span>
          <span className="projects-label-line projects-label-line--right" />
        </div>
        <h2 className="section-title">ML &amp; Data Science Projects</h2>
        <p className="section-subtitle">
          Predictive models, data pipelines and AI-powered applications
        </p>
      </div>

      {/* Cards — renders automatically from mlProjects array */}
      <div className="projects-grid">
        {mlProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <style>{`
        .projects-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .projects-label-line {
          height: 1px;
          width: 48px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.45));
        }
        .projects-label-line--right {
          background: linear-gradient(90deg, rgba(34,211,238,0.45), transparent);
        }
        .projects-label-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #22d3ee;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

export default MLProjects
