// Detail view functionality

// Lightbox state
let currentLightboxImages = [];
let currentLightboxIndex = 0;

// Index of the piece currently open in the detail view (-1 when none)
let currentPieceIndex = -1;

// Step to the previous (-1) or next (+1) piece, wrapping around at the ends
function showAdjacentPiece(step) {
    if (currentPieceIndex < 0) return;
    const total = potteryDatabase.length;
    window.location.hash = `detail/${(currentPieceIndex + step + total) % total}`;
}

// Show piece detail
function showPieceDetail(pieceId) {
    const piece = potteryDatabase[pieceId];

    if (!piece) {
        // If piece doesn't exist, go back to gallery
        window.location.hash = 'gallery';
        return;
    }

    currentPieceIndex = potteryDatabase.indexOf(piece);

    // Fetch the neighbours' photos ahead of time so Previous / Next feel instant
    [-1, 1].forEach(step => {
        const total = potteryDatabase.length;
        const neighbour = potteryDatabase[(currentPieceIndex + step + total) % total];
        new Image().src = optimizedImage(neighbour.image, 'large');
    });

    // Update detail page content
    setOptimizedImage(document.getElementById('detail-image'), piece.image, 'large');
    document.getElementById('detail-title').textContent = piece.title;
    document.getElementById('detail-story').textContent = piece.story;

    // Status tag under the title, and a contact prompt that matches it
    const status = pieceStatus(piece);
    const statusEl = document.getElementById('detail-status');
    // "Available" is hidden for now — to bring the tag back, set SHOW_AVAILABLE_TAG to true
    const SHOW_AVAILABLE_TAG = false;
    const showTag = status && (SHOW_AVAILABLE_TAG || status.className !== 'status-available');
    statusEl.textContent = showTag ? status.label : '';
    statusEl.className = 'piece-status' + (showTag ? ` ${status.className}` : '');
    statusEl.style.display = showTag ? '' : 'none';

    const prompts = {
        'status-available': 'Interested in this piece?',
        'status-made-to-order': 'Want one made for you?'
    };
    document.getElementById('contact-prompt-text').textContent =
        (status && prompts[status.className]) || 'Want something similar?';

    // Add process images
    const processContainer = document.getElementById('process-images');
    const processSection = document.querySelector('.detail-process');
    processContainer.innerHTML = '';

    if (piece.processImages && piece.processImages.length > 0) {
        processSection.style.display = 'block';
        piece.processImages.forEach((imgSrc, index) => {
            const processImg = document.createElement('div');
            processImg.className = 'process-image';
            processImg.innerHTML = `<img alt="Making process" loading="lazy" decoding="async" />`;
            setOptimizedImage(processImg.querySelector('img'), imgSrc, 'thumb');
            processImg.addEventListener('click', () => openLightbox(piece.processImages, index));
            processContainer.appendChild(processImg);
        });
    } else {
        processSection.style.display = 'none';
    }

    // Switch to detail page
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    document.getElementById('detail').classList.add('active');
    window.scrollTo(0, 0);
}

// Back to gallery function
function backToGallery() {
    window.location.hash = 'gallery';
}

// Lightbox functions
function openLightbox(images, startIndex) {
    currentLightboxImages = images;
    currentLightboxIndex = startIndex;
    updateLightboxImage();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    setOptimizedImage(lightboxImage, currentLightboxImages[currentLightboxIndex], 'large');
}

function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightboxImage();
}

function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightboxImage();
}

// Lightbox event listeners
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Navigation buttons
    prevBtn.addEventListener('click', prevLightboxImage);
    nextBtn.addEventListener('click', nextLightboxImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) {
            // Lightbox closed: arrow keys step between pieces on the detail page
            const onDetailPage = document.getElementById('detail').classList.contains('active');
            const typing = /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
            if (onDetailPage && !typing) {
                if (e.key === 'ArrowRight') showAdjacentPiece(1);
                else if (e.key === 'ArrowLeft') showAdjacentPiece(-1);
            }
            return;
        }

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextLightboxImage();
        } else if (e.key === 'ArrowLeft') {
            prevLightboxImage();
        }
    });
});
