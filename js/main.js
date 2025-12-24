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

    // =========================================
    // Trip Card Slider Logic (Horizontal Scroll)
    // =========================================
    const cardSliders = document.querySelectorAll('.card-slider-container');
    
    cardSliders.forEach(container => {
        const slidesContainer = container.querySelector('.card-slides');
        const indicators = container.querySelectorAll('.card-indicator');
        
        // Update active indicator on scroll
        slidesContainer.addEventListener('scroll', () => {
            const scrollLeft = slidesContainer.scrollLeft;
            const slideWidth = slidesContainer.offsetWidth; // width of one slide
            // Calculate index: round(scroll / width)
            const index = Math.round(scrollLeft / slideWidth);
            
            indicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });

        // Click on indicator to scroll
        indicators.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // prevent card click
                
                const slideWidth = slidesContainer.offsetWidth;
                slidesContainer.scrollTo({
                    left: slideWidth * index,
                    behavior: 'smooth'
                });
            });
        });
    });

    // =========================================
    // Card Click Redirection
    // =========================================
    const clickableCards = document.querySelectorAll('.trip-card[data-link]');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if click originated from button or interactive element
            if (!e.target.closest('a') && !e.target.closest('button') && !e.target.closest('.card-indicator')) {
                const link = card.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });

    // =========================================
    // Google Translate Integration
    // =========================================
    
    const langOptions = document.querySelectorAll('.lang-option');
    const mobileLangBtns = document.querySelectorAll('.mobile-lang-btn');
    const currentLangSpan = document.querySelector('.current-lang');

    // Function to get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to set Google Translate Cookie and Reload
    function setGoogleLanguage(lang) {
        // Google Translate uses the 'googtrans' cookie
        // Format: /source_lang/target_lang
        // We assume source is always 'en'
        let cookieValue = '';
        
        if (lang === 'fr') {
            cookieValue = '/en/fr';
        } else {
            cookieValue = '/en/en'; // Reset to English
        }

        document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=${cookieValue}; path=/;`; // Fallback for localhost

        // Save local preference for UI sync
        localStorage.setItem('preferredLanguage', lang);
        
        // Reload to apply
        window.location.reload();
    }

    // Sync UI with current state
    function syncLanguageUI() {
        // Check cookie first, then localStorage
        const cookieVal = getCookie('googtrans');
        let currentLang = 'en';

        if (cookieVal) {
            if (cookieVal.includes('/fr')) currentLang = 'fr';
        } else {
            const saved = localStorage.getItem('preferredLanguage');
            if (saved) currentLang = saved;
        }

        // Update UI Text
        if (currentLangSpan) currentLangSpan.textContent = currentLang.toUpperCase();

        // Update Active States
        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === currentLang);
        });

        mobileLangBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    }

    // Event Listeners
    langOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = opt.dataset.lang;
            setGoogleLanguage(lang);
        });
    });

    mobileLangBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.dataset.lang;
            setGoogleLanguage(lang);
        });
    });

    // Initialize
    syncLanguageUI();

    // =========================================
    // Scroll to Top Button
    // =========================================
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        const toggleScrollButton = () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleScrollButton);

        // Smooth scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Force hide button immediately after click to prevent visual glitch
            setTimeout(() => {
                scrollToTopBtn.classList.remove('visible');
            }, 100);
        });
    }
});

// Global function for Google Translate Script
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}
