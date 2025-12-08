// Linux software data with complete details
const apps = [
    {
        id: 1,
        name: "ServeTracko by VoltNexis",
        developer: "VoltNexis PVT LMTD",
        tagline: "Simple. Reliable. Fast.",
        icon: "../img/servetracko.webp",
        rating: 4.5,
        category: "tools",
        trending: true,
        new: true,
        version: "2.2.0",
        size: "13MB",
        linuxDistro: "Ubuntu 20.04+",
        lastUpdated: "Aug 29, 2025",
        description: `<h3>🚀 Features</h3><p>Serve Tracker is a FREE Service Tool available for Linux systems. ServeTrack uses your system's Internet connection to Note and recall customers and orders.</p><h3>✨ What's New</h3><ul><li>High Storage</li><li>Improved noting features</li><li>Better file sharing capabilities</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "13MB", url: "https://www.mediafire.com/file/abc123/servetracko-v2.2.0-amd64.deb/file" },
            { type: "DEB (32-bit)", size: "12MB", url: "https://www.mediafire.com/file/abc124/servetracko-v2.2.0-i386.deb/file" },
            { type: "RPM (64-bit)", size: "13MB", url: "https://www.mediafire.com/file/abc125/servetracko-v2.2.0-x86_64.rpm/file" }
        ],
        packageName: "servetracko",
        oldVersions: [
            { version: "2.1.0", downloads: [{ type: "DEB (64-bit)", size: "12MB", url: "https://www.mediafire.com/file/def456/servetracko-v2.1.0-amd64.deb/file" }] }
        ]
    },
    {
        id: 2,
        name: "Firefox Browser",
        developer: "Mozilla Foundation",
        tagline: "Free & Open Source Browser",
        icon: "../img/firefox.webp",
        rating: 4.5,
        category: "tools",
        trending: true,
        new: false,
        version: "121.0",
        size: "85MB",
        linuxDistro: "All Distributions",
        lastUpdated: "Dec 15, 2024",
        description: `<h3>🌐 Web Browser</h3><p>Firefox is a free and open-source web browser developed by Mozilla Foundation. Fast, private, and secure browsing.</p><h3>✨ What's New</h3><ul><li>Enhanced privacy protection</li><li>Improved performance</li><li>Better extension support</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "85MB", url: "https://www.mediafire.com/file/ff123/firefox-v121.0-amd64.deb/file" },
            { type: "RPM (64-bit)", size: "85MB", url: "https://www.mediafire.com/file/ff124/firefox-v121.0-x86_64.rpm/file" },
            { type: "AppImage", size: "90MB", url: "https://www.mediafire.com/file/ff125/firefox-v121.0.AppImage/file" }
        ],
        packageName: "firefox",
        screenshots: ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"],
        oldVersions: []
    },
    {
        id: 3,
        name: "Steam",
        developer: "Valve Corporation",
        tagline: "Gaming Platform for Linux",
        icon: "../img/steam.webp",
        rating: 4.2,
        category: "games",
        trending: true,
        new: false,
        version: "1.0.0.78",
        size: "2.5MB",
        linuxDistro: "Ubuntu 18.04+",
        lastUpdated: "Dec 12, 2024",
        description: `<h3>🎮 Gaming Platform</h3><p>Steam for Linux brings thousands of games to your Linux desktop. Play Windows games through Proton compatibility layer.</p><h3>🆕 Latest Updates</h3><ul><li>Improved Proton compatibility</li><li>Steam Deck support</li><li>Better Linux integration</li></ul>`,
        downloads: [
            { type: "DEB (32-bit)", size: "2.5MB", url: "https://www.mediafire.com/file/st123/steam-v1.0.0.78-i386.deb/file" }
        ],
        packageName: "steam-installer",
        oldVersions: []
    },
    {
        id: 4,
        name: "Visual Studio Code",
        developer: "Microsoft Corporation",
        tagline: "Code Editor for Linux",
        icon: "../img/vs_code.webp",
        rating: 4.7,
        category: "tools",
        trending: false,
        new: false,
        version: "1.85.1",
        size: "95MB",
        linuxDistro: "Ubuntu 18.04+",
        lastUpdated: "Dec 14, 2024",
        description: `<h3>💻 Code Editor</h3><p>Visual Studio Code is a lightweight but powerful source code editor for Linux. Built-in Git integration and extensive extensions.</p><h3>🌟 Key Features</h3><ul><li>IntelliSense code completion</li><li>Integrated terminal</li><li>Extension marketplace</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "95MB", url: "https://www.mediafire.com/file/vsc123/vscode-v1.85.1-amd64.deb/file" },
            { type: "RPM (64-bit)", size: "95MB", url: "https://www.mediafire.com/file/vsc124/vscode-v1.85.1-x86_64.rpm/file" }
        ],
        packageName: "code",
        oldVersions: []
    },
    {
        id: 5,
        name: "VLC Media Player",
        developer: "VideoLAN",
        tagline: "Universal Media Player",
        icon: "../img/vlc.webp",
        rating: 4.6,
        category: "entertainment",
        trending: false,
        new: false,
        version: "3.0.18",
        size: "40MB",
        linuxDistro: "All Distributions",
        lastUpdated: "Dec 13, 2024",
        description: `<h3>🎬 Media Player</h3><p>VLC is a free and open source cross-platform multimedia player. Plays virtually all media formats on Linux.</p><h3>🔧 Features</h3><ul><li>Plays all media formats</li><li>Hardware acceleration</li><li>Network streaming</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "40MB", url: "https://www.mediafire.com/file/vlc123/vlc-v3.0.18-amd64.deb/file" },
            { type: "RPM (64-bit)", size: "40MB", url: "https://www.mediafire.com/file/vlc124/vlc-v3.0.18-x86_64.rpm/file" },
            { type: "AppImage", size: "45MB", url: "https://www.mediafire.com/file/vlc125/vlc-v3.0.18.AppImage/file" }
        ],
        packageName: "vlc",
        oldVersions: []
    },
    {
        id: 6,
        name: "Discord",
        developer: "Discord Inc.",
        tagline: "Voice & Text Chat",
        icon: "../img/discord.webp",
        rating: 4.3,
        category: "social",
        trending: false,
        new: false,
        version: "0.0.34",
        size: "85MB",
        linuxDistro: "Ubuntu 16.04+",
        lastUpdated: "Dec 11, 2024",
        description: `<h3>💬 Communication</h3><p>Discord for Linux brings voice, video, and text communication to your desktop. Connect with gaming communities worldwide.</p><h3>🎧 Features</h3><ul><li>Voice and video calls</li><li>Screen sharing</li><li>Server communities</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "85MB", url: "https://www.mediafire.com/file/dc123/discord-v0.0.34-amd64.deb/file" },
            { type: "RPM (64-bit)", size: "85MB", url: "https://www.mediafire.com/file/dc124/discord-v0.0.34-x86_64.rpm/file" }
        ],
        packageName: "discord",
        oldVersions: []
    },
    {
        id: 7,
        name: "GIMP",
        developer: "GIMP Team",
        tagline: "GNU Image Manipulation Program",
        icon: "../img/gimp.webp",
        rating: 4.4,
        category: "tools",
        trending: false,
        new: true,
        version: "2.10.36",
        size: "200MB",
        linuxDistro: "All Distributions",
        lastUpdated: "Dec 17, 2024",
        description: `<h3>🎨 Image Editor</h3><p>GIMP is a free and open-source raster graphics editor. Professional image manipulation and photo retouching.</p><h3>🖌️ Features</h3><ul><li>Advanced photo editing</li><li>Customizable interface</li><li>Plugin support</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "200MB", url: "https://www.mediafire.com/file/gimp123/gimp-v2.10.36-amd64.deb/file" },
            { type: "RPM (64-bit)", size: "200MB", url: "https://www.mediafire.com/file/gimp124/gimp-v2.10.36-x86_64.rpm/file" },
            { type: "AppImage", size: "220MB", url: "https://www.mediafire.com/file/gimp125/gimp-v2.10.36.AppImage/file" }
        ],
        packageName: "gimp",
        oldVersions: []
    },
    {
        id: 8,
        name: "Nmap",
        developer: "Nmap Project",
        tagline: "Network Security Scanner",
        icon: "../img/nmap.webp",
        rating: 4.8,
        category: "tools",
        trending: false,
        new: false,
        version: "7.94",
        size: "25MB",
        linuxDistro: "Kali Linux, Parrot OS",
        lastUpdated: "Dec 10, 2024",
        description: `<h3>🔍 Network Scanner</h3><p>Nmap is a free and open source utility for network discovery and security auditing. Essential tool for penetration testing.</p><h3>🛡️ Features</h3><ul><li>Port scanning</li><li>OS detection</li><li>Vulnerability scanning</li></ul>`,
        downloads: [
            { type: "DEB (64-bit)", size: "25MB", url: "https://www.mediafire.com/file/nmap123/nmap-v7.94-amd64.deb/file" },
            { type: "RPM (64-bit)", size: "25MB", url: "https://www.mediafire.com/file/nmap124/nmap-v7.94-x86_64.rpm/file" }
        ],
        packageName: "nmap",
        oldVersions: []
    }
];

