const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// Enable CORS for all routes (allows frontend to connect)
app.use(cors({
  origin: 'http://localhost:5173' // Adjust this to your frontend's dev server URL
}));

// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --- Nodemailer Transporter Setup ---
// We will use the email from the user's info as the RECIPIENT.
// The EMAIL_USER and EMAIL_PASS must be for the account that is SENDING the email.
// IMPORTANT: For Gmail, you MUST use an "App Password" not your regular password.
// 1. Go to your Google Account settings: myaccount.google.com
// 2. Go to Security
// 3. Enable 2-Step Verification
// 4. Under "Signing in to Google", click "App Passwords"
// 5. Generate a new password for "Mail" on "Other (Custom name)"
// 6. Use that generated 16-character password in your .env file as EMAIL_PASS
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your sending email (e.g., clifftech.sender@gmail.com)
    pass: process.env.EMAIL_PASS, // Your 16-character App Password
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer Error:', error);
    console.log('Error: Nodemailer transporter failed to connect. Check .env variables and App Password settings.');
  } else {
    console.log('Nodemailer is ready to send emails');
  }
});

// --- API Routes ---
app.get('/api', (req, res) => {
  res.send('Cliff_Tech Backend API is running!');
});

/**
 * POST /api/send-email
 * Receives contact form data and sends an email.
 */
app.post('/api/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email options
  const mailOptions = {
    from: `"${name}" <${email}>`, // From the person who filled the form
    to: 'cliffdesignz@gmail.com',  // TO: The business owner (from user info)
    replyTo: email,               // Set the reply-to to the sender
    subject: `New Contact Form Submission: ${subject}`, // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Message from cliff.tech Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <h3 style="color: #555;">Message:</h3>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </p>
      </div>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});