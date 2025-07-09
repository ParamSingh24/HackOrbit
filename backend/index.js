require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// POST /api/send-email
app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing to, subject, or text' });
  }

  // Custom SMTP transporter for testing
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Standard SMTP port, change if needed
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'calico4293@bulmp3.com',
      pass: 'calico4293@bulmp3.com',
    },
  });

  try {
    await transporter.sendMail({
      from: 'calico4293@bulmp3.com',
      to: to || 'divyanshsingh0442@gmail.com', // Use provided 'to' or default
      subject,
      text,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Email backend running on port ${PORT}`);
}); 