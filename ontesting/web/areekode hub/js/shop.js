// Shop Details Page Logic
class ShopDetailsPage {
    constructor() {
        this.shopId = this.getShopIdFromUrl();
        this.shopData = null;
        this.selectedRating = 0;
        
        this.init();
    }
    
    async init() {
        if (!this.shopId) {
            this.showError('Shop not found');
            return;
        }
        
        await this.loadShopData();
        this.setupEventListeners();
        this.setupTabs();
    }
    
    getShopIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    
    async loadShopData() {
        try {
            // Try to get from database first
            if (db && db.supabaseClient) {
                const { data, error } = await db.supabaseClient
                    .from('shops')
                    .select('*')
                    .eq('id', this.shopId)
                    .single();
                
                if (!error && data) {
                    this.shopData = data;
                    this.renderShopDetails();
                    return;
                }
            }
            
            // Fallback to sample data
            this.shopData = SAMPLE_DATA.shops.find(shop => shop.id == this.shopId);
            
            if (!this.shopData) {
                throw new Error('Shop not found');
            }
            
            this.renderShopDetails();
            
        } catch (error) {
            console.error('Error loading shop data:', error);
            this.showError('Failed to load shop details');
        }
    }
    
    renderShopDetails() {
        if (!this.shopData) return;
        
        // Update page title
        document.title = `${this.shopData.name} - Areekode Digital Hub`;
        
        // Render shop header
        this.renderShopHeader();
        
        // Render tab content
        this.renderAboutTab();
        this.renderProductsTab();
        this.renderGalleryTab();
        this.renderReviewsTab();
        this.renderContactTab();
    }
    
    renderShopHeader() {
        const shopImage = document.getElementById('shopImage');
        const shopName = document.getElementById('shopName');
        const shopCategory = document.getElementById('shopCategory');
        const shopStars = document.getElementById('shopStars');
        const shopRating = document.getElementById('shopRating');
        const shopDescription = document.getElementById('shopDescription');
        
        if (shopImage) shopImage.textContent = this.shopData.image || '🏪';
        if (shopName) shopName.textContent = this.shopData.name;
        if (shopCategory) shopCategory.textContent = this.shopData.category;
        if (shopStars) shopStars.textContent = this.generateStars(this.shopData.rating);
        if (shopRating) shopRating.textContent = `${this.shopData.rating} (${this.shopData.reviews} reviews)`;
        if (shopDescription) shopDescription.textContent = this.shopData.description;
    }
    
    renderAboutTab() {
        const aboutDetails = document.getElementById('aboutDetails');
        const currentOffers = document.getElementById('currentOffers');
        
        if (aboutDetails) {
            aboutDetails.innerHTML = `
                <p>${this.shopData.description}</p>
                <div class="business-hours">
                    <h4><i class="fas fa-clock"></i> Business Hours</h4>
                    <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
                <div class="established">
                    <h4><i class="fas fa-calendar"></i> Established</h4>
                    <p>Serving Areekode community since 2010</p>
                </div>
            `;
        }
        
        if (currentOffers && this.shopData.offers) {
            currentOffers.innerHTML = `
                <h4><i class="fas fa-tags"></i> Current Offers</h4>
                ${this.shopData.offers.map(offer => `
                    <div class="offer-item">
                        <i class="fas fa-gift"></i>
                        <span>${offer}</span>
                    </div>
                `).join('')}
            `;
        }
    }
    
    renderProductsTab() {
        const productsGrid = document.getElementById('productsGrid');
        
        if (!productsGrid) return;
        
        // Sample products for demo
        const sampleProducts = [
            { name: 'Product 1', price: '₹299', image: '📦' },
            { name: 'Product 2', price: '₹499', image: '📦' },
            { name: 'Product 3', price: '₹199', image: '📦' },
            { name: 'Product 4', price: '₹799', image: '📦' }
        ];
        
        productsGrid.innerHTML = sampleProducts.map(product => `
            <div class="product-card">
                <div class="product-image">${product.image}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                </div>
            </div>
        `).join('');
    }
    
    renderGalleryTab() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (!galleryGrid) return;
        
        // Sample gallery items
        const galleryItems = Array.from({length: 8}, (_, i) => ({
            id: i + 1,
            image: '🖼️'
        }));
        
