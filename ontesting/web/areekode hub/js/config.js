// Database Configuration
const CONFIG = {
    // Supabase Configuration
    supabase: {
        url: 'YOUR_SUPABASE_URL',
        key: 'YOUR_SUPABASE_ANON_KEY'
    },
    
    // Firebase Configuration
    firebase: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "areekode-hub.firebaseapp.com",
        databaseURL: "https://areekode-hub-default-rtdb.firebaseio.com/",
        projectId: "areekode-hub",
        storageBucket: "areekode-hub.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef123456"
    },
    
    // App Settings
    app: {
        name: 'Areekode Digital Hub',
        version: '1.0.0',
        developer: 'VoltNexis',
        itemsPerPage: 12,
        maxSearchResults: 50
    }
};

// Sample Data (for development/demo)
const SAMPLE_DATA = {
    shops: [
        {
            id: 1,
            name: "Malabar Bakery",
            category: "bakery",
            description: "Fresh bread, cakes and traditional Kerala snacks",
            rating: 4.5,
            reviews: 127,
            image: "🥖",
            featured: true,
            contact: {
                phone: "+91 98765 43210",
                address: "Main Road, Areekode",
                email: "info@malabarbakery.com"
            },
            offers: ["20% off on birthday cakes", "Free home delivery above ₹500"]
        },
        {
            id: 2,
            name: "Fashion Point",
            category: "fashion",
            description: "Latest trends in clothing and accessories",
            rating: 4.2,
            reviews: 89,
            image: "👗",
            featured: false,
            contact: {
                phone: "+91 98765 43211",
                address: "Market Street, Areekode",
                email: "contact@fashionpoint.com"
            },
            offers: ["Buy 2 Get 1 Free on selected items"]
        },
        {
            id: 3,
            name: "Tech World",
            category: "electronics",
            description: "Mobile phones, laptops and electronic accessories",
            rating: 4.7,
            reviews: 203,
            image: "📱",
            featured: true,
            contact: {
                phone: "+91 98765 43212",
                address: "Electronics Plaza, Areekode",
                email: "support@techworld.com"
            },
            offers: ["Extended warranty on all products", "EMI available"]
        },
        {
            id: 4,
            name: "Green Pharmacy",
            category: "healthcare",
            description: "24/7 medical store with home delivery",
            rating: 4.6,
            reviews: 156,
            image: "💊",
            featured: false,
            contact: {
                phone: "+91 98765 43213",
                address: "Hospital Road, Areekode",
                email: "orders@greenpharmacy.com"
            },
            offers: ["Free health checkup", "10% discount for senior citizens"]
        }
    ],
    
    services: [
        {
            id: 1,
            name: "Dr. Rajesh Clinic",
            category: "healthcare",
            description: "General physician with 15+ years experience",
            rating: 4.8,
            reviews: 245,
            image: "🏥",
            contact: {
                phone: "+91 98765 43214",
                address: "Medical Center, Areekode",
                email: "appointments@drrajesh.com"
            },
            timings: "Mon-Sat: 9AM-8PM"
        },
        {
            id: 2,
            name: "Bright Tutorials",
            category: "education",
            description: "Coaching for Class 10-12 and competitive exams",
            rating: 4.4,
            reviews: 178,
            image: "📚",
            contact: {
                phone: "+91 98765 43215",
                address: "Education Hub, Areekode",
                email: "info@brighttutorials.com"
            },
            timings: "Mon-Sun: 6AM-9PM"
        }
    ],
    
    events: [
        {
            id: 1,
            title: "Areekode Food Festival",
            description: "Taste the best local cuisines and traditional dishes",
            date: "2024-02-15",
            time: "10:00 AM",
            location: "Town Hall, Areekode",
            category: "food",
            sponsored: true,
            organizer: "Areekode Municipality"
        },
        {
            id: 2,
            title: "Tech Startup Meetup",
            description: "Networking event for local entrepreneurs and tech enthusiasts",
            date: "2024-02-20",
            time: "6:00 PM",
            location: "Community Center, Areekode",
            category: "business",
            sponsored: false,
            organizer: "VoltNexis"
        }
    ],
    
    news: [
        {
            id: 1,
            title: "New Digital Initiative Launched",
            summary: "Areekode becomes the first town in the district to have a comprehensive digital hub",
            date: "2024-01-15",
            category: "technology",
            image: "📰"
        },
        {
            id: 2,
            title: "Local Business Growth",
            summary: "Small businesses in Areekode report 30% increase in sales after joining digital platform",
            date: "2024-01-10",
            category: "business",
            image: "📈"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, SAMPLE_DATA };
}