document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Form handling
    initFormHandling();

    // Service card interactions
    initServiceCardAnimations();

    // Navbar scroll effect
    initNavbarScrollEffect();

    // Intersection Observer for animations
    initScrollAnimations();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize form submission handling
 */
function initFormHandling() {
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuoteSubmission(this);
        });
    }
}

/**
 * Handle quote form submission
 * @param {HTMLFormElement} form - The form element
 */
function handleQuoteSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Get form data
        const data = {
            service: formData.get('service'),
            name: formData.get('name'),
            phone: formData.get('phone'),
            details: formData.get('details')
        };

        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(data);

        // Open WhatsApp
        const phoneNumber = '27723386828';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');

        // Reset form
        form.reset();

        // Show success message
        showNotification('Quote request sent! We\'ll get back to you soon.', 'success');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

    }, 1000);
}

/**
 * Create WhatsApp message from form data
 * @param {Object} data - Form data object
 * @returns {string} Formatted WhatsApp message
 */
function createWhatsAppMessage(data) {
    const serviceMap = {
        'windows': 'Windows Install (R250-R400)',
        'website': 'Website Development (R400-R700)',
        'software': 'Software Installation (R100-R200)',
        'hardware': 'Hardware Upgrade (R150-R300)',
        'combo': 'Multiple Services'
    };

    const serviceName = serviceMap[data.service] || data.service;

    return `Hi! I'd like to request a quote for:

🔧 Service: ${serviceName}
👤 Name: ${data.name}
📱 Phone: ${data.phone}

📝 Details:
${data.details || 'No additional details provided'}

Please send me a quote when convenient. Thanks!`;
}

/**
 * Show notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        fontSize: '0.9rem',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

/**
 * Initialize service card hover animations
 */
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Add click handler for mobile devices
        card.addEventListener('click', function() {
            // Remove active class from all cards
            serviceCards.forEach(c => c.classList.remove('card-active'));

            // Add active class to clicked card
            this.classList.add('card-active');

            // Remove active class after 3 seconds
            setTimeout(() => {
                this.classList.remove('card-active');
            }, 3000);
        });

        // Add pricing highlight animation
        const priceRange = card.querySelector('.price-range');
        if (priceRange) {
            card.addEventListener('mouseenter', function() {
                priceRange.style.transform = 'scale(1.05)';
                priceRange.style.transition = 'transform 0.2s ease';
            });

            card.addEventListener('mouseleave', function() {
                priceRange.style.transform = 'scale(1)';
            });
        }
    });
}

/**
 * Initialize navbar scroll effect
 */
function initNavbarScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .addon-item, .contact-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Add staggered animation delay
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
}

/**
 * Add custom CSS for scroll animations
 */
function addCustomAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: var(--animation-delay, 0s);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .card-active {
            transform: translateY(-8px) !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-on-scroll,
            .card-active,
            .header {
                transition: none !important;
                animation: none !important;
            }
            
            .floating-icons .icon {
                animation: none !important;
            }
        }
    `;

    document.head.appendChild(style);
}

// Initialize custom animation styles
addCustomAnimationStyles();