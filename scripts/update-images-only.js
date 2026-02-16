#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const POTTERY_DIR = path.join(__dirname, '../images/pottery');
const PROCESS_DIR = path.join(__dirname, '../images/process');
const DATABASE_FILE = path.join(__dirname, '../data/pottery-database.js');

// Get all image files from a directory
function getImageFiles(dir) {
    try {
        return fs.readdirSync(dir)
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
            });
    } catch (error) {
        console.warn(`Could not read directory ${dir}: ${error.message}`);
        return [];
    }
}

// Read existing database
function readExistingDatabase() {
    try {
        if (fs.existsSync(DATABASE_FILE)) {
            const content = fs.readFileSync(DATABASE_FILE, 'utf8');
            const match = content.match(/const potteryDatabase = (\[[\s\S]*\]);/);
            if (match) {
                const potteryDatabase = eval(match[1]);
                return potteryDatabase;
            }
        }
    } catch (error) {
        console.error(`❌ Could not read existing database: ${error.message}`);
        process.exit(1);
    }
    return [];
}

// Main function - ONLY updates image and processImages fields
function updateImagesOnly() {
    console.log('🔍 Reading existing database...');

    const database = readExistingDatabase();

    if (database.length === 0) {
        console.error('❌ No entries found in database!');
        process.exit(1);
    }

    console.log(`✅ Found ${database.length} existing database entries (order preserved)`);

    // Get current images
    const potteryImages = getImageFiles(POTTERY_DIR);
    const processImages = getImageFiles(PROCESS_DIR);

    console.log(`✅ Found ${potteryImages.length} pottery images`);
    console.log(`✅ Found ${processImages.length} process images`);

    // Update ONLY image and processImages fields
    const updatedDatabase = database.map(item => {
        // Get the current filename from the image path
        const currentFilename = path.basename(item.image);
        const baseName = path.parse(currentFilename).name;

        // Find matching process images for this item
        const matchingProcessImages = processImages
            .filter(processFile => {
                const processBaseName = path.parse(processFile).name.toLowerCase();
                const potteryBaseName = baseName.toLowerCase();
                return processBaseName.startsWith(potteryBaseName + '-') ||
                       processBaseName.startsWith(potteryBaseName.replace(/\s+/g, '').toLowerCase() + '-');
            })
            .sort()
            .map(processFile => `images/process/${processFile}`);

        // Return the item with ONLY image and processImages updated
        return {
            ...item,
            image: `images/pottery/${currentFilename}`,
            processImages: matchingProcessImages
        };
    });

    // Generate the JavaScript file
    const fileContent = `// Pottery Database
// Auto-generated from images/pottery folder
// Run 'npm run update-gallery' to update image paths only

const potteryDatabase = ${JSON.stringify(updatedDatabase, null, 4)};

// To customize a piece, edit it directly in this file
// Running update-gallery will ONLY update image and processImages paths
// Everything else (title, price, story, order) is preserved
`;

    // Write the file
    fs.writeFileSync(DATABASE_FILE, fileContent, 'utf8');

    console.log(`✅ Updated ${DATABASE_FILE}`);
    console.log(`✅ Updated image paths for ${updatedDatabase.length} entries`);
    console.log(`✅ Database order and all other fields preserved`);
}

// Run the script
updateImagesOnly();