let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

// Make apps data globally available
window.appsData = apps;

// URL normalization - remove trailing slash from ID-based URLs
if (window.location.search.includes('id=') && window.location.pathname.endsWith('/')) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -1) + window.location.search + window.location.hash;
    window.history.replaceState(null, null, newUrl);
}

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
}

function renderApps() {
    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery) || 
                            app.developer.toLowerCase().includes(searchQuery);
        
        const matchesFilter = currentFilter === 'all' || 
                            app.category === currentFilter ||
                            (currentFilter === 'trending' && app.trending) ||
                            (currentFilter === 'new' && app.new);
        
        return matchesSearch && matchesFilter;
    });

    appsGrid.innerHTML = filteredApps.map(app => createAppCard(app)).join('');
    
    // Add click listeners to app cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', function() {
            const appId = this.dataset.appId;
            const app = apps.find(a => a.id == appId);
            const appData = encodeURIComponent(JSON.stringify(app));
            window.location.href = `app_linux.html?id=${appId}`;
        });
    });
}

function createAppCard(app) {
    const stars = generateStars(app.rating);
    const appData = encodeURIComponent(JSON.stringify(app));
    
    return `
        <div class="app-card" data-app-id="${app.id}">
            <div class="app-card-header">
                <div class="app-card-icon">
                    <img src="${app.icon}" alt="${app.name}">
                </div>
                <div class="app-card-info">
                    <h3>${app.name}</h3>
                    <p class="developer">${app.developer}</p>
                </div>
            </div>
            <p class="app-card-tagline">${app.tagline}</p>
            <div class="app-card-footer">
                <div class="app-rating">
                    <div class="stars">${stars}</div>
                    <span>${app.rating}</span>
                </div>
                <button class="download-btn-small" onclick="event.stopPropagation(); window.location.href='app_linux.html?id=${app.id}'">
                    Details
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}
