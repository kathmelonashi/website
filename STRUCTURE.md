# Project File Structure

## New Organized Structure

```
website/
│
├── index.html                          # Main page (loads all sections)
│
├── css/                                # Stylesheets folder
│   ├── common.css                     # Navigation, variables, page transitions
│   ├── home.css                       # Home page styles
│   ├── gallery.css                    # Gallery grid and hover effects
│   ├── about.css                      # About page styles
│   └── detail.css                     # Pot detail view styles
│
├── js/                                 # JavaScript folder
│   ├── navigation.js                  # Page navigation between sections
│   ├── gallery.js                     # Gallery click handlers
│   └── detail.js                      # Detail view logic
│
├── data/                               # Database folder
│   └── pottery-database.js            # 🗄️ YOUR POTTERY DATA HERE
│
├── images/                             # Images folder
│   ├── pottery/                       # 📸 Your pot photos go here
│   ├── process/                       # 📸 Your process photos go here
│   └── README.md                      # Image guidelines
│
├── README.md                          # Project documentation
├── STRUCTURE.md                       # This file
└── .gitignore                         # Keeps repo clean

## Old Files (Can be deleted)
├── styles.css                         # ❌ Replaced by css/ folder
└── script.js                          # ❌ Replaced by js/ folder
```

## How the Files Connect

### HTML (index.html)
Loads all the CSS and JS files:
```html
<!-- CSS Files -->
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/home.css">
<link rel="stylesheet" href="css/gallery.css">
<link rel="stylesheet" href="css/about.css">
<link rel="stylesheet" href="css/detail.css">

<!-- JavaScript Files -->
<script src="data/pottery-database.js"></script>
<script src="js/navigation.js"></script>
<script src="js/gallery.js"></script>
<script src="js/detail.js"></script>
```

### Flow
1. **User visits site** → `index.html` loads
2. **CSS loads** → Styles each section
3. **Database loads** → `pottery-database.js` contains all pot data
4. **Navigation loads** → `navigation.js` handles menu clicks
5. **Gallery loads** → `gallery.js` handles pot clicks
6. **Detail view** → `detail.js` shows pot details

## Benefits of This Structure

✅ **Organized**: Each section has its own file
✅ **Clean**: Easy to find and edit specific parts
✅ **Maintainable**: Add new pots just by editing the database file
✅ **Scalable**: Easy to add new features to specific sections
✅ **Version Control**: See exactly what changed in git commits

## Quick Edit Guide

| What to Edit | Where to Go |
|--------------|-------------|
| Add/edit pottery pieces | `data/pottery-database.js` |
| Change colors | `css/common.css` (CSS variables) |
| Edit home page text | `index.html` (home section) |
| Edit about page text | `index.html` (about section) |
| Change home page layout | `css/home.css` |
| Change gallery layout | `css/gallery.css` |
| Upload pottery photos | `images/pottery/` |
| Upload process photos | `images/process/` |
