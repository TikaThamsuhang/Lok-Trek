
// Trek Detail Page JavaScript

// Image Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const sliderTrack = document.querySelector(".slider-track");
  // Ensure we work with Array for easier manipulation if needed,
  // but querySelectorAll above refers to original DOM at that moment.

  const prevBtn = document.querySelector(".slider-nav.prev");
  const nextBtn = document.querySelector(".slider-nav.next");
  const currentSlideSpan = document.querySelector(".current-slide");
  const totalSlidesSpan = document.querySelector(".total-slides");

  let currentIndex = 0; // Will be offset by clones
  const originalSlideCount = slides.length;
  let isDesktop = window.innerWidth >= 992;
  let autoSlideInterval;
  let isTransitioning = false;

  // We need clones for infinite loop on desktop
  // Strategy: Prepend last slide, Append first few slides (enough to fill view)
  // 2.5 view means we need at least 3 clones at end.

  // Set up clones only once if possible or manage clean up
  // Ideally we do this structure: [LastClone, Real1, Real2... RealN, FirstClone, SecondClone, ThirdClone]

  // 1. Assign data-index to original slides for lightbox mapping
  slides.forEach((slide, i) => {
    slide.dataset.index = i;
    const img = slide.querySelector("img");
    if (img) img.dataset.index = i;
  });

  // 2. Create Clones
  const clonesStart = [];
  const clonesEnd = [];

  // Clone last slide for start
  const lastSlideClone = slides[originalSlideCount - 1].cloneNode(true);
  lastSlideClone.classList.add("clone");
  clonesStart.push(lastSlideClone);

  // Clone first 3 slides for end (to cover 2.5 view)
  for (let i = 0; i < Math.min(originalSlideCount, 3); i++) {
    const clone = slides[i].cloneNode(true);
    clone.classList.add("clone");
    clonesEnd.push(clone);
  }

  // Insert Clones
  clonesStart.forEach((clone) => sliderTrack.insertBefore(clone, sliderTrack.firstChild));
  clonesEnd.forEach((clone) => sliderTrack.appendChild(clone));

  // Re-query slides to include clones in the list for sizing calculation
  let allSlides = document.querySelectorAll(".slide");

  // Index Offset: because we added 1 clone at start, real slide 0 is now at index 1
  const indexOffset = 1;
  let visualIndex = 0; // 0 to N-1 (User facing)

  currentIndex = indexOffset; // Start at real first slide

  if (totalSlidesSpan) {
    totalSlidesSpan.textContent = originalSlideCount;
  }

  function updateSlider(index, useTransition = true) {
    if (!isDesktop) return; // Mobile uses native scroll

    const slideWidth = allSlides[0].offsetWidth;
    const style = window.getComputedStyle(sliderTrack);
    const gap = parseFloat(style.gap) || 24;

    const offset = -(slideWidth + gap) * index;

    if (useTransition) {
      sliderTrack.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      sliderTrack.style.transition = "none";
    }

    sliderTrack.style.transform = `translateX(${offset}px)`;

    // Update Counter (Map internal index to visual index)
    let displayIndex = 0;

    // internal index 0 (clone of Last) -> visual 4
    // internal index 1 (Real 0) -> visual 1
    // ...
    if (index === 0) {
      displayIndex = originalSlideCount;
    } else if (index > originalSlideCount) {
      displayIndex = index - originalSlideCount;
    } else {
      displayIndex = index;
    }

    // Correct bounds
    if (currentSlideSpan) {
      // Calculate 0-based index relative to real slides
      let realIdx = index - indexOffset;
      if (realIdx < 0) realIdx = originalSlideCount - 1;
      else if (realIdx >= originalSlideCount) realIdx = realIdx % originalSlideCount;

      // Actually, easier map:
      // index 1 -> Slide 1
      // index Count -> Slide Count
      // index Count+1 -> Slide 1

      // Simplest: use data-index from current element
      if (allSlides[index]) {
        const originalIndex = parseInt(allSlides[index].dataset.index || "0");
        currentSlideSpan.textContent = originalIndex + 1;
      }
    }
  }

  // Transition End Listener for Infinite Loop Jump
  sliderTrack.addEventListener("transitionend", () => {
    if (!isDesktop) return;

    // If we reached the clones at the end
    if (currentIndex >= originalSlideCount + indexOffset) {
      // Jump back to start (Real Slide 0 is at indexOffset)
      // But wait, if we are at index (originalCount + indexOffset) which is First Clone
      // We correspond to Real Slide 0 (indexOffset)

      // Calculate equivalent real index
      const shift = currentIndex - (originalSlideCount + indexOffset);
      currentIndex = indexOffset + shift;

      updateSlider(currentIndex, false); // Instant jump
    }

    // If we reached the clone at the start
    if (currentIndex < indexOffset) {
      // Jump to end (Real Last Slide)
      // Real Last Slide is at (indexOffset + originalSlideCount - 1)
      currentIndex = indexOffset + originalSlideCount - 1;
      updateSlider(currentIndex, false);
    }

    isTransitioning = false;
  });

  function nextSlide() {
    if (isDesktop) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateSlider(currentIndex, true);
    } else {
      visualIndex = (visualIndex + 1) % originalSlideCount;
      // Native scroll logic for mobile... handled by CSS mostly but if custom nav used:
      // Mobile usually ignores this function if buttons hidden
      // For mobile, we just update the counter based on visualIndex
      if (currentSlideSpan) {
        currentSlideSpan.textContent = visualIndex + 1;
      }
    }
  }

  function prevSlide() {
    if (isDesktop) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      updateSlider(currentIndex, true);
    } else {
      visualIndex = (visualIndex - 1 + originalSlideCount) % originalSlideCount;
      // For mobile, we just update the counter based on visualIndex
      if (currentSlideSpan) {
        currentSlideSpan.textContent = visualIndex + 1;
      }
    }
  }

  // Auto-slide for mobile (every 4 seconds)
  function startAutoSlide() {
    if (!isDesktop) {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Navigation button events
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      if (!isDesktop) {
        stopAutoSlide();
        startAutoSlide(); // Restart auto-slide after manual interaction
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
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
      if (isDesktop) {
        // Determine nearest index or reset
        // Re-read slides size logic
        allSlides = document.querySelectorAll(".slide");
        currentIndex = indexOffset;
        updateSlider(currentIndex, false);
        stopAutoSlide();
      } else {
        sliderTrack.style.transform = "none"; // Clear transform for mobile
        sliderTrack.style.transition = "none";
        startAutoSlide();
      }
    }
  }

  window.addEventListener("resize", handleResize);

  // Mobile: Update counter on scroll
  if (sliderTrack) {
    sliderTrack.addEventListener("scroll", () => {
      if (!isDesktop) {
        const slideWidth = sliderTrack.offsetWidth;
        const index = Math.round(sliderTrack.scrollLeft / slideWidth);
        if (index !== visualIndex) {
          visualIndex = index;
          if (currentSlideSpan) currentSlideSpan.textContent = visualIndex + 1;
        }
      }
    });
  }

  // Initialize
  if (isDesktop) {
    // Need brief timeout to ensure layout is ready for offsetWidth
    setTimeout(() => updateSlider(currentIndex, false), 50);
  } else {
    startAutoSlide();
    if (currentSlideSpan) currentSlideSpan.textContent = visualIndex + 1;
  }

  // Stop auto-slide when user leaves page
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide();
    } else if (!isDesktop) {
      startAutoSlide();
    }
  });

  // Itinerary Accordion Functionality
  const itineraryItems = document.querySelectorAll(".itinerary-item");

  itineraryItems.forEach((item) => {
    const header = item.querySelector(".itinerary-header");

    header.addEventListener("click", function () {
      // Toggle active class
      const isActive = item.classList.contains("active");

      // Close all other items (optional - comment out for multi-open)
      // itineraryItems.forEach(otherItem => {
      //     if (otherItem !== item) {
      //         otherItem.classList.remove('active');
      //     }
      // });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "javascript:void(0)") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Offset for sub-nav (approx 70px + 10px buffer)
          const offsetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Sub-Nav Auto Active State on Scroll
  const sections = document.querySelectorAll(".section[id]");
  const navLinks = document.querySelectorAll(".sub-nav-list a");

  function highlightNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 85;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // Lightbox Functionality
  const lightbox = document.getElementById("image-lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");
    const lightboxPrev = lightbox.querySelector(".lightbox-nav.prev");
    const lightboxNext = lightbox.querySelector(".lightbox-nav.next");
    const lightboxCounter = lightbox.querySelector(".lightbox-counter");
    const slideImages = document.querySelectorAll(".slide img");

    let lightboxIndex = 0;
    const lightboxTotal = slideImages.length;

    function openLightbox(index) {
      lightboxIndex = index;
      updateLightbox();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function updateLightbox() {
      const src = slideImages[lightboxIndex].getAttribute("src");
      lightboxImg.src = src;
      lightboxCounter.textContent = `${lightboxIndex + 1}/${lightboxTotal}`;
    }

    slideImages.forEach((img, index) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        openLightbox(index);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    if (lightboxNext) {
      lightboxNext.addEventListener("click", (e) => {
        e.stopPropagation();
        lightboxIndex = (lightboxIndex + 1) % lightboxTotal;
        updateLightbox();
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        lightboxIndex = (lightboxIndex - 1 + lightboxTotal) % lightboxTotal;
        updateLightbox();
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
});
