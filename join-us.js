// Join Us Page JavaScript

class JoinUsPage {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initServicesDropdown();
        this.initApplicationForm();
        this.initScrollAnimations();
        this.initSmoothScrolling();
    }

    // Mobile Menu Functionality
    initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
        const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
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

        // Close mobile menu when clicking outside
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Mobile dropdown functionality
        if (mobileDropdownToggle && mobileDropdownMenu) {
            mobileDropdownToggle.addEventListener('click', () => {
                mobileDropdownMenu.classList.toggle('active');
                const icon = mobileDropdownToggle.querySelector('.mobile-dropdown-icon');
                if (icon) {
                    icon.style.transform = mobileDropdownMenu.classList.contains('active') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            });
        }
    }

    // Services Dropdown Functionality
    initServicesDropdown() {
        const dropdown = document.querySelector('.dropdown');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        let dropdownTimeout;

        if (dropdown && dropdownMenu) {
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(dropdownTimeout);
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            });

            dropdown.addEventListener('mouseleave', () => {
                dropdownTimeout = setTimeout(() => {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }, 150);
            });
        }
    }

    // Application Form Functionality
    initApplicationForm() {
        const form = document.getElementById('applicationForm');
        if (!form) return;

        const formInputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        const submitButton = form.querySelector('.submit-button');

        // Add real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Handle form submission
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Phone number formatting
        const phoneInput = form.querySelector('input[name="phoneNumber"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }

        // Email validation
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', (e) => this.validateEmail(e));
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error state
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'fullName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Full name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Name can only contain letters and spaces';
                }
                break;

            case 'phoneNumber':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Phone number is required';
                } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email address is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'address':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Address is required';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Please enter a complete address';
                }
                break;

            case 'position':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a position';
                }
                break;

            case 'experience':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select your experience level';
                }
                break;

            case 'workingHours':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select your available working hours';
                }
                break;

            case 'hearAboutUs':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please tell us how you heard about us';
                }
                break;

            case 'whyJoinUs':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please tell us why you want to join us';
                } else if (value.length < 20) {
                    isValid = false;
                    errorMessage = 'Please provide more details (at least 20 characters)';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Add country code if not present
        if (value.length > 0 && !value.startsWith('91')) {
            if (value.length === 10) {
                value = '91' + value;
            }
        }
        
        // Format the number
        if (value.length >= 2) {
            value = '+' + value.substring(0, 2) + ' ' + value.substring(2);
        }
        
        e.target.value = value;
    }

    validateEmail(e) {
        const email = e.target.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(e.target, 'Please enter a valid email address');
        } else {
            this.clearFieldError(e.target);
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('.submit-button');
        
        // Validate all fields
        const requiredFields = form.querySelectorAll('[required]');
        let isFormValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showMessage('Please correct the errors above.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = `
            <svg class="submit-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2V6M10 14V18M18 10H14M6 10H2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Submitting...
        `;
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.submitApplication(formData);
            
            // Show success message
            this.showMessage('Thank you for your application! We have received your details and will contact you soon for the next steps.', 'success');
            form.reset();
            
            // Clear any saved form data
            localStorage.removeItem('joinUsFormData');
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Sorry, there was an error submitting your application. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.innerHTML = originalHTML;
        }
    }

    async submitApplication(formData) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message-global');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' ? 'success-message show' : 'error-message-global show';
        messageElement.textContent = message;
        
        // Add styles for error message
        if (type === 'error') {
            messageElement.style.cssText = `
                background: #fef2f2;
                color: #dc2626;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                border: 1px solid #fecaca;
            `;
        }
        
        // Insert message at the top of the form
        const form = document.getElementById('applicationForm');
        if (form) {
            form.insertBefore(messageElement, form.firstChild);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageElement.classList.remove('show');
                setTimeout(() => messageElement.remove(), 300);
            }, 5000);
        }
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
            { selector: '.hero-text', animation: 'slide-in-left' },
            { selector: '.hero-image', animation: 'slide-in-right' },
            { selector: '.form-header', animation: 'fade-in' },
            { selector: '.form-container', animation: 'fade-in' },
            { selector: '.section-header', animation: 'fade-in' },
            { selector: '.benefit-item', animation: 'fade-in' },
            { selector: '.benefits-image', animation: 'fade-in' }
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
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Benefit Items Animation
class BenefitItemsEffects {
    constructor() {
        this.init();
    }

    init() {
        this.initHoverEffects();
        this.initStaggeredAnimation();
    }

    initHoverEffects() {
        const benefitItems = document.querySelectorAll('.benefit-item');
        
        benefitItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.benefit-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    initStaggeredAnimation() {
        const benefitItems = document.querySelectorAll('.benefit-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        benefitItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });
    }
}

// Form Enhancement Features
class FormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.initFloatingLabels();
        this.initFormProgress();
        this.initAutoSave();
        this.initFieldDependencies();
    }

    initFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('.form-input, .form-select, .form-textarea');
            const label = group.querySelector('.form-label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    label.style.color = 'var(--primary-color)';
                });
                
                input.addEventListener('blur', () => {
                    label.style.color = 'var(--text-primary)';
                });
            }
        });
    }

    initFormProgress() {
        const form = document.getElementById('applicationForm');
        if (!form) return;
        
        const requiredFields = form.querySelectorAll('[required]');
        const progressBar = this.createProgressBar();
        
        if (progressBar) {
            const formHeader = form.querySelector('.form-header');
            formHeader.appendChild(progressBar);
            
            requiredFields.forEach(field => {
                field.addEventListener('input', () => {
                    this.updateProgress(requiredFields, progressBar);
                });
            });
        }
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress';
        progressContainer.style.cssText = `
            width: 100%;
            max-width: 400px;
            height: 6px;
            background: var(--gray-200);
            border-radius: 3px;
            margin: 2rem auto 0;
            overflow: hidden;
        `;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress-bar';
        progressBar.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 3px;
        `;
        
        const progressText = document.createElement('div');
        progressText.className = 'form-progress-text';
        progressText.style.cssText = `
            text-align: center;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            color: var(--text-secondary);
        `;
        progressText.textContent = 'Complete the form to apply';
        
        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(progressText);
        return progressContainer;
    }

    updateProgress(requiredFields, progressContainer) {
        const progressBar = progressContainer.querySelector('.form-progress-bar');
        const progressText = progressContainer.querySelector('.form-progress-text');
        let filledFields = 0;
        
        requiredFields.forEach(field => {
            if (field.value.trim()) {
                filledFields++;
            }
        });
        
        const progress = (filledFields / requiredFields.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            progressText.textContent = 'Ready to submit!';
            progressText.style.color = 'var(--primary-color)';
        } else {
            progressText.textContent = `${Math.round(progress)}% complete`;
            progressText.style.color = 'var(--text-secondary)';
        }
    }

    initAutoSave() {
        const form = document.getElementById('applicationForm');
        if (!form) return;
        
        const formInputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        // Load saved data
        this.loadFormData(formInputs);
        
        // Save data on input
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.saveFormData(formInputs);
            });
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', () => {
            setTimeout(() => {
                localStorage.removeItem('joinUsFormData');
            }, 3000);
        });
    }

    saveFormData(inputs) {
        const formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value;
        });
        localStorage.setItem('joinUsFormData', JSON.stringify(formData));
    }

    loadFormData(inputs) {
        const savedData = localStorage.getItem('joinUsFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            inputs.forEach(input => {
                if (formData[input.name]) {
                    input.value = formData[input.name];
                }
            });
        }
    }

    initFieldDependencies() {
        const positionSelect = document.querySelector('select[name="position"]');
        const experienceSelect = document.querySelector('select[name="experience"]');
        
        if (positionSelect && experienceSelect) {
            positionSelect.addEventListener('change', (e) => {
                const selectedPosition = e.target.value;
                
                // Update experience options based on position
                if (selectedPosition === 'team-leader' || selectedPosition === 'supervisor') {
                    // Remove "No Experience" option for leadership roles
                    const noExpOption = experienceSelect.querySelector('option[value="0"]');
                    if (noExpOption) {
                        noExpOption.style.display = 'none';
                    }
                } else {
                    // Show all options for other positions
                    const allOptions = experienceSelect.querySelectorAll('option');
                    allOptions.forEach(option => {
                        option.style.display = 'block';
                    });
                }
            });
        }
    }
}

