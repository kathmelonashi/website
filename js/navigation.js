// Navigation functionality with URL hash routing
//
// Two tabs: Gallery and Contact. Both always show in the nav; the one you're
// on is highlighted. The gallery page opens on a full-screen hero (#home) with
// the pieces below it, and clicking Gallery while already there scrolls back
// up to the hero.

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navMenu = document.querySelector('.nav-menu');

    const HOME_PAGE = 'gallery';

    let activePage = HOME_PAGE;
    let lastScrollTop = 0;
    let scrollThreshold = 50; // Minimum scroll distance to trigger hide/show

    // Highlight the link for the page we're on (the detail view counts as gallery)
    function updateNav() {
        const highlight = activePage === 'detail' ? 'gallery' : activePage;
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-page') === highlight);
        });
    }

    // The frosted pill only shows once the nav is floating over scrolled content
    function updateFloating() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navMenu.classList.toggle('nav-floating', scrollTop > scrollThreshold);
    }

    // Hide the nav while scrolling down, bring it back on the way up
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        updateFloating();

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            navMenu.classList.add('nav-hidden');
        } else if (scrollTop < lastScrollTop) {
            navMenu.classList.remove('nav-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });

    // Force video play (mobile browsers block autoplay silently)
    function tryPlayVideo() {
        const video = document.querySelector('.pottery-image video');
        if (!video) return;
        video.muted = true;
        video.load();
        video.play().catch(() => {
            video.addEventListener('canplay', () => video.play().catch(() => { }), { once: true });
        });
    }

    // Function to show a specific page
    function showPage(pageName) {
        const targetPage = document.getElementById(pageName);
        if (!targetPage || !targetPage.classList.contains('page')) return;

        pages.forEach(p => p.classList.remove('active'));
        targetPage.classList.add('active');
        activePage = pageName;
        navMenu.classList.remove('nav-hidden');
        lastScrollTop = 0;
        updateNav();

        if (pageName === 'gallery') {
            tryPlayVideo();
            // Restore gallery scroll position when going back from detail, otherwise start at the hero
            const savedScrollY = sessionStorage.getItem('galleryScrollY');
            if (savedScrollY !== null) {
                sessionStorage.removeItem('galleryScrollY');
                requestAnimationFrame(() => {
                    window.scrollTo(0, parseInt(savedScrollY));
                    lastScrollTop = window.pageYOffset;
                    updateFloating();
                });
                return;
            }
        }

        window.scrollTo(0, 0);
        updateFloating();
    }

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            // Already on this page: glide back up to the top (the hero, on the gallery page)
            if (targetPage === activePage) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

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
                activePage = 'detail';
                navMenu.classList.remove('nav-hidden');
                updateNav();
                updateFloating();
            }
            return;
        }

        // Old #home links and anything unknown land on the gallery hero
        const target = document.getElementById(hash);
        if (!hash || hash === 'home' || !target || !target.classList.contains('page')) {
            hash = HOME_PAGE;
        }

        showPage(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});
