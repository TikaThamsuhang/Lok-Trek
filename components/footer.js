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
                        <p class="footer-desc">Votre partenaire de confiance pour les aventures himalayennes. Nous sommes spécialisés dans les expériences de trekking authentiques, la sécurité et l'immersion culturelle.</p>
                        <div class="social-links">
                            <a href="https://www.facebook.com/lok.guidee.francophone/" target="_blank" class="social-link"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/lok_guide_fracophone/" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>
                            <a href="https://np.linkedin.com/in/lok-guidee-francophone-a569992b2" target="_blank" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                            <a href="https://share.google/iAOspvSpCZdwAR8Th" target="_blank" class="social-link"><span class="iconify" data-icon="simple-icons:tripadvisor"></span></a>
                            <a href="https://youtube.com/@loktreksnepal?si=PPhW0-FB1AyL1hZr" target="_blank" class="social-link"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-widget">
                        <h3>Liens Rapides</h3>
                        <ul class="footer-links">

                            <li><a href="${root}index.html" class="${isActive("index.html") ? "highlight-text" : ""}">Accueil</a></li>
                            <li><a href="${root}who-we-are.html" class="${isActive("who-we-are.html") ? "highlight-text" : ""}">Qui Sommes-Nous</a></li>
                            <li><a href="${root}blog.html" class="${isActive("blog.html") ? "highlight-text" : ""}">Blog</a></li>
                            <li><a href="${root}contact.html" class="${isActive("contact.html") ? "highlight-text" : ""}">Contact</a></li>
                        </ul>
                    </div>

                    <!-- Popular Treks -->
                    <div class="footer-widget">
                        <h3>Treks Populaires</h3>
                        <ul class="footer-links">
                            <li><a href="${root}treks/trek-detail-everest-gokyo.html">Camp de Base de l'Everest</a></li>
                            <li><a href="${root}treks/trek-detail-annapurna-circuit-tilicho.html">Circuit des Annapurnas</a></li>
                            <li><a href="${root}treks/trek-detail-manaslu.html">Circuit du Manaslu</a></li>
                            <li><a href="${root}treks/trek-detail-langtang-valley.html">Vallée du Langtang</a></li>
                            <li><a href="${root}treks/trek-detail-mustang.html">Haut Mustang</a></li>
                            <li><a href="${root}treks/trek-detail-three-passes.html">Trek des Trois Cols</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="footer-widget">
                        <h3>Contactez-Nous</h3>
                        <ul class="contact-info">
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Budhanilkantha-11, Katmandou, Népal</span>
                            </li>
                            <li>
                                <a href="tel:+9779811345073" style="color: inherit; text-decoration: none; display: flex; gap: 1rem;">
                                    <i class="fas fa-phone-alt"></i>
                                    <span>+977 981-1345073</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@loktreksnepal.com" style="color: inherit; text-decoration: none; display: flex; gap: 1rem;">
                                    <i class="fas fa-envelope"></i>
                                    <span>info@loktreksnepal.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                 <p>&copy; 2025 Lok Treks Nepal. Tous droits réservés. | <a href="#">Politique de Confidentialité</a></p>
            </div>
        </div>
    </footer>
    `;

  document.getElementById(containerId).innerHTML = html;
}
