// UrbanDeepCleanCompany - Homepage JavaScript (Green & White Theme)

// Mobile Menu Functionality
class MobileMenu {
    constructor() {
        this.menuButton = document.getElementById('mobileMenuToggle');
        this.closeButton = document.getElementById('mobileMenuClose');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        if (this.menuButton) {
            this.menuButton.addEventListener('click', () => this.openMenu());
        }
        
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeMenu());
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
                if (!this.mobileMenu.contains(e.target) && !this.menuButton.contains(e.target)) {
                    this.closeMenu();
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu && this.mobileMenu.classList.contains('open')) {
                this.closeMenu();
            }
        });
    }
    
    openMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.add('open');
            this.body.style.overflow = 'hidden';
        }
    }
    
    closeMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.remove('open');
            this.body.style.overflow = '';
        }
    }
}

// Services Dropdown Functionality
class ServicesDropdown {
    constructor() {
        this.desktopDropdown = document.getElementById('servicesDropdown');
        this.mobileDropdown = document.getElementById('mobileServicesDropdown');
        this.mobileDropdownMenu = document.getElementById('mobileServicesMenu');
        
        this.init();
    }
    
    init() {
        // Mobile dropdown toggle
        if (this.mobileDropdown) {
            this.mobileDropdown.addEventListener('click', () => {
                this.toggleMobileDropdown();
            });
        }
    }
    
    toggleMobileDropdown() {
        if (this.mobileDropdownMenu) {
            this.mobileDropdownMenu.classList.toggle('open');
        }
    }
}

// Form Validation and Handling
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        
        if (this.validateForm(form)) {
            this.submitForm(form);
        }
    }
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearError(field);
            }
            
            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    this.showError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (field.type === 'tel' && field.value.trim()) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
                    this.showError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    showError(field, message) {
        this.clearError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.style.borderColor = '#ef4444';
        field.parentNode.appendChild(errorDiv);
    }
    
    clearError(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }
    
    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage(form);
            form.reset();
        } catch (error) {
            // Show error message
            this.showErrorMessage(form, 'Failed to send message. Please try again.');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    showSuccessMessage(form) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            background-color: #dcfce7;
            color: #16a34a;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
        `;
        message.textContent = 'Thank you! Your message has been sent successfully.';
        
        form.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
    
    showErrorMessage(form, errorText) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.style.cssText = `
            background-color: #fef2f2;
            color: #dc2626;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
        `;
        message.textContent = errorText;
        
        form.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Enhanced Testimonials Carousel with Touch Support
class TestimonialsCarousel {
    constructor() {
        this.carousel = document.getElementById('testimonialsCarousel');
        this.cards = this.carousel ? this.carousel.querySelectorAll('.testimonial-card') : [];
        this.dots = document.getElementById('carouselDots');
        this.dotElements = this.dots ? this.dots.querySelectorAll('.carousel-dot') : [];
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        this.isMobile = window.innerWidth <= 768;
        
        // Touch support variables
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isScrolling = false;
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        if (this.cards.length > 1 && this.isMobile) {
            this.setupMobileCarousel();
            this.startAutoScroll();
        } else if (this.cards.length > 1) {
            // Desktop fallback - simple opacity change
            this.startAutoScroll();
        }
        
        this.updateDots();
    }
    
    setupMobileCarousel() {
        // Set up scroll snap positions
        this.cards.forEach((card, index) => {
            card.style.scrollSnapAlign = 'center';
        });
    }
    
    bindEvents() {
        if (!this.carousel) return;
        
        // Touch events for mobile swiping
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.carousel.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Mouse events for desktop
        this.carousel.addEventListener('mouseenter', () => this.stopAutoScroll());
        this.carousel.addEventListener('mouseleave', () => this.startAutoScroll());
        
        // Scroll event to update dots based on current position
        this.carousel.addEventListener('scroll', () => this.updateDotsOnScroll());
        
        // Dot click events
        this.dotElements.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Window resize event to reinitialize on orientation change
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.stopAutoScroll();
    }
    
    handleTouchMove(e) {
        if (!this.touchStartX) return;
        this.touchEndX = e.touches[0].clientX;
    }
    
    handleTouchEnd(e) {
        if (!this.touchStartX || !this.touchEndX) return;
        
        const touchDiff = this.touchStartX - this.touchEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(touchDiff) > minSwipeDistance) {
            if (touchDiff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.prevSlide();
            }
        }
        
        // Reset touch values
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        // Restart auto scroll after a delay
        setTimeout(() => this.startAutoScroll(), 3000);
    }
    
    handleResize() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== this.isMobile) {
            this.isMobile = newIsMobile;
            this.stopAutoScroll();
            this.init();
        }
    }
    
    startAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
        
        this.autoScrollInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // 4 seconds as requested
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    nextSlide() {
        if (this.cards.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.scrollToSlide(this.currentIndex);
        this.updateDots();
    }
    
    prevSlide() {
        if (this.cards.length === 0) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.scrollToSlide(this.currentIndex);
        this.updateDots();
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.cards.length) return;
        
        this.currentIndex = index;
        this.scrollToSlide(this.currentIndex);
        this.updateDots();
        
        // Stop auto scroll briefly when user interacts
        this.stopAutoScroll();
        setTimeout(() => this.startAutoScroll(), 3000);
    }
    
    scrollToSlide(index) {
        if (!this.carousel || !this.cards[index]) return;
        
        if (this.isMobile) {
            // For mobile, scroll to the card position
            const cardWidth = this.cards[index].offsetWidth;
            const cardMargin = 20; // Account for gap
            const scrollLeft = index * (cardWidth + cardMargin);
            
            this.carousel.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        } else {
            // For desktop, use opacity effect
            this.cards.forEach((card, i) => {
                card.style.opacity = i === index ? '1' : '0.5';
                card.style.transform = i === index ? 'translateY(0)' : 'translateY(10px)';
            });
        }
    }
    
    updateDotsOnScroll() {
        if (!this.isMobile || this.isScrolling) return;
        
        this.isScrolling = true;
        setTimeout(() => {
            this.isScrolling = false;
            
            // Calculate which slide is currently most visible
            const scrollLeft = this.carousel.scrollLeft;
            const cardWidth = this.cards[0] ? this.cards[0].offsetWidth + 20 : 0; // Include gap
            const newIndex = Math.round(scrollLeft / cardWidth);
            
            if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.cards.length) {
                this.currentIndex = newIndex;
                this.updateDots();
            }
        }, 100);
    }
    
    updateDots() {
        this.dotElements.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.service-card, .feature-box, .testimonial-card');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            this.elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new ServicesDropdown();
    new FormHandler();
    new SmoothScroll();
    new TestimonialsCarousel();
    new ScrollAnimations();
    
    console.log('UrbanDeepCleanCompany - Homepage Loaded (Green Theme)');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileMenu,
        ServicesDropdown,
        FormHandler,
        SmoothScroll,
        TestimonialsCarousel,
        ScrollAnimations
    };
}
