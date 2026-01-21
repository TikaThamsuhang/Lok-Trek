// Trek Detail Page JavaScript

// Image Slider Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const sliderTrack = document.querySelector(".slider-track");

  const prevBtn = document.querySelector(".slider-nav.prev");
  const nextBtn = document.querySelector(".slider-nav.next");
  const currentSlideSpan = document.querySelector(".current-slide");
  const totalSlidesSpan = document.querySelector(".total-slides");

  // Determine active mode
  let windowWidth = window.innerWidth;
  let isDesktop = windowWidth >= 992;
  let isTablet = windowWidth >= 768 && windowWidth < 992;
  let shouldLoop = windowWidth >= 768; // Enabled for Tablet & Desktop

  const originalSlideCount = slides.length;
  let currentIndex = 0;
  let autoSlideInterval;
  let isTransitioning = false;

  // Clone Logic (Only if looping is enabled)
  // We need to support cloning if we want infinite loop

  // 1. Assign data-index for lightbox
  slides.forEach((slide, i) => {
    slide.dataset.index = i;
    const img = slide.querySelector("img");
    if (img) img.dataset.index = i;
  });

  // 2. Create Clones (Only for Tablet/Desktop)
  let indexOffset = 0;
  let allSlides = document.querySelectorAll(".slide");

  if (shouldLoop) {
    const clonesStart = [];
    const clonesEnd = [];

    // Clone last slide for start
    if (originalSlideCount > 0) {
      const lastSlideClone = slides[originalSlideCount - 1].cloneNode(true);
      lastSlideClone.classList.add("clone");
      clonesStart.push(lastSlideClone);
    }

    // Clone first 3 slides for end (cover 2.5 view)
    for (let i = 0; i < Math.min(originalSlideCount, 3); i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add("clone");
      clonesEnd.push(clone);
    }

    // Insert Clones
    if (sliderTrack) {
      clonesStart.forEach((clone) =>
        sliderTrack.insertBefore(clone, sliderTrack.firstChild),
      );
      clonesEnd.forEach((clone) => sliderTrack.appendChild(clone));
    }

    indexOffset = 1; // We added 1 clone at start
    currentIndex = indexOffset; // Start at real first slide
  } else {
    // Mobile: Start at 0
    currentIndex = 0;
  }

  // Re-query if clones added
  if (shouldLoop) {
    allSlides = document.querySelectorAll(".slide"); // Update list
  }

  if (totalSlidesSpan) {
    totalSlidesSpan.textContent = originalSlideCount;
  }

  function updateSlider(index, useTransition = true) {
    // If mobile, use native scroll (do nothing here usually, or custom logic?)
    if (!shouldLoop) {
      // Mobile Logic (Optional: sync counter)
      if (currentSlideSpan) {
        // Mobile scroll handles its own position, checking scrollLeft in event listener
        // visualIndex update happens there
      }
      return;
    }

    if (!sliderTrack || allSlides.length === 0) return;

    const slideWidth = allSlides[0].offsetWidth;
    const style = window.getComputedStyle(sliderTrack);
    const gap = parseFloat(style.gap) || 24;

    const offset = -(slideWidth + gap) * index;

    if (useTransition) {
      sliderTrack.style.transition =
        "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      sliderTrack.style.transition = "none";
    }

    sliderTrack.style.transform = `translateX(${offset}px)`;

    // Update Counter
    if (currentSlideSpan) {
      if (allSlides[index]) {
        const originalIndex = parseInt(allSlides[index].dataset.index || "0");
        currentSlideSpan.textContent = originalIndex + 1;
      }
    }
  }

  // Transition End Listener for Infinite Loop Jump
  if (sliderTrack) {
    sliderTrack.addEventListener("transitionend", () => {
      if (!shouldLoop) return;

      // Jump Logic
      if (currentIndex >= originalSlideCount + indexOffset) {
        // Reached End Clones -> Jump to Start
        const shift = currentIndex - (originalSlideCount + indexOffset);
        currentIndex = indexOffset + shift;
        updateSlider(currentIndex, false);
      } else if (currentIndex < indexOffset) {
        // Reached Start Clone -> Jump to End
        // Real last is at indexOffset + originalSlideCount - 1
        currentIndex = indexOffset + originalSlideCount - 1;
        updateSlider(currentIndex, false);
      }
      isTransitioning = false;
    });
  }

  function nextSlide() {
    if (shouldLoop) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateSlider(currentIndex, true);
    } else {
      // Mobile logic if manual button exists
      // e.g. scrollBy
    }
  }

  function prevSlide() {
    if (shouldLoop) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      updateSlider(currentIndex, true);
    } else {
      // Mobile logic
    }
  }

  // Auto-slide for mobile
  function startAutoSlide() {
    if (!shouldLoop) {
      autoSlideInterval = setInterval(() => {
        // Mobile auto slide logic?
        // Using scrollBy?
      }, 4000);
    }
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Navigation button events
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      if (!shouldLoop) {
        stopAutoSlide();
        startAutoSlide();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      if (!shouldLoop) {
        stopAutoSlide();
        startAutoSlide();
      }
    });
  }

  // Handle Window Resize
  function handleResize() {
    const newWidth = window.innerWidth;
    const newShouldLoop = newWidth >= 768;

    if (newShouldLoop !== shouldLoop) {
      // Reload to reset clones/layout cleanly (Simplest approach for mode switch)
      window.location.reload();
    } else {
      // Same mode, just update flags
      windowWidth = newWidth;
      isDesktop = windowWidth >= 992;
      isTablet = windowWidth >= 768 && windowWidth < 992;

      // Adjust position if needed
      if (shouldLoop) {
        updateSlider(currentIndex, false);
      }
    }
  }

  window.addEventListener("resize", handleResize);

  // Mobile: Update counter on scroll
  if (sliderTrack) {
    sliderTrack.addEventListener("scroll", () => {
      if (!shouldLoop) {
        const slideWidth = sliderTrack.offsetWidth;
        const index = Math.round(sliderTrack.scrollLeft / slideWidth);
        const visualIndex = index % originalSlideCount; // Simple mod fallback
        if (currentSlideSpan) currentSlideSpan.textContent = visualIndex + 1;
      }
    });
  }

  // Initialize
  if (shouldLoop) {
    setTimeout(() => updateSlider(currentIndex, false), 50);
  } else {
    startAutoSlide();
  }

  // Stop auto-slide when user leaves page
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide();
    } else if (!shouldLoop) {
      startAutoSlide();
    }
  });

  // Itinerary Accordion Functionality
  const itineraryItems = document.querySelectorAll(".itinerary-item");
  itineraryItems.forEach((item) => {
    const header = item.querySelector(".itinerary-header");
    if (header) {
      header.addEventListener("click", function () {
        const isActive = item.classList.contains("active");
        if (isActive) item.classList.remove("active");
        else item.classList.add("active");
      });
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "javascript:void(0)") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
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

  // Sub-Nav Auto Active State on Scroll (Keep as is)
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

  // Lightbox Functionality (Preserved)
  const lightbox = document.getElementById("image-lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");
    const lightboxPrev = lightbox.querySelector(".lightbox-nav.prev");
    const lightboxNext = lightbox.querySelector(".lightbox-nav.next");
    const lightboxCounter = lightbox.querySelector(".lightbox-counter");
    // Re-query images if clones exist, but lightbox should trigger from any
    // Map click to original index

    // We bind events to whatever is in DOM
    const slideImages = document.querySelectorAll(".slide img");
    let lightboxIndex = 0;
    const lightboxTotal = originalSlideCount; // Total UNIQUE images

    function openLightbox(index) {
      lightboxIndex = index;
      updateLightbox();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function updateLightbox() {
      // Find FIRST occurrence of this index to get src? Or use original array?
      // We can just query based on data-index
      const originSlide = document.querySelector(
        `.slide[data-index="${lightboxIndex}"] img`,
      );
      if (originSlide) {
        lightboxImg.src = originSlide.getAttribute("src");
        lightboxCounter.textContent = `${lightboxIndex + 1}/${lightboxTotal}`;
      }
    }

    slideImages.forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        const idx = parseInt(img.dataset.index || "0");
        openLightbox(idx);
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
