// Main Application Logic
class AreekodeHub {
    constructor() {
        this.currentPage = 1;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.isLoading = false;
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        await this.loadInitialData();
        this.setupRealTimeUpdates();
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
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
            
            // Real-time search suggestions
            searchInput.addEventListener('input', this.debounce(() => {
                if (searchInput.value.length > 2) {
                    this.showSearchSuggestions(searchInput.value);
                }
            }, 300));
        }
        
        // Category filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.currentPage = 1;
                this.loadShops();
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreShops');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadShops(true);
            });
        }
        
        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) navMenu.classList.remove('active');
            });
        });
    }
    
    async loadInitialData() {
        this.showLoading();
        
        try {
            // Load all sections concurrently
            await Promise.all([
                this.loadFeaturedOffers(),
                this.loadShops(),
                this.loadServices(),
                this.loadEvents(),
                this.loadNews()
            ]);
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showError('Failed to load some content. Please refresh the page.');
        } finally {
            this.hideLoading();
        }
    }
    
    async loadFeaturedOffers() {
        try {
            const offers = await db.getFeaturedOffers(6);
            this.renderOffers(offers);
        } catch (error) {
            console.error('Error loading offers:', error);
        }
    }
    
    async loadShops(append = false) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const shopsGrid = document.getElementById('shopsGrid');
        
        if (!append) {
            shopsGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        }
        
        try {
            const offset = (this.currentPage - 1) * CONFIG.app.itemsPerPage;
            const shops = await db.getShops(this.currentCategory, CONFIG.app.itemsPerPage, offset);
            
            if (!append) {
                shopsGrid.innerHTML = '';
            } else {
                // Remove loading spinner if it exists
                const loadingEl = shopsGrid.querySelector('.loading');
                if (loadingEl) loadingEl.remove();
            }
            
            this.renderShops(shops, append);
            
            // Hide load more button if no more items
            const loadMoreBtn = document.getElementById('loadMoreShops');
            if (shops.length < CONFIG.app.itemsPerPage) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
            
        } catch (error) {
            console.error('Error loading shops:', error);
            shopsGrid.innerHTML = '<p class="text-center">Failed to load shops. Please try again.</p>';
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadServices() {
        try {
            const services = await db.getServices('all', 8);
            this.renderServices(services);
        } catch (error) {
            console.error('Error loading services:', error);
        }
    }
    
    async loadEvents() {
        try {
            const events = await db.getEvents(10);
            this.renderEvents(events);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }
    
    async loadNews() {
        try {
            const news = await db.getNews(6);
            this.renderNews(news);
        } catch (error) {
            console.error('Error loading news:', error);
        }
    }
    
    renderOffers(offers) {
        const container = document.getElementById('featuredOffers');
        if (!container) return;
        
        container.innerHTML = offers.map(offer => `
            <div class="offer-card fade-in">
                <div class="offer-badge">Limited Time</div>
                <h4>${offer.title}</h4>
                <p><strong>${offer.shopName}</strong></p>
                <p class="shop-category">${offer.category}</p>
                <p><small>Valid until: ${this.formatDate(offer.validUntil)}</small></p>
            </div>
        `).join('');
    }
    
    renderShops(shops, append = false) {
        const container = document.getElementById('shopsGrid');
        if (!container) return;
        
        const shopsHTML = shops.map(shop => `
            <div class="shop-card fade-in" onclick="window.location.href='shops/shop.html?id=${shop.id}'">
                ${shop.featured ? '<div class="featured-badge">Featured</div>' : ''}
                <div class="shop-image">${shop.image}</div>
                <div class="shop-content">
                    <h4 class="shop-title">${shop.name}</h4>
                    <span class="shop-category">${shop.category}</span>
                    <div class="shop-rating">
                        <span class="stars">${this.generateStars(shop.rating)}</span>
                        <span>${shop.rating} (${shop.reviews} reviews)</span>
                    </div>
                    <p>${shop.description}</p>
                    ${shop.offers && shop.offers.length > 0 ? 
                        `<div class="offer-badge">${shop.offers[0]}</div>` : ''}
                </div>
            </div>
        `).join('');
        
        if (append) {
            container.innerHTML += shopsHTML;
        } else {
            container.innerHTML = shopsHTML;
        }
    }
    
    renderServices(services) {
        const container = document.getElementById('servicesGrid');
        if (!container) return;
        
        container.innerHTML = services.map(service => `
            <div class="service-card fade-in" onclick="window.location.href='services/service.html?id=${service.id}'">
                <div class="service-image">${service.image}</div>
                <div class="service-content">
                    <h4 class="service-title">${service.name}</h4>
                    <span class="service-category">${service.category}</span>
                    <div class="shop-rating">
                        <span class="stars">${this.generateStars(service.rating)}</span>
                        <span>${service.rating} (${service.reviews} reviews)</span>
                    </div>
                    <p>${service.description}</p>
                    ${service.timings ? `<p><small><i class="fas fa-clock"></i> ${service.timings}</small></p>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    renderEvents(events) {
        const container = document.getElementById('eventsContainer');
        if (!container) return;
        
        container.innerHTML = events.map(event => `
            <div class="event-card fade-in">
                <div class="event-date">
                    <div class="day">${new Date(event.date).getDate()}</div>
                    <div class="month">${new Date(event.date).toLocaleDateString('en', {month: 'short'})}</div>
                </div>
                <div class="event-info">
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    ${event.sponsored ? '<span class="offer-badge">Sponsored</span>' : ''}
                </div>
            </div>
        `).join('');
    }
    
    renderNews(news) {
        const container = document.getElementById('newsGrid');
        if (!container) return;
        
        container.innerHTML = news.map(item => `
            <div class="news-card fade-in">
                <div class="news-image">${item.image}</div>
                <div class="news-content">
                    <h4>${item.title}</h4>
                    <p>${item.summary}</p>
                    <small>${this.formatDate(item.date)} • ${item.category}</small>
                </div>
            </div>
        `).join('');
    }
    
    async performSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query.length < 2) {
            this.showError('Please enter at least 2 characters to search');
            return;
        }
        
        this.searchQuery = query;
        this.showLoading();
        
        try {
            const results = await db.search(query);
            this.displaySearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Search failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }
    
    displaySearchResults(results) {
        // Create search results modal or redirect to results page
        const totalResults = results.shops.length + results.services.length + results.events.length;
        
        if (totalResults === 0) {
            this.showError('No results found for your search.');
            return;
        }
        
        // For now, update the shops grid with search results
        this.renderShops(results.shops);
        
        // Scroll to shops section
        document.getElementById('shops').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    setupRealTimeUpdates() {
        // Subscribe to real-time events from Firebase
        db.subscribeToEvents((events) => {
            this.renderEvents(events);
        });
        
        // Refresh data every 5 minutes
        setInterval(() => {
            db.clearCache();
            this.loadFeaturedOffers();
        }, 5 * 60 * 1000);
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
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    showLoading() {
        // Add loading indicator
        document.body.classList.add('loading');
    }
    
    hideLoading() {
        document.body.classList.remove('loading');
    }
    
    showError(message) {
        // Simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AreekodeHub();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}