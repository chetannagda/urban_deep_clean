// Sofa, Carpet & Mattress Cleaning Service JavaScript

class SofaCarpetServicePage {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initServicesDropdown();
        this.initPricingCalculator();
        this.initFAQ();
        this.initScrollAnimations();
        this.initSmoothScrolling();
    }

    // Mobile Menu Functionality
    initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const body = document.body;

        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                const isActive = mobileNav.classList.contains('active');
                
                if (isActive) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    body.style.overflow = '';
                } else {
                    mobileNav.classList.add('active');
                    mobileMenuBtn.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            });

            // Close mobile menu when clicking outside
            mobileNav.addEventListener('click', (e) => {
                if (e.target === mobileNav) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    body.style.overflow = '';
                }
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    }

    // Services Dropdown Functionality
    initServicesDropdown() {
        // Desktop dropdown
        const desktopDropdown = document.querySelector('.nav-dropdown');
        if (desktopDropdown) {
            const dropdownBtn = desktopDropdown.querySelector('.nav-dropdown-btn');
            const dropdownMenu = desktopDropdown.querySelector('.nav-dropdown-menu');

            if (dropdownBtn && dropdownMenu) {
                dropdownBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
                    
                    dropdownBtn.setAttribute('aria-expanded', !isExpanded);
                    desktopDropdown.setAttribute('aria-expanded', !isExpanded);
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!desktopDropdown.contains(e.target)) {
                        dropdownBtn.setAttribute('aria-expanded', 'false');
                        desktopDropdown.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        }

        // Mobile dropdown
        const mobileDropdown = document.querySelector('.mobile-nav-dropdown');
        if (mobileDropdown) {
            const mobileDropdownBtn = mobileDropdown.querySelector('.mobile-nav-dropdown-btn');
            
            if (mobileDropdownBtn) {
                mobileDropdownBtn.addEventListener('click', () => {
                    mobileDropdown.classList.toggle('active');
                });
            }
        }
    }

    // Pricing Calculator Functionality
    initPricingCalculator() {
        const pricingBtns = document.querySelectorAll('.pricing-btn');
        const modal = document.getElementById('pricing-modal');
        const modalClose = document.querySelector('.modal-close');
        const serviceTypeSelect = document.getElementById('service-type');
        const quantityInput = document.getElementById('quantity');
        const areaInput = document.getElementById('area');
        const carpetAreaGroup = document.querySelector('.carpet-area');
        const totalCostElement = document.getElementById('total-cost');

        if (!modal || !serviceTypeSelect || !quantityInput || !totalCostElement) return;

        // Pricing data
        const pricing = {
            sofa: { price: 149, unit: 'set', label: 'Sofa Cleaning (₹149/set)' },
            carpet: { price: 15, unit: 'sq.ft', label: 'Carpet Cleaning (₹15/sq.ft)' },
            mattress: { price: 399, unit: 'piece', label: 'Mattress Cleaning (₹399/piece)' }
        };

        // Open modal when pricing button is clicked
        pricingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const service = btn.getAttribute('data-service');
                if (service && pricing[service]) {
                    serviceTypeSelect.value = service;
                    this.updateCalculator();
                    this.openModal(modal);
                }
            });
        });

        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal(modal);
            });
        }

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal(modal);
            }
        });

        // Update calculator when inputs change
        serviceTypeSelect.addEventListener('change', () => {
            this.updateCalculator();
        });

        quantityInput.addEventListener('input', () => {
            this.updateCalculator();
        });

        if (areaInput) {
            areaInput.addEventListener('input', () => {
                this.updateCalculator();
            });
        }

        // Update calculator function
        this.updateCalculator = () => {
            const serviceType = serviceTypeSelect.value;
            const quantity = parseInt(quantityInput.value) || 1;
            const area = parseInt(areaInput?.value) || 100;
            
            if (pricing[serviceType]) {
                const serviceData = pricing[serviceType];
                let total = 0;

                // Show/hide area input for carpet cleaning
                if (carpetAreaGroup) {
                    if (serviceType === 'carpet') {
                        carpetAreaGroup.style.display = 'block';
                        total = serviceData.price * area * quantity;
                    } else {
                        carpetAreaGroup.style.display = 'none';
                        total = serviceData.price * quantity;
                    }
                }

                totalCostElement.textContent = `₹${total.toLocaleString()}`;
            }
        };

        // Initialize calculator
        this.updateCalculator();
    }

    // Modal helper functions
    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // FAQ Functionality
    initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = question.nextElementSibling;
                
                // Close all other FAQ items
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current FAQ item
                question.setAttribute('aria-expanded', !isExpanded);
                
                if (answer) {
                    if (!isExpanded) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                }
            });
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes and observe elements
        const animatedElements = [
            { selector: '.service-title', animation: 'fade-in' },
            { selector: '.service-description', animation: 'fade-in' },
            { selector: '.features-title', animation: 'fade-in' },
            { selector: '.feature-item', animation: 'slide-in-left' },
            { selector: '.pricing-title', animation: 'fade-in' },
            { selector: '.pricing-card', animation: 'scale-in' },
            { selector: '.process-img', animation: 'fade-in' },
            { selector: '.faq-title', animation: 'fade-in' },
            { selector: '.faq-item', animation: 'slide-in-right' }
        ];

        animatedElements.forEach(({ selector, animation }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add(animation);
                element.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(element);
            });
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Service-specific features
class ServiceFeatures {
    constructor() {
        this.initFeatureHovers();
        this.initPricingCardEffects();
    }

