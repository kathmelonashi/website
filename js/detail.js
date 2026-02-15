// Detail view functionality

// Show piece detail
function showPieceDetail(pieceId) {
    const piece = potteryDatabase[pieceId];

    // Update detail page content
    document.getElementById('detail-image').src = piece.image;
    document.getElementById('detail-title').textContent = piece.title;
    document.getElementById('detail-price').textContent = piece.price;
    document.getElementById('detail-story').innerHTML = `<p>${piece.story}</p>`;

    // Add process images
    const processContainer = document.getElementById('process-images');
    processContainer.innerHTML = '';
    piece.processImages.forEach(imgSrc => {
        const processImg = document.createElement('div');
        processImg.className = 'process-image';
        processImg.innerHTML = `<img src="${imgSrc}" alt="Making process" />`;
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
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    document.getElementById('gallery').classList.add('active');
    document.querySelector('[data-page="gallery"]').classList.add('active');
}
