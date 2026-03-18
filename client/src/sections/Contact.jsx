import { useState, useRef, useEffect } from "react"
import { FaEnvelope, FaUser, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

// ──────────────────────────────────────────────────────────────
//  CONFIG
// ──────────────────────────────────────────────────────────────
const CONTACT_INFO = {
  email:    "mdjunaid.200606@gmail.com",
  github:   "https://github.com/Mdjunaid06",
  linkedin: "https://www.linkedin.com/in/mohammad-junaid-30564b2a8",
}

const Field = ({ icon: Icon, label, id, error, children }) => (
  <div className="field-wrap">
    <label className="field-label" htmlFor={id}>
      <Icon className="field-label-icon" />
      {label}
    </label>
    {children}
    {error && (
      <span className="field-error">
        <FaExclamationCircle />
        {error}
      </span>
    )}
  </div>
)

const Contact = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const [form, setForm]     = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name = "Name is required"
    if (!form.email.trim())   e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address"
    if (!form.message.trim()) e.message = "Message is required"
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters"
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setStatus("sending")
    try {
      // ✅ Using relative URL — Vite proxy forwards this to localhost:5000
      const res = await fetch("http://localhost:5000/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Server error")
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section id="contact" className="section-wrapper" ref={ref}>

      {/* Heading */}
      <div style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <div className="projects-label">
          <span className="projects-label-line" />
          <span className="projects-label-text">📬 Get In Touch</span>
          <span className="projects-label-line projects-label-line--right" />
        </div>
        <h2 className="section-title">Contact Me</h2>
        <p className="section-subtitle">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <div className="contact-layout">

        {/* ── LEFT — Info panel ── */}
        <div
          className="contact-info-panel"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          <div className="contact-info-orb" />
          <h3 className="contact-info-title">Let's work together</h3>
          <p className="contact-info-desc">
            I'm currently open to freelance projects, internship opportunities,
            and collaborations in data science and full-stack development.
            Feel free to reach out — I usually respond within 24 hours.
          </p>

          <div className="contact-links">
            <a href={`mailto:${CONTACT_INFO.email}`} className="contact-link">
              <div className="contact-link-icon">
                {/* ✅ Using MdEmail from react-icons/md — works reliably */}
                <MdEmail style={{ color: "#EA4335", fontSize: "1.1rem" }} />
              </div>
              <div className="contact-link-text">
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">{CONTACT_INFO.email}</span>
              </div>
            </a>

            <a href={CONTACT_INFO.github} target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">
                <FaGithub style={{ color: "#ffffff" }} />
              </div>
              <div className="contact-link-text">
                <span className="contact-link-label">GitHub</span>
                <span className="contact-link-value">@Mdjunaid06</span>
              </div>
            </a>

            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="contact-link">
              <div className="contact-link-icon">
                <FaLinkedin style={{ color: "#0A66C2" }} />
              </div>
              <div className="contact-link-text">
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">Mohammad Junaid</span>
              </div>
            </a>
          </div>

          <div className="contact-available">
            <span className="contact-available-dot" />
            Available for opportunities
          </div>
        </div>

        {/* ── RIGHT — Form panel ── */}
        <div
          className="contact-form-panel"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
          }}
        >
          {status === "success" && (
            <div className="form-toast form-toast--success">
              <FaCheckCircle />
              Message sent! I'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="form-toast form-toast--error">
              <FaExclamationCircle />
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <Field icon={FaUser} label="Your Name" id="name" error={errors.name}>
              <input
                id="name" name="name" type="text"
                placeholder="Your full name"
                value={form.name} onChange={handleChange}
                className={`form-input ${errors.name ? "form-input--error" : ""}`}
                disabled={status === "sending"}
              />
            </Field>

            <Field icon={FaEnvelope} label="Your Email" id="email" error={errors.email}>
              <input
                id="email" name="email" type="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange}
                className={`form-input ${errors.email ? "form-input--error" : ""}`}
                disabled={status === "sending"}
              />
            </Field>

            <Field icon={FaPaperPlane} label="Message" id="message" error={errors.message}>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Tell me about your project or just say hello..."
                value={form.message} onChange={handleChange}
                className={`form-input form-textarea ${errors.message ? "form-input--error" : ""}`}
                disabled={status === "sending"}
              />
            </Field>

            <button type="submit" className="form-submit" disabled={status === "sending"}>
              {status === "sending" ? (
                <><span className="form-spinner" />Sending...</>
              ) : (
                <><FaPaperPlane />Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 1.75rem;
          margin-top: 0.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
        .projects-label {
          display: flex; align-items: center; justify-content: center;
          gap: 0.75rem; margin-bottom: 0.75rem;
        }
        .projects-label-line {
          height: 1px; width: 48px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.45));
        }
        .projects-label-line--right {
          background: linear-gradient(90deg, rgba(34,211,238,0.45), transparent);
        }
        .projects-label-text {
          font-size: 0.72rem; font-weight: 700; color: #22d3ee;
          letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap;
        }
        .contact-info-panel {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,211,238,0.12);
          border-radius: 1rem; padding: 1.75rem; overflow: hidden;
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .contact-info-orb {
          position: absolute; width: 160px; height: 160px;
          top: -60px; right: -60px; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%);
          pointer-events: none;
        }
        .contact-info-title {
          font-family: 'Syne', sans-serif; font-size: 1.2rem;
          font-weight: 800; color: #f1f5f9; position: relative; z-index: 1;
        }
        .contact-info-desc {
          font-size: 0.82rem; color: #94a3b8; line-height: 1.75;
          position: relative; z-index: 1;
        }
        .contact-links { display: flex; flex-direction: column; gap: 0.75rem; position: relative; z-index: 1; }
        .contact-link {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 0.75rem; border-radius: 0.65rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,211,238,0.1);
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .contact-link:hover {
          border-color: rgba(34,211,238,0.3);
          background: rgba(34,211,238,0.05);
          transform: translateX(4px);
        }
        .contact-link-icon {
          width: 36px; height: 36px; border-radius: 0.5rem;
          background: rgba(0,0,0,0.25); display: flex;
          align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .contact-link-text { display: flex; flex-direction: column; gap: 0.08rem; }
        .contact-link-label {
          font-size: 0.65rem; font-weight: 700; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .contact-link-value { font-size: 0.8rem; color: #cbd5e1; font-weight: 500; }
        .contact-available {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-weight: 600; color: #4ade80;
          background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
          padding: 0.4rem 0.85rem; border-radius: 99px;
          width: fit-content; position: relative; z-index: 1;
        }
        .contact-available-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
          animation: availPulse 2s ease-in-out infinite;
        }
        @keyframes availPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
        .contact-form-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,211,238,0.12);
          border-radius: 1rem; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .contact-form { display: flex; flex-direction: column; gap: 1.1rem; }
        .field-wrap { display: flex; flex-direction: column; gap: 0.4rem; }
        .field-label {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.75rem; font-weight: 700; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .field-label-icon { font-size: 0.7rem; color: #22d3ee; }
        .form-input {
          width: 100%; background: rgba(0,0,0,0.25);
          border: 1px solid rgba(34,211,238,0.15);
          border-radius: 0.6rem; padding: 0.75rem 1rem;
          color: #e2e8f0; font-size: 0.85rem;
          font-family: 'Inter', sans-serif;
          outline: none; resize: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .form-input::placeholder { color: #475569; }
        .form-input:focus {
          border-color: rgba(34,211,238,0.5);
          box-shadow: 0 0 0 3px rgba(34,211,238,0.08);
        }
        .form-input--error {
          border-color: rgba(239,68,68,0.5) !important;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.07) !important;
        }
        .form-textarea { min-height: 130px; }
        .form-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .field-error {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.7rem; color: #f87171; font-weight: 500;
        }
        .form-submit {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%; padding: 0.85rem;
          border-radius: 0.6rem; border: none;
          background: linear-gradient(135deg, #0891b2, #1d4ed8);
          color: #fff; font-size: 0.9rem; font-weight: 700;
          font-family: 'Syne', sans-serif; letter-spacing: 0.05em;
          cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(34,211,238,0.2);
        }
        .form-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #06b6d4, #2563eb);
          box-shadow: 0 0 32px rgba(34,211,238,0.4);
          transform: translateY(-2px);
        }
        .form-submit:active:not(:disabled) { transform: scale(0.98); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .form-toast {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.75rem 1rem; border-radius: 0.6rem;
          font-size: 0.8rem; font-weight: 600;
          animation: toastIn 0.3s ease;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .form-toast--success {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.3); color: #4ade80;
        }
        .form-toast--error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3); color: #f87171;
        }
      `}</style>
    </section>
  )
}

export default Contact
