// Navigation functionality

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the target page
            const targetPage = this.getAttribute('data-page');

            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));

            // Add active class to clicked link and corresponding page
            this.classList.add('active');
            document.getElementById(targetPage).classList.add('active');
        });
    });
});
