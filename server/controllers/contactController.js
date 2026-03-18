const nodemailer = require("nodemailer")

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    // ── Port 587 + TLS works better on most networks/firewalls
    const transporter = nodemailer.createTransport({
      host:   "smtp.gmail.com",
      port:   587,
      secure: false,        // false for port 587 (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false  // avoids cert issues on Windows
      }
    })

    // ── Test connection first ─────────────────────────────
    await transporter.verify()
    console.log(" SMTP connected successfully")

    // ── Email to your inbox ───────────────────────────────
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      subject: `📬 New Portfolio Message from ${name}`,
      text:    `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;
          background:#0f172a;border-radius:12px;overflow:hidden;border:1px solid #1e3a4a;">
          <div style="background:linear-gradient(135deg,#0891b2,#1d4ed8);padding:24px 28px;">
            <h2 style="color:#fff;margin:0;font-size:1.2rem;">📬 New Portfolio Enquiry</h2>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:0.85rem;">
              Someone reached out via your portfolio contact form
            </p>
          </div>
          <div style="padding:28px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e293b;
                  color:#64748b;font-size:0.8rem;font-weight:700;
                  text-transform:uppercase;width:80px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e293b;
                  color:#e2e8f0;font-size:0.95rem;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1e293b;
                  color:#64748b;font-size:0.8rem;font-weight:700;
                  text-transform:uppercase;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #1e293b;">
                  <a href="mailto:${email}" style="color:#22d3ee;">${email}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top:20px;">
              <p style="color:#64748b;font-size:0.8rem;font-weight:700;
                text-transform:uppercase;margin:0 0 10px;">Message</p>
              <div style="background:#0f172a;border:1px solid #1e3a4a;border-radius:8px;
                padding:16px;color:#cbd5e1;font-size:0.9rem;line-height:1.7;
                white-space:pre-wrap;">${message}</div>
            </div>
            <div style="margin-top:24px;text-align:center;">
              <a href="mailto:${email}?subject=Re: Your Portfolio Enquiry"
                style="display:inline-block;background:linear-gradient(135deg,#0891b2,#1d4ed8);
                color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;
                font-weight:700;font-size:0.88rem;">
                Reply to ${name} →
              </a>
            </div>
          </div>
          <div style="padding:14px 28px;background:rgba(0,0,0,0.2);text-align:center;
            color:#334155;font-size:0.72rem;">
            Sent via Junaid.dev portfolio contact form
          </div>
        </div>
      `,
    })
    console.log(" Main email sent")

    // ── Auto-reply ────────────────────────────────────────
    await transporter.sendMail({
      from:    `"Mohammad Junaid" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: "Thanks for reaching out! — Mohammad Junaid",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;
          background:#0f172a;border-radius:12px;overflow:hidden;border:1px solid #1e3a4a;">
          <div style="background:linear-gradient(135deg,#0891b2,#1d4ed8);padding:24px 28px;">
            <h2 style="color:#fff;margin:0;font-size:1.1rem;">
              Hey ${name}, thanks for your message! 👋
            </h2>
          </div>
          <div style="padding:24px 28px;color:#94a3b8;font-size:0.88rem;line-height:1.75;">
            <p>I've received your message and will get back to you within
              <strong style="color:#22d3ee">24 hours</strong>.
            </p>
            <p style="margin-top:12px;">In the meantime feel free to check out my work on
              <a href="https://github.com/Mdjunaid06" style="color:#22d3ee;">GitHub</a>.
            </p>
            <p style="margin-top:20px;color:#64748b;font-size:0.8rem;">
              — Mohammad Junaid
            </p>
          </div>
        </div>
      `,
    })
    console.log(" Auto-reply sent")

    res.status(200).json({ message: "Email sent successfully" })

  } catch (error) {
    console.error(" Email error:", error.message)
    console.error(" Full error:", error)
    res.status(500).json({
      error:  "Failed to send email",
      detail: error.message   // visible in browser console
    })
  }
}

module.exports = { sendContactEmail }
