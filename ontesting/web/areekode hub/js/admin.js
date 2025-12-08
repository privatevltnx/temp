// Admin Panel Logic
class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        
        this.init();
    }
    
    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.setupTabs();
    }
    
    checkAuthStatus() {
        // Check if user is already logged in (localStorage)
        const savedUser = localStorage.getItem('areekode_business_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isLoggedIn = true;
            this.showDashboard();
        }
    }
    
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(loginForm);
            });
        }
        
        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(registerForm);
            });
        }
        
        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProfileUpdate(profileForm);
            });
        }
        
        // Add product form
        const addProductForm = document.getElementById('addProductForm');
        if (addProductForm) {
            addProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddProduct(addProductForm);
            });
        }
        
        // Add offer form
        const addOfferForm = document.getElementById('addOfferForm');
        if (addOfferForm) {
            addOfferForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddOffer(addOfferForm);
            });
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }
    
    setupTabs() {
        const tabBtns = document.querySelectorAll('.dashboard-tabs .tab-btn');
        const tabPanes = document.querySelectorAll('.dashboard-content .tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab pane
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetTab) {
                        pane.classList.add('active');
                        
                        // Load tab-specific data
                        this.loadTabData(targetTab);
                    }
                });
            });
        });
    }
    
    async handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        
        try {
            this.showLoading();
            
            // Simulate API call (replace with actual authentication)
            await this.delay(1000);
            
            // For demo purposes, accept any email/password
            const userData = {
                id: 1,
                email: email,
                businessName: 'Sample Business',
                category: 'bakery',
                phone: '+91 98765 43210',
                address: 'Main Road, Areekode'
            };
            
            this.currentUser = userData;
            this.isLoggedIn = true;
            
            // Save to localStorage
            localStorage.setItem('areekode_business_user', JSON.stringify(userData));
            
            this.showSuccess('Login successful!');
            this.showDashboard();
            
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    async handleRegister(form) {
        const formData = new FormData(form);
        const businessData = {
            name: formData.get('name') || formData.get('businessName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            category: formData.get('category'),
            password: formData.get('password')
        };
        
        try {
            this.showLoading();
            
            // Simulate API call
            await this.delay(1500);
            
            // Create user account (demo)
            const userData = {
                id: Date.now(),
                email: businessData.email,
                businessName: businessData.name,
                category: businessData.category,
                phone: businessData.phone,
                address: 'Areekode, Kerala'
            };
            
            this.currentUser = userData;
            this.isLoggedIn = true;
            
            // Save to localStorage
            localStorage.setItem('areekode_business_user', JSON.stringify(userData));
            
            this.showSuccess('Registration successful! Welcome to Areekode Digital Hub!');
            this.showDashboard();
            
        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Registration failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    showDashboard() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        
        this.loadDashboardData();
    }
    
    showLogin() {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
    }
    
    async loadDashboardData() {
        // Load dashboard statistics
        this.updateDashboardStats();
        
        // Load profile data
        this.loadProfileData();
        
        // Load products and offers
        this.loadTabData('products');
        this.loadTabData('offers');
    }
    
    updateDashboardStats() {
        // Simulate analytics data
        const stats = {
            views: Math.floor(Math.random() * 1000) + 100,
            reviews: Math.floor(Math.random() * 50) + 5,
            contacts: Math.floor(Math.random() * 30) + 2
        };
        
        document.getElementById('viewsCount').textContent = stats.views;
        document.getElementById('reviewsCount').textContent = stats.reviews;
        document.getElementById('contactsCount').textContent = stats.contacts;
    }
    
    loadProfileData() {
        if (!this.currentUser) return;
        
        document.getElementById('shopName').value = this.currentUser.businessName || '';
        document.getElementById('shopCategory').value = this.currentUser.category || '';
        document.getElementById('shopDescription').value = this.currentUser.description || '';
        document.getElementById('shopPhone').value = this.currentUser.phone || '';
        document.getElementById('shopEmail').value = this.currentUser.email || '';
        document.getElementById('shopAddress').value = this.currentUser.address || '';
    }
    
    loadTabData(tabName) {
        switch (tabName) {
            case 'products':
                this.loadProducts();
                break;
            case 'offers':
                this.loadOffers();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
        }
    }
    
    loadProducts() {
        const productsList = document.getElementById('productsList');
        if (!productsList) return;
        
        // Sample products
        const products = [
            { id: 1, name: 'Fresh Bread', price: '₹25', description: 'Daily fresh baked bread' },
            { id: 2, name: 'Chocolate Cake', price: '₹350', description: 'Rich chocolate cake for celebrations' },
            { id: 3, name: 'Cookies Pack', price: '₹80', description: 'Assorted cookies pack' }
        ];
        
        productsList.innerHTML = products.map(product => `
            <div class="product-item">
                <div class="item-info">
                    <h4>${product.name}</h4>
                    <p>${product.description} - ${product.price}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }
    
    loadOffers() {
        const offersList = document.getElementById('offersList');
        if (!offersList) return;
        
        // Sample offers
        const offers = [
            { id: 1, title: '20% Off Birthday Cakes', description: 'Special discount on all birthday cakes', validUntil: '2024-02-29' },
            { id: 2, title: 'Buy 2 Get 1 Free', description: 'On selected bakery items', validUntil: '2024-02-15' }
        ];
        
        offersList.innerHTML = offers.map(offer => `
            <div class="offer-item">
                <div class="item-info">
                    <h4>${offer.title}</h4>
                    <p>${offer.description} (Valid until: ${offer.validUntil})</p>
                </div>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editOffer(${offer.id})">Edit</button>
                    <button class="btn-small btn-delete" onclick="deleteOffer(${offer.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }
    
    loadAnalytics() {
        // Analytics data would be loaded here
        console.log('Loading analytics data...');
    }
    
    async handleProfileUpdate(form) {
        const formData = new FormData(form);
        
        try {
            this.showLoading();
            
            // Update user data
            this.currentUser.businessName = formData.get('shopName') || this.currentUser.businessName;
            this.currentUser.category = formData.get('shopCategory') || this.currentUser.category;
            this.currentUser.description = formData.get('shopDescription') || this.currentUser.description;
            this.currentUser.phone = formData.get('shopPhone') || this.currentUser.phone;
            this.currentUser.email = formData.get('shopEmail') || this.currentUser.email;
            this.currentUser.address = formData.get('shopAddress') || this.currentUser.address;
            
            // Save to localStorage
            localStorage.setItem('areekode_business_user', JSON.stringify(this.currentUser));
            
            // Simulate API call
            await this.delay(1000);
            
            this.showSuccess('Profile updated successfully!');
            
        } catch (error) {
            console.error('Profile update error:', error);
            this.showError('Failed to update profile. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    async handleAddProduct(form) {
        const formData = new FormData(form);
        
        try {
            this.showLoading();
            
            // Simulate API call
            await this.delay(1000);
            
            this.showSuccess('Product added successfully!');
            form.reset();
            closeModal('addProductModal');
            this.loadProducts();
            
        } catch (error) {
            console.error('Add product error:', error);
            this.showError('Failed to add product. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    async handleAddOffer(form) {
        const formData = new FormData(form);
        
        try {
            this.showLoading();
            
            // Simulate API call
            await this.delay(1000);
            
            this.showSuccess('Offer created successfully!');
            form.reset();
            closeModal('addOfferModal');
            this.loadOffers();
            
        } catch (error) {
            console.error('Add offer error:', error);
            this.showError('Failed to create offer. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    handleLogout() {
        localStorage.removeItem('areekode_business_user');
        this.currentUser = null;
        this.isLoggedIn = false;
        this.showLogin();
        this.showSuccess('Logged out successfully!');
    }
    
    // Utility functions
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    showLoading() {
        document.body.classList.add('loading');
    }
    
    hideLoading() {
        document.body.classList.remove('loading');
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Global functions for modal and form interactions
function switchToLogin() {
    // Switch between login and register forms
    console.log('Switching to login form');
}

function showForgotPassword() {
    adminPanel.showNotification('Password reset link will be sent to your email', 'info');
}

function openAddProductModal() {
    document.getElementById('addProductModal').style.display = 'block';
}

function openAddOfferModal() {
    document.getElementById('addOfferModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function editProduct(productId) {
    adminPanel.showNotification('Edit product feature coming soon!', 'info');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        adminPanel.showSuccess('Product deleted successfully!');
        adminPanel.loadProducts();
    }
}

function editOffer(offerId) {
    adminPanel.showNotification('Edit offer feature coming soon!', 'info');
}

function deleteOffer(offerId) {
    if (confirm('Are you sure you want to delete this offer?')) {
        adminPanel.showSuccess('Offer deleted successfully!');
        adminPanel.loadOffers();
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Initialize admin panel
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});