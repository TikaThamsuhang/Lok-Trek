function renderHeader(containerId, options = { rootPath: './' }) {
    const root = options.rootPath;
    const html = `
    <header class="header header-white">
        <div class="container header-container">
            <a href="${root}index.html" class="logo">
                <img src="${root}assets/images/logo-1-removebg.png" alt="Lok Treks Nepal Logo" class="logo-img">
            </a>

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <ul class="desktop-nav-list">
                    <li><a href="${root}index.html" class="nav-link" data-i18n="nav_home">Home</a></li>
                    <li><a href="#" class="nav-link" data-i18n="nav_trekking">Trekking</a></li>
                    <li><a href="#" class="nav-link" data-i18n="nav_association">Association</a></li>
                    <li><a href="#" class="nav-link" data-i18n="nav_safari">Safari & Nature</a></li>
                    <li><a href="#" class="nav-link" data-i18n="nav_complete_nepal">Complete Nepal</a></li>
                    <li><a href="#" class="nav-link" data-i18n="nav_who_we_are">Who We Are</a></li>
                    <li><a href="#" class="nav-link" data-i18n="nav_blogs">Blogs</a></li>
                    <li><a href="#" class="nav-link highlight" data-i18n="nav_contacts">Contacts</a></li>
                </ul>
            </nav>

            <div class="header-actions">
                <!-- Language Switcher (Desktop) -->
                <div class="lang-switcher">
                    <button class="lang-btn">
                        <i class="fas fa-globe"></i>
                        <span class="current-lang">EN</span>
                        <i class="fas fa-chevron-down" style="font-size: 0.7em; margin-left: 2px;"></i>
                    </button>
                    <div class="lang-dropdown">
                        <a href="javascript:void(0)" class="lang-option active" data-lang="en">
                            English
                        </a>
                        <a href="javascript:void(0)" class="lang-option" data-lang="fr">
                            Français
                        </a>
                    </div>
                </div>

                <a href="tel:+1234567890" class="icon-btn" aria-label="Phone"><i class="fas fa-phone-alt"></i></a>
                <button class="mobile-menu-btn" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Full Screen Navigation Menu -->
    <div class="nav-overlay">
        <div class="nav-header">
            <a href="${root}index.html" class="nav-logo">
                <img src="${root}assets/images/logo-1-removebg.png" alt="Lok Treks Nepal Logo">
            </a>
            <button class="close-menu-btn" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="nav-content">
            <ul class="nav-list">
                <!-- Mobile nav items -->
                <li><a href="${root}index.html" class="nav-link" data-i18n="nav_home">Home <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link" data-i18n="nav_trekking">Trekking <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link" data-i18n="nav_association">Association <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link" data-i18n="nav_safari">Safari & Nature <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link" data-i18n="nav_complete_nepal">Complete Nepal <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link" data-i18n="nav_who_we_are">Who We Are <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link" data-i18n="nav_blogs">Blogs <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="#" class="nav-link highlight" data-i18n="nav_contacts">Contacts <i class="fas fa-chevron-right"></i></a></li>
            </ul>
        </div>
    </div>
    `;
    
    document.getElementById(containerId).innerHTML = html;
}
