// Gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    // Build gallery dynamically from the database
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    potteryDatabase.forEach(piece => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-piece', piece.id);

        // Check if item is purchasable
        const isPurchasable = cartManager.isItemPurchasable(piece);

        // Build cart button HTML if purchasable
        const cartButtonHtml = isPurchasable
            ? `<button class="gallery-cart-btn" data-id="${piece.id}">Add to Cart</button>`
            : '';

        item.innerHTML = `
            <img src="${piece.image}" alt="${piece.title}" />
            <div class="gallery-item-overlay">
                <span class="view-details-text">View Details</span>
                ${cartButtonHtml}
            </div>
        `;

        // Navigate to detail page on item click (but not on button click)
        item.addEventListener('click', function(e) {
            // Don't navigate if clicking the cart button
            if (!e.target.classList.contains('gallery-cart-btn')) {
                window.location.hash = `detail/${piece.id}`;
            }
        });

        galleryGrid.appendChild(item);
    });

    // Handle cart button clicks with event delegation
    galleryGrid.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-cart-btn')) {
            e.stopPropagation(); // Prevent navigation
            const pieceId = e.target.getAttribute('data-id');
            const button = e.target;

            // Add to cart
            const result = cartManager.addItem(pieceId, 1);

            if (result.success) {
                // Show feedback
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.classList.add('added');

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('added');
                }, 1000);
            } else {
                alert(result.message);
            }
        }
    });
});
