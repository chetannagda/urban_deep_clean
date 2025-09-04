// Services Page JavaScript - Green Theme

class ServicesPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupScrollAnimations();
        this.setupServiceCardAnimations();
        this.setupSmoothScrolling();
        console.log('Services Page - Loaded (Green Theme)');
    }

    // Mobile Menu Functionality
    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (mobileMenuClose && mobileMenu) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking outside
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Mobile dropdown functionality
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.parentElement;
                const menu = dropdown.querySelector('.mobile-dropdown-menu');
                
                if (menu) {
                    const isOpen = menu.style.display === 'block';
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.mobile-dropdown-menu').forEach(m => {
                        m.style.display = 'none';
                    });
                    
                    // Toggle current dropdown
                    menu.style.display = isOpen ? 'none' : 'block';
                    
                    // Rotate arrow
                    const arrow = toggle.querySelector('.arrow');
                    if (arrow) {
                        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                }
            });
        });
    }

    // Desktop Dropdown Functionality
    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                let timeoutId;
                
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(timeoutId);
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    timeoutId = setTimeout(() => {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px)';
                    }, 150);
                });
            }
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.service-card, .feature-card, .process-step, .hero-content'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Service Card Hover Effects
    setupServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            this.addServiceCardEffects(card);
        });
    }

    addServiceCardEffects(card) {
        const image = card.querySelector('.service-image img');
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.feature');
        
        card.addEventListener('mouseenter', () => {
            // Image zoom effect
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            // Icon animation
            if (icon) {
                icon.style.background = 'var(--primary-green)';
                icon.style.transform = 'translateX(-50%) scale(1.1)';
                const iconImg = icon.querySelector('img');
                if (iconImg) {
                    iconImg.style.filter = 'brightness(0) invert(1)';
                }
            }
            
            // Feature tags animation
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateY(-2px)';
                    feature.style.background = 'var(--primary-green)';
                    feature.style.color = 'var(--white)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset image
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            // Reset icon
            if (icon) {
                icon.style.background = 'var(--white)';
                icon.style.transform = 'translateX(-50%) scale(1)';
                const iconImg = icon.querySelector('img');
                if (iconImg) {
                    iconImg.style.filter = 'none';
                }
            }
            
            // Reset feature tags
            features.forEach(feature => {
                feature.style.transform = 'translateY(0)';
                feature.style.background = 'var(--light-green)';
                feature.style.color = 'var(--dark-primary)';
            });
        });
    }

    // Smooth Scrolling for anchor links
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
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

// Feature Cards Animation
class FeatureCardsAnimation {
    constructor() {
        this.init();
    }

    init() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach((card, index) => {
            this.setupFeatureCardAnimation(card, index);
        });
    }

    setupFeatureCardAnimation(card, index) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        this.animateFeatureIcon(entry.target);
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(card);
    }

    animateFeatureIcon(card) {
        const icon = card.querySelector('.feature-icon .icon');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 600);
            }, 300);
        }
    }
}

// Process Steps Animation
class ProcessStepsAnimation {
    constructor() {
        this.init();
    }

    init() {
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach((step, index) => {
            this.setupProcessStepAnimation(step, index);
        });
    }

    setupProcessStepAnimation(step, index) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        this.animateStepNumber(entry.target, index + 1);
                    }, index * 200);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(step);
    }

    animateStepNumber(step, stepNumber) {
        const numberElement = step.querySelector('.step-number');
        if (numberElement) {
            setTimeout(() => {
                numberElement.style.transform = 'scale(0)';
                setTimeout(() => {
                    numberElement.textContent = stepNumber;
                    numberElement.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        numberElement.style.transform = 'scale(1)';
                    }, 200);
                }, 150);
            }, 300);
        }
    }
}

// Service Cards Grid Animation
class ServiceCardsGridAnimation {
    constructor() {
        this.init();
    }

    init() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            this.setupServiceCardAnimation(card, index);
        });
    }

    setupServiceCardAnimation(card, index) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        this.addServiceCardPulse(entry.target);
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(card);
    }

    addServiceCardPulse(card) {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 600);
            }, 500);
        }
    }
}

// CTA Section Animation
class CTAAnimation {
    constructor() {
        this.init();
    }

    init() {
        const ctaSection = document.querySelector('.pricing-cta');
        const ctaButtons = document.querySelectorAll('.cta-actions .btn-primary, .cta-actions .btn-secondary');
        
        if (ctaSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCTA(ctaButtons);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(ctaSection);
        }
    }

    animateCTA(buttons) {
        buttons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                button.style.transition = 'all 0.6s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Service Card Click Analytics
class ServiceAnalytics {
    constructor() {
        this.init();
    }

    init() {
        const serviceLinks = document.querySelectorAll('.service-link');
        
        serviceLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const serviceName = link.querySelector('h3').textContent;
                this.trackServiceClick(serviceName);
            });
        });
    }

    trackServiceClick(serviceName) {
        // Log service click for analytics
        console.log(`Service clicked: ${serviceName}`);
        
        // You can add actual analytics tracking here
        // Example: gtag('event', 'service_click', { service_name: serviceName });
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && window.innerWidth > 1024) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }
    }
}

// Service Card Loading Animation
class ServiceCardLoader {
    constructor() {
        this.init();
    }

    init() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        // Add loading skeleton effect
        serviceCards.forEach(card => {
            this.addLoadingEffect(card);
        });
        
        // Remove loading effect after images load
        setTimeout(() => {
            this.removeLoadingEffects();
        }, 1000);
    }

    addLoadingEffect(card) {
        const image = card.querySelector('.service-image img');
        if (image) {
            image.style.opacity = '0';
            image.addEventListener('load', () => {
                image.style.transition = 'opacity 0.5s ease';
                image.style.opacity = '1';
            });
        }
    }

    removeLoadingEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.classList.add('loaded');
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServicesPage();
    new FeatureCardsAnimation();
    new ProcessStepsAnimation();
    new ServiceCardsGridAnimation();
    new CTAAnimation();
    new ServiceAnalytics();
    new ServiceCardLoader();
    
    // Add parallax effect only on desktop
    if (window.innerWidth > 1024) {
        new ParallaxEffect();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && window.innerWidth > 1024) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add pulse animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.1); }
            100% { transform: translateX(-50%) scale(1); }
        }
        
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .service-card.loaded {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Add intersection observer polyfill for older browsers
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .process-step');
    animateElements.forEach(el => {
        el.classList.add('animate-in');
    });
}
