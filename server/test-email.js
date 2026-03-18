// ── Quick email test — run with: node test-email.js
// Place this file in your server/ folder
require("dotenv").config()
const nodemailer = require("nodemailer")

console.log("Testing with:", process.env.EMAIL_USER)
console.log("Pass length:", process.env.EMAIL_PASS?.length, "chars")

const transporter = nodemailer.createTransport({
  host:   "smtp.gmail.com",
  port:   465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Connection FAILED:", error.message)
  } else {
    console.log("✅ Connection SUCCESS — server is ready to send emails!")
  }
})
