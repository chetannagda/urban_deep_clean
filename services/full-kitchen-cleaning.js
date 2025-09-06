// Full Kitchen Cleaning Service Page JavaScript

class KitchenServicePage {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initServicesDropdown();
        this.initPricingTabs();
        this.initScrollAnimations();
        this.initSmoothScrolling();
        this.initCTAButtons();
        this.initAccordion();
    }

    // Accordion Functionality
    initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        // First, remove any existing active/show classes
        accordionHeaders.forEach(header => {
            header.classList.remove('active');
            header.nextElementSibling.classList.remove('show');
        });

        // Then set up click handlers
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const currentContent = header.nextElementSibling;
                const isExpanded = header.classList.contains('active');

                // Close all accordions
                accordionHeaders.forEach(h => {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('show');
                });

                // Open the clicked accordion if it wasn't already open
                if (!isExpanded) {
                    header.classList.add('active');
                    currentContent.classList.add('show');
                }
            });
        });

        // Open only the first accordion by default
        if (accordionHeaders.length > 0) {
            accordionHeaders[0].classList.add('active');
            accordionHeaders[0].nextElementSibling.classList.add('show');
        }
    }

    // Mobile Menu Functionality
    initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    // Services Dropdown Functionality
    initServicesDropdown() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownToggle.classList.toggle('active');
                dropdownMenu.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownToggle.classList.remove('active');
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    }

    // Pricing Tabs Functionality
    initPricingTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const pricingCards = document.querySelectorAll('.pricing-card');

        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');

                    // Get the target tab
                    const targetTab = button.getAttribute('data-tab');
                    
                    // Show/hide pricing cards based on tab
                    if (targetTab === 'standard') {
                        this.updatePricingForStandard();
                    } else {
                        this.updatePricingForModular();
                    }
                });
            });
        }
    }

    updatePricingForStandard() {
        const essentialPrice = document.querySelector('.pricing-card:first-child .plan-price');
        const deepCleanPrice = document.querySelector('.pricing-card:last-child .plan-price');
        
        if (essentialPrice) essentialPrice.textContent = '₹1,999';
        if (deepCleanPrice) deepCleanPrice.textContent = '₹2,999';
    }

    updatePricingForModular() {
        const essentialPrice = document.querySelector('.pricing-card:first-child .plan-price');
        const deepCleanPrice = document.querySelector('.pricing-card:last-child .plan-price');
        
        if (essentialPrice) essentialPrice.textContent = '₹2,499';
        if (deepCleanPrice) deepCleanPrice.textContent = '₹3,499';
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
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.pricing-card, .process-step');
        animateElements.forEach(el => observer.observe(el));

        // Staggered animation for process steps
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // CTA Button Functionality
    initCTAButtons() {
        const ctaButtons = document.querySelectorAll('.cta-button, .plan-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);

                // Handle different button types
                if (button.classList.contains('plan-button')) {
                    this.handlePlanSelection(button);
                } else if (button.href && button.href.includes('tel:')) {
                    // Phone call button
                    this.trackEvent('phone_call', 'kitchen_service_page');
                } else if (button.href && button.href.includes('contact')) {
                    // Contact page button
                    this.trackEvent('contact_page', 'kitchen_service_page');
                }
            });
        });
    }

    handlePlanSelection(button) {
        const planCard = button.closest('.pricing-card');
        const planName = planCard.querySelector('.plan-name').textContent;
        const planPrice = planCard.querySelector('.plan-price').textContent;
        
        // Store selected plan in localStorage for contact form
        localStorage.setItem('selectedPlan', JSON.stringify({
            service: 'Full Kitchen Cleaning',
            plan: planName,
            price: planPrice
        }));

        // Track plan selection
        this.trackEvent('plan_selected', 'kitchen_service_page', planName);
        
        // Redirect to contact page
        window.location.href = '../contact-us.html';
    }

    // Event Tracking
    trackEvent(action, category, label = '') {
        // Google Analytics or other tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        // Console log for development
        console.log(`Event tracked: ${action} - ${category} - ${label}`);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KitchenServicePage();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});
