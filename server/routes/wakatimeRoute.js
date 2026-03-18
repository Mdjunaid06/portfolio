const express = require("express")
const router  = express.Router()

// ── GET /api/wakatime/today ────────────────────────────────
// Returns today's total coding time + online status
// Calls WakaTime API using the secret key from .env
// Frontend never sees the API key — stays secure on backend
router.get("/today", async (req, res) => {
  try {
    const apiKey  = process.env.WAKATIME_API_KEY
    const encoded = Buffer.from(apiKey).toString("base64")

    // Get today's summary from WakaTime
    const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
      {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      }
    )

    if (!response.ok) throw new Error("WakaTime API error")

    const data = await response.json()
    const summary = data.data?.[0]

    // Total seconds coded today
    const totalSeconds = summary?.grand_total?.total_seconds || 0
    const hours        = Math.floor(totalSeconds / 3600)
    const minutes      = Math.floor((totalSeconds % 3600) / 60)

    // Format: "2h 30m" or "45m" or "0m"
    let timeText = ""
    if (hours > 0)   timeText += `${hours}h `
    timeText += `${minutes}m`

    // Online check — if last heartbeat was within 5 minutes
    const lastHeartbeat = summary?.range?.end || null
    let isOnline = false
    if (lastHeartbeat) {
      const lastTime  = new Date(lastHeartbeat).getTime()
      const now       = Date.now()
      const diffMins  = (now - lastTime) / 1000 / 60
      isOnline        = diffMins <= 5
    }

    res.json({
      totalSeconds,
      timeText:   timeText.trim() || "0m",
      hours,
      minutes,
      isOnline,
      date: today,
    })

  } catch (error) {
    console.error("WakaTime error:", error.message)
    res.status(500).json({ error: "Failed to fetch WakaTime data" })
  }
})

module.exports = router