// Hero Section Interactions
class HeroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.initParallaxEffect();
        this.initImageAnimation();
    }

    initParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-img');
        
        if (heroSection && heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.1;
                
                heroImage.style.transform = `translateY(${parallax}px)`;
            });
        }
    }

    initImageAnimation() {
        const heroImage = document.querySelector('.hero-img');
        
        if (heroImage) {
            // Add floating animation
            heroImage.style.animation = 'float 6s ease-in-out infinite';
            
            // Add CSS for floating animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JoinUsPage();
    new BenefitItemsEffects();
    new FormEnhancements();
    new HeroInteractions();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-initialize any features that might need refreshing
        const form = document.getElementById('applicationForm');
        if (form) {
            // Check if form data was saved and restore it
            const formInputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
            const savedData = localStorage.getItem('joinUsFormData');
            if (savedData) {
                const formData = JSON.parse(savedData);
                formInputs.forEach(input => {
                    if (formData[input.name] && !input.value) {
                        input.value = formData[input.name];
                    }
                });
            }
        }
    }
});

// Export for potential use in other scripts
window.JoinUsPage = JoinUsPage;
window.BenefitItemsEffects = BenefitItemsEffects;
window.FormEnhancements = FormEnhancements;
window.HeroInteractions = HeroInteractions;
