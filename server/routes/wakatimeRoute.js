const express = require("express")
const router  = express.Router()

// ── GET /api/wakatime/today ────────────────────────────────
router.get("/today", async (req, res) => {
  try {
    const apiKey  = process.env.WAKATIME_API_KEY
    const encoded = Buffer.from(apiKey).toString("base64")
    const today   = new Date().toISOString().split("T")[0]

    // ── Fetch today's summary ──────────────────────────────
    const summaryRes = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
      { headers: { Authorization: `Basic ${encoded}` } }
    )
    if (!summaryRes.ok) throw new Error("WakaTime summary fetch failed")
    const summaryData = await summaryRes.json()
    const summary     = summaryData.data?.[0]

    const totalSeconds = summary?.grand_total?.total_seconds || 0
    const hours        = Math.floor(totalSeconds / 3600)
    const minutes      = Math.floor((totalSeconds % 3600) / 60)
    let timeText       = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

    // ── Fetch last heartbeat for accurate online status ────
    // Uses heartbeats API — last entry tells us exact last activity time
    const hbRes = await fetch(
      `https://wakatime.com/api/v1/users/current/heartbeats?date=${today}`,
      { headers: { Authorization: `Basic ${encoded}` } }
    )

    let isOnline = false
    if (hbRes.ok) {
      const hbData = await hbRes.json()
      const heartbeats = hbData.data || []

      if (heartbeats.length > 0) {
        // Last heartbeat time — WakaTime sends heartbeats every 2 mins while coding
        const lastHb      = heartbeats[heartbeats.length - 1]
        const lastHbTime  = lastHb.time * 1000  // convert from Unix seconds to ms
        const diffMinutes = (Date.now() - lastHbTime) / 1000 / 60

        // Online = coded within last 5 minutes
        isOnline = diffMinutes <= 5
      }
    }

    res.json({
      totalSeconds,
      timeText: timeText.trim() || "0m",
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
