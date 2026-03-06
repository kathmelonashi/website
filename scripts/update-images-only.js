#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const DATABASE_FILE = path.join(__dirname, '../data/pottery-database.js');

// Read existing database
function readExistingDatabase() {
    try {
        if (fs.existsSync(DATABASE_FILE)) {
            const content = fs.readFileSync(DATABASE_FILE, 'utf8');
            const match = content.match(/const potteryDatabase = (\[[\s\S]*\]);/);
            if (match) {
                // Use eval carefully here, only because we trust our own data file
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

// Main function - ONLY updates IDs sequentially
function updateIdsOnly() {
    console.log('🔍 Reading existing database...');

    const database = readExistingDatabase();

    if (database.length === 0) {
        console.error('❌ No entries found in database!');
        process.exit(1);
    }

    console.log(`✅ Found ${database.length} existing database entries`);

    // Update IDs
    const updatedDatabase = database.map((item, index) => {
        return {
            ...item,
            id: index
        };
    });

    // Generate the JavaScript file
    const fileContent = `// Pottery Database
// To run the update script, run 'npm run update-gallery'

const potteryDatabase = ${JSON.stringify(updatedDatabase, null, 4)};

// To customize a piece, edit it directly in this file
// Running update-gallery will ONLY update ids sequentially from 0 to N
// Everything else is preserved
`;

    // Write the file
    fs.writeFileSync(DATABASE_FILE, fileContent, 'utf8');

    console.log(`✅ Updated ${DATABASE_FILE}`);
    console.log(`✅ Updated IDs for ${updatedDatabase.length} entries to be sequential from 0 to ${updatedDatabase.length - 1}`);
}

// Run the script
updateIdsOnly();
