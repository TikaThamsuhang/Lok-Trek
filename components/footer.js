function renderFooter(containerId, options = { rootPath: './' }) {
    const root = options.rootPath;
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
                            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-widget">
                        <h3>Quick Links</h3>
                        <ul class="footer-links">
                            <li><a href="${root}index.html">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Team</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <!-- Popular Treks -->
                    <div class="footer-widget">
                        <h3>Popular Treks</h3>
                        <ul class="footer-links">
                            <li><a href="${root}treks/trek-detail-everest-gokyo.html">Everest Base Camp</a></li>
                            <li><a href="#">Annapurna Circuit</a></li>
                            <li><a href="#">Manaslu Circuit</a></li>
                            <li><a href="#">Langtang Valley</a></li>
                            <li><a href="#">Upper Mustang</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="footer-widget">
                        <h3>Contact Us</h3>
                        <ul class="contact-info">
                            <li>
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Thamel, Kathmandu, Nepal</span>
                            </li>
                            <li>
                                <a href="tel:+97714412345" style="color: inherit; text-decoration: none; display: flex; gap: 1rem;">
                                    <i class="fas fa-phone-alt"></i>
                                    <span>+977 1 4412345</span>
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
