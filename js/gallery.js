// Gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');

    function getColumnCount() {
        return window.matchMedia('(max-width: 768px)').matches ? 2 : 3;
    }

    let currentColumns = 0;

    // Build gallery dynamically from the database, dealing pieces into
    // columns round-robin so the order reads left-to-right
    function buildGallery() {
        const count = getColumnCount();
        if (count === currentColumns) return;
        currentColumns = count;

        galleryGrid.innerHTML = '';
        const columns = [];
        for (let i = 0; i < count; i++) {
            const col = document.createElement('div');
            col.className = 'gallery-column';
            galleryGrid.appendChild(col);
            columns.push(col);
        }

        potteryDatabase.forEach((piece, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-piece', piece.id);
            item.innerHTML = `
                <img alt="${piece.title}" decoding="async" />
                <div class="gallery-item-overlay">
                    <span>View Details</span>
                </div>
            `;
            // Small copy of the photo; the first couple of rows load right
            // away, the rest only as they're about to scroll into view
            // Corner tag for pieces that are sold or made to order
            // ("available" is the default, so tagging every card would just be noise)
            const status = pieceStatus(piece);
            if (status && status.className !== 'status-available') {
                const tag = document.createElement('span');
                tag.className = `piece-status gallery-item-status ${status.className}`;
                tag.textContent = status.label;
                item.appendChild(tag);
            }

            const img = item.querySelector('img');
            if (index >= count * 2) img.loading = 'lazy';
            setOptimizedImage(img, piece.image, 'thumb');
            item.addEventListener('click', function() {
                // Save scroll position so we can restore it when going back
                sessionStorage.setItem('galleryScrollY', window.scrollY);
                // Use URL hash to navigate to detail page
                window.location.hash = `detail/${piece.id}`;
            });
            columns[index % count].appendChild(item);
        });
    }

    buildGallery();
    window.addEventListener('resize', buildGallery);
});
