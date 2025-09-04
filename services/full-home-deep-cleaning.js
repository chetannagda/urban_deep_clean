// Full Home Deep Cleaning Service Page JavaScript

class HomeServicePage {
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
                    if (targetTab === 'furnished') {
                        this.updatePricingForFurnished();
                    } else {
                        this.updatePricingForNonFurnished();
                    }
                });
            });
        }
    }

    updatePricingForFurnished() {
        const classicPrice = document.querySelector('.pricing-card:first-child .plan-price');
        const platinumPrice = document.querySelector('.pricing-card:last-child .plan-price');
        
        if (classicPrice) classicPrice.textContent = '₹3,999';
        if (platinumPrice) platinumPrice.textContent = '₹4,999';
    }

    updatePricingForNonFurnished() {
        const classicPrice = document.querySelector('.pricing-card:first-child .plan-price');
        const platinumPrice = document.querySelector('.pricing-card:last-child .plan-price');
        
        if (classicPrice) classicPrice.textContent = '₹8/sq ft';
        if (platinumPrice) platinumPrice.textContent = '₹10/sq ft';
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
        const animateElements = document.querySelectorAll('.feature-item, .pricing-card, .process-step');
        animateElements.forEach(el => observer.observe(el));

        // Staggered animation for feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

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
                    this.trackEvent('phone_call', 'home_service_page');
                } else if (button.href && button.href.includes('contact')) {
                    // Contact page button
                    this.trackEvent('contact_page', 'home_service_page');
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
            service: 'Full Home Deep Cleaning',
            plan: planName,
            price: planPrice
        }));

        // Track plan selection
        this.trackEvent('plan_selected', 'home_service_page', planName);
        
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

// Home Cleaning Calculator
class HomeCleaningCalculator {
    constructor() {
        this.baseRates = {
            furnished: {
                classic: 3999,
                platinum: 4999
            },
            nonFurnished: {
                perSqFt: 8
            }
        };
        this.init();
    }

    init() {
        this.createCalculatorModal();
        this.initCalculatorButton();
    }

    createCalculatorModal() {
        const modal = document.createElement('div');
        modal.className = 'home-calculator-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Home Cleaning Calculator</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="calculator-form">
                        <div class="form-group">
                            <label>House Type:</label>
                            <select id="houseType">
                                <option value="furnished">Furnished House</option>
                                <option value="nonFurnished">Non-Furnished House</option>
                            </select>
                        </div>
                        <div class="form-group" id="roomsGroup">
                            <label>Number of Rooms:</label>
                            <input type="number" id="roomCount" min="1" max="15" value="3">
                        </div>
                        <div class="form-group" id="areaGroup" style="display: none;">
                            <label>Total Area (sq ft):</label>
                            <input type="number" id="totalArea" min="100" max="5000" value="1000">
                        </div>
                        <div class="form-group">
                            <label>Number of Bathrooms:</label>
                            <input type="number" id="bathroomCount" min="1" max="8" value="2">
                        </div>
                        <div class="form-group">
                            <label>Additional Services:</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" value="800"> Deep Kitchen Cleaning (+₹800)</label>
                                <label><input type="checkbox" value="600"> Balcony Deep Clean (+₹600)</label>
                                <label><input type="checkbox" value="1000"> Sofa & Carpet Cleaning (+₹1000)</label>
                                <label><input type="checkbox" value="500"> Window Deep Clean (+₹500)</label>
                            </div>
                        </div>
                        <div class="calculator-result">
                            <h4>Estimated Price: <span id="calculatedPrice">₹3,999</span></h4>
                        </div>
                        <button class="calculator-book-btn">Book This Service</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .home-calculator-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 2000;
                align-items: center;
                justify-content: center;
            }
            .home-calculator-modal.show {
                display: flex;
            }
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e2e8f0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: #1e293b;
            }
            .form-group select,
            .form-group input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                font-size: 1rem;
            }
            .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .checkbox-group label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: normal;
                margin-bottom: 0;
            }
            .calculator-result {
                background: #dcfce7;
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 1rem;
            }
            .calculator-result h4 {
                color: #16a34a;
                margin: 0;
            }
            .calculator-book-btn {
                width: 100%;
                padding: 1rem;
                background: #22c55e;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            .calculator-book-btn:hover {
                background: #16a34a;
            }
        `;
        document.head.appendChild(style);

        this.initCalculatorEvents(modal);
    }

    initCalculatorButton() {
        // Add calculator button to pricing section
        const pricingSection = document.querySelector('.pricing-section');
        if (pricingSection) {
            const calculatorBtn = document.createElement('button');
            calculatorBtn.className = 'home-calculator-btn';
            calculatorBtn.innerHTML = '🏠 Calculate Home Cleaning Cost';
            calculatorBtn.style.cssText = `
                display: block;
                margin: 2rem auto 0;
                padding: 1rem 2rem;
                background: #22c55e;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            calculatorBtn.addEventListener('click', () => {
                document.querySelector('.home-calculator-modal').classList.add('show');
            });
            
            pricingSection.appendChild(calculatorBtn);
        }
    }

    initCalculatorEvents(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const houseType = modal.querySelector('#houseType');
        const roomCount = modal.querySelector('#roomCount');
        const totalArea = modal.querySelector('#totalArea');
        const bathroomCount = modal.querySelector('#bathroomCount');
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
        const calculatedPrice = modal.querySelector('#calculatedPrice');
        const bookBtn = modal.querySelector('.calculator-book-btn');
        const roomsGroup = modal.querySelector('#roomsGroup');
        const areaGroup = modal.querySelector('#areaGroup');

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Toggle between rooms and area input
        houseType.addEventListener('change', () => {
            if (houseType.value === 'furnished') {
                roomsGroup.style.display = 'block';
                areaGroup.style.display = 'none';
            } else {
                roomsGroup.style.display = 'none';
                areaGroup.style.display = 'block';
            }
            calculatePrice();
        });

        // Calculate price on input change
        const calculatePrice = () => {
            const type = houseType.value;
            let basePrice = 0;
            
            if (type === 'furnished') {
                const rooms = parseInt(roomCount.value) || 1;
                const bathrooms = parseInt(bathroomCount.value) || 1;
                
                basePrice = this.baseRates.furnished.classic;
                
                // Room multiplier
                if (rooms > 3) {
                    basePrice += (rooms - 3) * 800;
                }
                
                // Bathroom multiplier
                if (bathrooms > 2) {
                    basePrice += (bathrooms - 2) * 500;
                }
            } else {
                const area = parseInt(totalArea.value) || 1000;
                basePrice = area * this.baseRates.nonFurnished.perSqFt;
            }
            
            // Additional services
            let additionalCost = 0;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    additionalCost += parseInt(checkbox.value);
                }
            });
            
            const totalPrice = Math.round(basePrice + additionalCost);
            calculatedPrice.textContent = `₹${totalPrice.toLocaleString()}`;
        };

        // Add event listeners
        houseType.addEventListener('change', calculatePrice);
        roomCount.addEventListener('input', calculatePrice);
        totalArea.addEventListener('input', calculatePrice);
        bathroomCount.addEventListener('input', calculatePrice);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculatePrice);
        });

        // Book button
        bookBtn.addEventListener('click', () => {
            const customPrice = calculatedPrice.textContent;
            localStorage.setItem('customQuote', JSON.stringify({
                service: 'Full Home Deep Cleaning',
                houseType: houseType.value,
                rooms: roomCount.value,
                area: totalArea.value,
                bathrooms: bathroomCount.value,
                additionalServices: Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.parentElement.textContent.trim()),
                totalPrice: customPrice
            }));
            
            window.location.href = '../contact-us.html';
        });

        // Initial calculation
        calculatePrice();
    }
}

