document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header-three');
    const menuLinks = document.querySelectorAll('.main-menu__list a');
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/';

    // 1. Handle non-home pages (like /contact)
    if (!isHomePage) {
        menuLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentPath);
        });
        return; // Stop here for non-home pages
    }

    // 2. Homepage-specific logic
    const homeLink = document.querySelector('.main-menu__list a[href="/"]');
    let lastScrollPosition = 0;
    let isScrolling = false;

    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        // Clear all active states first
        menuLinks.forEach(link => link.classList.remove('active'));
        
        // Special case for top of page
        if (scrollPosition < 200) {
            homeLink.classList.add('active');
            return;
        }

        // Check each section
        let activeSectionFound = false;
        menuLinks.forEach(link => {
            const hash = link.getAttribute('href');
            if (!hash.startsWith('#')) return;

            const section = document.querySelector(hash);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                    activeSectionFound = true;
                }
            }
        });

        // Fallback to home if no section found
        if (!activeSectionFound) homeLink.classList.add('active');
    }

    // 3. Smooth scrolling for section links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (!hash.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll handling with debounce
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveSection();
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, 50);
    });

    // Initialize
    homeLink.classList.add('active');
    header.classList.toggle('scrolled', window.scrollY > 50);
});