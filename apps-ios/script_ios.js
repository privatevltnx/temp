// ==================== APP DATA ====================

const apps = [
    {
        id: 1,
        name: "ServeTracko",
        developer: "VoltNexis PVT",
        icon: "../img/spotify.webp",
        rating: 4.5,
        category: "tools",
        trending: true,
        new: true,
    },
    {
        id: 2,
        name: "WhatsApp Messenger",
        developer: "WhatsApp Inc.",
        icon: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN",
        rating: 4.5,
        category: "social",
        trending: true,
        new: false,
    },
    {
        id: 3,
        name: "PUBG Mobile",
        developer: "PUBG Corporation",
        icon: "../img/pubg_mobile.webp",
        rating: 4.2,
        category: "games",
        trending: true,
        new: false,
    },
    {
        id: 4,
        name: "Instagram",
        developer: "Instagram, Inc.",
        icon: "https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM",
        rating: 4.3,
        category: "social",
        trending: false,
        new: false,
    },
    {
        id: 5,
        name: "Safari Browser",
        developer: "Apple Inc.",
        icon: "../img/safari.webp",
        rating: 4.1,
        category: "tools",
        trending: false,
        new: false,
    },
    {
        id: 6,
        name: "Spotify Music",
        developer: "Spotify AB",
        icon: "../img/spotify.webp",
        rating: 4.6,
        category: "entertainment",
        trending: false,
        new: false,
    },
    {
        id: 7,
        name: "Telegram",
        developer: "Telegram FZ-LLC",
        icon: "../img/telegram.webp",
        rating: 4.7,
        category: "social",
        trending: false,
        new: true,
    },
    {
        id: 8,
        name: "VLC Media Player",
        developer: "VideoLAN",
        icon: "../img/vlc.webp",
        rating: 4.5,
        category: "tools",
        trending: false,
        new: false,
    },
    {
        id: 9,
        name: "Discord",
        developer: "Discord Inc.",
        icon: "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
        rating: 4.4,
        category: "social",
        trending: true,
        new: true,
    },
    {
        id: 10,
        name: "TikTok",
        developer: "ByteDance",
        icon: "../img/tiktok.webp",
        rating: 4.3,
        category: "entertainment",
        trending: true,
        new: false,
    },
    {
        id: 11,
        name: "YouTube",
        developer: "Google LLC",
        icon: "../img/youtube.webp",
        rating: 4.6,
        category: "entertainment",
        trending: false,
        new: false,
    },
    {
        id: 12,
        name: "Snapchat",
        developer: "Snap Inc.",
        icon: "../img/snapchat.webp",
        rating: 4.2,
        category: "social",
        trending: false,
        new: true,
    },
    {
        id: 13,
        name: "Fortnite",
        developer: "Epic Games",
        icon: "../img/fortnite.webp",
        rating: 4.1,
        category: "games",
        trending: true,
        new: false,
    },
    {
        id: 14,
        name: "Call of Duty",
        developer: "Activision",
        icon: "../img/cod.webp",
        rating: 4.4,
        category: "games",
        trending: true,
        new: false,
    },
    {
        id: 15,
        name: "Candy Crush",
        developer: "King",
        icon: "../img/candycrush.webp",
        rating: 4.0,
        category: "games",
        trending: false,
        new: false,
    },
    {
        id: 16,
        name: "Pokemon Go",
        developer: "Niantic",
        icon: "../img/pokemongo.webp",
        rating: 4.2,
        category: "games",
        trending: false,
        new: true,
    },
    {
        id: 17,
        name: "Netflix",
        developer: "Netflix, Inc.",
        icon: "../img/netflix.webp",
        rating: 4.5,
        category: "entertainment",
        trending: false,
        new: false,
    },
    {
        id: 18,
        name: "Disney+",
        developer: "Disney",
        icon: "../img/disneyplus.webp",
        rating: 4.3,
        category: "entertainment",
        trending: false,
        new: false,
    },
];

let currentFilter = 'all';
let displayedApps = 8;
const appsPerLoad = 8;

// ==================== DOM ELEMENTS ====================

const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trendingScroll = document.getElementById('trendingScroll');
const newScroll = document.getElementById('newScroll');
const appsGrid = document.getElementById('appsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');
const filterChips = document.querySelectorAll('.chip');
const menuBtns = document.querySelectorAll('.menu-btn');

// ==================== CAROUSEL ====================

