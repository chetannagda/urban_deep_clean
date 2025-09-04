/**
 * Commercial Area Cleaning Service Page JavaScript
 * Handles navigation, FAQ accordion, animations, and commercial-specific functionality
 */

// Main Commercial Area Service Page Class
class CommercialAreaServicePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupAnimations();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
            });
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Navigation events
        this.setupNavigation();
        
        // FAQ events
        this.setupFAQ();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Form handling if any
        this.setupFormHandling();
        
        // Resize events
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    }

    initializeComponents() {
        // Initialize service features
        this.serviceFeatures = new CommercialServiceFeatures();
        
        // Initialize specialization cards
        this.specializationCards = new SpecializationCards();
        
        // Initialize analytics
        this.analytics = new Analytics();
        
        // Initialize error handler
        this.errorHandler = new ErrorHandler();
    }

    setupAnimations() {
        // Initialize intersection observer for animations
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    setupNavigation() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const navDropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
        const mobileNavDropdownBtns = document.querySelectorAll('.mobile-nav-dropdown-btn');

        // Mobile menu toggle
        if (mobileMenuBtn && mobileNav) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                mobileNav.classList.toggle('active');
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            });

            // Close mobile menu when clicking outside
            mobileNav.addEventListener('click', (e) => {
                if (e.target === mobileNav) {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Desktop dropdown navigation
        navDropdownBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !isExpanded);
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!btn.closest('.nav-dropdown').contains(e.target)) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Mobile dropdown navigation
        mobileNavDropdownBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const dropdown = btn.closest('.mobile-nav-dropdown');
                dropdown.classList.toggle('active');
            });
        });
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    const isExpanded = question.getAttribute('aria-expanded') === 'true';
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherQuestion = otherItem.querySelector('.faq-question');
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    question.setAttribute('aria-expanded', !isExpanded);
                    item.classList.toggle('active');
                    
                    // Track FAQ interaction
                    this.analytics.trackEvent('FAQ', 'toggle', question.textContent.trim());
                });
            }
        });
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Track form submission
        this.analytics.trackEvent('Form', 'submit', form.id || 'unknown');
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    handleResize() {
        // Handle responsive behavior on resize
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth >= 1024) {
            // Desktop view - close mobile menu if open
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

// Commercial Service Features Class
class CommercialServiceFeatures {
    constructor() {
        this.features = document.querySelectorAll('.feature-item');
        this.init();
    }

    init() {
        this.setupFeatureInteractions();
        this.setupFeatureAnimations();
    }

    setupFeatureInteractions() {
        this.features.forEach((feature, index) => {
            feature.addEventListener('mouseenter', () => {
                this.highlightFeature(feature, index);
            });

            feature.addEventListener('mouseleave', () => {
                this.unhighlightFeature(feature);
            });
        });
    }

    setupFeatureAnimations() {
        // Stagger animation for features
        this.features.forEach((feature, index) => {
            feature.style.animationDelay = `${index * 0.1}s`;
            feature.classList.add('fade-in');
        });
    }

    highlightFeature(feature, index) {
        feature.style.transform = 'translateY(-2px)';
        feature.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.15)';
        
        // Track feature interaction
        const analytics = new Analytics();
        analytics.trackEvent('Feature', 'hover', `feature-${index + 1}`);
    }

    unhighlightFeature(feature) {
        feature.style.transform = '';
        feature.style.boxShadow = '';
    }
}

// Specialization Cards Class
class SpecializationCards {
    constructor() {
        this.cards = document.querySelectorAll('.specialization-card');
        this.init();
    }

    init() {
        this.setupCardInteractions();
        this.setupCardAnimations();
    }

    setupCardInteractions() {
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.handleCardClick(card, index);
            });

            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    setupCardAnimations() {
        // Stagger animation for specialization cards
        this.cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('scale-in');
        });
    }

    handleCardClick(card, index) {
        const cardLabel = card.querySelector('.card-label').textContent;
        
        // Track card click
        const analytics = new Analytics();
        analytics.trackEvent('Specialization', 'click', cardLabel);
        
        // You could add more functionality here, like opening a modal
        // or navigating to a specific section
        console.log(`Clicked on ${cardLabel} specialization`);
    }

    animateCardHover(card, isHovering) {
        const image = card.querySelector('.service-image');
        
        if (isHovering) {
            image.style.transform = 'scale(1.05)';
            card.style.transform = 'translateY(-4px)';
        } else {
            image.style.transform = 'scale(1)';
            card.style.transform = 'translateY(0)';
        }
    }
}

// Utility Functions
class Utils {
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

    static formatCurrency(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    static showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            info: '#3b82f6',
            success: '#22c55e',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Performance Optimizer Class
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupServiceWorker();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" for non-critical images
            if (!img.hasAttribute('loading') && !this.isCriticalImage(img)) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add proper alt text if missing
            if (!img.hasAttribute('alt')) {
                img.setAttribute('alt', 'Commercial cleaning service image');
            }
        });
    }

    isCriticalImage(img) {
        // Consider images in hero section as critical
        return img.closest('.hero') !== null;
    }

    preloadCriticalResources() {
        // Preload critical CSS
        const criticalCSS = document.querySelector('link[rel="stylesheet"]');
        if (criticalCSS) {
            const preload = document.createElement('link');
            preload.rel = 'preload';
            preload.as = 'style';
            preload.href = criticalCSS.href;
            document.head.appendChild(preload);
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        }
    }
}

// Analytics Class
class Analytics {
    constructor() {
        this.events = [];
        this.sessionStart = Date.now();
    }

    trackEvent(category, action, label = '', value = 0) {
        const event = {
            category,
            action,
            label,
            value,
            timestamp: Date.now(),
            sessionTime: Date.now() - this.sessionStart
        };

        this.events.push(event);
        
        // Send to analytics service (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }

        console.log('Analytics Event:', event);
    }

    trackPageView(page = window.location.pathname) {
        this.trackEvent('Page', 'view', page);
    }

    trackUserEngagement() {
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.trackEvent('Engagement', 'scroll', `${maxScroll}%`);
                }
            }
        }, 1000));

        // Track time on page
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - this.sessionStart) / 1000);
            this.trackEvent('Engagement', 'time_on_page', '', timeOnPage);
        });
    }
}

// Error Handler Class
class ErrorHandler {
    constructor() {
        this.setupGlobalErrorHandling();
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', event.reason);
        });
    }

    logError(type, error) {
        const errorInfo = {
            type,
            message: error.message || error,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        console.error('Error logged:', errorInfo);
        
        // Send to error tracking service
        // this.sendToErrorService(errorInfo);
    }

    handleAsyncError(promise) {
        return promise.catch(error => {
            this.logError('Async Operation Error', error);
            throw error;
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main application
        const app = new CommercialAreaServicePage();
        
        // Initialize performance optimizer
        const performanceOptimizer = new PerformanceOptimizer();
        
        // Track initial page view
        const analytics = new Analytics();
        analytics.trackPageView();
        analytics.trackUserEngagement();
        
        console.log('Commercial Area Cleaning Service page initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
        const errorHandler = new ErrorHandler();
        errorHandler.logError('Initialization Error', error);
    }
});

// Export classes for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CommercialAreaServicePage,
        CommercialServiceFeatures,
        SpecializationCards,
        Utils,
        PerformanceOptimizer,
        Analytics,
        ErrorHandler
    };
}
