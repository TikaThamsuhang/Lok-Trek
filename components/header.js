function renderHeader(containerId, options = { rootPath: './' }) {
    const root = options.rootPath;

    // Active link logic helper
    const isActive = (path) => {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        return currentFile === path ? 'highlight' : '';
    };

    const html = `
    <header class="header header-white">
        <div class="container header-container">
            <a href="${root}index.html" class="logo">
                <img src="${root}assets/images/logo-1-removebg.png" alt="Lok Treks Nepal Logo" class="logo-img">
            </a>

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <ul class="desktop-nav-list">
                    <li><a href="${root}index.html" class="nav-link ${isActive('index.html')}" data-i18n="nav_home">Home</a></li>
                    
                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_trekking">Trekking <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                        <ul class="dropdown-menu">
                             <li><a href="treks/trek-detail-everest-gokyo.html" class="dropdown-link">Everest Base Camp</a></li>
                             <li><a href="treks/trek-detail-mardi-himal.html" class="dropdown-link">Mardi Himal</a></li>
                             <li><a href="treks/trek-detail-three-passes.html" class="dropdown-link">Three Passes</a></li>
                             <li><a href="treks/trek-detail-poon-hill.html" class="dropdown-link">Poon Hill</a></li>
                        </ul>
                    </li>

                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_association">Association <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                        <ul class="dropdown-menu">
                             <li><a href="#" class="dropdown-link">Partners</a></li>
                             <li><a href="#" class="dropdown-link">Members</a></li>
                        </ul>
                    </li>

                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_safari">Safari & Nature <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                        <ul class="dropdown-menu">
                             <li><a href="#" class="dropdown-link">Chitwan National Park</a></li>
                             <li><a href="#" class="dropdown-link">Bardiya National Park</a></li>
                        </ul>
                    </li>

                    <li class="dropdown-item-parent">
                        <a href="javascript:void(0)" class="nav-link" data-i18n="nav_complete_nepal">Complete Nepal <i class="fas fa-chevron-down ml-1" style="font-size: 0.7em;"></i></a>
                         <ul class="dropdown-menu">
                             <li><a href="#" class="dropdown-link">Tours</a></li>
                             <li><a href="#" class="dropdown-link">Adventure</a></li>
                        </ul>
                    </li>

                    <li><a href="${root}who-we-are.html" class="nav-link ${isActive('who-we-are.html')}" data-i18n="nav_who_we_are">Who We Are</a></li>
                    <li><a href="${root}blog.html" class="nav-link ${isActive('blog.html')}" data-i18n="nav_blogs">Blogs</a></li>
                    <li><a href="${root}contact.html" class="nav-link ${isActive('contact.html')}" data-i18n="nav_contacts">Contacts</a></li>
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
                <li><a href="${root}index.html" class="nav-link ${isActive('index.html')}" data-i18n="nav_home">Home <i class="fas fa-chevron-right"></i></a></li>
                
                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_trekking">Trekking <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="#" class="mobile-dropdown-link">Everest Region</a></li>
                         <li><a href="#" class="mobile-dropdown-link">Annapurna Region</a></li>
                         <li><a href="#" class="mobile-dropdown-link">Langtang Region</a></li>
                         <li><a href="#" class="mobile-dropdown-link">Manaslu Region</a></li>
                    </ul>
                </li>

                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_association">Association <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="#" class="mobile-dropdown-link">Partners</a></li>
                         <li><a href="#" class="mobile-dropdown-link">Members</a></li>
                    </ul>
                </li>

                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_safari">Safari & Nature <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="#" class="mobile-dropdown-link">Chitwan National Park</a></li>
                         <li><a href="#" class="mobile-dropdown-link">Bardiya National Park</a></li>
                    </ul>
                </li>

                <li class="mobile-dropdown-parent">
                    <a href="javascript:void(0)" class="nav-link mobile-dropdown-toggle" data-i18n="nav_complete_nepal">Complete Nepal <i class="fas fa-chevron-right rotate-icon"></i></a>
                    <ul class="mobile-dropdown-menu">
                         <li><a href="#" class="mobile-dropdown-link">Tours</a></li>
                         <li><a href="#" class="mobile-dropdown-link">Adventure</a></li>
                    </ul>
                </li>
                
                <li><a href="${root}who-we-are.html" class="nav-link ${isActive('who-we-are.html')}" data-i18n="nav_who_we_are">Who We Are <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="${root}blog.html" class="nav-link ${isActive('blog.html')}" data-i18n="nav_blogs">Blogs <i class="fas fa-chevron-right"></i></a></li>
                <li><a href="${root}contact.html" class="nav-link ${isActive('contact.html')}" data-i18n="nav_contacts">Contacts <i class="fas fa-chevron-right"></i></a></li>
            </ul>
        </div>
    </div>
    `;

    document.getElementById(containerId).innerHTML = html;

    // Mobile Menu Dropdown Logic
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.mobile-dropdown-parent');
            
            // Close other open menus
            document.querySelectorAll('.mobile-dropdown-parent.active').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                }
            });

            parent.classList.toggle('active');
        });
    });

    // Re-run highlighting script
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || href === './' + currentPath)) {
             link.classList.add('highlight');
        }
    });
}
