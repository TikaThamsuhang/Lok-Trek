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
    if (window.innerWidth >= 992) {
      // Desktop: Use scroll-based detection
      const checkSticky = () => {
        const rect = tabsContainerElement.getBoundingClientRect();
        const stickyTop = 0;

        // Element is stuck when its top position equals the sticky top value
        if (rect.top <= stickyTop && rect.top >= stickyTop - 1) {
          tabsContainerElement.classList.add("is-stuck");
        } else if (rect.top > stickyTop) {
          // Element is above sticky position (not stuck yet)
          tabsContainerElement.classList.remove("is-stuck");
        }
        // Keep is-stuck if scrolled past (rect.top < stickyTop - 1)
      };

      // Check on scroll
      window.addEventListener("scroll", checkSticky, { passive: true });

      // Initial check
      checkSticky();
    } else {
      // Mobile: Use IntersectionObserver (original approach)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            tabsContainerElement.classList.add("is-stuck");
          } else {
            tabsContainerElement.classList.remove("is-stuck");
          }
        },
        {
          threshold: [1],
          rootMargin: "-1px 0px 0px 0px",
        },
      );

      observer.observe(tabsContainerElement);
    }
  }

  if (tabBtns.length > 0) {
    // Helper function for filtering
    const filterCards = (category) => {
      tripCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        const cardDays = parseInt(card.getAttribute("data-days") || "0");

        let shouldShow = false;

        if (category === "all") {
          shouldShow = true;
        } else if (category === "short-treks") {
          shouldShow = cardCategory === "trekking" && cardDays <= 8;
        } else if (category === "long-treks") {
          shouldShow = cardCategory === "trekking" && cardDays > 8;
        } else {
          shouldShow = cardCategory === category;
        }

        if (shouldShow) {
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

    const scrollToGrid = () => {
      const tabsContainerElement = document.querySelector(
        ".trips-tabs-container",
      );
      const tripsGrid = document.querySelector(".trips-grid");

      if (
        tripsGrid &&
        tabsContainerElement &&
        tabsContainerElement.classList.contains("is-stuck")
      ) {
        const headerHeight = 70;
        const tabsHeight = 30;
        const offset = headerHeight + tabsHeight;
        const gridTop =
          tripsGrid.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: gridTop,
          behavior: "smooth",
        });
      }
    };

    // Tab Filtering
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // If this is the dropdown toggle button, don't run standard filtering
        if (btn.id === "trekkingDropdownBtn") return;

        // Remove active class from all buttons
        tabBtns.forEach((b) => b.classList.remove("active"));
        // Remove active from dropdown items
        document
          .querySelectorAll(".tab-dropdown-item")
          .forEach((i) => i.classList.remove("active"));

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
        scrollToGrid();
      });
    });

    // Dropdown Logic
    const dropdownBtn = document.getElementById("trekkingDropdownBtn");
    const dropdownMenu = document.getElementById("trekkingDropdownMenu");
    const dropdownItems = document.querySelectorAll(".tab-dropdown-item");

    if (dropdownBtn && dropdownMenu) {
      // Move dropdown to body to avoid clipping by scroll container
      document.body.appendChild(dropdownMenu);

      const closeDropdown = () => {
        dropdownMenu.classList.remove("active");
        dropdownBtn.classList.remove("dropdown-open");
      };

      const updatePosition = () => {
        if (!dropdownMenu.classList.contains("active")) return;
        const rect = dropdownBtn.getBoundingClientRect();
        dropdownMenu.style.position = "fixed";
        dropdownMenu.style.top = rect.bottom + 10 + "px";
        dropdownMenu.style.left = rect.left + rect.width / 2 + "px";
        // Width auto or min-width handled by CSS
      };

      // Toggle Dropdown
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.contains("active");

        if (isOpen) {
          closeDropdown();
        } else {
          dropdownMenu.classList.add("active");
          updatePosition();
          dropdownBtn.classList.add("dropdown-open");
        }
      });

      // Handle Dropdown Item Click
      dropdownItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const category = item.getAttribute("data-tab");

          // Update Active States
          tabBtns.forEach((b) => b.classList.remove("active"));
          dropdownItems.forEach((i) => i.classList.remove("active"));

          item.classList.add("active");
          dropdownBtn.classList.add("active"); // Set parent button active

          // Filter
          filterCards(category);

          // Close Dropdown
          closeDropdown();

          scrollToGrid();
        });
      });

      // Close Dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !dropdownBtn.contains(e.target) &&
          !dropdownMenu.contains(e.target)
        ) {
          closeDropdown();
        }
      });

      // Close on scroll to avoid detached menu
      window.addEventListener("scroll", closeDropdown, { passive: true });
      const tabsContainerElement = document.querySelector(
        ".trips-tabs-container",
      );
      if (tabsContainerElement) {
        tabsContainerElement.addEventListener("scroll", closeDropdown, {
          passive: true,
        });
      }
      const tabsList = document.querySelector(".trips-tabs");
      if (tabsList) {
        tabsList.addEventListener("scroll", closeDropdown, { passive: true });
      }

      // Update position on resize if open (optional, but good)
      window.addEventListener("resize", () => {
        if (dropdownMenu.classList.contains("active")) updatePosition();
      });
    }

    // Initialize filter on load based on active tab or URL param
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");

    // Check URL param first
    if (tabParam) {
      // Find matching dropdown item or tab button
      const dropdownItem = document.querySelector(
        `.tab-dropdown-item[data-tab="${tabParam}"]`,
      );
      const standardTab = document.querySelector(
        `.tab-btn[data-tab="${tabParam}"]`,
      );

      if (dropdownItem) {
        // It's a dropdown item (Short/Long Treks)
        // Clear existing active
        tabBtns.forEach((b) => b.classList.remove("active"));
        dropdownItems.forEach((i) => i.classList.remove("active"));

        // Activate
        dropdownItem.classList.add("active");
        dropdownBtn.classList.add("active");

        // Filter
        filterCards(tabParam);
        scrollToGrid();
      } else if (standardTab) {
        // It's a standard tab
        standardTab.click(); // Reuse click handler
      }
    } else {
      // Fallback to default active tab (All Trips)
      const activeTab = document.querySelector(
        ".tab-btn.active, .filter-btn.active",
      );
      if (activeTab) {
        const category = activeTab.getAttribute("data-tab");
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
  // Card Click Redirection & Slider Navigation
  // =========================================
  const clickableCards = document.querySelectorAll(".trip-card");

  clickableCards.forEach((card) => {
    // Inject Navigation Buttons
    const imageContainer = card.querySelector(".trip-image");
    if (imageContainer) {
      const prevBtn = document.createElement("button");
      prevBtn.className = "card-nav-btn prev";
      prevBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';

      const nextBtn = document.createElement("button");
      nextBtn.className = "card-nav-btn next";
      nextBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';

      imageContainer.appendChild(prevBtn);
      imageContainer.appendChild(nextBtn);

      const slidesContainer = imageContainer.querySelector(".card-slides");
      const indicators = imageContainer.querySelectorAll(".card-indicator");

      // Function to update button visibility
      const updateButtonVisibility = () => {
        if (!slidesContainer) return;

        const width = slidesContainer.clientWidth;
        const scrollLeft = slidesContainer.scrollLeft;

        // Calculate current slide index based on scroll position
        // Using Math.round handles partial scrolls naturally
        const currentIndex = Math.round(scrollLeft / width);
        const totalSlides = slidesContainer.children.length;

        // Start (Index 0): Hide Prev, Show Next
        if (currentIndex <= 0) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "flex";
        }
        // End (Last Index): Show Prev, Hide Next
        else if (currentIndex >= totalSlides - 1) {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "none";
        }
        // Middle: Show Both
        else {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "flex";
        }
      };

      // Handle Previous Click
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (slidesContainer) {
          slidesContainer.scrollBy({
            left: -slidesContainer.clientWidth,
            behavior: "smooth",
          });
        }
      });

      // Handle Next Click
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (slidesContainer) {
          slidesContainer.scrollBy({
            left: slidesContainer.clientWidth,
            behavior: "smooth",
          });
        }
      });

      // Update indicators and buttons on scroll
      if (slidesContainer) {
        slidesContainer.addEventListener(
          "scroll",
          () => {
            const scrollLeft = slidesContainer.scrollLeft;
            const width = slidesContainer.clientWidth;

            // Initial check handles indicators if they exist
            if (indicators.length > 0) {
              const index = Math.round(scrollLeft / width);
              indicators.forEach((ind, i) => {
                ind.classList.toggle("active", i === index);
              });
            }

            updateButtonVisibility();
          },
          { passive: true },
        );

        // Initial Check
        setTimeout(updateButtonVisibility, 100);
      }
    }

    // Handle Card Click (Link Navigation)
    card.addEventListener("click", (e) => {
      // Check if click originated from button or interactive element
      if (
        !e.target.closest("a") &&
        !e.target.closest("button") &&
        !e.target.closest(".card-indicator") &&
        !e.target.closest(".card-nav-btn") // Prevents nav buttons from triggering link
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
    } else if (lang === "zh-CN") {
      cookieValue = "/en/zh-CN";
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
      else if (cookieVal.includes("/zh-CN")) currentLang = "zh-CN";
    } else {
      const saved = localStorage.getItem("preferredLanguage");
      if (saved) currentLang = saved;
    }

    // Update UI Text
    if (currentLangSpan) {
      if (currentLang === "zh-CN") {
        currentLangSpan.textContent = "ZH";
      } else {
        currentLangSpan.textContent = currentLang.toUpperCase();
      }
    }

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
        "Le trek vers le camp de base de l’Everest : mythe glorifié ou aventure pleine de secrets méconnus ?",
      slug: "everest-base-camp-untold-secrets",
      excerpt:
        "Lorsque l’on parle de trekking vers un camp de base—en particulier celui de l’Everest—des images viennent immédiatement à l’esprit : paysages à couper le souffle, drapeaux de prière flottant dans le vent, aventuriers souriants devant des sommets enneigés. Mais la réalité est-elle vraiment aussi parfaite qu’elle en a l’air ?",
      author: "Lok Treks Nepal",
      date: "2026-01-15",
      readTime: "8 min de lecture",
      category: "Aperçus du Trekking",
      featured: true,
      image: "assets/images/Blog-1/blog-1.jpeg",
    },
    {
      id: "blog-2",
      title:
        "Le trek des Trois Cols au Népal : difficulté, itinéraire, budget et guide complet 🏔️",
      slug: "three-passes-trek-nepal-guide",
      excerpt:
        "Le trek des Trois Cols est considéré comme l’un des treks les plus beaux et les plus complets du Népal. Il traverse des paysages spectaculaires, des villages sherpas authentiques et des lieux emblématiques comme le lac Gokyo, le camp de base de l’Everest et Kala Patthar.",
      author: "Lok Treks Nepal",
      date: "2026-01-20",
      readTime: "12 min de lecture",
      category: "Guides de Trekking",
      featured: true,
      image: "assets/images/Blog-2/blog-1.jpeg",
    },
    {
      id: "blog-3",
      title: "Treks courts au Népal : aventures parfaites de 4 à 7 jours",
      slug: "short-treks-nepal-guide",
      excerpt:
        "Le Népal est mondialement célèbre pour des treks légendaires comme le camp de base de l’Everest ou le circuit de l’Annapurna. Cependant, de nombreux voyageurs n’ont pas le temps—ou l’envie—de s’engager dans de longues expéditions. Les treks courts de 4 à 7 jours offrent une solution parfaite.",
      author: "Lok Treks Nepal",
      date: "2026-01-22",
      readTime: "15 min de lecture",
      category: "Guides de Trekking",
      featured: true,
      image: "assets/images/Blog-3/blog-1.jpeg",
    },
  ];

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
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
          ${
            post.featured
              ? '<div class="blog-featured-badge"><i class="fas fa-star"></i> À la une</div>'
              : ""
          }
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
            Lire l'article complet
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

  // =========================================
  // Custom Formspree Submission Handler
  // =========================================
  const inquiryForms = document.querySelectorAll(".inquiry-form, .contact-form");
  
  inquiryForms.forEach(form => {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalBtnText = btn.innerHTML;
      btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      const formData = new FormData(form);
      
      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Success
          form.reset();
          btn.innerHTML = originalBtnText;
          btn.disabled = false;
          showSuccessPopup();
        } else {
          // Error
          const data = await response.json();
          let errorMsg = 'Oops! There was a problem submitting your form.';
          if (Object.hasOwn(data, 'errors')) {
            errorMsg = data["errors"].map(error => error["message"]).join(", ");
          }
          alert(errorMsg);
          btn.innerHTML = originalBtnText;
          btn.disabled = false;
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form. Please try again.');
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
      }
    });
  });

  function showSuccessPopup() {
    let popup = document.getElementById('form-success-popup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'form-success-popup';
      popup.innerHTML = `
        <div class="popup-backdrop"></div>
        <div class="popup-content">
          <button class="popup-close"><i class="fas fa-times"></i></button>
          <div class="popup-icon-wrapper">
            <i class="fas fa-check"></i>
          </div>
          <h4>Message Sent!</h4>
          <p>Thank you for reaching out.<br>We will get back to you within 24 hours.</p>
        </div>
      `;
      document.body.appendChild(popup);

      const style = document.createElement('style');
      style.textContent = `
        #form-success-popup {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          z-index: 99999; opacity: 0; visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        #form-success-popup.show { opacity: 1; visibility: visible; }
        #form-success-popup .popup-backdrop {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
        }
        #form-success-popup .popup-content {
          background: #fff; padding: 2.5rem 2rem; border-radius: 16px;
          text-align: center; max-width: 400px; width: 90%; position: relative;
          transform: translateY(30px) scale(0.95);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }
        #form-success-popup.show .popup-content { transform: translateY(0) scale(1); }
        #form-success-popup .popup-close {
          position: absolute; top: 15px; right: 15px; background: #f5f5f5;
          border: none; width: 32px; height: 32px; border-radius: 50%;
          font-size: 1rem; color: #777; cursor: pointer; transition: all 0.3s;
          display: flex; align-items: center; justify-content: center;
        }
        #form-success-popup .popup-close:hover { background: #fee; color: #e74c3c; transform: rotate(90deg); }
        #form-success-popup .popup-icon-wrapper {
          width: 80px; height: 80px; background: #e8f8f5; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem; color: #27ae60; font-size: 2.5rem;
          box-shadow: 0 0 0 10px rgba(39, 174, 96, 0.1);
          transform: scale(0); opacity: 0;
        }
        #form-success-popup.show .popup-icon-wrapper {
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation-delay: 0.15s;
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        #form-success-popup h4 { font-size: 1.6rem; color: #2c3e50; margin-bottom: 0.5rem; font-weight: 800; }
        #form-success-popup p { color: #555; font-size: 1.05rem; margin: 0; line-height: 1.5; }
      `;
      document.head.appendChild(style);

      popup.querySelector('.popup-close').addEventListener('click', () => { popup.classList.remove('show'); });
      popup.querySelector('.popup-backdrop').addEventListener('click', () => { popup.classList.remove('show'); });
    }

    // Reset animation by removing class and forcing reflow so it animates every time it opens
    const iconWrapper = popup.querySelector('.popup-icon-wrapper');
    if (iconWrapper) {
      iconWrapper.style.animation = 'none';
      iconWrapper.offsetHeight; 
      iconWrapper.style.animation = null; 
    }

    setTimeout(() => { popup.classList.add('show'); }, 10);
    
    if (popup.timeoutId) clearTimeout(popup.timeoutId);
    popup.timeoutId = setTimeout(() => { popup.classList.remove('show'); }, 6000);
  }

});

// Global function for Google Translate Script
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,fr,zh-CN",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element",
  );
}
