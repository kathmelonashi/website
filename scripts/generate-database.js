#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const POTTERY_DIR = path.join(__dirname, '../images/pottery');
const PROCESS_DIR = path.join(__dirname, '../images/process');
const OUTPUT_FILE = path.join(__dirname, '../data/pottery-database.js');

// Get all image files from a directory
function getImageFiles(dir) {
    try {
        return fs.readdirSync(dir)
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
            })
            .sort();
    } catch (error) {
        console.warn(`Could not read directory ${dir}: ${error.message}`);
        return [];
    }
}

// Generate a title from filename
function generateTitle(filename) {
    const nameWithoutExt = path.parse(filename).name;
    // Convert camelCase or underscores to spaces and capitalize
    return nameWithoutExt
        .replace(/([A-Z])/g, ' $1')
        .replace(/[_-]/g, ' ')
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Generate random price between min and max
function generatePrice(min = 45, max = 110) {
    const price = Math.floor(Math.random() * (max - min + 1)) + min;
    return `$${price}`;
}

// Default stories pool
const defaultStories = [
    "This piece was created with intention and care, shaped by hand over hours of focused work. The clay responded beautifully to each touch, and the final form emerged naturally. The glazing process revealed unexpected color variations that make this piece truly unique.",
    "Thrown on the wheel during a quiet morning, this piece carries a sense of calm and presence. Every curve was considered, every surface smoothed with patience. The firing brought out tones that shift in different light, inviting closer observation.",
    "This handcrafted piece represents the balance between control and letting go. The clay had its own ideas during shaping, and I followed its lead. The result is a form that feels both grounded and alive, with character in every detail.",
    "Formed from stoneware clay, this piece celebrates the natural beauty of the material. The texture and color are honest expressions of earth and fire working together. It's designed to be used, touched, and appreciated daily.",
    "Created with both function and beauty in mind, this piece went through multiple stages of refinement. The glazing was layered carefully to create depth, and the firing revealed a surface that invites you to pick it up and feel its weight and balance.",
    "This piece emerged from experimentation with form and glaze. The clay was worked slowly, allowing organic imperfections to become part of its story. What began as an idea evolved into something more—a vessel that holds both purpose and presence."
];

function generateStory() {
    return defaultStories[Math.floor(Math.random() * defaultStories.length)];
}

// Main function
function generateDatabase() {
    console.log('🔍 Scanning pottery directory...');

    const potteryImages = getImageFiles(POTTERY_DIR);
    const processImages = getImageFiles(PROCESS_DIR);

    if (potteryImages.length === 0) {
        console.error('❌ No image files found in pottery directory!');
        process.exit(1);
    }

    console.log(`✅ Found ${potteryImages.length} pottery images`);
    console.log(`✅ Found ${processImages.length} process images`);

    // Generate database entries
    const database = potteryImages.map((filename, index) => {
        // Randomly select 3 process images for this piece
        const selectedProcessImages = [];
        const shuffled = [...processImages].sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(3, shuffled.length); i++) {
            selectedProcessImages.push(`images/process/${shuffled[i]}`);
        }

        return {
            id: index,
            title: generateTitle(filename),
            price: generatePrice(),
            image: `images/pottery/${filename}`,
            story: generateStory(),
            processImages: selectedProcessImages
        };
    });

    // Generate the JavaScript file
    const fileContent = `// Pottery Database
// Auto-generated from images/pottery folder
// Run 'node scripts/generate-database.js' to regenerate

const potteryDatabase = ${JSON.stringify(database, null, 4)};

// To customize a piece, edit it directly in this file after generation
// The script will preserve your changes if you keep the same filename
`;

    // Write the file
    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');

    console.log(`✅ Generated ${OUTPUT_FILE}`);
    console.log(`📝 Created ${database.length} pottery entries`);
    console.log('\n💡 Tip: You can edit the titles, prices, and stories in pottery-database.js after generation');
}

// Run the script
generateDatabase();
