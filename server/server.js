const express        = require("express")
const cors           = require("cors")
const dotenv         = require("dotenv")
const contactRoute   = require("./routes/contactRoute")
const wakatimeRoute  = require("./routes/wakatimeRoute")

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// ── Open CORS ─────────────────────────────────────────────
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",  "*")
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.sendStatus(200)
  next()
})

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