        galleryGrid.innerHTML = galleryItems.map(item => `
            <div class="gallery-item" onclick="openImageModal('${item.image}')">
                ${item.image}
            </div>
        `).join('');
    }
    
    async renderReviewsTab() {
        const reviewsList = document.getElementById('reviewsList');
        
        if (!reviewsList) return;
        
        try {
            // Try to get reviews from database
            let reviews = [];
            
            if (db && db.supabaseClient) {
                const { data, error } = await db.supabaseClient
                    .from('reviews')
                    .select('*')
                    .eq('shop_id', this.shopId)
                    .order('created_at', { ascending: false });
                
                if (!error && data) {
                    reviews = data;
                }
            }
            
            // Fallback to sample reviews
            if (reviews.length === 0) {
                reviews = [
                    {
                        user_name: 'Rajesh Kumar',
                        rating: 5,
                        comment: 'Excellent service and quality products. Highly recommended!',
                        created_at: '2024-01-15'
                    },
                    {
                        user_name: 'Priya Nair',
                        rating: 4,
                        comment: 'Good experience overall. Staff is very helpful.',
                        created_at: '2024-01-10'
                    },
                    {
                        user_name: 'Mohammed Ali',
                        rating: 5,
                        comment: 'Best shop in Areekode. Always fresh products.',
                        created_at: '2024-01-08'
                    }
                ];
            }
            
            reviewsList.innerHTML = reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="reviewer-name">${review.user_name}</span>
                        <span class="review-date">${this.formatDate(review.created_at)}</span>
                    </div>
                    <div class="review-rating">${this.generateStars(review.rating)}</div>
                    <div class="review-text">${review.comment}</div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading reviews:', error);
            reviewsList.innerHTML = '<p>Unable to load reviews at this time.</p>';
        }
    }
    
    renderContactTab() {
        const contactInfo = document.getElementById('contactInfo');
        const modalContactInfo = document.getElementById('modalContactInfo');
        
        if (!this.shopData.contact) return;
        
        const contactHTML = `
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                    <strong>Phone</strong><br>
                    <a href="tel:${this.shopData.contact.phone}">${this.shopData.contact.phone}</a>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                    <strong>Email</strong><br>
                    <a href="mailto:${this.shopData.contact.email}">${this.shopData.contact.email}</a>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <strong>Address</strong><br>
                    ${this.shopData.contact.address}
                </div>
            </div>
        `;
        
        if (contactInfo) contactInfo.innerHTML = contactHTML;
        if (modalContactInfo) modalContactInfo.innerHTML = contactHTML;
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }
        
        // Review form
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleReviewForm(reviewForm);
            });
        }
        
        // Star rating
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                this.selectedRating = parseInt(star.dataset.rating);
                this.updateStarRating();
            });
        });
    }
    
    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
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
                    }
                });
            });
        });
    }
    
    updateStarRating() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < this.selectedRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    async handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically send the message via EmailJS or your backend
            console.log('Contact form data:', data);
            
            this.showSuccess('Message sent successfully! We will get back to you soon.');
            form.reset();
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.showError('Failed to send message. Please try again.');
        }
    }
    
    async handleReviewForm(form) {
        const formData = new FormData(form);
        const reviewData = {
            shopId: this.shopId,
            userName: formData.get('name') || 'Anonymous',
            rating: this.selectedRating,
            comment: formData.get('comment') || ''
        };
        
        if (this.selectedRating === 0) {
            this.showError('Please select a rating');
            return;
        }
        
        try {
            const result = await db.addReview(
                reviewData.shopId,
                reviewData.rating,
                reviewData.comment,
                reviewData.userName
            );
            
            if (result.success) {
                this.showSuccess('Review submitted successfully!');
                form.reset();
                this.selectedRating = 0;
                this.updateStarRating();
                closeModal('reviewModal');
                
                // Refresh reviews
                this.renderReviewsTab();
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Error submitting review:', error);
            this.showError('Failed to submit review. Please try again.');
        }
    }
    
    // Utility functions
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        
        if (hasHalfStar) {
            stars += '☆';
        }
        
        return stars;
    }
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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

// Global functions for modal and other interactions
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openDirections() {
    if (shopDetailsPage && shopDetailsPage.shopData && shopDetailsPage.shopData.contact) {
        const address = encodeURIComponent(shopDetailsPage.shopData.contact.address);
        const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
        window.open(url, '_blank');
    }
}

function shareShop() {
    if (navigator.share) {
        navigator.share({
            title: shopDetailsPage.shopData.name,
            text: shopDetailsPage.shopData.description,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            shopDetailsPage.showSuccess('Link copied to clipboard!');
        });
    }
}

function openImageModal(image) {
    // Simple image modal implementation
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 80%; padding: 20px;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div style="font-size: 10rem;">${image}</div>
        </div>
    `;
    modal.style.display = 'block';
    document.body.appendChild(modal);
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Initialize shop details page
let shopDetailsPage;
document.addEventListener('DOMContentLoaded', () => {
    shopDetailsPage = new ShopDetailsPage();
});