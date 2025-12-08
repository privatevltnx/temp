// Sample IPA MOD data
const modApps = [
    {
        id: 1,
        name: "Instagram++ MOD",
        developer: "Instagram Inc. (Modified)",
        tagline: "Enhanced Instagram with Premium Features",
        icon: "../img/instagram.webp",
        rating: 4.4,
        category: "social",
        trending: true,
        new: true,
        version: "302.0",
        size: "85 MB",
        lastUpdated: "Dec 18, 2024",
        ios: "ios16",
        jailbreak: "not-required",
        description: `<h3>📸 Enhanced Features</h3><p>Instagram++ MOD with additional features for better social media experience.</p><h3>🌟 MOD Features</h3><ul><li>Download photos and videos</li><li>View stories anonymously</li><li>Disable read receipts</li><li>Zoom profile pictures</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/ig123mod/instagram-plus-mod-v302.0.ipa/file",
        apkObb: false,
        jailbreakText: "No jailbreak required. Install using AltStore, Sideloadly, or similar sideloading tools.",
        oldVersions: [
            { version: "301.0", size: "83 MB", url: "https://www.mediafire.com/file/ig456mod/instagram-plus-mod-v301.0.ipa/file" }
        ]
    },
    {
        id: 2,
        name: "Spotify++ Premium",
        developer: "Spotify AB (Modified)",
        tagline: "Premium Music Streaming Unlocked",
        icon: "../img/spotify.webp",
        rating: 4.6,
        category: "entertainment",
        trending: true,
        new: false,
        version: "8.8.52",
        size: "65 MB",
        lastUpdated: "Dec 15, 2024",
        ios: "ios15",
        jailbreak: "not-required",
        description: `<h3>🎵 Premium Features</h3><p>Spotify++ Premium with all premium features unlocked for free music streaming.</p><h3>🎧 Unlocked Features</h3><ul><li>Unlimited skips</li><li>Ad-free listening</li><li>High quality streaming</li><li>Offline downloads</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/sp123mod/spotify-premium-mod-v8.8.52.ipa/file",
        apkObb: false,
        jailbreakText: "No jailbreak required. Compatible with iOS 15+ devices. Install via sideloading methods.",
        oldVersions: [
            { version: "8.8.50", size: "63 MB", url: "https://www.mediafire.com/file/sp456mod/spotify-premium-mod-v8.8.50.ipa/file" }
        ]
    },
    {
        id: 3,
        name: "YouTube++ MOD",
        developer: "Google Inc. (Modified)",
        tagline: "Enhanced YouTube Experience",
        icon: "../img/youtube.webp",
        rating: 4.5,
        category: "entertainment",
        trending: false,
        new: true,
        version: "18.49.3",
        size: "95 MB",
        lastUpdated: "Dec 17, 2024",
        ios: "ios16",
        jailbreak: "not-required",
        description: `<h3>📺 Enhanced Features</h3><p>YouTube++ MOD with premium features and ad-free experience.</p><h3>✨ MOD Features</h3><ul><li>Ad-free video streaming</li><li>Background playback</li><li>Download videos</li><li>Picture-in-picture mode</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/yt123mod/youtube-plus-mod-v18.49.3.ipa/file",
        apkObb: false,
        jailbreakText: "No jailbreak required. Works on iOS 16+ devices with sideloading.",
        oldVersions: []
    }
];

let currentFilter = 'all';
let currentVersion = 'all';
let currentJailbreak = 'all';
let searchQuery = '';

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const versionFilter = document.getElementById('versionFilter');
const jailbreakFilter = document.getElementById('jailbreakFilter');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderApps();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase();
        renderApps();
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderApps();
        });
    });

    // Version filter
    if (versionFilter) {
        versionFilter.addEventListener('change', function() {
            currentVersion = this.value;
            renderApps();
        });
    }

    // Jailbreak filter
    if (jailbreakFilter) {
        jailbreakFilter.addEventListener('change', function() {
            currentJailbreak = this.value;
            renderApps();
        });
    }
}

function renderApps() {
    const filteredApps = modApps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery) || 
                            app.developer.toLowerCase().includes(searchQuery);
        
        const matchesFilter = currentFilter === 'all' || 
                            (currentFilter === 'premium' && app.trending) ||
                            (currentFilter === 'adfree' && app.category === 'social') ||
                            (currentFilter === 'unlimited' && app.category === 'entertainment');

        const matchesVersion = currentVersion === 'all' || app.ios === currentVersion;
        const matchesJailbreak = currentJailbreak === 'all' || app.jailbreak === currentJailbreak;
        
        return matchesSearch && matchesFilter && matchesVersion && matchesJailbreak;
    });

    appsGrid.innerHTML = '';
    
    filteredApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.onclick = () => {
            const appData = encodeURIComponent(JSON.stringify(app));
            window.location.href = `app_detail_ios_mod.html?data=${appData}`;
        };
        
        const tags = [];
        if (app.trending) tags.push('trending');
        if (app.new) tags.push('new');
        tags.push('premium', 'mod');
        tags.push(app.jailbreak === 'not-required' ? 'No JB' : 'JB Required');
        
        card.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" class="app-icon">
            <div class="app-name">${app.name}</div>
            <div class="app-meta">
                ${tags.map(tag => `<span class="meta-tag">${tag}</span>`).join('')}
            </div>
            <div style="font-size: 14px; color: #ccc;">
                v${app.version} • ${app.size} • ${app.ios.toUpperCase()}
            </div>
        `;
        appsGrid.appendChild(card);
    });
}
