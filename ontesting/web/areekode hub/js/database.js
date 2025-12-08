// Database Integration Layer
class DatabaseManager {
    constructor() {
        this.supabaseClient = null;
        this.firebaseApp = null;
        this.firebaseDb = null;
        this.isOnline = navigator.onLine;
        this.cache = new Map();
        
        // Initialize databases
        this.initSupabase();
        this.initFirebase();
        
        // Setup offline detection
        window.addEventListener('online', () => this.isOnline = true);
        window.addEventListener('offline', () => this.isOnline = false);
    }
    
    // Initialize Supabase for structured data
    async initSupabase() {
        try {
            if (typeof supabase !== 'undefined' && CONFIG.supabase.url) {
                this.supabaseClient = supabase.createClient(
                    CONFIG.supabase.url,
                    CONFIG.supabase.key
                );
                console.log('Supabase initialized');
            }
        } catch (error) {
            console.warn('Supabase initialization failed:', error);
        }
    }
    
    // Initialize Firebase for real-time data
    async initFirebase() {
        try {
            if (typeof firebase !== 'undefined' && CONFIG.firebase.apiKey) {
                this.firebaseApp = firebase.initializeApp(CONFIG.firebase);
                this.firebaseDb = firebase.database();
                console.log('Firebase initialized');
            }
        } catch (error) {
            console.warn('Firebase initialization failed:', error);
        }
    }
    
    // Get shops data
    async getShops(category = 'all', limit = 12, offset = 0) {
        const cacheKey = `shops_${category}_${limit}_${offset}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            if (this.supabaseClient && this.isOnline) {
                let query = this.supabaseClient
                    .from('shops')
                    .select('*')
                    .range(offset, offset + limit - 1)
                    .order('featured', { ascending: false })
                    .order('rating', { ascending: false });
                
                if (category !== 'all') {
                    query = query.eq('category', category);
                }
                
                const { data, error } = await query;
                
                if (error) throw error;
                
                this.cache.set(cacheKey, data);
                return data;
            }
        } catch (error) {
            console.warn('Failed to fetch from Supabase:', error);
        }
        
        // Fallback to sample data
        let shops = SAMPLE_DATA.shops;
        if (category !== 'all') {
            shops = shops.filter(shop => shop.category === category);
        }
        
        const result = shops.slice(offset, offset + limit);
        this.cache.set(cacheKey, result);
        return result;
    }
    
    // Get services data
    async getServices(category = 'all', limit = 12) {
        const cacheKey = `services_${category}_${limit}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            if (this.supabaseClient && this.isOnline) {
                let query = this.supabaseClient
                    .from('services')
                    .select('*')
                    .limit(limit)
                    .order('rating', { ascending: false });
                
                if (category !== 'all') {
                    query = query.eq('category', category);
                }
                
                const { data, error } = await query;
                
                if (error) throw error;
                
                this.cache.set(cacheKey, data);
                return data;
            }
        } catch (error) {
            console.warn('Failed to fetch services from Supabase:', error);
        }
        
        // Fallback to sample data
        let services = SAMPLE_DATA.services;
        if (category !== 'all') {
            services = services.filter(service => service.category === category);
        }
        
        const result = services.slice(0, limit);
        this.cache.set(cacheKey, result);
        return result;
    }
    
    // Get events (real-time from Firebase)
    async getEvents(limit = 10) {
        return new Promise((resolve) => {
            try {
                if (this.firebaseDb && this.isOnline) {
                    this.firebaseDb.ref('events')
                        .orderByChild('date')
                        .limitToFirst(limit)
                        .once('value', (snapshot) => {
                            const events = [];
                            snapshot.forEach((child) => {
                                events.push({ id: child.key, ...child.val() });
                            });
                            resolve(events);
                        });
                } else {
                    resolve(SAMPLE_DATA.events);
                }
            } catch (error) {
                console.warn('Failed to fetch events:', error);
                resolve(SAMPLE_DATA.events);
            }
        });
    }
    
    // Get featured offers
    async getFeaturedOffers(limit = 6) {
        const cacheKey = `offers_${limit}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            if (this.supabaseClient && this.isOnline) {
                const { data, error } = await this.supabaseClient
                    .from('offers')
                    .select(`
                        *,
                        shops (name, category)
                    `)
                    .eq('active', true)
                    .limit(limit)
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                
                this.cache.set(cacheKey, data);
                return data;
            }
        } catch (error) {
            console.warn('Failed to fetch offers:', error);
        }
        
        // Generate sample offers from shops
        const offers = SAMPLE_DATA.shops
            .filter(shop => shop.offers && shop.offers.length > 0)
            .slice(0, limit)
            .map(shop => ({
                id: shop.id,
                title: shop.offers[0],
                shopName: shop.name,
                category: shop.category,
                validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }));
        
        this.cache.set(cacheKey, offers);
        return offers;
    }
    
    // Search functionality
    async search(query, type = 'all') {
        const searchTerm = query.toLowerCase();
        const results = {
            shops: [],
            services: [],
            events: []
        };
        
        if (type === 'all' || type === 'shops') {
            const shops = await this.getShops('all', 50);
            results.shops = shops.filter(shop => 
                shop.name.toLowerCase().includes(searchTerm) ||
                shop.description.toLowerCase().includes(searchTerm) ||
                shop.category.toLowerCase().includes(searchTerm)
            );
        }
        
        if (type === 'all' || type === 'services') {
            const services = await this.getServices('all', 50);
            results.services = services.filter(service => 
                service.name.toLowerCase().includes(searchTerm) ||
                service.description.toLowerCase().includes(searchTerm) ||
                service.category.toLowerCase().includes(searchTerm)
            );
        }
        
        if (type === 'all' || type === 'events') {
            const events = await this.getEvents(50);
            results.events = events.filter(event => 
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm)
            );
        }
        
        return results;
    }
    
    // Add review
    async addReview(shopId, rating, comment, userName) {
        try {
            if (this.supabaseClient && this.isOnline) {
                const { data, error } = await this.supabaseClient
                    .from('reviews')
                    .insert([
                        {
                            shop_id: shopId,
                            rating: rating,
                            comment: comment,
                            user_name: userName,
                            created_at: new Date().toISOString()
                        }
                    ]);
                
                if (error) throw error;
                return { success: true, data };
            }
        } catch (error) {
            console.error('Failed to add review:', error);
            return { success: false, error: error.message };
        }
        
        // Simulate success for demo
        return { success: true, message: 'Review added successfully!' };
    }
    
    // Get news
    async getNews(limit = 6) {
        const cacheKey = `news_${limit}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            if (this.supabaseClient && this.isOnline) {
                const { data, error } = await this.supabaseClient
                    .from('news')
                    .select('*')
                    .limit(limit)
                    .order('date', { ascending: false });
                
                if (error) throw error;
                
                this.cache.set(cacheKey, data);
                return data;
            }
        } catch (error) {
            console.warn('Failed to fetch news:', error);
        }
        
        const result = SAMPLE_DATA.news.slice(0, limit);
        this.cache.set(cacheKey, result);
        return result;
    }
    
    // Subscribe to real-time events
    subscribeToEvents(callback) {
        if (this.firebaseDb && this.isOnline) {
            this.firebaseDb.ref('events').on('value', (snapshot) => {
                const events = [];
                snapshot.forEach((child) => {
                    events.push({ id: child.key, ...child.val() });
                });
                callback(events);
            });
        }
    }
    
    // Clear cache
    clearCache() {
        this.cache.clear();
    }
}

// Initialize database manager
const db = new DatabaseManager();