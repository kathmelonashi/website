// Image helpers
//
// The database points at the original, full-size photos. Those are far too
// big to show directly (several MB each), so the site shows the web-sized
// copies that 'npm run optimize-images' generates:
//
//   images/pottery/foo.jpeg -> images/optimized/thumb/pottery/foo.jpeg
//                           -> images/optimized/large/pottery/foo.jpeg

// variant: 'thumb' (gallery grid, process thumbnails) or 'large' (detail view, lightbox)
function optimizedImage(src, variant) {
    return src.replace(/^images\//, `images/optimized/${variant}/`);
}

// Point an <img> at the optimized copy. If that copy doesn't exist yet
// (a photo was added but optimize-images hasn't been run), fall back to the original.
function setOptimizedImage(img, src, variant) {
    img.onerror = function () {
        img.onerror = null;
        img.src = src;
    };
    img.src = optimizedImage(src, variant);
}
