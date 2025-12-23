document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const navOverlay = document.querySelector('.nav-overlay');

    function openMenu() {
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (mobileMenuBtn && navOverlay) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }

    if (closeMenuBtn && navOverlay) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Close on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Show More Functionality
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreText = document.getElementById('moreText');
    const introContent = document.querySelector('.intro-content');

    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moreText.classList.toggle('expanded');

            // Toggle expanded class on intro-content for gradient effect
            if (introContent) {
                introContent.classList.toggle('expanded');
            }

            // Toggle text
            if (moreText.classList.contains('expanded')) {
                readMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            } else {
                readMoreBtn.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
            }
        });
    }
});
