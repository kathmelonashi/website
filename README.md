# Pottery Studio Website

A clean, elegant pottery website with earth tones featuring a home page, gallery, and detailed product views.

## Project Structure

```
website/
├── index.html              # Main HTML file
├── css/                    # Stylesheets (organized by section)
│   ├── common.css         # Shared styles and navigation
│   ├── home.css           # Home page styles
│   ├── gallery.css        # Gallery page styles
│   ├── about.css          # About page styles
│   └── detail.css         # Detail view styles
├── js/                     # JavaScript files
│   ├── navigation.js      # Page navigation logic
│   ├── gallery.js         # Gallery interactions
│   └── detail.js          # Detail view logic
├── data/                   # Database files
│   └── pottery-database.js # Pottery pieces data
└── images/                 # Your pottery photos
    ├── pottery/           # Main product images
    ├── process/           # Process/making images
    └── README.md          # Image guidelines
```

## Getting Started

1. **Add Your Images**
   - Place pottery photos in `images/pottery/`
   - Place process photos in `images/process/`

2. **Update the Database**
   - Edit `data/pottery-database.js`
   - Replace placeholder URLs with your image paths
   - Update titles, prices, and stories

3. **Customize Content**
   - Edit text in `index.html` (home message, about section)
   - Adjust colors in `css/common.css` (CSS variables)

4. **Open in Browser**
   - Open `index.html` in your web browser
   - No server needed for local development!

## Features

- **Home Page**: Thoughtful message with featured pottery image
- **Gallery**: Grid view of all pottery pieces with hover effects
- **Detail View**: Click any piece to see price, backstory, and process photos
- **About Page**: Your story and artistic philosophy
- **Responsive Design**: Works beautifully on mobile and desktop
- **Earth Tone Colors**: Terracotta, clay, cream, and sage palette

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

### Adding Pottery Pieces
1. Add images to `images/pottery/` and `images/process/`
2. Add entry to `data/pottery-database.js`
3. Add corresponding gallery item in `index.html`

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Google Fonts (Playfair Display, Crimson Text)
