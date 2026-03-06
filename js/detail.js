// Detail view functionality

// Lightbox state
let currentLightboxImages = [];
let currentLightboxIndex = 0;

// Show piece detail
function showPieceDetail(pieceId) {
    const piece = potteryDatabase[pieceId];

    if (!piece) {
        // If piece doesn't exist, go back to gallery
        window.location.hash = 'gallery';
        return;
    }

    // Update detail page content
    document.getElementById('detail-image').src = piece.image;
    document.getElementById('detail-title').textContent = piece.title;
    document.getElementById('detail-story').textContent = piece.story;

    // Add process images
    const processContainer = document.getElementById('process-images');
    const processSection = document.querySelector('.detail-process');
    processContainer.innerHTML = '';

    if (piece.processImages && piece.processImages.length > 0) {
        processSection.style.display = 'block';
        piece.processImages.forEach((imgSrc, index) => {
            const processImg = document.createElement('div');
            processImg.className = 'process-image';
            processImg.innerHTML = `<img src="${imgSrc}" alt="Making process" />`;
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
    lightboxImage.src = currentLightboxImages[currentLightboxIndex];
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
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextLightboxImage();
        } else if (e.key === 'ArrowLeft') {
            prevLightboxImage();
        }
    });
});
