// Navigation functionality with URL hash routing

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navMenu = document.querySelector('.nav-menu');

    // Scroll behavior for hiding/showing navigation
    let lastScrollTop = 0;
    let scrollThreshold = 50; // Minimum scroll distance to trigger hide/show

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Scrolling down
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            navMenu.classList.add('nav-hidden');
        }
        // Scrolling up
        else if (scrollTop < lastScrollTop) {
            navMenu.classList.remove('nav-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Add scroll event listener with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            handleScroll();
        });
    });

    // Function to show a specific page
    function showPage(pageName) {
        // Remove active class from all links and pages
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        // Add active class to the target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.add('active');

            // Update nav link active state
            const targetLink = document.querySelector(`[data-page="${pageName}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
        }
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the target page
            const targetPage = this.getAttribute('data-page');

            // Update URL hash
            window.location.hash = targetPage;
        });
    });

    // Handle hash changes (back/forward buttons and direct navigation)
    function handleHashChange() {
        let hash = window.location.hash.substring(1); // Remove the '#'

        // Check if it's a detail page (e.g., #detail/piece-1)
        if (hash.startsWith('detail/')) {
            const pieceId = hash.split('/')[1];
            if (pieceId && typeof showPieceDetail === 'function') {
                showPieceDetail(pieceId);
            }
            return;
        }

        // Default to home if no hash or invalid hash
        if (!hash || !document.getElementById(hash)) {
            hash = 'home';
        }

        showPage(hash);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Load the correct page on initial load
    handleHashChange();
});
