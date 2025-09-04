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

// Kitchen Cleaning Calculator
class KitchenCalculator {
    constructor() {
        this.baseRates = {
            standard: {
                essential: 1999,
                deepClean: 2999
            },
            modular: {
                essential: 2499,
                deepClean: 3499
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
        modal.className = 'kitchen-calculator-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Kitchen Cleaning Calculator</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="calculator-form">
                        <div class="form-group">
                            <label>Kitchen Type:</label>
                            <select id="kitchenType">
                                <option value="standard">Standard Kitchen</option>
                                <option value="modular">Modular Kitchen</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Kitchen Size:</label>
                            <select id="kitchenSize">
                                <option value="small">Small (up to 50 sq ft)</option>
                                <option value="medium">Medium (50-100 sq ft)</option>
                                <option value="large">Large (100+ sq ft)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Number of Appliances:</label>
                            <input type="number" id="applianceCount" min="1" max="15" value="5">
                        </div>
                        <div class="form-group">
                            <label>Additional Services:</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" value="500"> Deep Oven Cleaning (+₹500)</label>
                                <label><input type="checkbox" value="300"> Refrigerator Deep Clean (+₹300)</label>
                                <label><input type="checkbox" value="400"> Cabinet Organization (+₹400)</label>
                                <label><input type="checkbox" value="200"> Chimney Cleaning (+₹200)</label>
                            </div>
                        </div>
                        <div class="calculator-result">
                            <h4>Estimated Price: <span id="calculatedPrice">₹1,999</span></h4>
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
            .kitchen-calculator-modal {
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
            .kitchen-calculator-modal.show {
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
            calculatorBtn.className = 'kitchen-calculator-btn';
            calculatorBtn.innerHTML = '🧮 Calculate Kitchen Cleaning Cost';
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
                document.querySelector('.kitchen-calculator-modal').classList.add('show');
            });
            
            pricingSection.appendChild(calculatorBtn);
        }
    }

    initCalculatorEvents(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const kitchenType = modal.querySelector('#kitchenType');
        const kitchenSize = modal.querySelector('#kitchenSize');
        const applianceCount = modal.querySelector('#applianceCount');
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
        const calculatedPrice = modal.querySelector('#calculatedPrice');
        const bookBtn = modal.querySelector('.calculator-book-btn');

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Calculate price on input change
        const calculatePrice = () => {
            const type = kitchenType.value;
            const size = kitchenSize.value;
            const appliances = parseInt(applianceCount.value) || 1;
            
            let basePrice = this.baseRates[type].essential;
            
            // Size multiplier
            const sizeMultipliers = {
                small: 1,
                medium: 1.3,
                large: 1.6
            };
            basePrice *= sizeMultipliers[size];
            
            // Appliance multiplier
            if (appliances > 5) {
                basePrice += (appliances - 5) * 150;
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
        kitchenType.addEventListener('change', calculatePrice);
        kitchenSize.addEventListener('change', calculatePrice);
        applianceCount.addEventListener('input', calculatePrice);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculatePrice);
        });

        // Book button
        bookBtn.addEventListener('click', () => {
            const customPrice = calculatedPrice.textContent;
            localStorage.setItem('customQuote', JSON.stringify({
                service: 'Full Kitchen Cleaning',
                kitchenType: kitchenType.value,
                kitchenSize: kitchenSize.value,
                appliances: applianceCount.value,
                additionalServices: Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.parentElement.textContent.trim()),
                totalPrice: customPrice
            }));
            
            window.location.href = '../contact-us.html';
        });

        // Initial calculation
        calculatePrice();
    }
}

// Kitchen Tips Section
class KitchenTipsSection {
    constructor() {
        this.createTipsSection();
    }

    createTipsSection() {
        const tipsData = [
            {
                title: "Daily Kitchen Maintenance",
                tip: "Wipe down counters and stovetop after each use to prevent buildup of grease and stains."
            },
            {
                title: "Appliance Care",
                tip: "Clean your microwave weekly and run a cleaning cycle on your dishwasher monthly for optimal performance."
            },
            {
                title: "Sink Hygiene",
                tip: "Disinfect your sink daily and clean the garbage disposal weekly with ice cubes and lemon peels."
            },
            {
                title: "Cabinet Organization",
                tip: "Declutter cabinets monthly and use shelf liners to make cleaning easier and protect surfaces."
            }
        ];

        const tipsSection = document.createElement('section');
        tipsSection.className = 'kitchen-tips-section';
        tipsSection.innerHTML = `
            <div class="tips-container">
                <h2 class="section-title">Kitchen Maintenance Tips</h2>
                <div class="tips-grid">
                    ${tipsData.map((tip, index) => `
                        <div class="tip-card">
                            <div class="tip-icon">💡</div>
                            <h3 class="tip-title">${tip.title}</h3>
                            <p class="tip-description">${tip.tip}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add tips styles
        const style = document.createElement('style');
        style.textContent = `
            .kitchen-tips-section {
                padding: 4rem 0;
                background: #f8fafc;
            }
            .tips-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .tips-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
            }
            .tip-card {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            .tip-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
            .tip-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            .tip-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 1rem;
            }
            .tip-description {
                color: #64748b;
                line-height: 1.6;
            }
        `;
        document.head.appendChild(style);

        // Insert tips section before CTA section
        const ctaSection = document.querySelector('.cta-section');
        ctaSection.parentNode.insertBefore(tipsSection, ctaSection);
    }
}

// Kitchen FAQ Section
class KitchenFAQSection {
    constructor() {
        this.createFAQSection();
    }

    createFAQSection() {
        const faqData = [
            {
                question: "How long does kitchen deep cleaning take?",
                answer: "Typically 3-5 hours depending on kitchen size and condition. Standard kitchens take 3-4 hours, while larger modular kitchens may take 4-5 hours."
            },
            {
                question: "Do you clean inside appliances?",
                answer: "Yes, we clean inside all major appliances including refrigerator, oven, microwave, and dishwasher as part of our deep cleaning service."
            },
            {
                question: "What about grease buildup on cabinets?",
                answer: "We use specialized degreasers to remove stubborn grease buildup from cabinets, range hoods, and backsplashes safely and effectively."
            },
            {
                question: "Is it safe to use the kitchen immediately after cleaning?",
                answer: "Yes, we use food-safe cleaning products. You can use your kitchen immediately after we finish, though we recommend letting surfaces air dry for best results."
            },
            {
                question: "Do you organize kitchen items?",
                answer: "Basic organization is included. For comprehensive organization services, we offer it as an add-on for an additional fee."
            }
        ];

        const faqSection = document.createElement('section');
        faqSection.className = 'kitchen-faq-section';
        faqSection.innerHTML = `
            <div class="faq-container">
                <h2 class="section-title">Kitchen Cleaning FAQ</h2>
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
            .kitchen-faq-section {
                padding: 4rem 0;
                background: white;
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
                background: #f8fafc;
                border-radius: 8px;
                margin-bottom: 1rem;
                overflow: hidden;
                border: 1px solid #e2e8f0;
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
                background: #f1f5f9;
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
                background: white;
            }
            .faq-item.active .faq-answer {
                max-height: 200px;
            }
            .faq-answer p {
                padding: 1.5rem;
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
    new KitchenServicePage();
    new KitchenCalculator();
    new KitchenTipsSection();
    new KitchenFAQSection();
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
