function renderHeader(containerId, options = { rootPath: "./" }) {
  const root = options.rootPath;

  // Active link logic helper
  const isActive = (path) => {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop() || "index.html";
    return currentFile === path ? "highlight" : "";
  };

  const html = `
    <header class="header header-white">
        <div class="container header-container">
            <a href="${root}index.html" class="logo">
                <img src="${root}assets/images/logo-1-removebg.png" alt="Logo Lok Treks Nepal" class="logo-img">
            </a>

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <ul class="desktop-nav-list">
                    <li><a href="${root}index.html" class="nav-link ${isActive(
                      "index.html",
                    )}" data-i18n="nav_home">Accueil</a></li>
                    
                     <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_trekking">Trekking <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                        <ul class="dropdown-menu">
                             <!-- Short Treks Submenu -->
                             <li class="dropdown-submenu">
                                <a href="javascript:void(0)" class="dropdown-link d-flex justify-content-between align-items-center">
                                    Treks Courts <i class="fas fa-chevron-right" style="font-size: 0.7em;"></i>
                                </a>
                                <ul class="dropdown-menu submenu-right">
                                    <li><a href="../treks/trek-detail-langtang-valley.html" class="dropdown-link">Vallée du Langtang</a></li>
                                    <li><a href="../treks/trek-detail-pikey-peak.html" class="dropdown-link">Pikey Peak – Vue sur l'Everest</a></li>
                                    <li><a href="../treks/trek-detail-mardi-himal.html" class="dropdown-link">Mardi Himal</a></li>
                                    <li><a href="../treks/trek-detail-poon-hill.html" class="dropdown-link">Poon Hill</a></li>
                                    <li><a href="../treks/trek-detail-abc.html" class="dropdown-link">Camp de Base de l'Annapurna</a></li>
                                </ul>
                             </li>

                             <!-- Long Treks Submenu -->
                             <li class="dropdown-submenu">
                                <a href="javascript:void(0)" class="dropdown-link d-flex justify-content-between align-items-center">
                                    Treks Longs <i class="fas fa-chevron-right" style="font-size: 0.7em;"></i>
                                </a>
                                <ul class="dropdown-menu submenu-right">
                                    <li><a href="../treks/trek-detail-annapurna-circuit-tilicho.html" class="dropdown-link">Circuit des Annapurnas & Lac Tilicho</a></li>
                                    <li><a href="../treks/trek-detail-manaslu.html" class="dropdown-link">Trek du Manaslu</a></li>
                                    <li><a href="../treks/trek-detail-manaslu-tsum.html" class="dropdown-link">Manaslu & Vallée de Tsum</a></li>
                                    <li><a href="../treks/trek-detail-mustang.html" class="dropdown-link">Haut Mustang</a></li>
                                    <li><a href="../treks/trek-detail-gosaikunda-langtang.html" class="dropdown-link">Gosaikunda & Langtang</a></li>
                                    <li><a href="../treks/trek-detail-kanchenjunga.html" class="dropdown-link">Kanchenjunga</a></li>
                                    <li><a href="../treks/trek-detail-everest-gokyo.html" class="dropdown-link">Camp de Base de l'Everest</a></li>
                                    <li><a href="../treks/trek-detail-three-passes.html" class="dropdown-link">Les Trois Cols</a></li>
                                    <li><a href="../treks/trek-detail-poon-hill-abc.html" class="dropdown-link">Poon Hill & Camp de Base de l'Annapurna</a></li>
                                </ul>
                             </li>
                        </ul>
                    </li>

                    <li class="dropdown-item-parent">
                     <a href="javascript:void(0)" class="nav-link" data-i18n="nav_ascension">Ascension <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                     <ul class="dropdown-menu">
                         <li><a href="${root}ascension/island-peak.html" class="dropdown-link">Island Peak</a></li>
                         <li><a href="${root}ascension/mera-peak.html" class="dropdown-link">Mera Peak</a></li>
                         <li><a href="${root}ascension/lobuche-peak.html" class="dropdown-link">Lobuche Peak</a></li>
                     </ul>
                 </li>

                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_safari">Safari & Nature <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                        <ul class="dropdown-menu">
                             <li><a href="${root}safari/chitwan-jungle-safari.html" class="dropdown-link">Parc National de Chitwan</a></li>
                             <li><a href="${root}safari/bardia-national-park-safari.html" class="dropdown-link">Parc National de Bardiya</a></li>
                        </ul>
                    </li>

                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_complete_nepal">Népal Complet <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                         <ul class="dropdown-menu">
                             <li><a href="${root}tours/complete-nepal-tour.html" class="dropdown-link">Circuit Népal Complet</a></li>
                        </ul>
                    </li>

                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_fixed_departures">Départs Fixes <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                         <ul class="dropdown-menu">
                             <li><a href="${root}treks/trek-detail-abc.html" class="dropdown-link">5 Avr – 16 Avr : Circuit des Annapurnas</a></li>
                             <li><a href="${root}ascension/mera-peak.html" class="dropdown-link">20 Avr – 2 Mai : Mera Peak</a></li>
                             <li><a href="${root}treks/trek-detail-annapurna-circuit-tilicho.html" class="dropdown-link">3 Mai – 13 Mai : Annapurna via Tilicho</a></li>
                             <li><a href="${root}treks/trek-detail-everest-gokyo.html" class="dropdown-link">12 Août – 25 Août : Camp de Base de l'Everest</a></li>
                        </ul>
                    </li>
                    <li><a href="${root}who-we-are.html" class="nav-link ${isActive(
                      "who-we-are.html",
                    )}" data-i18n="nav_who_we_are">Qui Sommes-Nous</a></li>
                    <li><a href="${root}blog.html" class="nav-link ${isActive(
                      "blog.html",
                    )}" data-i18n="nav_blogs">Blogs</a></li>
                    <li><a href="${root}contact.html" class="nav-link ${isActive(
                      "contact.html",
                    )}" data-i18n="nav_contacts">Contact</a></li>
                </ul>
            </nav>

            <div class="header-actions">
                <!-- Language Switcher (Desktop) -->
                <div class="lang-switcher">
                    <button class="lang-btn">
                        <i class="fas fa-globe"></i>
                        <span class="current-lang">FR</span>
                        <i class="fas fa-chevron-down" style="font-size: 0.7em; margin-left: 2px;"></i>
                    </button>
                    <div class="lang-dropdown">
                        <a href="javascript:void(0)" class="lang-option active" data-lang="fr">
                            Français
                        </a>
                        <a href="javascript:void(0)" class="lang-option" data-lang="en">
                            English
                        </a>
                        <a href="javascript:void(0)" class="lang-option" data-lang="zh-CN">
                            中文
                        </a>
                    </div>
                </div>

                <a href="https://wa.me/9779811345073" target="_blank" class="icon-btn" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                <button class="mobile-menu-btn" aria-label="Passer la navigation">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Full Screen Navigation Menu -->
    <div class="nav-overlay">
        <div class="nav-header">
            <a href="${root}index.html" class="nav-logo">
                <img src="${root}assets/images/logo-1-removebg.png" alt="Logo Lok Treks Nepal">
            </a>
            <button class="close-menu-btn" aria-label="Fermer le menu"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="nav-content">
            <ul class="nav-list">
                <!-- Mobile nav items -->
                <li><a href="${root}index.html" class="nav-link ${isActive(
                  "index.html",
                )}" data-i18n="nav_home">Accueil </a></li>
                
                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_trekking">Trekking <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                             <!-- Short Treks Mobile -->
                             <li class="mobile-dropdown-parent">
                                <a href="javascript:void(0)" class="mobile-dropdown-link mobile-dropdown-toggle" style="font-weight: 600;">Treks Courts <i class="fas fa-chevron-right rotate-icon"></i></a>
                                <ul class="mobile-dropdown-menu">
                                    <li><a href="../treks/trek-detail-langtang-valley.html" class="mobile-dropdown-link">Vallée du Langtang</a></li>
                                    <li><a href="../treks/trek-detail-pikey-peak.html" class="mobile-dropdown-link">Pikey Peak – Vue sur l'Everest</a></li>
                                    <li><a href="../treks/trek-detail-mardi-himal.html" class="mobile-dropdown-link">Mardi Himal</a></li>
                                    <li><a href="../treks/trek-detail-poon-hill.html" class="mobile-dropdown-link">Poon Hill</a></li>
                                    <li><a href="../treks/trek-detail-abc.html" class="mobile-dropdown-link">Camp de Base de l'Annapurna</a></li>
                                </ul>
                             </li>

                             <!-- Long Treks Mobile -->
                             <li class="mobile-dropdown-parent">
                                <a href="javascript:void(0)" class="mobile-dropdown-link mobile-dropdown-toggle" style="font-weight: 600;">Treks Longs <i class="fas fa-chevron-right rotate-icon"></i></a>
                                <ul class="mobile-dropdown-menu">
                                    <li><a href="../treks/trek-detail-annapurna-circuit-tilicho.html" class="mobile-dropdown-link">Circuit des Annapurnas & Lac Tilicho</a></li>
                                    <li><a href="../treks/trek-detail-manaslu.html" class="mobile-dropdown-link">Trek du Manaslu</a></li>
                                    <li><a href="../treks/trek-detail-manaslu-tsum.html" class="mobile-dropdown-link">Manaslu & Vallée de Tsum</a></li>
                                    <li><a href="../treks/trek-detail-mustang.html" class="mobile-dropdown-link">Haut Mustang</a></li>
                                    <li><a href="../treks/trek-detail-gosaikunda-langtang.html" class="mobile-dropdown-link">Gosaikunda & Langtang</a></li>
                                    <li><a href="../treks/trek-detail-kanchenjunga.html" class="mobile-dropdown-link">Kanchenjunga</a></li>
                                    <li><a href="../treks/trek-detail-everest-gokyo.html" class="mobile-dropdown-link">Camp de Base de l'Everest</a></li>
                                    <li><a href="../treks/trek-detail-three-passes.html" class="mobile-dropdown-link">Les Trois Cols</a></li>
                                    <li><a href="../treks/trek-detail-poon-hill-abc.html" class="mobile-dropdown-link">Poon Hill & Camp de Base de l'Annapurna</a></li>
                                </ul>
                             </li>
                        </ul>
                </li>

                 <li class="mobile-dropdown-parent">
                     <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_ascension">Ascension <i class="fas fa-chevron-right rotate-icon"></i></a>
                     <ul class="mobile-dropdown-menu">
                         <li><a href="${root}ascension/island-peak.html" class="dropdown-link">Island Peak</a></li>
                         <li><a href="${root}ascension/mera-peak.html" class="dropdown-link">Mera Peak</a></li>
                         <li><a href="${root}ascension/lobuche-peak.html" class="dropdown-link">Lobuche Peak</a></li>
                     </ul>
                 </li>

                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_safari">Safari & Nature <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="${root}safari/chitwan-jungle-safari.html" class="mobile-dropdown-link">Parc National de Chitwan</a></li>
                         <li><a href="${root}safari/bardia-national-park-safari.html" class="mobile-dropdown-link">Parc National de Bardiya</a></li>
                    </ul>
                </li>

                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_complete_nepal">Népal Complet <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="${root}tours/complete-nepal-tour.html" class="mobile-dropdown-link">Circuit Népal Complet</a></li>
                    </ul>
                </li>
                
                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_fixed_departures">Départs Fixes <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="${root}treks/trek-detail-abc.html" class="mobile-dropdown-link">5 Avr – 16 Avr : Circuit des Annapurnas</a></li>
                         <li><a href="${root}ascension/mera-peak.html" class="mobile-dropdown-link">20 Avr – 2 Mai : Mera Peak</a></li>
                         <li><a href="${root}treks/trek-detail-annapurna-circuit-tilicho.html" class="mobile-dropdown-link">3 Mai – 13 Mai : Annapurna via Tilicho</a></li>
                         <li><a href="${root}treks/trek-detail-everest-gokyo.html" class="mobile-dropdown-link">12 Août – 25 Août : Camp de Base de l'Everest</a></li>
                    </ul>
                </li>
                <li><a href="${root}who-we-are.html" class="nav-link ${isActive(
                  "who-we-are.html",
                )}" data-i18n="nav_who_we_are">Qui Sommes-Nous </a></li>
                <li><a href="${root}blog.html" class="nav-link ${isActive(
                  "blog.html",
                )}" data-i18n="nav_blogs">Blogs </a></li>
                <li><a href="${root}contact.html" class="nav-link ${isActive(
                  "contact.html",
                )}" data-i18n="nav_contacts">Contact </a></li>
            </ul>
        </div>
    </div>
    `;

  document.getElementById(containerId).innerHTML = html;

  // Mobile Menu Dropdown Logic
  const mobileDropdownToggles = document.querySelectorAll(
    ".mobile-dropdown-toggle",
  );
  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent bubbling to parent toggles
      const parent = toggle.closest(".mobile-dropdown-parent");

      // Close siblings only
      // Find the closest common container to avoid closing everything
      const closestList = parent.parentElement;
      if (closestList) {
        closestList
          .querySelectorAll(":scope > .mobile-dropdown-parent.active")
          .forEach((item) => {
            if (item !== parent) {
              item.classList.remove("active");
            }
          });
      }

      parent.classList.toggle("active");
    });
  });

  // Re-run highlighting script
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href === currentPath || href === "./" + currentPath)) {
      link.classList.add("highlight");
    }
  });
}
