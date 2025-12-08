// Enhanced Application Form Logic with Mind-Blowing Animations and Supabase

let currentStepNum = 1;
const totalSteps = 6;
let formData = {};

// Initialize form with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    loadSavedData();
    initializeCleanAnimations();
    
    // Auto-save form data
    const form = document.getElementById('applicationForm');
    form.addEventListener('change', saveFormData);
    form.addEventListener('input', saveFormData);
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Initialize form validation
    initializeFormValidation();
    
    // Enhance progress bar
    enhanceProgressBar();
});

// Clean Animation Initialization
function initializeCleanAnimations() {
    // Add subtle background to form
    const form = document.getElementById('applicationForm');
    if (form) {
        form.classList.add('animated-gradient');
    }
    
    // Add clean hover effects to cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('applicationForm');
    if (!form) return;
    
    // Real-time validation
    form.addEventListener('input', function(e) {
        const input = e.target;
        if (input.hasAttribute('required')) {
            if (input.value.trim()) {
                input.classList.remove('error');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
            }
        }
    });
    
    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('error');
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.classList.remove('error');
                this.setCustomValidity('');
            }
        });
    });
}

// Progress Enhancement
function enhanceProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return;
    
    // Add smooth transitions
    progressFill.style.transition = 'width 0.5s ease-in-out';
    
    // Add completion celebration
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const width = parseFloat(progressFill.style.width);
                if (width === 100) {
                    progressFill.classList.add('success-checkmark');
                    setTimeout(() => {
                        progressFill.classList.remove('success-checkmark');
                    }, 600);
                }
            }
        });
    });
    
    observer.observe(progressFill, { attributes: true });
}

// Enhanced Navigation with Spectacular Transitions
window.nextStep = function() {
    if (validateCurrentStep()) {
        if (currentStepNum < totalSteps) {
            // Add spectacular exit animation
            const currentStep = document.querySelector(`[data-step="${currentStepNum}"]`);
            currentStep.style.animation = 'slideOutLeft 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            
            setTimeout(() => {
                hideStep(currentStepNum);
                currentStepNum++;
                showStep(currentStepNum);
                updateProgressBar();
                saveFormData();
                
                // Add spectacular entrance animation
                const newStep = document.querySelector(`[data-step="${currentStepNum}"]`);
                newStep.style.animation = 'slideInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
                
                // Trigger confetti effect
                triggerConfetti();
            }, 600);
        }
    }
}

window.prevStep = function() {
    if (currentStepNum > 1) {
        const currentStep = document.querySelector(`[data-step="${currentStepNum}"]`);
        currentStep.style.animation = 'slideOutRight 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
        
        setTimeout(() => {
            hideStep(currentStepNum);
            currentStepNum--;
            showStep(currentStepNum);
            updateProgressBar();
            
            const newStep = document.querySelector(`[data-step="${currentStepNum}"]`);
            newStep.style.animation = 'slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }, 600);
    }
}

// Confetti Effect
function triggerConfetti() {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 9999;
            pointer-events: none;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            document.body.removeChild(confetti);
        }, 5000);
    }
}

// Clean Progress Bar
function updateProgressBar() {
    const progress = (currentStepNum / totalSteps) * 100;
    const progressFill = document.getElementById('progressFill');
    const currentStepSpan = document.getElementById('currentStep');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
        progressFill.style.background = `linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)`;
        progressFill.style.transition = 'width 0.5s ease';
        
        // Subtle glow effect
        progressFill.style.boxShadow = `0 0 10px rgba(99, 102, 241, 0.3)`;
    }
    
    if (currentStepSpan) {
        currentStepSpan.textContent = currentStepNum;
        currentStepSpan.style.transition = 'all 0.3s ease';
    }
}

// Enhanced Form Submission with Firebase Integration
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateCurrentStep()) {
        saveFormData();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Submitting Application...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Supabase
            const result = await window.ApplicationService.submitApplication(window.formData);
            
            if (result.success) {
                // Track analytics
                window.AnalyticsService.trackFormSubmission('application');
                
                // Generate proposal
                generateProposal();
                showProposal();
                
                // Success celebration
                showSuccessCelebration();
                
                // Clear saved data
                localStorage.removeItem('applicationData');
                
                // Store application ID for reference
                if (result.data && result.data.id) {
                    localStorage.setItem('applicationId', result.data.id);
                }
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error submitting application. Please try again.');
            submitBtn.innerHTML = 'Submit Application';
            submitBtn.disabled = false;
        }
    }
}

