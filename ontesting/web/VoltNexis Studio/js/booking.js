// Supabase configuration
const SUPABASE_URL = 'https://acbevxgpjwysxfzrdonp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjYmV2eGdwand5c3hmenJkb25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjY3NDcsImV4cCI6MjA3NTg0Mjc0N30.K3vUDomYNcinBVCZCbeX01IzGcmkNxW2RxRZzXBrvWA';

// Simple Supabase client
class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }
    
    async insert(table, data) {
        const response = await fetch(`${this.url}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': this.key,
                'Authorization': `Bearer ${this.key}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response;
    }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Booking wizard functionality
class BookingWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 7;
        this.selections = {
            types: [], // Changed to array for multiple selections
            tier: -1, // -1 means no selection
            style: '',
            features: [],
            speed: 1.0,
            allPrices: {} // Store prices for each type
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevStep());
        
        // Step 1: Project type selection
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => this.selectProjectType(card));
        });
        
        // Step 2: Size selection
        document.querySelectorAll('.size-card').forEach(card => {
            card.addEventListener('click', () => this.selectSize(card));
        });
        
        // Step 3: Design selection
        document.querySelectorAll('.design-card').forEach(card => {
            card.addEventListener('click', () => this.selectDesign(card));
        });
        
        // Step 4: Features selection
        document.querySelectorAll('.feature-option').forEach(option => {
            option.addEventListener('click', () => this.toggleFeature(option));
        });
        
        // Step 5: Deadline selection
        document.querySelectorAll('.deadline-card').forEach(card => {
            card.addEventListener('click', () => this.selectDeadline(card));
        });
        
        // Final actions
        document.getElementById('proceedBtn').addEventListener('click', () => this.proceedToPayment());
        document.getElementById('chatBtn').addEventListener('click', () => this.chatWithUs());
        
        // Contact form toggle and validation
        document.addEventListener('change', (e) => {
            if (e.target.id === 'addPhone') {
                const phoneSection = document.getElementById('phoneSection');
                phoneSection.style.display = e.target.checked ? 'block' : 'none';
            }
        });
        

    }
    
    selectProjectType(card) {
        const type = card.dataset.type;
        
        // Toggle selection
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.selections.types = this.selections.types.filter(t => t.type !== type);
            delete this.selections.allPrices[type];
        } else {
            card.classList.add('selected');
            if (card.dataset.price) {
                const prices = card.dataset.price.split(',').map(p => parseInt(p));
                this.selections.types.push({ type, prices });
                this.selections.allPrices[type] = prices;
            }
        }
        
        this.updateCurrentTotal();
        
        // Enable next button if at least one type is selected
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = this.selections.types.length === 0;
    }
    
    selectSize(card) {
        // Allow deselection
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            this.selections.tier = -1;
            const nextBtn = document.getElementById('nextBtn');
            if (nextBtn) nextBtn.disabled = true;
        } else {
            document.querySelectorAll('.size-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            this.selections.tier = parseInt(card.dataset.tier);
            const nextBtn = document.getElementById('nextBtn');
            if (nextBtn) nextBtn.disabled = false;
        }
        
        this.updatePricing();
        this.updateCurrentTotal();
    }
    
    selectDesign(card) {
        document.querySelectorAll('.design-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        this.selections.style = card.dataset.style;
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = false;
    }
    
    toggleFeature(option) {
        const feature = option.dataset.feature;
        const cost = parseInt(option.dataset.cost);
        
        option.classList.toggle('selected');
        
        if (option.classList.contains('selected')) {
            this.selections.features.push({ name: feature, cost: cost });
        } else {
            this.selections.features = this.selections.features.filter(f => f.name !== feature);
        }
        
        this.updateCurrentTotal();
        
        // Features are optional, so always enable next
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = false;
    }
    
    selectDeadline(card) {
        document.querySelectorAll('.deadline-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        this.selections.speed = parseFloat(card.dataset.speed);
        this.updateCurrentTotal();
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = false;
    }
    
    updatePricing() {
        if (this.selections.types.length > 0) {
            const combinedPrices = this.calculateComboPricing();
            
            document.getElementById('basicPrice').textContent = `₹${combinedPrices[0].toLocaleString()}`;
            document.getElementById('mediumPrice').textContent = `₹${combinedPrices[1].toLocaleString()}`;
            document.getElementById('proPrice').textContent = `₹${combinedPrices[2].toLocaleString()}`;
            document.getElementById('advancedPrice').textContent = `₹${combinedPrices[3].toLocaleString()}`;
        }
    }
    
    calculateComboPricing() {
        if (this.selections.types.length === 1) {
            return this.selections.types[0].prices;
        }
        
        // Exact combo pricing from pricing.txt
        const comboPricing = {
            // Single services
            'app': [2999, 6999, 11999, 17999],
            'database': [1499, 3499, 5499, 8499],
            'seo': [999, 2499, 4499, 7499],
            'website': [1999, 4999, 8999, 13999],
            // 2 Services
            'app+website': [5998, 8998, 16198, 24798],
            'database+website': [2898, 7098, 12298, 19098],
            'seo+website': [2598, 6498, 11698, 18498],
            'app+database': [3898, 9098, 15298, 23098],
            'app+seo': [3598, 8498, 14698, 22498],
            'database+seo': [2098, 4998, 8198, 12998],
            // 3 Services
            'app+database+website': [6897, 11097, 19497, 29897],
            'app+seo+website': [6597, 9997, 18897, 29297],
            'database+seo+website': [3497, 8597, 14997, 23597],
            'app+database+seo': [4497, 10597, 17997, 27597],
            // 4 Services
            'app+database+seo+website': [7496, 12596, 22196, 34396]
        };
        
        // Create sorted key from selected types
        const sortedTypes = this.selections.types.map(t => t.type).sort();
        const comboKey = sortedTypes.join('+');
        
        const result = comboPricing[comboKey];
        if (!result) {
            console.warn('No pricing found for combo:', comboKey, 'Available keys:', Object.keys(comboPricing));
            return [0, 0, 0, 0];
        }
        return result;
    }
    
    loadDynamicFeatures() {
        const container = document.getElementById('featuresContainer');
        container.innerHTML = '';
        
        const allFeatures = new Map();
        
        // Website features
        if (this.selections.types.some(t => t.type === 'website')) {
            allFeatures.set('contact', { name: 'Contact Form / Booking', desc: 'Custom contact or booking form', cost: 499 });
            allFeatures.set('auth', { name: 'Authentication / Login', desc: 'User registration & login', cost: 1499 });
            allFeatures.set('dashboard', { name: 'Admin Dashboard', desc: 'Content management dashboard', cost: 2499 });
            allFeatures.set('payment', { name: 'Payment Integration', desc: 'Razorpay / Stripe setup', cost: 1499 });
            allFeatures.set('api', { name: 'API Integration', desc: 'Connect 3rd-party APIs', cost: 999 });
            allFeatures.set('hosting', { name: 'Hosting / Deployment', desc: 'Setup and domain connection', cost: 799 });
        }
        
        // App features
        if (this.selections.types.some(t => t.type === 'app')) {
            allFeatures.set('auth', { name: 'Authentication / Login', desc: 'User registration & login', cost: 1499 });
            allFeatures.set('dashboard', { name: 'Admin Dashboard', desc: 'App content management', cost: 2499 });
            allFeatures.set('payment', { name: 'Payment Integration', desc: 'Razorpay / Stripe setup', cost: 1499 });
            allFeatures.set('api', { name: 'API Integration', desc: 'Connect 3rd-party APIs', cost: 999 });
            allFeatures.set('push', { name: 'Push Notifications', desc: 'Notify users with messages', cost: 799 });
            allFeatures.set('hosting', { name: 'Hosting / Deployment', desc: 'App deployment to stores', cost: 999 });
        }
        
        // Database features
        if (this.selections.types.some(t => t.type === 'database')) {
            allFeatures.set('auth', { name: 'Authentication / Login', desc: 'Auth system integrated with DB', cost: 1499 });
            allFeatures.set('dashboard', { name: 'Admin Dashboard', desc: 'CRUD dashboard for DB', cost: 2499 });
            allFeatures.set('api', { name: 'API Integration', desc: 'Connect to apps or services', cost: 999 });
            allFeatures.set('backup', { name: 'Backups / Maintenance', desc: 'Auto backups and monitoring', cost: 799 });
            allFeatures.set('hosting', { name: 'Hosting / Deployment', desc: 'Deploy DB to server / Supabase', cost: 799 });
            allFeatures.set('security', { name: 'Security Setup', desc: 'Roles & permissions', cost: 699 });
        }
        
        // SEO features
        if (this.selections.types.some(t => t.type === 'seo')) {
            allFeatures.set('onpage', { name: 'On-page SEO', desc: 'Meta tags, headings, sitemaps', cost: 699 });
            allFeatures.set('keywords', { name: 'Keywords Research', desc: 'Suggest best search terms', cost: 499 });
            allFeatures.set('bing', { name: 'Bing SEO', desc: 'Additional optimization for Bing', cost: 499 });
            allFeatures.set('analytics', { name: 'Google Analytics Setup', desc: 'Tracking visitors & events', cost: 499 });
            allFeatures.set('report', { name: 'SEO Report', desc: 'Full SEO analysis PDF', cost: 599 });
            allFeatures.set('content', { name: 'Content Optimization', desc: 'Improve page copy / images', cost: 499 });
        }
        
        // Create feature elements with show more functionality
        const featuresArray = Array.from(allFeatures.entries());
        const showLimit = this.selections.types.length > 1 ? 4 : featuresArray.length;
        
        featuresArray.forEach(([ key, feature], index) => {
            const featureEl = document.createElement('div');
            featureEl.className = 'feature-option';
            featureEl.dataset.feature = key;
            featureEl.dataset.cost = feature.cost;
            
            if (index >= showLimit) {
                featureEl.style.display = 'none';
                featureEl.classList.add('hidden-feature');
            }
            
            featureEl.innerHTML = `
                <div class="feature-checkbox">
                    <i class="fas fa-check"></i>
                </div>
                <div class="feature-info">
                    <h3>${feature.name}</h3>
                    <p>${feature.desc}</p>
                    <span class="feature-cost">+₹${feature.cost.toLocaleString()}</span>
                </div>
            `;
            
            featureEl.addEventListener('click', () => this.toggleFeature(featureEl));
            container.appendChild(featureEl);
        });
        
        // Add show more button if multiple services selected
        if (this.selections.types.length > 1 && featuresArray.length > showLimit) {
            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'show-more-btn';
            showMoreBtn.textContent = `Show ${featuresArray.length - showLimit} More Features`;
            showMoreBtn.addEventListener('click', () => {
                document.querySelectorAll('.hidden-feature').forEach(el => {
                    el.style.display = 'block';
                });
                showMoreBtn.style.display = 'none';
            });
            container.appendChild(showMoreBtn);
        }
    }
    
    nextStep() {
        // Validate step 6 before proceeding
        if (this.currentStep === 6) {
            const nameField = document.getElementById('clientName');
            const emailField = document.getElementById('clientEmail');
            
            console.log('Step 6 validation:', nameField, emailField);
            
            const name = nameField?.value?.trim() || '';
            const email = emailField?.value?.trim() || '';
            
            console.log('Name:', name, 'Email:', email);
            
            if (!name || !email) {
                this.showCustomAlert('Please fill in all required fields (Name and Email)');
                return;
            }
            
            if (!this.isValidEmail(email)) {
                this.showCustomAlert('Please enter a valid email address');
                return;
            }
        }
        
        if (this.currentStep < this.totalSteps) {
            // Hide current step
            document.getElementById(`step${this.currentStep}`).classList.remove('active');
            
            this.currentStep++;
            
            // Show next step
            document.getElementById(`step${this.currentStep}`).classList.add('active');
            
            // Update navigation
            this.updateNavigation();
            this.updateProgress();
            
            // Update summary if on last step
            if (this.currentStep === 7) {
                this.updateSummary();
            }
            
            // Update pricing when moving to step 2
            if (this.currentStep === 2) {
                this.updatePricing();
            }
            
            // Load dynamic features when moving to step 4
            if (this.currentStep === 4) {
                this.loadDynamicFeatures();
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            document.getElementById(`step${this.currentStep}`).classList.remove('active');
            
            this.currentStep--;
            
            document.getElementById(`step${this.currentStep}`).classList.add('active');
            
            this.updateNavigation();
            this.updateProgress();
        }
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Show/hide previous button
        prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        
        // Show/hide next button on last step
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
            // Don't disable by default for step 6 (contact form)
            if (this.currentStep !== 6) {
                nextBtn.disabled = true; // Will be enabled when selection is made
            } else {
                nextBtn.disabled = false; // Always enabled for contact form
            }
        }
    }
    
    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        
        // Update step indicators
        document.querySelectorAll('.step').forEach((step, index) => {
            if (index < this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    updateSummary() {
        // Update summary details
        document.getElementById('summaryType').textContent = this.getTypeDisplay();
        document.getElementById('summarySize').textContent = this.getSizeDisplay();
        document.getElementById('summaryStyle').textContent = this.getStyleDisplay();
        document.getElementById('summaryFeatures').textContent = this.getFeaturesDisplay();
        document.getElementById('summaryDelivery').textContent = this.getDeliveryDisplay();
        
        // Calculate pricing
        let basePrice = 0;
        if (this.selections.tier >= 0) {
            const comboPrices = this.calculateComboPricing();
            basePrice = comboPrices[this.selections.tier];
        }
        
        const addonsPrice = this.selections.features.reduce((sum, feature) => sum + feature.cost, 0);
        const subtotal = basePrice + addonsPrice;
        const total = Math.round(subtotal * this.selections.speed);
        
        document.getElementById('basePrice').textContent = `₹${basePrice.toLocaleString()}`;
        document.getElementById('addonsPrice').textContent = `₹${addonsPrice.toLocaleString()}`;
        document.getElementById('speedMultiplier').textContent = `×${this.selections.speed}`;
        document.getElementById('totalPrice').textContent = `₹${total.toLocaleString()}`;
    }
    
    getTypeDisplay() {
        const types = {
            website: 'Website',
            app: 'Mobile App',
            database: 'Database + Backend',
            seo: 'SEO Optimization'
        };
        
        if (this.selections.types.length === 0) return 'Not selected';
        if (this.selections.types.length === 1) return types[this.selections.types[0].type];
        return this.selections.types.map(t => types[t.type]).join(' + ');
    }
    
    getSizeDisplay() {
        const sizes = ['Basic', 'Medium', 'Pro', 'Advanced'];
        return this.selections.tier >= 0 ? sizes[this.selections.tier] : 'Not selected';
    }
    
    getStyleDisplay() {
        const styles = {
            minimal: 'Minimal & Clean',
            modern: 'Aesthetic & Modern',
            premium: 'Premium / Brand-focused',
            playful: 'Cute / Playful'
        };
        return styles[this.selections.style] || 'Not selected';
    }
    
    getFeaturesDisplay() {
        if (this.selections.features.length === 0) return 'None selected';
        
        const featureNames = {
            contact: 'Contact Form',
            auth: 'Authentication',
            dashboard: 'Admin Dashboard',
            payment: 'Payment Integration',
            api: 'API Integration',
            hosting: 'Hosting Setup'
        };
        
        return this.selections.features
            .map(f => featureNames[f.name])
            .join(', ');
    }
    
    getDeliveryDisplay() {
        const speeds = {
            1.0: 'Normal (3-7 days)',
            1.3: 'Fast (2-3 days)',
            1.6: 'Express (24 hrs)'
        };
        return speeds[this.selections.speed] || 'Not selected';
    }
    
    async proceedToPayment() {
        try {
            // Collect all booking data
            const bookingData = {
                project_types: this.selections.types.map(t => t.type).join(','),
                project_tier: ['Basic', 'Medium', 'Pro', 'Advanced'][this.selections.tier],
                design_style: this.selections.style,
                features: this.selections.features.map(f => f.name).join(','),
                delivery_speed: this.selections.speed,
                client_name: document.getElementById('clientName')?.value || '',
                client_email: document.getElementById('clientEmail')?.value || '',
                client_company: document.getElementById('clientCompany')?.value || '',
                client_phone: document.getElementById('clientPhone')?.value || '',
                phone_apps: Array.from(document.querySelectorAll('input[name="phoneApps"]:checked')).map(cb => cb.value).join(','),
                project_notes: document.getElementById('projectNotes')?.value || '',
                base_price: this.calculateComboPricing()[this.selections.tier],
                addons_price: this.selections.features.reduce((sum, f) => sum + f.cost, 0),
                total_price: Math.round((this.calculateComboPricing()[this.selections.tier] + this.selections.features.reduce((sum, f) => sum + f.cost, 0)) * this.selections.speed),
                status: 'pending',
                created_at: new Date().toISOString()
            };
            
            // Save to Supabase
            await supabase.insert('project_bookings', bookingData);
            
            // Store data in localStorage for now
            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            
            // Redirect to confirmation page
            window.location.href = 'booking_confirmed.html';
            
        } catch (error) {
            console.error('Error saving booking:', error);
            this.showCustomAlert('There was an error processing your booking. Please try again.');
        }
    }
    
    updateCurrentTotal() {
        let total = 0;
        
        if (this.selections.tier >= 0) {
            const comboPrices = this.calculateComboPricing();
            total = comboPrices[this.selections.tier];
        }
        
        const addonsPrice = this.selections.features.reduce((sum, feature) => sum + feature.cost, 0);
        total += addonsPrice;
        
        if (this.selections.speed > 1.0) {
            total = Math.round(total * this.selections.speed);
        }
        
        // Update all current total displays
        const totalElements = document.querySelectorAll('[id^="currentTotal"]');
        totalElements.forEach(el => {
            el.textContent = `₹${total.toLocaleString()}`;
        });
    }
    
    showCustomAlert(message) {
        // Remove existing alert if any
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create custom alert
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
        
        // Close button functionality
        alert.querySelector('.alert-close').addEventListener('click', () => {
            alert.remove();
        });
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    chatWithUs() {
        // Redirect to contact page with pre-filled information
        const projectDetails = `Project Type: ${this.getTypeDisplay()}\nSize: ${this.getSizeDisplay()}\nStyle: ${this.getStyleDisplay()}\nFeatures: ${this.getFeaturesDisplay()}\nDelivery: ${this.getDeliveryDisplay()}`;
        
        // Store in localStorage to pre-fill contact form
        localStorage.setItem('projectDetails', projectDetails);
        
        window.location.href = 'contact.html';
    }
}

// Initialize booking wizard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BookingWizard();
});

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards on hover
    document.querySelectorAll('.option-card, .size-card, .design-card, .deadline-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});