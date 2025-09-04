// About Us Page JavaScript - Green Theme

class AboutUsPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        console.log('About Us Page - Loaded (Green Theme)');
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
            '.mvv-card, .team-member, .step, .hero-text, .hero-image'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Add CSS for animations
        this.addAnimationStyles();
    }

    // Add animation styles dynamically
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .mvv-card,
            .team-member,
            .step,
            .hero-text,
            .hero-image {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .mvv-card.animate-in,
            .team-member.animate-in,
            .step.animate-in,
            .hero-text.animate-in,
            .hero-image.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .team-member.animate-in {
                transition-delay: 0.1s;
            }
            
            .step.animate-in {
                transition-delay: 0.2s;
            }
            
            .mvv-card:nth-child(2).animate-in {
                transition-delay: 0.2s;
            }
            
            .mvv-card:nth-child(3).animate-in {
                transition-delay: 0.4s;
            }
        `;
        document.head.appendChild(style);
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

// Team Member Hover Effects
class TeamMemberEffects {
    constructor() {
        this.init();
    }

    init() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            this.addHoverEffect(member);
        });
    }

    addHoverEffect(member) {
        const image = member.querySelector('.member-image img');
        const info = member.querySelector('.member-info');
        
        if (image && info) {
            member.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                info.style.transform = 'translateY(-5px)';
            });
            
            member.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                info.style.transform = 'translateY(0)';
            });
        }
    }
}

// Mission Vision Values Animation
class MVVAnimation {
    constructor() {
        this.init();
    }

    init() {
        const mvvCards = document.querySelectorAll('.mvv-card');
        
        mvvCards.forEach((card, index) => {
            this.setupCardAnimation(card, index);
        });
    }

    setupCardAnimation(card, index) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(card);
    }
}

// Approach Steps Counter Animation
class ApproachStepsAnimation {
    constructor() {
        this.init();
    }

    init() {
        const steps = document.querySelectorAll('.step');
        
        steps.forEach((step, index) => {
            this.setupStepAnimation(step, index);
        });
    }

    setupStepAnimation(step, index) {
        const stepNumber = step.querySelector('.step-number');
        
        if (stepNumber) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            this.animateNumber(stepNumber, index + 1);
                        }, index * 300);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(step);
        }
    }

    animateNumber(element, targetNumber) {
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = targetNumber;
            element.style.transform = 'scale(1.2)';
            element.style.opacity = '1';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, 100);
    }
}

// Contact CTA Animation
class ContactCTAAnimation {
    constructor() {
        this.init();
    }

    init() {
        const ctaSection = document.querySelector('.contact-cta');
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
            setTimeout(() => {
                button.style.transform = 'translateY(0)';
                button.style.opacity = '1';
            }, index * 200);
        });
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutUsPage();
    new TeamMemberEffects();
    new MVVAnimation();
    new ApproachStepsAnimation();
    new ContactCTAAnimation();
    
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
    
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
