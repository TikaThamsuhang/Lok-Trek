function renderFooter(containerId, options = { rootPath: "./" }) {
  const root = options.rootPath;

  // Active link logic helper (duplicate from header for standalone usage)
  const isActive = (path) => {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop() || "index.html";
    return currentFile === path;
  };

  const html = `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-grid">
                    <!-- Brand -->
                    <div class="footer-widget">
                        <a href="${root}index.html" class="footer-logo">
                            <img src="${root}assets/images/logo-1-removebg.png" alt="Lok Treks Nepal">
                        </a>
                        <p class="footer-desc">Your trusted partner for Himalayan adventures. We specialize in authentic trekking experiences, safety, and cultural immersion.</p>
                        <div class="social-links">
                            <a href="https://www.facebook.com/lok.guidee.francophone/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/lok_guide_fracophone/" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://np.linkedin.com/in/lok-guidee-francophone-a569992b2" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-widget">
                        <h3>Quick Links</h3>
                        <ul class="footer-links">

                            <li><a href="${root}index.html" class="${isActive("index.html") ? "highlight-text" : ""}">Home</a></li>
                            <li><a href="${root}who-we-are.html" class="${isActive("who-we-are.html") ? "highlight-text" : ""}">Who We Are</a></li>
                            <li><a href="${root}blog.html" class="${isActive("blog.html") ? "highlight-text" : ""}">Blog</a></li>
                            <li><a href="${root}contact.html" class="${isActive("contact.html") ? "highlight-text" : ""}">Contact</a></li>
                        </ul>
                    </div>

                    <!-- Popular Treks -->
                    <div class="footer-widget">
                        <h3>Popular Treks</h3>
                        <ul class="footer-links">
                            <li><a href="${root}treks/trek-detail-everest-gokyo.html">Everest Base Camp</a></li>
                            <li><a href="${root}treks/trek-detail-annapurna-circuit-tilicho.html">Annapurna Circuit</a></li>
                            <li><a href="${root}treks/trek-detail-manaslu.html">Manaslu Circuit</a></li>
                            <li><a href="${root}treks/trek-detail-langtang-valley.html">Langtang Valley</a></li>
                            <li><a href="${root}treks/trek-detail-mustang.html">Upper Mustang</a></li>
                            <li><a href="${root}treks/trek-detail-three-passes.html">Three Passes Trek</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="footer-widget">
                        <h3>Contact Us</h3>
                        <ul class="contact-info">
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Budhanilkantha-11, Kathmandu, Nepal</span>
                            </li>
                            <li>
                                <a href="tel:+9779811345073" style="color: inherit; text-decoration: none; display: flex; gap: 1rem;">
                                    <i class="fas fa-phone-alt"></i>
                                    <span>+977 981-1345073</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@loktreks.com" style="color: inherit; text-decoration: none; display: flex; gap: 1rem;">
                                    <i class="fas fa-envelope"></i>
                                    <span>info@loktreks.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                 <p>&copy; 2025 Lok Treks Nepal. All rights reserved. | <a href="#">Privacy Policy</a></p>
            </div>
        </div>
    </footer>
    `;

  document.getElementById(containerId).innerHTML = html;
}
