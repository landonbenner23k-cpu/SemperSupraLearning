// ==================== FORM HANDLING ====================

// Scheduling Form Handler
const schedulingForm = document.getElementById('schedulingForm');
if (schedulingForm) {
    schedulingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            gradeLevel: document.getElementById('gradeLevel').value,
            subject: document.getElementById('subject').value,
            preferredDate: document.getElementById('preferredDate').value,
            preferredTime: document.getElementById('preferredTime').value,
            sessionType: document.getElementById('sessionType').value,
            difficulties: document.getElementById('difficulties').value,
            parentName: document.getElementById('parentName').value,
            parentEmail: document.getElementById('parentEmail').value,
        };

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.phone || 
            !formData.gradeLevel || !formData.subject || 
            !formData.preferredDate || !formData.preferredTime || 
            !formData.sessionType) {
            showFormMessage('Please fill in all required fields.', 'error', 'formMessage');
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error', 'formMessage');
            return;
        }

        // Validate phone format (basic)
        const phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (!phonePattern.test(formData.phone)) {
            showFormMessage('Please enter a valid phone number.', 'error', 'formMessage');
            return;
        }

        // Store data (in a real application, this would be sent to a server)
        storeFormData('scheduling', formData);
        
        // Show success message
        showFormMessage(
            'Thank you for scheduling! We will contact you within 24 hours to confirm your session.',
            'success',
            'formMessage'
        );

        // Reset form
        schedulingForm.reset();

        // Scroll to message
        document.getElementById('formMessage').scrollIntoView({ behavior: 'smooth' });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value,
        };

        // Validate required fields
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error', 'contactFormMessage');
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error', 'contactFormMessage');
            return;
        }

        // Store data (in a real application, this would be sent to a server)
        storeFormData('contact', formData);
        
        // Show success message
        showFormMessage(
            'Thank you for your message! We will get back to you as soon as possible.',
            'success',
            'contactFormMessage'
        );

        // Reset form
        contactForm.reset();

        // Scroll to message
        document.getElementById('contactFormMessage').scrollIntoView({ behavior: 'smooth' });
    });
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Display form messages
 */
function showFormMessage(message, type, elementId) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = 'block';

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

/**
 * Store form data in localStorage
 * In a real application, this would send data to a backend server
 */
function storeFormData(formType, formData) {
    // Get existing data or create empty array
    const storageKey = `${formType}_submissions`;
    let submissions = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Add timestamp and new submission
    const submission = {
        ...formData,
        submittedAt: new Date().toISOString(),
    };
    submissions.push(submission);

    // Store updated array
    localStorage.setItem(storageKey, JSON.stringify(submissions));

    console.log(`${formType} form submitted:`, submission);
}

/**
 * Get stored form submissions (for admin purposes)
 */
function getSubmissions(formType) {
    const storageKey = `${formType}_submissions`;
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

// ==================== NAVIGATION HIGHLIGHTING ====================

/**
 * Update active nav link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ==================== SMOOTH SCROLLING ====================

/**
 * Smooth scroll to anchors
 */
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ==================== DATE VALIDATION ====================

/**
 * Set minimum date to today for date inputs
 */
function setMinimumDate() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

document.addEventListener('DOMContentLoaded', setMinimumDate);

// ==================== FORM VALIDATION ====================

/**
 * Real-time email validation
 */
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Real-time phone validation
 */
function validatePhone(phone) {
    const pattern = /^[\d\s\-\+\(\)]+$/;
    return pattern.test(phone);
}

// Add real-time validation to contact form
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e5e7eb';
        }
    });
});

// ==================== ANALYTICS ====================

/**
 * Track page views (optional - can be expanded for actual analytics)
 */
function trackPageView() {
    const page = window.location.pathname;
    console.log(`Page view: ${page}`);
    
    // Store page view in localStorage for analytics
    const pageViews = JSON.parse(localStorage.getItem('pageViews')) || [];
    pageViews.push({
        page: page,
        timestamp: new Date().toISOString(),
    });
    
    // Keep only last 100 page views
    if (pageViews.length > 100) {
        pageViews.shift();
    }
    
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
}

document.addEventListener('DOMContentLoaded', trackPageView);

// ==================== ACCESSIBILITY ====================

/**
 * Improve keyboard navigation
 */
document.addEventListener('keydown', function(e) {
    // Close modals or popups with Escape key
    if (e.key === 'Escape') {
        const messages = document.querySelectorAll('.form-message');
        messages.forEach(msg => {
            if (msg.style.display !== 'none') {
                msg.style.display = 'none';
            }
        });
    }

    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ==================== MOBILE MENU TOGGLE ====================

/**
 * Mobile menu toggle (if needed for responsive design)
 */
function initMobileMenu() {
    // Check if mobile menu button exists
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initMobileMenu);

console.log('LatinoLearning website initialized successfully!');