    initFeatureHovers() {
        const featureItems = document.querySelectorAll('.feature-item');
        
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }

    initPricingCardEffects() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = 'var(--primary-green)';
                card.style.borderWidth = '2px';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'transparent';
                card.style.borderWidth = '1px';
            });
        });
    }
}

// Utility functions
class Utils {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initImageOptimization();
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    initImageOptimization() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                img.classList.add('error');
                console.warn(`Failed to load image: ${img.src}`);
            });
        });
    }
}

// Analytics and tracking
class Analytics {
    constructor() {
        this.initEventTracking();
    }

    initEventTracking() {
        // Track pricing button clicks
        const pricingBtns = document.querySelectorAll('.pricing-btn');
        pricingBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.getAttribute('data-service');
                this.trackEvent('pricing_calculator_opened', {
                    service_type: service,
                    page: 'sofa-carpet-mattress-cleaning'
                });
            });
        });

        // Track FAQ interactions
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach((question, index) => {
            question.addEventListener('click', () => {
                const questionText = question.querySelector('span').textContent;
                this.trackEvent('faq_question_clicked', {
                    question_index: index,
                    question_text: questionText,
                    page: 'sofa-carpet-mattress-cleaning'
                });
            });
        });

        // Track contact link clicks
        const contactLinks = document.querySelectorAll('.contact-link, .btn[href*="contact"]');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('contact_link_clicked', {
                    link_text: link.textContent.trim(),
                    page: 'sofa-carpet-mattress-cleaning'
                });
            });
        });
    }

    trackEvent(eventName, properties = {}) {
        // Integration with analytics services (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
        // Console log for development
        if (process.env.NODE_ENV === 'development') {
            console.log('Analytics Event:', eventName, properties);
        }
    }
}

// Error handling
class ErrorHandler {
    constructor() {
        this.initGlobalErrorHandling();
    }

    initGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            this.logError(event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            this.logError(event.reason);
        });
    }

    logError(error) {
        // Log errors to monitoring service
        const errorData = {
            message: error.message,
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        // Send to error logging service
        // Example: Sentry, LogRocket, etc.
        console.log('Error logged:', errorData);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main functionality
        new SofaCarpetServicePage();
        new ServiceFeatures();
        new PerformanceOptimizer();
        new Analytics();
        new ErrorHandler();

        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        console.log('Sofa, Carpet & Mattress Cleaning Service page initialized successfully');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SofaCarpetServicePage,
        ServiceFeatures,
        Utils,
        PerformanceOptimizer,
        Analytics,
        ErrorHandler
    };
}