// Simple success celebration
function showSuccessCelebration() {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '✓ Application Submitted!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        submitBtn.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add essential CSS animations
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .form-step {
        transition: all 0.3s ease;
    }
    
    .option-card.error {
        border-color: #ef4444 !important;
        background-color: rgba(239, 68, 68, 0.05) !important;
    }
    
    .form-group input.error,
    .form-group select.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-group input.valid,
    .form-group select.valid {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Rest of the original functions remain the same...
function showStep(stepNum) {
    const step = document.querySelector(`[data-step="${stepNum}"]`);
    if (step) {
        step.classList.add('active');
        step.style.display = 'block';
    }
}

function hideStep(stepNum) {
    const step = document.querySelector(`[data-step="${stepNum}"]`);
    if (step) {
        step.classList.remove('active');
        step.style.display = 'none';
    }
}

function validateCurrentStep() {
    const currentStep = document.querySelector(`[data-step="${currentStepNum}"]`);
    const requiredInputs = currentStep.querySelectorAll('input[required], select[required]');
    const radioGroups = currentStep.querySelectorAll('input[type="radio"]');
    
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    const radioGroupNames = [...new Set([...radioGroups].map(radio => radio.name))];
    radioGroupNames.forEach(groupName => {
        const groupRadios = currentStep.querySelectorAll(`input[name="${groupName}"]`);
        const isGroupChecked = [...groupRadios].some(radio => radio.checked);
        
        if (!isGroupChecked && groupRadios.length > 0) {
            groupRadios.forEach(radio => {
                radio.closest('.option-card').classList.add('error');
            });
            isValid = false;
        } else {
            groupRadios.forEach(radio => {
                radio.closest('.option-card').classList.remove('error');
            });
        }
    });
    
    return isValid;
}

function saveFormData() {
    const form = document.getElementById('applicationForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const checkboxGroups = {};
    
    checkboxes.forEach(checkbox => {
        if (!checkboxGroups[checkbox.name]) {
            checkboxGroups[checkbox.name] = [];
        }
        if (checkbox.checked) {
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });
    
    Object.assign(data, checkboxGroups);
    localStorage.setItem('applicationData', JSON.stringify(data));
    window.formData = data;
}

function loadSavedData() {
    const savedData = localStorage.getItem('applicationData');
    if (savedData) {
        const data = JSON.parse(savedData);
        window.formData = data;
        
        Object.keys(data).forEach(key => {
            const elements = document.querySelectorAll(`[name="${key}"]`);
            
            elements.forEach(element => {
                if (element.type === 'radio') {
                    if (element.value === data[key]) {
                        element.checked = true;
                    }
                } else if (element.type === 'checkbox') {
                    if (Array.isArray(data[key]) && data[key].includes(element.value)) {
                        element.checked = true;
                    }
                } else {
                    element.value = data[key];
                }
            });
        });
    }
}

window.updateBudgetDisplay = function(value) {
    const budgetValue = document.getElementById('budgetValue');
    if (budgetValue) {
        budgetValue.textContent = new Intl.NumberFormat('en-IN').format(value);
    }
}

function generateProposal() {
    const data = window.formData;
    
    let recommendedPlan = 'Starter';
    let price = 25000;
    let timeline = '5-7 days';
    
    if (data.pageCount === '4-8' || data.projectType === 'marketing') {
        recommendedPlan = 'Growth';
        price = 45000;
        timeline = '10-14 days';
    }
    
    if (data.pageCount === '9-15' || data.pageCount === '16+' || 
        data.projectType === 'ecommerce' || data.projectType === 'webapp') {
        recommendedPlan = 'Pro';
        price = 85000;
        timeline = '3-4 weeks';
    }
    
    if (data.timeline === 'asap') {
        price *= 1.5;
        timeline = 'Rush delivery';
    }
    
    const proposalDetails = `
        <div class="detail-item">
            <strong>Project Type:</strong> ${formatProjectType(data.projectType)}
        </div>
        <div class="detail-item">
            <strong>Primary Goal:</strong> ${formatGoal(data.primaryGoal)}
        </div>
        <div class="detail-item">
            <strong>Pages:</strong> ${data.pageCount || 'To be determined'}
        </div>
        <div class="detail-item">
            <strong>Features:</strong> ${formatFeatures(data.features)}
        </div>
        <div class="detail-item">
            <strong>Timeline:</strong> ${data.timeline || 'Flexible'}
        </div>
    `;
    
    document.getElementById('proposalDetails').innerHTML = proposalDetails;
    document.getElementById('recommendedPlan').textContent = recommendedPlan;
    document.getElementById('recommendedPrice').textContent = `₹${new Intl.NumberFormat('en-IN').format(price)}`;
    document.getElementById('recommendedTimeline').textContent = timeline;
}

function showProposal() {
    document.querySelectorAll('.form-step').forEach(step => {
        step.style.display = 'none';
    });
    
    document.getElementById('proposalPreview').style.display = 'block';
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('currentStep').textContent = 'Complete';
}

function formatProjectType(type) {
    const types = {
        'landing': 'Landing Page',
        'marketing': 'Marketing Website',
        'ecommerce': 'E-commerce Store',
        'webapp': 'Web Application',
        'redesign': 'Website Redesign'
    };
    return types[type] || type;
}

function formatGoal(goal) {
    const goals = {
        'leads': 'Generate Leads',
        'sales': 'Drive Sales',
        'awareness': 'Brand Awareness',
        'hiring': 'Talent Acquisition'
    };
    return goals[goal] || goal;
}

function formatFeatures(features) {
    if (!features || features.length === 0) {
        return 'Basic features';
    }
    
    if (Array.isArray(features)) {
        return features.join(', ');
    }
    
    return features;
}

window.proceedToCheckout = function() {
    window.location.href = 'checkout.html';
}