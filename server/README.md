# Pottery Studio Website - Server Setup Guide

This server handles contact form submissions and sends emails to katmelonashi@gmail.com.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A Gmail account for sending emails

## Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file with your email credentials (see below)

## Gmail Configuration

To use Gmail for sending emails, you need to create an **App Password**:

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

### Step 2: Create App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Select "Other" as the device and name it "Pottery Studio Website"
4. Click "Generate"
5. Copy the 16-character password

### Step 3: Update .env File
```env
EMAIL_USER=katmelonashi@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
PORT=3000
```

**Important:** Never commit the `.env` file to git! It's already in `.gitignore`.

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Testing the Contact Form

1. Start the server
2. Open `index.html` in your browser
3. Navigate to the "About Me" page
4. Fill out the contact form
5. Submit the form
6. Check your email at katmelonashi@gmail.com

## API Endpoints

### POST /api/contact
Sends a contact form email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Interested in a pottery piece",
  "message": "I love your work!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message"
}
```

### GET /api/health
Health check endpoint to verify server is running.

**Response (200):**
```json
{
  "status": "Server is running"
}
```

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Factor Authentication is enabled on your Google account
- Check that EMAIL_USER and EMAIL_PASSWORD are correctly set in `.env`

### Port already in use
- Change the PORT in `.env` to a different number (e.g., 3001, 8080)
- Or stop any other process using port 3000

### Email not sending
- Check server console for error messages
- Verify your internet connection
- Test with a simple email client to ensure Gmail credentials work

## Future Enhancements

- Add rate limiting to prevent spam
- Implement email templates with more styling
- Add CAPTCHA to prevent bot submissions
- Set up email notification for form submissions
- Deploy to a cloud platform (Heroku, AWS, etc.)

## Deployment

When ready to deploy to production:

1. **Choose a hosting platform:**
   - Heroku (easy, free tier available)
   - AWS EC2
   - DigitalOcean
   - Vercel (for serverless functions)

2. **Set environment variables** on your hosting platform

3. **Update the fetch URL** in `js/contact.js` to point to your production server

4. **Consider using a service like SendGrid or Mailgun** for better email delivery in production

## Support

For issues or questions, contact: katmelonashi@gmail.com
