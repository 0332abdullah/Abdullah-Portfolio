// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import nodemailer from 'nodemailer';

// const app = express();
// const port = 4000;
// const CONTACT_RECIPIENT = 'abdullahyaqub0332@gmail.com';

// app.use(express.json());

// app.post('/api/contact', async (req, res) => {
//   const { name, email, service, budget, message } = req.body || {};

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Name, email, and message are required.' });
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: CONTACT_RECIPIENT,
//       replyTo: email,
//       subject: `New project inquiry from ${name}`,
//       text: [
//         `Name: ${name}`,
//         `Email: ${email}`,
//         `Service: ${service || 'General Inquiry'}`,
//         `Budget: ${budget || 'Not specified'}`,
//         '',
//         'Project details:',
//         message,
//       ].join('\n'),
//       html: `
//         <h3>New project inquiry</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Service:</strong> ${service || 'General Inquiry'}</p>
//         <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message.replace(/\n/g, '<br />')}</p>
//       `,
//     });

//     res.status(200).json({ ok: true });
//   } catch (error) {
//     console.error('Email send failed:', error);
//     res.status(500).json({ error: 'Failed to send email.' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Email server running on http://localhost:${port}`);
// });
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

const PORT = process.env.PORT || 4000;
const CONTACT_RECIPIENT = 'abdullahyaqub0332@gmail.com';

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
  })
);

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Backend is running',
  });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, service, budget, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Name, email, and message are required.',
    });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER or EMAIL_PASS is missing.');
    return res.status(500).json({
      error: 'Email service is not configured.',
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service || 'General Inquiry'}`,
        `Budget: ${budget || 'Not specified'}`,
        '',
        'Project details:',
        message,
      ].join('\n'),
      html: `
        <h3>New project inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || 'General Inquiry'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({
      error: 'Failed to send email.',
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Backend is running',
  });
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});