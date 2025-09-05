class FooterComponent {
    constructor() {
        this.init();
    }

    init() {
        this.loadFooter();
    }

    async loadFooter() {
        if (document.body.dataset.footerLoaded === 'true') {
            console.log('Footer already loaded, skipping.');
            return;
        }
        document.body.dataset.footerLoaded = 'true';

        try {
            // Determine the correct path based on current page location
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/services/');
            const basePath = isInSubdirectory ? '../' : '';
            
            // Load footer HTML
            const response = await fetch(`${basePath}components/footer.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const footerHTML = await response.text();
            
            // Create footer container and insert HTML
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = footerHTML;
            
            // Adjust all relative paths in the footer
            this.adjustPaths(footerContainer, basePath);
            
            // Insert footer into the page
            document.body.appendChild(footerContainer.firstElementChild);
            
            // Load footer CSS
            this.loadFooterCSS(basePath);
            
            console.log('Footer loaded successfully');
            
        } catch (error) {
            console.error('Error loading footer:', error);
            this.createFallbackFooter();
        }
    }

    adjustPaths(container, basePath) {
        // Adjust all href attributes
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip external links and anchors
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
                return;
            }
            
            // Adjust relative paths
            if (!href.startsWith('/')) {
                link.setAttribute('href', basePath + href);
            }
        });

        // Adjust image src attributes
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            
            // Skip external images and data URLs
            if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) {
                return;
            }
            
            // Adjust relative paths
            img.setAttribute('src', basePath + src);
        });
    }

    loadFooterCSS(basePath) {
        // Check if footer CSS is already loaded
        if (document.querySelector('link[href*="footer.css"]')) {
            return;
        }

        // Create and append CSS link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${basePath}components/footer.css`;
        document.head.appendChild(link);
    }

    createFallbackFooter() {
        // Create a simple fallback footer if loading fails
        const fallbackFooter = document.createElement('footer');
        fallbackFooter.className = 'footer';
        fallbackFooter.innerHTML = `
            <div class="footer-main">
                <div class="container">
                    <div class="footer-content" style="text-align: center; padding: 40px 0;">
                        <div class="footer-section">
                            <h4>UrbanDeepCleanCompany</h4>
                            <p>Professional cleaning services in Ahmedabad & Himmatnagar</p>
                            <p>© 2025 UrbanDeepCleanCompany | All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add basic styling
        fallbackFooter.style.cssText = `
            background-color: #1a1a1a;
            color: #ffffff;
            margin-top: auto;
        `;
        
        document.body.appendChild(fallbackFooter);
        console.log('Fallback footer created');
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterComponent();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FooterComponent();
    });
} else {
    new FooterComponent();
}
