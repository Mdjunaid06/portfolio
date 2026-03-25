const express        = require("express")
const cors           = require("cors")
const dotenv         = require("dotenv")
const contactRoute   = require("./routes/contactRoute")
const wakatimeRoute  = require("./routes/wakatimeRoute")

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// ── CORS — allow Vercel frontend + localhost for dev ───────
app.use(cors({
  origin: [
    "https://portfolio-two-beryl-ra5vny2o5s.vercel.app", // your Vercel URL
    "http://localhost:5173",                               // local dev
    "http://localhost:3000",                               // fallback
  ],
  methods:     ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}))

// Handle preflight OPTIONS requests
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Log every request ─────────────────────────────────────
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`)
  next()
})

// ── Routes ─────────────────────────────────────────────────
app.use("/api/contact",  contactRoute)
app.use("/api/wakatime", wakatimeRoute)

// ── Health check ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "Server running ✅" })
})

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
