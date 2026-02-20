# Pottery Studio Website

A clean, elegant pottery website with earth tones featuring a home page, gallery, and detailed product views.

## Project Structure

```
website/
├── index.html              # Main HTML file
├── package.json           # NPM scripts and project config
├── css/                    # Stylesheets (organized by section)
│   ├── common.css         # Shared styles and navigation
│   ├── home.css           # Home page styles
│   ├── gallery.css        # Gallery page styles
│   ├── about.css          # About page styles (includes contact form)
│   └── detail.css         # Detail view styles
├── js/                     # JavaScript files
│   ├── navigation.js      # Page navigation logic
│   ├── gallery.js         # Gallery interactions
│   ├── detail.js          # Detail view logic
│   └── contact.js         # Contact form handler
├── scripts/                # Build and generation scripts
│   └── generate-database.js # Auto-generate pottery database from images
├── data/                   # Database files
│   └── pottery-database.js # Pottery pieces data (auto-generated)
├── images/                 # Your pottery photos
│   ├── pottery/           # Main product images
│   ├── process/           # Process/making images
│   └── README.md          # Image guidelines
├── videos/                 # Video files
└── server/                 # Backend server (Node.js + Express)
    ├── server.js          # Express server with email functionality
    ├── package.json       # Server dependencies
    ├── .env.example       # Environment variables template
    └── README.md          # Server setup guide
```

## Getting Started

1. **Add Your Images**
   - Place pottery photos in `images/pottery/`
   - Place process photos in `images/process/`

2. **Auto-Generate Gallery Database**
   ```bash
   npm run update-gallery
   ```
   This will automatically:
   - Scan all images in `images/pottery/`
   - Generate entries with titles, prices, and stories
   - Update `data/pottery-database.js`
   - After generation, you can manually edit titles, prices, and stories in the database file

3. **Customize Content**
   - Edit text in `index.html` (home message, about section)
   - Adjust colors in `css/common.css` (CSS variables)

4. **Set Up Contact Form (Optional)**
   - See [Server Setup Guide](server/README.md) for detailed instructions
   - Required if you want the contact form to send emails

5. **Open in Browser**
   - Open `index.html` in your web browser
   - For static content, no server needed
   - For contact form functionality, run the Node.js server (see below)

## Features

- **Home Page**: Thoughtful message with featured pottery image
- **Gallery**: Grid view of all pottery pieces with hover effects
- **Detail View**: Click any piece to see price, backstory, and process photos
- **About Page**: Your story and artistic philosophy
- **Contact Form**: Visitors can reach out directly via email
- **Responsive Design**: Works beautifully on mobile and desktop
- **Earth Tone Colors**: Terracotta, clay, cream, and sage palette
- **Server-Client Architecture**: Node.js backend for handling email submissions

## Customization

### Colors
Edit CSS variables in `css/common.css`:
```css
:root {
    --clay-dark: #6B4423;
    --terracotta: #C4774C;
    --warm-sand: #E8D5C4;
    --cream: #F5F1E8;
    --sage: #9CA986;
    --earth-brown: #8B6F47;
}
```

### Adding Pottery Pieces (Automatic Method)
1. Drop your new pottery images into `images/pottery/`
2. Run `npm run update-gallery`
3. Optionally edit the generated entries in `data/pottery-database.js` to customize titles, prices, and stories

The script automatically:
- Generates titles from filenames (e.g., "blueVase.jpeg" → "Blue Vase")
- Creates random prices between $45-$110
- Assigns random process images from `images/process/`
- Writes generic but thoughtful stories (you can customize these after generation)

**Supported formats:** .jpg, .jpeg, .png, .gif, .webp
**Note:** Convert .heic files to .jpeg before adding them

## Contact Form Setup

The website includes a contact form on the About Me page that sends emails to **kathmelonashi@gmail.com**.

### Quick Start

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure email settings:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Gmail credentials (see [Server README](server/README.md) for details)

4. **Start the server:**
   ```bash
   npm run dev
   ```

5. **Test the form:**
   - Open the website in your browser
   - Go to About Me → Contact Me section
   - Fill out and submit the form

For detailed setup instructions, Gmail App Password configuration, and troubleshooting, see the [Server Setup Guide](server/README.md).

## Technologies Used

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Google Fonts (Playfair Display, Crimson Text)

### Backend
- Node.js
- Express.js
- Nodemailer (email sending)
- dotenv (environment variables)
- CORS (cross-origin requests)
