#!/usr/bin/env node

// Makes small, web-sized copies of every photo in images/pottery and
// images/process. The originals are never touched.
//
//   images/pottery/foo.jpeg  ->  images/optimized/thumb/pottery/foo.jpeg  (gallery grid, process thumbnails)
//                            ->  images/optimized/large/pottery/foo.jpeg  (detail view, lightbox)
//
// Run with 'npm run optimize-images' (also runs as part of 'npm run update-gallery').
// Only new or changed photos are processed, so re-running is fast.
// Uses 'sips', which ships with macOS.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '../images');
const OUTPUT_DIR = path.join(IMAGES_DIR, 'optimized');
const SOURCE_FOLDERS = ['pottery', 'process'];
const IMAGE_PATTERN = /\.(jpe?g|png)$/i;

// Longest side in pixels, and JPEG quality (0-100)
const VARIANTS = [
    { name: 'thumb', maxSize: 800, quality: 72 },
    { name: 'large', maxSize: 1800, quality: 80 }
];

function runSips(args) {
    return new Promise((resolve, reject) => {
        execFile('sips', args, (error, stdout, stderr) => {
            if (error) reject(new Error(stderr || error.message));
            else resolve();
        });
    });
}

function isUpToDate(source, output) {
    if (!fs.existsSync(output)) return false;
    return fs.statSync(output).mtimeMs >= fs.statSync(source).mtimeMs;
}

// Collect every (source, output) pair that needs (re)generating
function collectJobs() {
    const jobs = [];
    const expected = new Set();

    for (const folder of SOURCE_FOLDERS) {
        const sourceFolder = path.join(IMAGES_DIR, folder);
        if (!fs.existsSync(sourceFolder)) continue;

        for (const file of fs.readdirSync(sourceFolder)) {
            if (!IMAGE_PATTERN.test(file)) continue;
            const source = path.join(sourceFolder, file);

            for (const variant of VARIANTS) {
                const output = path.join(OUTPUT_DIR, variant.name, folder, file);
                expected.add(output);
                if (!isUpToDate(source, output)) {
                    jobs.push({ source, output, variant });
                }
            }
        }
    }

    return { jobs, expected };
}

// Delete optimized copies whose original photo no longer exists
function removeOrphans(expected) {
    let removed = 0;
    for (const variant of VARIANTS) {
        for (const folder of SOURCE_FOLDERS) {
            const dir = path.join(OUTPUT_DIR, variant.name, folder);
            if (!fs.existsSync(dir)) continue;
            for (const file of fs.readdirSync(dir)) {
                const output = path.join(dir, file);
                if (!expected.has(output)) {
                    fs.unlinkSync(output);
                    removed++;
                }
            }
        }
    }
    return removed;
}

async function processJob({ source, output, variant }) {
    fs.mkdirSync(path.dirname(output), { recursive: true });
    const args = ['-Z', String(variant.maxSize)];
    if (/\.jpe?g$/i.test(source)) {
        args.push('-s', 'format', 'jpeg', '-s', 'formatOptions', String(variant.quality));
    }
    args.push(source, '--out', output);
    await runSips(args);
}

async function main() {
    const { jobs, expected } = collectJobs();
    const removed = removeOrphans(expected);

    if (jobs.length === 0) {
        console.log(`✅ All ${expected.size} optimized images are up to date`);
    } else {
        console.log(`🖼️  Optimizing ${jobs.length} image(s)...`);

        let failed = 0;
        let next = 0;
        const workers = Array.from({ length: Math.max(2, os.cpus().length) }, async () => {
            while (next < jobs.length) {
                const job = jobs[next++];
                try {
                    await processJob(job);
                } catch (error) {
                    failed++;
                    console.error(`❌ ${path.relative(IMAGES_DIR, job.source)}: ${error.message.trim()}`);
                }
            }
        });
        await Promise.all(workers);

        console.log(`✅ Optimized ${jobs.length - failed} image(s)`);
        if (failed > 0) {
            console.error(`❌ ${failed} image(s) failed`);
            process.exitCode = 1;
        }
    }

    if (removed > 0) {
        console.log(`🧹 Removed ${removed} optimized image(s) whose original was deleted`);
    }
}

main();
