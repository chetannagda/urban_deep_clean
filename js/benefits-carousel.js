class BenefitsCarousel {
    constructor() {
        this.carousel = document.getElementById('benefitsCarousel');
        this.items = this.carousel.querySelectorAll('.benefit-item');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.currentIndex = 0;
        this.autoPlayInterval = 3000; // 3 seconds
        this.intervalId = null;
        
        this.init();
    }

    init() {
        if (window.innerWidth <= 768) {
            this.createDots();
            this.initAutoPlay();
            this.initTouchEvents();
            this.updateCarousel();
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                if (!this.intervalId) {
                    this.createDots();
                    this.initAutoPlay();
                    this.initTouchEvents();
                    this.updateCarousel();
                }
            } else {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }
        });
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    updateCarousel() {
        // Update slides
        const offset = this.items[this.currentIndex].offsetLeft;
        this.carousel.scrollTo({
            left: offset,
            behavior: 'smooth'
        });

        // Update active states
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });

        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Progress bar removed
    }

    initAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            this.next();
        }, this.autoPlayInterval);
    }

    initTouchEvents() {
        let startX, isDragging = false;

        this.carousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - this.carousel.offsetLeft;
            this.pauseAutoPlay();
        }, { passive: true });

        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX - this.carousel.offsetLeft;
            const walk = (x - startX) * 2;
            this.carousel.scrollLeft = this.carousel.scrollLeft - walk;
        });

        this.carousel.addEventListener('touchend', () => {
            isDragging = false;
            this.resumeAutoPlay();
            
            // Determine which slide is most visible
            const slideWidth = this.items[0].offsetWidth;
            const scrollPosition = this.carousel.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);
            
            this.currentIndex = Math.max(0, Math.min(newIndex, this.items.length - 1));
            this.updateCarousel();
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.pauseAutoPlay();
        setTimeout(() => this.resumeAutoPlay(), 5000); // Resume after 5 seconds
    }

    pauseAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    resumeAutoPlay() {
        if (!this.intervalId) {
            this.initAutoPlay();
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BenefitsCarousel();
});
