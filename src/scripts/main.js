document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initFormHandling();
    initServiceCardAnimations();
    initNavbarScrollEffect();
    initScrollAnimations();
    initEnhancedFormInteractions();
    initCustomValidation();

// Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
});

/**
 * Initialize custom form validation
 */
function initCustomValidation() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    // Disable browser default validation
    form.setAttribute('novalidate', 'true');

    // Add real-time validation listeners
    const nameInput = document.getElementById('name');
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const urgencyRadios = document.querySelectorAll('input[name="urgency"]');

    if (nameInput) {
        nameInput.addEventListener('blur', () => validateField(nameInput));
        nameInput.addEventListener('input', () => clearFieldError(nameInput));
    }

    serviceRadios.forEach(radio => {
        radio.addEventListener('change', () => clearFieldsetError('service'));
    });

    urgencyRadios.forEach(radio => {
        radio.addEventListener('change', () => clearFieldsetError('urgency'));
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();

    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Additional validation for name field
    if (field.name === 'name' && value.length < 2) {
        showFieldError(field, 'Please enter at least 2 characters');
        return false;
    }

    clearFieldError(field);
    return true;
}

/**
 * Validate radio button groups
 */
function validateFieldset(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    const isSelected = Array.from(radios).some(radio => radio.checked);

    if (!isSelected) {
        showFieldsetError(name, 'Please select an option');
        return false;
    }

    clearFieldsetError(name);
    return true;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    // Remove existing error
    clearFieldError(field);

    // Add error class to field
    field.classList.add('field-error');

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Insert error message after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);

    // Add gentle shake animation
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

/**
 * Show fieldset error (for radio groups)
 */
function showFieldsetError(fieldsetName, message) {
    // Remove existing error
    clearFieldsetError(fieldsetName);

    // Find the fieldset container
    const firstRadio = document.querySelector(`input[name="${fieldsetName}"]`);
    if (!firstRadio) return;

    const fieldset = firstRadio.closest('.form-section');
    if (!fieldset) return;

    // Add error class
    fieldset.classList.add('fieldset-error');

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fieldset-error-message';
    errorDiv.textContent = message;

    // Insert after the options container
    const optionsContainer = fieldset.querySelector('.service-selection-grid, .urgency-options');
    if (optionsContainer) {
        optionsContainer.parentNode.insertBefore(errorDiv, optionsContainer.nextSibling);
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.classList.remove('field-error');
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

/**
 * Clear fieldset error
 */
function clearFieldsetError(fieldsetName) {
    const firstRadio = document.querySelector(`input[name="${fieldsetName}"]`);
    if (!firstRadio) return;

    const fieldset = firstRadio.closest('.form-section');
    if (!fieldset) return;

    fieldset.classList.remove('fieldset-error');
    const errorMsg = fieldset.querySelector('.fieldset-error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

/**
 * Validate entire form
 */
function validateForm(_form) {
    let isValid = true;

    // Validate name field
    const nameInput = document.getElementById('name');
    if (nameInput && !validateField(nameInput)) {
        isValid = false;
    }

    // Validate service selection
    if (!validateFieldset('service')) {
        isValid = false;
    }

    // Validate urgency selection
    if (!validateFieldset('urgency')) {
        isValid = false;
    }

    return isValid;
}

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

            // Custom validation
            if (!validateForm(this)) {
                // Scroll to first error
                const firstError = this.querySelector('.field-error, .fieldset-error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
                return;
            }

            handleEnhancedQuoteSubmission(this);
        });
    }
}

/**
 * Initialize enhanced form interactions
 */
function initEnhancedFormInteractions() {
    // Handle service selection
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove selected class from all options
            document.querySelectorAll('.service-option').forEach(option => {
                option.classList.remove('selected');
            });
            // Add selected class to current option
            this.closest('.service-option').classList.add('selected');
        });
    });

    // Handle urgency selection
    const urgencyRadios = document.querySelectorAll('input[name="urgency"]');
    urgencyRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove selected class from all options
            document.querySelectorAll('.urgency-option').forEach(option => {
                option.classList.remove('selected');
            });
            // Add selected class to current option
            this.closest('.urgency-option').classList.add('selected');
        });
    });

    // Character counter for textarea
    const textarea = document.getElementById('projectDetails');
    const charCount = document.getElementById('charCount');

    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // Add click handlers for better mobile experience
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });
    });

    document.querySelectorAll('.urgency-option').forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });
    });
}

/**
 * Handle enhanced quote form submission
 * @param {HTMLFormElement} form - The form element
 */
function handleEnhancedQuoteSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span> <span>⏳</span>';
    submitBtn.disabled = true;

    // Simulate form submission delay
    setTimeout(() => {
        // Get form data
        const data = {
            service: formData.get('service'),
            name: formData.get('name'),
            details: formData.get('details') || '',
            urgency: formData.get('urgency')
        };

        // Create enhanced WhatsApp message
        const whatsappMessage = createEnhancedWhatsAppMessage(data);

        // Open WhatsApp
        const phoneNumber = '27723386828';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');

        // Show success state
        submitBtn.innerHTML = '<span>Quote Sent!</span> <span>✅</span>';

        // Show success notification
        showNotification('Quote request sent! Check WhatsApp to continue the conversation.', 'success');

        // Reset form after delay
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;

            // Reset visual states
            document.querySelectorAll('.service-option').forEach(option => {
                option.classList.remove('selected');
            });
            document.querySelectorAll('.urgency-option').forEach(option => {
                option.classList.remove('selected');
            });

            // Set default urgency selection
            const defaultUrgency = document.querySelector('input[name="urgency"][value="week"]');
            if (defaultUrgency) {
                defaultUrgency.checked = true;
                defaultUrgency.closest('.urgency-option').classList.add('selected');
            }

            // Reset character counter
            const charCount = document.getElementById('charCount');
            if (charCount) {
                charCount.textContent = '0';
            }

            // Clear any remaining errors
            form.querySelectorAll('.field-error').forEach(field => {
                clearFieldError(field);
            });
            form.querySelectorAll('.fieldset-error').forEach(fieldset => {
                fieldset.classList.remove('fieldset-error');
            });
            form.querySelectorAll('.error-message').forEach(msg => {
                msg.remove();
            });

        }, 3000);

    }, 1000);
}

/**
 * Create enhanced WhatsApp message from form data
 * @param {Object} data - Form data object
 * @returns {string} Formatted WhatsApp message
 */
function createEnhancedWhatsAppMessage(data) {
    const serviceMap = {
        'windows': 'Windows Install (R250-R400)',
        'website': 'Website Development (R400-R700)',
        'software': 'Software Installation (R100-R200)',
        'hardware': 'Hardware Upgrade (R150-R300)',
        'combo': 'Multiple Services (Custom Quote)'
    };

    const urgencyMap = {
        'asap': 'ASAP (within 1-2 days)',
        'week': 'This week',
        'flexible': 'I\'m flexible with timing'
    };

    const serviceName = serviceMap[data.service] || data.service;
    const urgencyText = urgencyMap[data.urgency] || data.urgency;

    // Create message without emojis to avoid encoding issues
    let message = `Hi! I'd like to request a quote from your IT services website\n\n`;
    message += `Name: ${data.name}\n`;
    message += `Service: ${serviceName}\n`;
    message += `Timeline: ${urgencyText}\n\n`;

    if (data.details) {
        message += `Additional Details:\n${data.details}\n\n`;
    }

    message += `Could you please send me a quote? Thanks!`;

    return message;
}

/**
 * Show notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

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
        maxWidth: '300px',
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
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

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