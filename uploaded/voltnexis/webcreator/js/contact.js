// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call (replace with actual endpoint)
        await simulateFormSubmission(data);
        
        // Show success message
        showToast('Message sent successfully! We\'ll respond within 2 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Track conversion
        trackContactFormSubmission(data);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Failed to send message. Please try again or contact us directly.', 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function validateContactForm(data) {
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field] || !data[field].trim()) {
            const input = document.getElementById(field);
            if (input) {
                input.classList.add('error');
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                }, { once: true });
            }
            isValid = false;
        }
    });
    
    // Validate email format
    if (data.email && !isValidEmail(data.email)) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.classList.add('error');
            emailInput.addEventListener('input', () => {
                emailInput.classList.remove('error');
            }, { once: true });
        }
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Please fill in all required fields correctly.', 'error');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function simulateFormSubmission(data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would be:
    // const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
    // 
    // if (!response.ok) {
    //     throw new Error('Failed to submit form');
    // }
    
    console.log('Contact form submitted:', data);
}

function trackContactFormSubmission(data) {
    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
            'event_category': 'Contact',
            'event_label': data.projectType || 'unknown',
            'value': 1
        });
    }
    
    // Track with other analytics tools
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact');
    }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Auto-populate form from URL parameters
function populateFormFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const fieldsToPopulate = ['projectType', 'budget', 'timeline'];
    
    fieldsToPopulate.forEach(field => {
        const value = urlParams.get(field);
        if (value) {
            const input = document.getElementById(field);
            if (input) {
                input.value = value;
            }
        }
    });
}

// Initialize URL population on page load
document.addEventListener('DOMContentLoaded', populateFormFromURL);