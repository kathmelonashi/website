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
            // Variant classes cycle at different lengths (6/5/4) so
            // shape + proportion + tilt combos rarely repeat
            item.className = `gallery-item shape-${index % 6 + 1} ratio-${index % 5 + 1} tilt-${index % 4 + 1}`;
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
            columns[index % count].appendChild(item);
        });
    }

    buildGallery();
    window.addEventListener('resize', buildGallery);
});
