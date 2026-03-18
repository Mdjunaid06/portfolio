import { useEffect, useRef, useState } from "react"
import ProjectCard from "../components/ProjectCard"
import { mernProjects } from "../data/projects"

const FullStackProjects = () => {
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
    <section id="projects" className="section-wrapper">

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
          <span className="projects-label-text">💻 Full Stack</span>
          <span className="projects-label-line projects-label-line--right" />
        </div>
        <h2 className="section-title">Full Stack Projects</h2>
        <p className="section-subtitle">
          End-to-end web applications built with the MERN stack
        </p>
      </div>

      {/* Cards — renders automatically from mernProjects array */}
      <div className="projects-grid">
        {mernProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

    </section>
  )
}

export default FullStackProjects
