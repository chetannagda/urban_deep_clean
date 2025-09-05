// Navbar Component JavaScript
class NavbarComponent {
    constructor() {
        this.currentPath = window.location.pathname;
        this.isInSubdirectory = this.currentPath.includes('/services/');
        this.init();
    }

    init() {
        this.loadNavbar();
    }

    async loadNavbar() {
        try {
            // Determine the correct path to the navbar component
            const navbarPath = this.isInSubdirectory ? '../components/navbar.html' : 'components/navbar.html';
            
            const response = await fetch(navbarPath);
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status}`);
            }
            
            const navbarHTML = await response.text();
            
            // Create a temporary container to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = navbarHTML;
            
            // Adjust paths for subdirectory pages
            if (this.isInSubdirectory) {
                this.adjustPathsForSubdirectory(tempDiv);
            }
            
            // Insert the navbar at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', tempDiv.innerHTML);
            
            // Load navbar CSS
            this.loadNavbarCSS();
            
            // Initialize navbar functionality
            this.initializeNavbar();
            
        } catch (error) {
            console.error('Error loading navbar:', error);
            // Fallback: show a basic navbar or error message
            this.showFallbackNavbar();
        }
    }

    adjustPathsForSubdirectory(container) {
        // Adjust all href attributes for subdirectory pages
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip external links and anchors
            if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                return;
            }
            
            // Adjust relative paths
            if (!href.startsWith('../')) {
                if (href.startsWith('services/')) {
                    // Convert services/page.html to page.html for service pages
                    link.setAttribute('href', href.replace('services/', ''));
                } else {
                    // Add ../ prefix for other pages
                    link.setAttribute('href', '../' + href);
                }
            }
        });

        // Adjust image src attributes
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (!src.startsWith('http') && !src.startsWith('../')) {
                img.setAttribute('src', '../' + src);
            }
        });
    }

    loadNavbarCSS() {
        // Check if navbar CSS is already loaded
        if (document.querySelector('link[href*="navbar.css"]')) {
            return;
        }

        const cssPath = this.isInSubdirectory ? '../components/navbar.css' : 'components/navbar.css';
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
    }

    initializeNavbar() {
        // Set active page
        this.setActivePage();
        
        // Initialize dropdown functionality
        this.initializeDropdowns();
        
        // Initialize mobile menu
        this.initializeMobileMenu();
        
        // Add click outside listener for dropdowns
        this.addClickOutsideListener();
    }

    setActivePage() {
        const currentPage = this.getCurrentPageName();
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = this.getPageNameFromHref(href);
            
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        return fileName.replace('.html', '');
    }

    getPageNameFromHref(href) {
        if (!href) return '';
        const fileName = href.split('/').pop();
        return fileName.replace('.html', '');
    }

    initializeDropdowns() {
        // Desktop dropdown
        const desktopDropdown = document.getElementById('servicesDropdown');
        const desktopMenu = document.getElementById('servicesMenu');
        
        if (desktopDropdown && desktopMenu) {
            // Prevent default link behavior - dropdown only, no redirect
            desktopDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(desktopDropdown.parentElement, desktopMenu);
            });

            // Show dropdown on hover
            const dropdownContainer = desktopDropdown.parentElement;
            dropdownContainer.addEventListener('mouseenter', () => {
                this.showDropdown(dropdownContainer, desktopMenu);
            });

            dropdownContainer.addEventListener('mouseleave', () => {
                this.hideDropdown(dropdownContainer, desktopMenu);
            });
        }

        // Mobile dropdown
        const mobileDropdown = document.getElementById('mobileServicesDropdown');
        const mobileMenu = document.getElementById('mobileServicesMenu');
        
        if (mobileDropdown && mobileMenu) {
            mobileDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileDropdown(mobileDropdown.parentElement, mobileMenu);
            });
        }
    }

    toggleDropdown(container, menu) {
        const isActive = container.classList.contains('active');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            if (dropdown !== container) {
                dropdown.classList.remove('active');
            }
        });

        if (isActive) {
            this.hideDropdown(container, menu);
        } else {
            this.showDropdown(container, menu);
        }
    }

    showDropdown(container, menu) {
        container.classList.add('active');
    }

    hideDropdown(container, menu) {
        container.classList.remove('active');
    }

    toggleMobileDropdown(container, menu) {
        container.classList.toggle('active');
    }

    initializeMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileClose = document.getElementById('mobileMenuClose');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu(mobileMenu);
            });
        }

        if (mobileClose && mobileMenu) {
            mobileClose.addEventListener('click', () => {
                this.closeMobileMenu(mobileMenu);
            });
        }

        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-item');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(mobileMenu);
            });
        });
    }

    toggleMobileMenu(menu) {
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu(menu);
        } else {
            this.openMobileMenu(menu);
        }
    }

    openMobileMenu(menu) {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay active';
        overlay.addEventListener('click', () => {
            this.closeMobileMenu(menu);
        });
        document.body.appendChild(overlay);
    }

    closeMobileMenu(menu) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove overlay
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    addClickOutsideListener() {
        document.addEventListener('click', (e) => {
            // Close desktop dropdowns when clicking outside
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    showFallbackNavbar() {
        const fallbackHTML = `
            <header class="header" style="background: #fff; padding: 15px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <a href="${this.isInSubdirectory ? '../' : ''}index.html" style="text-decoration: none; color: #22c55e; font-weight: bold; font-size: 18px;">
                            UrbanDeepCleanCompany
                        </a>
                    </div>
                    <nav style="display: flex; gap: 30px;">
                        <a href="${this.isInSubdirectory ? '../' : ''}index.html" style="text-decoration: none; color: #333;">Home</a>
                        <a href="${this.isInSubdirectory ? '../' : ''}about-us.html" style="text-decoration: none; color: #333;">About</a>
                        <a href="${this.isInSubdirectory ? '../' : ''}services.html" style="text-decoration: none; color: #333;">Services</a>
                        <a href="${this.isInSubdirectory ? '../' : ''}contact-us.html" style="text-decoration: none; color: #333;">Contact</a>
                    </nav>
                </div>
            </header>
        `;
        document.body.insertAdjacentHTML('afterbegin', fallbackHTML);
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavbarComponent();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarComponent;
}
