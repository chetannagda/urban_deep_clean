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

// Testimonials Carousel (Simple Auto-scroll)
class TestimonialsCarousel {
    constructor() {
        this.carousel = document.getElementById('testimonialsCarousel');
        this.cards = this.carousel ? this.carousel.querySelectorAll('.testimonial-card') : [];
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.cards.length > 1) {
            this.startAutoScroll();
            
            // Pause on hover
            if (this.carousel) {
                this.carousel.addEventListener('mouseenter', () => this.stopAutoScroll());
                this.carousel.addEventListener('mouseleave', () => this.startAutoScroll());
            }
        }
    }
    
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
    
    nextSlide() {
        if (this.cards.length === 0) return;
        
        this.cards[this.currentIndex].style.opacity = '0.5';
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.cards[this.currentIndex].style.opacity = '1';
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
