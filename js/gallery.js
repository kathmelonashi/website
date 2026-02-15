// Gallery functionality

document.addEventListener('DOMContentLoaded', function() {
    // Gallery item click handlers
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const pieceId = parseInt(this.getAttribute('data-piece'));
            showPieceDetail(pieceId);
        });
    });
});
