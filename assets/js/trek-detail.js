// Trek Detail Page JavaScript

// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const currentSlideSpan = document.querySelector('.current-slide');
    const totalSlidesSpan = document.querySelector('.total-slides');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isDesktop = window.innerWidth >= 992;

    // Update total slides counter
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }

    // Function to update slider
    function updateSlider(index) {
        currentIndex = index;

        if (isDesktop) {
            // Desktop: Show 3 images, slide by 1
            const slideWidth = slides[0].offsetWidth;
            const gap = 16; // 1rem gap
            const offset = -(slideWidth + gap) * currentIndex;
            sliderTrack.style.transform = `translateX(${offset}px)`;
        } 
        // Mobile: CSS Scroll Snap handles positioning. No JS update needed for layout.

        // Update counter
        if (currentSlideSpan) {
            currentSlideSpan.textContent = currentIndex + 1;
        }
    }

    // Next slide
    function nextSlide() {
        if (isDesktop) {
            // Desktop: Can scroll up to last possibility of showing 3 images
            const maxIndex = Math.max(0, totalSlides - 3);
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        } else {
            // Mobile: Loop through all slides
            currentIndex = (currentIndex + 1) % totalSlides;
        }
        updateSlider(currentIndex);
    }

    // Previous slide
    function prevSlide() {
        if (isDesktop) {
            const maxIndex = Math.max(0, totalSlides - 3);
            currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        } else {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateSlider(currentIndex);
    }

    // Auto-slide for mobile (every 4 seconds)
    function startAutoSlide() {
        if (isDesktop) {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Navigation button events
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            if (!isDesktop) {
                stopAutoSlide();
                startAutoSlide(); // Restart auto-slide after manual interaction
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            if (!isDesktop) {
                stopAutoSlide();
                startAutoSlide();
            }
        });
    }

    // Handle window resize
    function handleResize() {
        const wasDesktop = isDesktop;
        isDesktop = window.innerWidth >= 992;

        if (wasDesktop !== isDesktop) {
            // Mode changed, reset slider
            currentIndex = 0;
            updateSlider(0);

            if (isDesktop) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        }
    }

    window.addEventListener('resize', handleResize);

    // Mobile: Update counter on scroll
    if (sliderTrack) {
        sliderTrack.addEventListener('scroll', () => {
            if (!isDesktop) {
                const slideWidth = sliderTrack.offsetWidth;
                const index = Math.round(sliderTrack.scrollLeft / slideWidth);
                if (index !== currentIndex) {
                    currentIndex = index;
                    if (currentSlideSpan) currentSlideSpan.textContent = currentIndex + 1;
                }
            }
        });
    }

    // Initialize
    updateSlider(0);
    if (!isDesktop) {
        startAutoSlide();
    }

    // Stop auto-slide when user leaves page
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (!isDesktop) {
            startAutoSlide();
        }
    });

    // Itinerary Accordion Functionality
    const itineraryItems = document.querySelectorAll('.itinerary-item');

    itineraryItems.forEach(item => {
        const header = item.querySelector('.itinerary-header');

        header.addEventListener('click', function () {
            // Toggle active class
            const isActive = item.classList.contains('active');

            // Close all other items (optional - comment out for multi-open)
            // itineraryItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //     }
            // });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== 'javascript:void(0)') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Offset for sub-nav (approx 70px + 10px buffer)
                    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sub-Nav Auto Active State on Scroll
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.sub-nav-list a');

    function highlightNavLink() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 85;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Lightbox Functionality
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-nav.prev');
        const lightboxNext = lightbox.querySelector('.lightbox-nav.next');
        const lightboxCounter = lightbox.querySelector('.lightbox-counter');
        const slideImages = document.querySelectorAll('.slide img');

        let lightboxIndex = 0;
        const lightboxTotal = slideImages.length;

        function openLightbox(index) {
            lightboxIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            const src = slideImages[lightboxIndex].getAttribute('src');
            lightboxImg.src = src;
            lightboxCounter.textContent = `${lightboxIndex + 1}/${lightboxTotal}`;
        }

        slideImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxIndex = (lightboxIndex + 1) % lightboxTotal;
                updateLightbox();
            });
        }

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxIndex = (lightboxIndex - 1 + lightboxTotal) % lightboxTotal;
                updateLightbox();
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});