// Home Cleaning FAQ Section
class HomeFAQSection {
    constructor() {
        this.createFAQSection();
    }

    createFAQSection() {
        const faqData = [
            {
                question: "How long does full home deep cleaning take?",
                answer: "Typically 4-8 hours depending on the size of your home and level of cleaning required. Our team works efficiently while maintaining high quality standards."
            },
            {
                question: "What's the difference between furnished and non-furnished cleaning?",
                answer: "Furnished home cleaning involves working around furniture and belongings, while non-furnished cleaning is for empty homes or construction cleanup with pricing per square foot."
            },
            {
                question: "Do I need to be present during the cleaning?",
                answer: "While not mandatory, we recommend being present for the initial walkthrough. You can leave during the cleaning process if you prefer."
            },
            {
                question: "What cleaning products do you use?",
                answer: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets. All products are professional-grade and highly effective."
            },
            {
                question: "How often should I book deep cleaning?",
                answer: "We recommend deep cleaning every 3-6 months, depending on your lifestyle, family size, and personal preferences."
            }
        ];

        const faqSection = document.createElement('section');
        faqSection.className = 'home-faq-section';
        faqSection.innerHTML = `
            <div class="faq-container">
                <h2 class="section-title">Home Cleaning FAQ</h2>
                <div class="faq-list">
                    ${faqData.map((faq, index) => `
                        <div class="faq-item">
                            <button class="faq-question">
                                <span>${faq.question}</span>
                                <span class="faq-icon">+</span>
                            </button>
                            <div class="faq-answer">
                                <p>${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add FAQ styles
        const style = document.createElement('style');
        style.textContent = `
            .home-faq-section {
                padding: 4rem 0;
                background: #f8fafc;
            }
            .faq-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .faq-list {
                margin-top: 3rem;
            }
            .faq-item {
                background: white;
                border-radius: 8px;
                margin-bottom: 1rem;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .faq-question {
                width: 100%;
                padding: 1.5rem;
                background: none;
                border: none;
                text-align: left;
                font-size: 1.1rem;
                font-weight: 600;
                color: #1e293b;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background 0.3s ease;
            }
            .faq-question:hover {
                background: #f8fafc;
            }
            .faq-icon {
                font-size: 1.5rem;
                color: #22c55e;
                transition: transform 0.3s ease;
            }
            .faq-item.active .faq-icon {
                transform: rotate(45deg);
            }
            .faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            .faq-item.active .faq-answer {
                max-height: 200px;
            }
            .faq-answer p {
                padding: 0 1.5rem 1.5rem;
                color: #64748b;
                line-height: 1.6;
                margin: 0;
            }
        `;
        document.head.appendChild(style);

        // Insert FAQ section before footer
        const footer = document.querySelector('.footer');
        footer.parentNode.insertBefore(faqSection, footer);

        // Initialize FAQ functionality
        this.initFAQEvents();
    }

    initFAQEvents() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomeServicePage();
    new HomeCleaningCalculator();
    new HomeFAQSection();
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
