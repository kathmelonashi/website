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
    document.getElementById('detail-price').textContent = piece.price;
    document.getElementById('detail-story').innerHTML = `<p>${piece.story}</p>`;

    // Add cart section after price
    const priceElement = document.getElementById('detail-price');

    // Remove existing cart section if any
    const existingCartSection = document.querySelector('.detail-cart-section');
    if (existingCartSection) {
        existingCartSection.remove();
    }

    // Create cart section
    const cartSection = document.createElement('div');
    cartSection.className = 'detail-cart-section';

    if (cartManager.isItemPurchasable(piece)) {
        // Item is purchasable - show cart controls
        cartSection.innerHTML = `
            <div class="detail-cart-controls">
                <label for="detail-quantity">Quantity:</label>
                <select id="detail-quantity" class="quantity-select">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<option value="${n}">${n}</option>`).join('')}
                </select>
                <button id="detail-add-to-cart" class="primary-button">Add to Cart</button>
            </div>
        `;

        // Insert after price
        priceElement.parentNode.insertBefore(cartSection, priceElement.nextSibling);

        // Add click handler for Add to Cart button
        setTimeout(() => {
            const addButton = document.getElementById('detail-add-to-cart');
            const quantitySelect = document.getElementById('detail-quantity');

            if (addButton) {
                addButton.addEventListener('click', () => {
                    const quantity = parseInt(quantitySelect.value);
                    const result = cartManager.addItem(piece.id, quantity);

                    if (result.success) {
                        // Show success feedback
                        const originalText = addButton.textContent;
                        addButton.textContent = `Added ${quantity} to Cart!`;
                        addButton.disabled = true;

                        setTimeout(() => {
                            addButton.textContent = originalText;
                            addButton.disabled = false;
                        }, 1500);
                    } else {
                        alert(result.message);
                    }
                });
            }
        }, 0);
    } else {
        // Item is not purchasable - show unavailable message
        cartSection.innerHTML = `
            <button class="unavailable-button" disabled>Currently Unavailable</button>
            <p class="unavailable-message">
                This piece is ${piece.price.toLowerCase()}.
                Please contact me if interested in similar items.
            </p>
        `;
        priceElement.parentNode.insertBefore(cartSection, priceElement.nextSibling);
    }

    // Add process images
    const processContainer = document.getElementById('process-images');
    processContainer.innerHTML = '';
    piece.processImages.forEach((imgSrc, index) => {
        const processImg = document.createElement('div');
        processImg.className = 'process-image';
        processImg.innerHTML = `<img src="${imgSrc}" alt="Making process" />`;
        processImg.addEventListener('click', () => openLightbox(piece.processImages, index));
        processContainer.appendChild(processImg);
    });

    // Switch to detail page
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    document.getElementById('detail').classList.add('active');
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
