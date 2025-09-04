// Parking Area Cleaning Service JavaScript

class ParkingAreaServicePage {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initServicesDropdown();
        this.initAreaCalculator();
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

    // Area Calculator Functionality
    initAreaCalculator() {
        const pricingBtn = document.querySelector('.pricing-btn');
        const modal = document.getElementById('area-calculator-modal');
        const modalClose = document.querySelector('.modal-close');
        const lengthInput = document.getElementById('area-length');
        const widthInput = document.getElementById('area-width');
        const totalAreaElement = document.getElementById('total-area');
        const totalCostElement = document.getElementById('total-cost');

        if (!modal || !lengthInput || !widthInput || !totalAreaElement || !totalCostElement) return;

        // Pricing per square foot
        const pricePerSqFt = 8;

        // Open modal when pricing button is clicked
        if (pricingBtn) {
            pricingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateAreaCalculation();
                this.openModal(modal);
            });
        }

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

        // Update calculation when inputs change
        lengthInput.addEventListener('input', () => {
            this.updateAreaCalculation();
        });

        widthInput.addEventListener('input', () => {
            this.updateAreaCalculation();
        });

        // Update calculation function
        this.updateAreaCalculation = () => {
            const length = parseFloat(lengthInput.value) || 0;
            const width = parseFloat(widthInput.value) || 0;
            const area = length * width;
            const totalCost = area * pricePerSqFt;
            
            totalAreaElement.textContent = `${area.toLocaleString()} sq.ft`;
            totalCostElement.textContent = `₹${totalCost.toLocaleString()}`;
        };

        // Initialize calculation
        this.updateAreaCalculation();
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
class ParkingAreaFeatures {
    constructor() {
        this.initFeatureHovers();
        this.initPricingCardEffects();
        this.initAreaCalculatorTips();
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
        const pricingCard = document.querySelector('.pricing-card');
        
        if (pricingCard) {
            pricingCard.addEventListener('mouseenter', () => {
                pricingCard.style.borderColor = 'var(--primary-green)';
                pricingCard.style.borderWidth = '2px';
            });
            
            pricingCard.addEventListener('mouseleave', () => {
                pricingCard.style.borderColor = 'transparent';
                pricingCard.style.borderWidth = '1px';
            });
        }
    }

    initAreaCalculatorTips() {
        const lengthInput = document.getElementById('area-length');
        const widthInput = document.getElementById('area-width');

        // Add helpful tooltips for area calculation
        if (lengthInput && widthInput) {
            const createTooltip = (element, text) => {
                element.addEventListener('focus', () => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'input-tooltip';
                    tooltip.textContent = text;
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--gray-800);
                        color: white;
                        padding: 0.5rem;
                        border-radius: 0.25rem;
                        font-size: 0.75rem;
                        z-index: 1000;
                        top: -2rem;
                        left: 0;
                        white-space: nowrap;
                    `;
                    element.parentElement.style.position = 'relative';
                    element.parentElement.appendChild(tooltip);
                });

                element.addEventListener('blur', () => {
                    const tooltip = element.parentElement.querySelector('.input-tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                });
            };

            createTooltip(lengthInput, 'Measure the longest side of your parking area');
            createTooltip(widthInput, 'Measure the width of your parking area');
        }
    }
}

// Area measurement helper
class AreaMeasurementHelper {
    constructor() {
        this.initMeasurementGuide();
    }

    initMeasurementGuide() {
        // Add measurement guide to the modal
        const modal = document.getElementById('area-calculator-modal');
        if (modal) {
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                const guide = document.createElement('div');
                guide.className = 'measurement-guide';
                guide.innerHTML = `
                    <div class="guide-header">
                        <h4>📏 How to Measure Your Parking Area</h4>
                    </div>
                    <div class="guide-content">
                        <div class="guide-step">
                            <span class="step-number">1</span>
                            <span class="step-text">Measure the length (longest side) in feet</span>
                        </div>
                        <div class="guide-step">
                            <span class="step-number">2</span>
                            <span class="step-text">Measure the width (shorter side) in feet</span>
                        </div>
                        <div class="guide-step">
                            <span class="step-number">3</span>
                            <span class="step-text">For irregular shapes, break into rectangles</span>
                        </div>
                    </div>
                `;
                
                guide.style.cssText = `
                    background: var(--light-green);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                `;

                const calculatorForm = modalBody.querySelector('.calculator-form');
                if (calculatorForm) {
                    calculatorForm.insertBefore(guide, calculatorForm.firstChild);
                }
            }
        }
    }

    static calculateIrregularArea(measurements) {
        // Helper method for calculating irregular parking areas
        return measurements.reduce((total, { length, width }) => {
            return total + (length * width);
        }, 0);
    }
}

// Utility functions
class ParkingUtils {
    static formatArea(area) {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
        }).format(area);
    }

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

    static validateDimensions(length, width) {
        const errors = [];
        
        if (!length || length <= 0) {
            errors.push('Length must be greater than 0');
        }
        
        if (!width || width <= 0) {
            errors.push('Width must be greater than 0');
        }
        
        if (length > 1000 || width > 1000) {
            errors.push('Dimensions seem unusually large. Please verify measurements.');
        }
        
        return errors;
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
        // Track area calculator usage
        const pricingBtn = document.querySelector('.pricing-btn');
        if (pricingBtn) {
            pricingBtn.addEventListener('click', () => {
                this.trackEvent('area_calculator_opened', {
                    service_type: 'parking_area_cleaning',
                    page: 'parking-area-cleaning'
                });
            });
        }

        // Track calculation updates
        const lengthInput = document.getElementById('area-length');
        const widthInput = document.getElementById('area-width');
        
        if (lengthInput && widthInput) {
            const trackCalculation = ParkingUtils.debounce(() => {
                const length = parseFloat(lengthInput.value) || 0;
                const width = parseFloat(widthInput.value) || 0;
                const area = length * width;
                
                this.trackEvent('area_calculated', {
                    area: area,
                    length: length,
                    width: width,
                    estimated_cost: area * 8,
                    page: 'parking-area-cleaning'
                });
            }, 2000);

            lengthInput.addEventListener('input', trackCalculation);
            widthInput.addEventListener('input', trackCalculation);
        }

        // Track FAQ interactions
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach((question, index) => {
            question.addEventListener('click', () => {
                const questionText = question.querySelector('span').textContent;
                this.trackEvent('faq_question_clicked', {
                    question_index: index,
                    question_text: questionText,
                    page: 'parking-area-cleaning'
                });
            });
        });

        // Track contact link clicks
        const contactLinks = document.querySelectorAll('.contact-link, .btn[href*="contact"]');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('contact_link_clicked', {
                    link_text: link.textContent.trim(),
                    page: 'parking-area-cleaning'
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
        console.log('Error logged:', errorData);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main functionality
        new ParkingAreaServicePage();
        new ParkingAreaFeatures();
        new AreaMeasurementHelper();
        new PerformanceOptimizer();
        new Analytics();
        new ErrorHandler();

        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        console.log('Parking Area Cleaning Service page initialized successfully');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParkingAreaServicePage,
        ParkingAreaFeatures,
        AreaMeasurementHelper,
        ParkingUtils,
        PerformanceOptimizer,
        Analytics,
        ErrorHandler
    };
}
