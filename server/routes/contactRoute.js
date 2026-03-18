const express = require("express")
const router  = express.Router()
const { sendContactEmail } = require("../controllers/contactController")

// POST /api/contact
// Called by the Contact form in the frontend
router.post("/", sendContactEmail)

module.exports = router
