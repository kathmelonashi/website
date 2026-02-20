// Gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    // Build gallery dynamically from the database
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    potteryDatabase.forEach(piece => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-piece', piece.id);
        item.innerHTML = `
            <img src="${piece.image}" alt="${piece.title}" />
            <div class="gallery-item-overlay">
                <span>View Details</span>
            </div>
        `;
        item.addEventListener('click', function() {
            // Save scroll position so we can restore it when going back
            sessionStorage.setItem('galleryScrollY', window.scrollY);
            // Use URL hash to navigate to detail page
            window.location.hash = `detail/${piece.id}`;
        });
        galleryGrid.appendChild(item);
    });
});