function createCarouselSlides() {
    const trendingApps = apps.filter(app => app.trending).slice(0, 4);
    
    trendingApps.forEach((app, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div class="carousel-content">
                <div>
                    <h3>${app.name}</h3>
                    <p>${app.developer}</p>
                </div>
                <button class="carousel-btn-get">Get</button>
            </div>
        `;
        carouselTrack.appendChild(slide);

        // Create dots
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => scrollToSlide(index));
        carouselDots.appendChild(dot);
    });
}

function scrollToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth + 16; // 16px gap
    carouselTrack.scrollLeft = index * slideWidth;
    updateCarouselDots(index);
}

function updateCarouselDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

carouselTrack.addEventListener('scroll', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth + 16;
    const index = Math.round(carouselTrack.scrollLeft / slideWidth);
    updateCarouselDots(index);
});

prevBtn.addEventListener('click', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth + 16;
    carouselTrack.scrollLeft -= slideWidth;
});

nextBtn.addEventListener('click', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth + 16;
    carouselTrack.scrollLeft += slideWidth;
});

// ==================== HORIZONTAL SCROLLS ====================

function createHorizontalScroll(container, filter) {
    const filtered = apps.filter(app => app[filter]);
    container.innerHTML = '';
    
    filtered.forEach(app => {
        const card = createAppCardHorizontal(app);
        container.appendChild(card);
    });
}

function createAppCardHorizontal(app) {
    const card = document.createElement('div');
    card.className = 'app-card-horizontal';
    card.innerHTML = `
        <div class="app-icon">
            ${app.icon.includes('placeholder') ? `<i class="fas fa-cube"></i>` : `<img src="${app.icon}" alt="${app.name}">`}
        </div>
        <div class="app-info">
            <div class="app-name">${app.name}</div>
            <div class="app-developer">${app.developer}</div>
            <div class="app-rating">
                <i class="fas fa-star"></i> ${app.rating}
            </div>
        </div>
    `;
    return card;
}

// ==================== GRID ====================

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.innerHTML = `
        <div class="app-card-icon">
            ${app.icon.includes('placeholder') ? `<i class="fas fa-cube"></i>` : `<img src="${app.icon}" alt="${app.name}">`}
        </div>
        <div class="app-card-info">
            <div class="app-card-name">${app.name}</div>
            <div class="app-card-developer">${app.developer}</div>
            <div class="app-card-rating">
                <i class="fas fa-star"></i> ${app.rating}
            </div>
        </div>
    `;
    return card;
}

function renderGrid(filter = 'all') {
    const filtered = filter === 'all' ? apps : apps.filter(app => app.category === filter);
    appsGrid.innerHTML = '';
    
    const toDisplay = filtered.slice(0, displayedApps);
    toDisplay.forEach(app => {
        const card = createAppCard(app);
        appsGrid.appendChild(card);
    });

    // Show/hide load more button
    loadMoreBtn.style.display = filtered.length > displayedApps ? 'flex' : 'none';
}

function loadMoreApps() {
    const filtered = currentFilter === 'all' ? apps : apps.filter(app => app.category === currentFilter);
    displayedApps += appsPerLoad;
    
    if (displayedApps >= filtered.length) {
        displayedApps = filtered.length;
        loadMoreBtn.style.display = 'none';
    }
    
    renderGrid(currentFilter);
}

// ==================== EVENT LISTENERS ====================

// Filter chips
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        currentFilter = chip.dataset.filter;
        displayedApps = 8;
        renderGrid(currentFilter);
    });
});

// Load more button
loadMoreBtn.addEventListener('click', loadMoreApps);

// Search
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = apps.filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.developer.toLowerCase().includes(query)
    );
    
    appsGrid.innerHTML = '';
    filtered.forEach(app => {
        const card = createAppCard(app);
        appsGrid.appendChild(card);
    });
    
    loadMoreBtn.style.display = 'none';
});

// Menu buttons
menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        const chip = document.querySelector(`.chip[data-filter="${category}"]`);
        if (chip) {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = category;
            displayedApps = 8;
            renderGrid(currentFilter);
        }
    });
});

// ==================== INITIALIZATION ====================

function init() {
    createCarouselSlides();
    createHorizontalScroll(trendingScroll, 'trending');
    createHorizontalScroll(newScroll, 'new');
    renderGrid('all');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Smooth scroll behavior for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.app-card, .app-card-horizontal');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const appName = this.querySelector('.app-card-name, .app-name')?.textContent;
            console.log('Clicked:', appName);
            // You can add modal/detail view here
        });
    });
});
