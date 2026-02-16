const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the parent directory
app.use(express.static('../'));

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Error with email configuration:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email address'
        });
    }

    // Prepare email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'katmelonashi@gmail.com',
        subject: `Contact Form: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #8b6d5b; border-bottom: 2px solid #8b6d5b; padding-bottom: 10px;">New Contact Form Submission</h2>

                <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>

                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>

                <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                    This message was sent from your pottery studio website contact form.
                </p>
            </div>
        `,
        replyTo: email
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`Email sent from ${name} (${email})`);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            error: 'Failed to send email. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
