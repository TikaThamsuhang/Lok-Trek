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
        link.addEventListener('click', () => {
             // Don't close if it's a dropdown toggle
             if (!link.classList.contains('mobile-dropdown-toggle')) {
                 closeMenu();
             }
        });
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
    // Sticky Tabs Filtering & Scroll Indicator
    // =========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tripCards = document.querySelectorAll('.trip-card');
    const tabsContainer = document.querySelector('.trips-tabs');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollProgress = document.querySelector('.scroll-progress');
    const tabsContainerElement = document.querySelector('.trips-tabs-container');

    // Detect when tabs become sticky
    if (tabsContainerElement) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the element is NOT intersecting (i.e., it's stuck), add the class
                if (!entry.isIntersecting) {
                    tabsContainerElement.classList.add('is-stuck');
                } else {
                    tabsContainerElement.classList.remove('is-stuck');
                }
            },
            { threshold: [1], rootMargin: '-56px 0px 0px 0px' } // Adjust rootMargin based on sticky top value
        );

        observer.observe(tabsContainerElement);
    }

    if (tabBtns.length > 0) {
        // Tab Filtering
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Scroll active button into view centered
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

                const category = btn.getAttribute('data-tab');

                // Filter cards
                tripCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('hide');
                        // Reset animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.classList.add('hide');
                        }, 300); // Wait for transition
                    }
                });
            });
        });

        // Custom Scroll Indicator Logic
        if (tabsContainer && scrollIndicator && scrollProgress) {
            let scrollTimeout;
            let hasScrolled = false;

        const updateScrollIndicator = (isInitial = false) => {
            // Show indicator
            scrollIndicator.classList.add('visible');

            // Calculate progress for moving thumb
            const thumbWidth = 60; // Must match CSS
            const containerWidth = tabsContainer.clientWidth;
            const scrollWidth = tabsContainer.scrollWidth;
            const maxScrollLeft = scrollWidth - containerWidth;
            
            // Only show if scrollable
            if (maxScrollLeft <= 0) {
                scrollIndicator.style.opacity = '0';
                return;
            }

            const maxTranslate = containerWidth - thumbWidth;
            const scrollWithOffset = tabsContainer.scrollLeft < 0 ? 0 : tabsContainer.scrollLeft; // Safari safety
            const percentage = scrollWithOffset / maxScrollLeft;
            const translateX = Math.max(0, Math.min(percentage * maxTranslate, maxTranslate)); // Clamp
            
            // Update thumb position
            scrollProgress.style.transform = `translateX(${translateX}px)`;

            // Visibility Logic
            if (!isInitial) {
                hasScrolled = true;
            }

            if (isInitial && !hasScrolled) {
                // Keep visible indefinitely until scroll happens
                return;
            }

            // Hide after timeout
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollIndicator.classList.remove('visible');
            }, 1000); 
        };

        tabsContainer.addEventListener('scroll', () => updateScrollIndicator(false));
        
        // Show on load (initial trigger)
        setTimeout(() => {
            if (tabsContainer.scrollWidth > tabsContainer.clientWidth) {
                updateScrollIndicator(true);
            }
        }, 500);
        }
    }

    // =========================================
    // Trust Bar Scroll Indicator
    // =========================================
    const trustBar = document.querySelector('.trust-bar');
    const trustBarContent = document.querySelector('.secondary-nav-content');
    const trustScrollIndicator = document.querySelector('.trust-scroll-indicator');
    const trustScrollProgress = document.querySelector('.trust-scroll-progress');

    if (trustBar && trustBarContent && trustScrollIndicator && trustScrollProgress) {
        let trustScrollTimeout;
        let trustHasScrolled = false;

        const updateTrustScrollIndicator = (isInitial = false) => {
            // Show indicator
            trustScrollIndicator.classList.add('visible');

            // Calculate progress for moving thumb
            const thumbWidth = 80; // Match CSS
            const containerWidth = trustBar.clientWidth;
            const scrollWidth = trustBar.scrollWidth;
            const maxScrollLeft = scrollWidth - containerWidth;
            
            // Set indicator track width to match scroll width
            trustScrollIndicator.style.width = scrollWidth + 'px';
            
            // Calculate position (even if not scrollable, show at start)
            const maxTranslate = Math.max(scrollWidth - thumbWidth - 32, 0); // Full scroll width minus thumb
            const scrollWithOffset = trustBar.scrollLeft < 0 ? 0 : trustBar.scrollLeft;
            const percentage = maxScrollLeft > 0 ? scrollWithOffset / maxScrollLeft : 0;
            const translateX = Math.max(0, Math.min(percentage * maxTranslate, maxTranslate));
            
            // Update thumb position
            trustScrollProgress.style.transform = `translateX(${translateX}px)`;

            // Visibility Logic
            if (!isInitial) {
                trustHasScrolled = true;
            }

            if (isInitial && !trustHasScrolled) {
                // Keep visible indefinitely until scroll happens
                return;
            }

            // Hide after timeout
            clearTimeout(trustScrollTimeout);
            trustScrollTimeout = setTimeout(() => {
                trustScrollIndicator.classList.remove('visible');
            }, 1000);
        };

        trustBar.addEventListener('scroll', () => updateTrustScrollIndicator(false));
        
        // Show on load (initial trigger) - always show since we have 6 items
        setTimeout(() => {
            updateTrustScrollIndicator(true);
        }, 500);
    }

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
