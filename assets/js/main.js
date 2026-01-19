document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const navOverlay = document.querySelector(".nav-overlay");

  function openMenu() {
    navOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  function closeMenu() {
    navOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  if (mobileMenuBtn && navOverlay) {
    mobileMenuBtn.addEventListener("click", openMenu);
  }

  if (closeMenuBtn && navOverlay) {
    closeMenuBtn.addEventListener("click", closeMenu);
  }

  // Close on link click
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Don't close if it's a dropdown toggle
      if (!link.classList.contains("mobile-dropdown-toggle")) {
        closeMenu();
      }
    });
  });

  // Show More Functionality
  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreText = document.getElementById("moreText");
  const introContent = document.querySelector(".intro-content");

  if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      moreText.classList.toggle("expanded");

      // Toggle expanded class on intro-content for gradient effect
      if (introContent) {
        introContent.classList.toggle("expanded");
      }

      // Toggle text
      if (moreText.classList.contains("expanded")) {
        readMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
      } else {
        readMoreBtn.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
      }
    });
  }

  // =========================================
  // Trip Card Slider Logic (Horizontal Scroll)
  // =========================================
  const cardSliders = document.querySelectorAll(".card-slider-container");

  cardSliders.forEach((container) => {
    const slidesContainer = container.querySelector(".card-slides");
    const indicators = container.querySelectorAll(".card-indicator");

    // Update active indicator on scroll
    slidesContainer.addEventListener("scroll", () => {
      const scrollLeft = slidesContainer.scrollLeft;
      const slideWidth = slidesContainer.offsetWidth; // width of one slide
      // Calculate index: round(scroll / width)
      const index = Math.round(scrollLeft / slideWidth);

      indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    });

    // Click on indicator to scroll
    indicators.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // prevent card click

        const slideWidth = slidesContainer.offsetWidth;
        slidesContainer.scrollTo({
          left: slideWidth * index,
          behavior: "smooth",
        });
      });
    });
  });

  // =========================================
  // Sticky Tabs Filtering & Scroll Indicator
  // =========================================
  const tabBtns = document.querySelectorAll(".tab-btn, .filter-btn");
  const tripCards = document.querySelectorAll(".trip-card");
  const tabsContainer = document.querySelector(".trips-tabs");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollProgress = document.querySelector(".scroll-progress");
  const tabsContainerElement = document.querySelector(".trips-tabs-container");

  // Detect when tabs become sticky
  if (tabsContainerElement) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is NOT intersecting (i.e., it's stuck), add the class
        if (!entry.isIntersecting) {
          tabsContainerElement.classList.add("is-stuck");
        } else {
          tabsContainerElement.classList.remove("is-stuck");
        }
      },
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" }, // Adjust rootMargin based on sticky top value
    );

    observer.observe(tabsContainerElement);
  }

  if (tabBtns.length > 0) {
    // Helper function for filtering
    const filterCards = (category) => {
      tripCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
          card.classList.remove("hide");
          // Reset animation
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => {
            card.classList.add("hide");
          }, 300); // Wait for transition
        }
      });
    };

    // Tab Filtering
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        // Scroll active button into view centered
        btn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });

        const category = btn.getAttribute("data-tab");
        filterCards(category);

        // Always scroll to the trips grid area when tab is clicked (only if tabs are sticky)
        const tabsContainerElement = document.querySelector(
          ".trips-tabs-container",
        );
        const tripsGrid = document.querySelector(".trips-grid");

        if (
          tripsGrid &&
          tabsContainerElement &&
          tabsContainerElement.classList.contains("is-stuck")
        ) {
          const headerHeight = 70; // Header height
          const tabsHeight = 30; // Tabs container height when sticky
          const offset = headerHeight + tabsHeight;
          const gridTop =
            tripsGrid.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: gridTop,
            behavior: "smooth",
          });
        }
      });
    });

    // Initialize filter on load based on active tab
    const activeTab = document.querySelector(
      ".tab-btn.active, .filter-btn.active",
    );
    if (activeTab) {
      const category = activeTab.getAttribute("data-tab");
      // Run immediately without animation delay if possible, or just run the same logic
      // For initial load, we might want to suppress the hide animation delay, but consistency is fine
      // To prevent "flashing" of wrong content, we should force correct state immediately if possible.
      // But reuse of function is cleaner.
      tripCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.classList.remove("hide");
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        } else {
          card.classList.add("hide");
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
        }
      });
    }

    // Custom Scroll Indicator Logic
    if (tabsContainer && scrollIndicator && scrollProgress) {
      let scrollTimeout;
      let hasScrolled = false;

      const updateScrollIndicator = (isInitial = false) => {
        // Show indicator
        scrollIndicator.classList.add("visible");

        // Calculate progress for moving thumb
        const thumbWidth = 60; // Must match CSS
        const containerWidth = tabsContainer.clientWidth;
        const scrollWidth = tabsContainer.scrollWidth;
        const maxScrollLeft = scrollWidth - containerWidth;

        // Only show if scrollable
        if (maxScrollLeft <= 0) {
          scrollIndicator.style.opacity = "0";
          return;
        }

        const maxTranslate = containerWidth - thumbWidth;
        const scrollWithOffset =
          tabsContainer.scrollLeft < 0 ? 0 : tabsContainer.scrollLeft; // Safari safety
        const percentage = scrollWithOffset / maxScrollLeft;
        const translateX = Math.max(
          0,
          Math.min(percentage * maxTranslate, maxTranslate),
        ); // Clamp

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
          scrollIndicator.classList.remove("visible");
        }, 1000);
      };

      tabsContainer.addEventListener("scroll", () =>
        updateScrollIndicator(false),
      );

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
  const trustBar = document.querySelector(".trust-bar");
  const trustBarContent = document.querySelector(".secondary-nav-content");
  const trustScrollIndicator = document.querySelector(
    ".trust-scroll-indicator",
  );
  const trustScrollProgress = document.querySelector(".trust-scroll-progress");

  if (
    trustBar &&
    trustBarContent &&
    trustScrollIndicator &&
    trustScrollProgress
  ) {
    let trustScrollTimeout;
    let trustHasScrolled = false;

    const updateTrustScrollIndicator = (isInitial = false) => {
      // Show indicator
      trustScrollIndicator.classList.add("visible");

      // Calculate progress for moving thumb
      const thumbWidth = 80; // Match CSS
      const containerWidth = trustBar.clientWidth;
      const scrollWidth = trustBar.scrollWidth;
      const maxScrollLeft = scrollWidth - containerWidth;

      // Set indicator track width to match scroll width
      trustScrollIndicator.style.width = scrollWidth + "px";

      // Calculate position (even if not scrollable, show at start)
      const maxTranslate = Math.max(scrollWidth - thumbWidth - 32, 0); // Full scroll width minus thumb
      const scrollWithOffset =
        trustBar.scrollLeft < 0 ? 0 : trustBar.scrollLeft;
      const percentage =
        maxScrollLeft > 0 ? scrollWithOffset / maxScrollLeft : 0;
      const translateX = Math.max(
        0,
        Math.min(percentage * maxTranslate, maxTranslate),
      );

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
        trustScrollIndicator.classList.remove("visible");
      }, 1000);
    };

    trustBar.addEventListener("scroll", () =>
      updateTrustScrollIndicator(false),
    );

    // Show on load (initial trigger) - always show since we have 6 items
    setTimeout(() => {
      updateTrustScrollIndicator(true);
    }, 500);
  }

  // =========================================
  // Card Click Redirection
  // =========================================
  const clickableCards = document.querySelectorAll(".trip-card[data-link]");

  clickableCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Check if click originated from button or interactive element
      if (
        !e.target.closest("a") &&
        !e.target.closest("button") &&
        !e.target.closest(".card-indicator")
      ) {
        const link = card.getAttribute("data-link");
        if (link) {
          window.location.href = link;
        }
      }
    });
  });

  // =========================================
  // Google Translate Integration
  // =========================================

  const langOptions = document.querySelectorAll(".lang-option");
  const mobileLangBtns = document.querySelectorAll(".mobile-lang-btn");
  const currentLangSpan = document.querySelector(".current-lang");

  // Function to get cookie value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function to set Google Translate Cookie and Reload
  function setGoogleLanguage(lang) {
    // Google Translate uses the 'googtrans' cookie
    // Format: /source_lang/target_lang
    // We assume source is always 'en'
    let cookieValue = "";

    if (lang === "fr") {
      cookieValue = "/en/fr";
    } else {
      cookieValue = "/en/en"; // Reset to English
    }

    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`; // Fallback for localhost

    // Save local preference for UI sync
    localStorage.setItem("preferredLanguage", lang);

    // Reload to apply
    window.location.reload();
  }

  // Sync UI with current state
  function syncLanguageUI() {
    // Check cookie first, then localStorage
    const cookieVal = getCookie("googtrans");
    let currentLang = "en";

    if (cookieVal) {
      if (cookieVal.includes("/fr")) currentLang = "fr";
    } else {
      const saved = localStorage.getItem("preferredLanguage");
      if (saved) currentLang = saved;
    }

    // Update UI Text
    if (currentLangSpan)
      currentLangSpan.textContent = currentLang.toUpperCase();

    // Update Active States
    langOptions.forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === currentLang);
    });

    mobileLangBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  // Event Listeners
  langOptions.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = opt.dataset.lang;
      setGoogleLanguage(lang);
    });
  });

  mobileLangBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
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
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    const toggleScrollButton = () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", toggleScrollButton);

    // Smooth scroll to top on click
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Force hide button immediately after click to prevent visual glitch
      setTimeout(() => {
        scrollToTopBtn.classList.remove("visible");
      }, 100);
    });
  }

  // =========================================
  // Load Blog Cards on Home Page
  // =========================================
  const homeBlogGrid = document.getElementById("homeBlogGrid");

  if (homeBlogGrid) {
    // Blog data for home page preview
    const blogPosts = [
      {
        id: "blog-1",
        title:
          "The Trek to Everest Base Camp: A Glorified Myth or an Adventure Full of Untold Secrets?",
        slug: "everest-base-camp-untold-secrets",
        excerpt:
          "When people talk about trekking to a base camp—especially Everest Base Camp—images immediately come to mind: breathtaking landscapes, prayer flags fluttering in the wind, smiling adventurers standing before snow-covered peaks. But is the reality really as perfect as it sounds?",
        author: "Lok Treks Nepal",
        date: "2026-01-15",
        readTime: "8 min read",
        category: "Trekking Insights",
        featured: true,
        image: "assets/images/Blog-1/blog-1.jpeg",
      },
      {
        id: "blog-2",
        title:
          "The Three Passes Trek in Nepal: Difficulty, Itinerary, Budget & Complete Guide 🏔️",
        slug: "three-passes-trek-nepal-guide",
        excerpt:
          "The Three Passes Trek is considered one of the most beautiful and complete treks in Nepal. It crosses spectacular landscapes, authentic Sherpa villages, and iconic locations such as Gokyo Lake, Everest Base Camp, and Kala Patthar.",
        author: "Lok Treks Nepal",
        date: "2026-01-20",
        readTime: "12 min read",
        category: "Trekking Guides",
        featured: true,
        image: "assets/images/Blog-2/blog-1.jpeg",
      },
      {
        id: "blog-3",
        title: "Short Treks in Nepal: Perfect Adventures for 4–7 Days",
        slug: "short-treks-nepal-guide",
        excerpt:
          "Nepal is world-famous for legendary treks such as Everest Base Camp or the Annapurna Circuit. However, many travelers do not have the time—or the desire—to commit to long expeditions. Short treks of 4 to 7 days offer the perfect solution.",
        author: "Lok Treks Nepal",
        date: "2026-01-22",
        readTime: "15 min read",
        category: "Trekking Guides",
        featured: true,
        image: "assets/images/Blog-3/blog-1.jpeg",
      },
    ];

    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    }

    function createBlogCard(post) {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.onclick = () => {
        window.location.href = `blogs/blog-detail.html?id=${post.id}`;
      };

      card.innerHTML = `
        <div class="blog-card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
          <span class="blog-category">${post.category}</span>
          ${post.featured ? '<div class="blog-featured-badge"><i class="fas fa-star"></i> Featured</div>' : ""}
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <div class="blog-meta-item">
              <i class="far fa-calendar"></i>
              <span>${formatDate(post.date)}</span>
            </div>
            <div class="blog-meta-item">
              <i class="far fa-clock"></i>
              <span>${post.readTime}</span>
            </div>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <a href="blogs/blog-detail.html?id=${post.id}" class="blog-read-more">
            Read Full Story
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      `;

      return card;
    }

    // Load blog cards
    blogPosts.forEach((post) => {
      const blogCard = createBlogCard(post);
      homeBlogGrid.appendChild(blogCard);
    });
  }
});

// Global function for Google Translate Script
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,fr",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element",
  );
}
