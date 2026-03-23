import { useEffect, useState, useRef } from "react"
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaClock } from "react-icons/fa"

const GITHUB_USERNAME = "Mdjunaid06"

// ── Single stat card ───────────────────────────────────────
const StatCard = ({ icon: Icon, iconColor, label, value, sub, index, visible }) => (
  <div
    className="stat-card"
    style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
    }}
  >
    <div className="stat-icon-wrap">
      <Icon style={{ color: iconColor, fontSize: "1.15rem" }} />
    </div>
    <div className="stat-info">
      <span className="stat-value">
        {value === null ? <span className="stat-shimmer" /> : value}
      </span>
      <span className="stat-label">{label}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  </div>
)

const Stats = () => {
  const [visible, setVisible]     = useState(false)
  const ref = useRef(null)

  // GitHub state
  const [ghRepos,     setGhRepos]     = useState(null)
  const [ghFollowers, setGhFollowers] = useState(null)
  const [ghStars,     setGhStars]     = useState(null)
  const [ghError,     setGhError]     = useState(false)

  // WakaTime daily state
  const [todayTime,  setTodayTime]  = useState(null)  // e.g. "2h 30m"
  const [isOnline,   setIsOnline]   = useState(false)
  const [wkError,    setWkError]    = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Fetch GitHub
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        if (!userRes.ok) throw new Error()
        const user = await userRes.json()
        setGhRepos(user.public_repos)
        setGhFollowers(user.followers)

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        )
        if (!reposRes.ok) throw new Error()
        const repos = await reposRes.json()
        setGhStars(repos.reduce((acc, r) => acc + r.stargazers_count, 0))
      } catch {
        setGhError(true)
      }
    }
    fetchGitHub()
  }, [])

  // Fetch WakaTime today via backend — polls every 2 minutes
  useEffect(() => {
    const fetchWakaTime = async () => {
      try {
        const res = await fetch("https://portfolio-server-87cc.onrender.com/api/wakatime/today")
        if (!res.ok) throw new Error()
        const data = await res.json()
        setTodayTime(data.timeText)
        setIsOnline(data.isOnline)
        setLastUpdate(new Date().toLocaleTimeString())
        setWkError(false)
      } catch {
        setWkError(true)
      }
    }

    fetchWakaTime()
    // Poll every 2 minutes to keep online status fresh
    const interval = setInterval(fetchWakaTime, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="stats" className="section-wrapper" ref={ref}>

      {/* Heading */}
      <div style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <h2 className="section-title">Coding Activity</h2>
        <p className="section-subtitle">Live stats and coding activity</p>
      </div>

      <div className="stats-layout">

        {/* ════════════════════════
            LEFT — GitHub
        ════════════════════════ */}
        <div className="stats-panel" style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>
          <div className="stats-panel-header">
            <FaGithub className="stats-panel-icon" />
            <h3 className="stats-panel-title">GitHub</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank" rel="noreferrer"
              className="stats-panel-link"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>

          {ghError ? (
            <p className="stats-error">Could not load GitHub data.</p>
          ) : (
            <div className="stat-cards-grid">
              <StatCard icon={FaCodeBranch} iconColor="#22d3ee"
                label="Public Repos" value={ghRepos} index={0} visible={visible} />
              <StatCard icon={FaUsers} iconColor="#3b82f6"
                label="Followers" value={ghFollowers} index={1} visible={visible} />
              <StatCard icon={FaStar} iconColor="#facc15"
                label="Total Stars" value={ghStars} index={2} visible={visible} />
            </div>
          )}

          {/* Contribution graph */}
          <div className="embed-block" style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <p className="embed-label">Contribution Graph</p>
            <img
              src={`https://ghchart.rshah.org/22d3ee/${GITHUB_USERNAME}`}
              alt="GitHub contributions"
              className="contrib-img"
            />
          </div>

          {/* GitHub stats card */}
          <div className="embed-block" style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.65s",
          }}>
            <p className="embed-label">GitHub Stats</p>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=22d3ee&icon_color=22d3ee&text_color=94a3b8&border_color=1e3a4a&count_private=true`}
              alt="GitHub stats"
              className="stats-embed-img"
            />
          </div>
        </div>

        {/* ════════════════════════
            RIGHT — Daily Active Time
        ════════════════════════ */}
        <div className="stats-panel" style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateX(0)" : "translateX(24px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}>
          <div className="stats-panel-header">
            <FaClock className="stats-panel-icon" />
            <h3 className="stats-panel-title">Active Time</h3>
            <span className="stats-panel-sub">Resets daily at midnight</span>
          </div>

          {wkError ? (
            <div className="wk-offline-notice">
              <p className="wk-offline-text">
                Start the backend server to see live coding stats.
              </p>
              <code className="wk-offline-code">cd server && node server.js</code>
            </div>
          ) : (
            <>
              {/* Online / Offline status */}
              <div className="online-status-card">
                <div className={`online-dot ${isOnline ? "online-dot--on" : "online-dot--off"}`} />
                <div className="online-status-text">
                  <span className={`online-label ${isOnline ? "online-label--on" : "online-label--off"}`}>
                    {isOnline ? "Coding right now" : "Currently offline"}
                  </span>
                  {lastUpdate && (
                    <span className="online-updated">Updated {lastUpdate}</span>
                  )}
                </div>
              </div>

              {/* Today's total time — big display */}
              <div className="today-time-card">
                <p className="today-time-label">Today's coding time</p>
                <div className="today-time-value">
                  {todayTime === null
                    ? <span className="stat-shimmer" style={{ width: "80px", height: "2.5rem" }} />
                    : todayTime
                  }
                </div>
                <p className="today-time-sub">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long", month: "long", day: "numeric"
                  })}
                </p>
              </div>
            </>
          )}

          {/* Top Languages on GitHub — always works */}
          <div className="embed-block">
            <p className="embed-label">Top Languages on GitHub</p>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&theme=transparent&title_color=22d3ee&icon_color=22d3ee&text_color=94a3b8&border_color=1e3a4a&layout=compact&langs_count=6&hide_title=true`}
              alt="Top languages"
              className="stats-embed-img"
            />
          </div>

        </div>
      </div>

      <style>{`
        .stats-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 768px) {
          .stats-layout { grid-template-columns: 1fr; }
        }

        /* Panel */
        .stats-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,211,238,0.12);
          border-radius: 1rem; padding: 1.5rem;
          backdrop-filter: blur(12px);
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .stats-panel-header {
          display: flex; align-items: center; gap: 0.6rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(34,211,238,0.1);
        }
        .stats-panel-icon { font-size: 1.25rem; color: #22d3ee; }
        .stats-panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem; font-weight: 700; color: #f1f5f9;
        }
        .stats-panel-link {
          margin-left: auto; font-size: 0.72rem; color: #22d3ee;
          text-decoration: none; opacity: 0.65; transition: opacity 0.2s;
        }
        .stats-panel-link:hover { opacity: 1; }
        .stats-panel-sub { margin-left: auto; font-size: 0.65rem; color: #475569; }

        /* Stat cards */
        .stat-cards-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;
        }
        .stat-card {
          background: rgba(34,211,238,0.04);
          border: 1px solid rgba(34,211,238,0.1);
          border-radius: 0.75rem; padding: 0.85rem 0.6rem;
          display: flex; flex-direction: column;
          align-items: center; gap: 0.45rem; text-align: center;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .stat-card:hover {
          border-color: rgba(34,211,238,0.28);
          box-shadow: 0 0 16px rgba(34,211,238,0.07);
        }
        .stat-icon-wrap {
          width: 36px; height: 36px; border-radius: 0.5rem;
          background: rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center;
        }
        .stat-info { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem; font-weight: 800; color: #f1f5f9;
          min-height: 1.6rem; display: flex; align-items: center;
        }
        .stat-label {
          font-size: 0.62rem; font-weight: 600; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .stat-sub { font-size: 0.58rem; color: #475569; }

        /* Shimmer */
        .stat-shimmer {
          display: inline-block; width: 40px; height: 16px;
          border-radius: 4px;
          background: linear-gradient(90deg,
            rgba(255,255,255,0.05) 0%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0.05) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        /* Embeds */
        .embed-block { display: flex; flex-direction: column; gap: 0.45rem; }
        .embed-label {
          font-size: 0.68rem; font-weight: 700; color: #475569;
          text-transform: uppercase; letter-spacing: 0.07em;
        }
        .contrib-img {
          width: 100%; border-radius: 0.5rem;
          opacity: 0.85; filter: brightness(1.1);
        }
        .stats-embed-img { width: 100%; border-radius: 0.5rem; opacity: 0.92; }

        /* ── Online status card ── */
        .online-status-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(34,211,238,0.1);
        }
        .online-dot {
          width: 12px; height: 12px;
          border-radius: 50%; flex-shrink: 0;
        }
        .online-dot--on {
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
          animation: onlinePulse 2s ease-in-out infinite;
        }
        .online-dot--off {
          background: #475569;
        }
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }
        .online-status-text {
          display: flex; flex-direction: column; gap: 0.1rem;
        }
        .online-label {
          font-size: 0.85rem; font-weight: 700;
        }
        .online-label--on  { color: #4ade80; }
        .online-label--off { color: #64748b; }
        .online-updated {
          font-size: 0.65rem; color: #334155;
        }

        /* ── Today's time big display ── */
        .today-time-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding: 1.5rem;
          border-radius: 0.75rem;
          background: rgba(34,211,238,0.04);
          border: 1px solid rgba(34,211,238,0.12);
          text-align: center;
        }
        .today-time-label {
          font-size: 0.72rem; font-weight: 700; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.07em;
        }
        .today-time-value {
          font-family: 'Syne', sans-serif;
          font-size: 3rem; font-weight: 800;
          background: linear-gradient(90deg, #22d3ee, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          min-height: 3.5rem;
          display: flex; align-items: center;
        }
        .today-time-sub {
          font-size: 0.72rem; color: #475569;
        }

        /* ── Offline notice ── */
        .wk-offline-notice {
          display: flex; flex-direction: column; gap: 0.6rem;
          padding: 1rem; border-radius: 0.75rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .wk-offline-text { font-size: 0.8rem; color: #64748b; }
        .wk-offline-code {
          font-size: 0.72rem; color: #22d3ee;
          background: rgba(34,211,238,0.08);
          padding: 0.35rem 0.65rem; border-radius: 0.35rem;
          font-family: monospace;
        }

        /* Error */
        .stats-error {
          font-size: 0.78rem; color: #ef4444;
          padding: 0.65rem 0.85rem;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
          border-radius: 0.5rem;
        }
      `}</style>
    </section>
  )
}

export default Stats
