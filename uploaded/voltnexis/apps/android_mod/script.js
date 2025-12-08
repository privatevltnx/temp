// Sample MOD APK data
const modApps = [
    {
        id: 21,
        name: "WhatsApp Plus MOD",
        developer: "WhatsApp Inc. (Modified)",
        tagline: "Enhanced WhatsApp with Premium Features",
        icon: "https://via.placeholder.com/60",
        rating: 4.5,
        category: "social",
        trending: true,
        new: true,
        version: "2.23.25.84",
        size: "65MB",
        lastUpdated: "Dec 18, 2024",
        description: `<h3>🚀 MOD Features</h3><p>WhatsApp Plus MOD with premium features unlocked. Enhanced privacy options and customization features.</p><h3>✨ What's Unlocked</h3><ul><li>Premium themes and customization</li><li>Enhanced privacy controls</li><li>Anti-ban protection</li><li>Dual WhatsApp support</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/wa123mod/whatsapp-plus-mod-v2.23.25.84.apk/file",
        apkObb: false,
        oldVersions: [
            { version: "2.23.20.84", size: "63MB", url: "https://www.mediafire.com/file/wa456mod/whatsapp-plus-mod-v2.23.20.84.apk/file" },
            { version: "2.23.15.84", size: "62MB", url: "https://www.mediafire.com/file/wa789mod/whatsapp-plus-mod-v2.23.15.84.apk/file" }
        ]
    },
    {
        id: 22,
        name: "Spotify Premium MOD",
        developer: "Spotify AB (Modified)",
        tagline: "Premium Music Streaming Unlocked",
        icon: "../img/spotify.webp",
        rating: 4.6,
        category: "entertainment",
        trending: true,
        new: false,
        version: "8.8.52.345",
        size: "45MB",
        lastUpdated: "Dec 15, 2024",
        description: `<h3>🎵 Premium Features</h3><p>Spotify Premium MOD with all premium features unlocked. Enjoy unlimited music streaming without ads.</p><h3>🎧 Unlocked Features</h3><ul><li>Unlimited skips and replays</li><li>Ad-free music streaming</li><li>High quality audio (320kbps)</li><li>Offline downloads enabled</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/sp123mod/spotify-premium-mod-v8.8.52.345.apk/file",
        apkObb: false,
        oldVersions: [
            { version: "8.8.50.345", size: "44MB", url: "https://www.mediafire.com/file/sp456mod/spotify-premium-mod-v8.8.50.345.apk/file" }
        ]
    },
    {
        id: 23,
        name: "Instagram Plus MOD",
        developer: "Instagram Inc. (Modified)",
        tagline: "Enhanced Instagram Experience",
        icon: "https://via.placeholder.com/60",
        rating: 4.4,
        category: "social",
        trending: false,
        new: true,
        version: "307.0.0.34.111",
        size: "48MB",
        lastUpdated: "Dec 17, 2024",
        description: `<h3>📸 Enhanced Features</h3><p>Instagram Plus MOD with additional features for better social media experience.</p><h3>🌟 MOD Features</h3><ul><li>Download photos and videos</li><li>View stories anonymously</li><li>Disable read receipts</li><li>Zoom profile pictures</li></ul>`,
        downloadUrl: "https://www.mediafire.com/file/ig123mod/instagram-plus-mod-v307.0.0.34.111.apk/file",
        apkObb: false,
        oldVersions: []
    },
  {
    id: 1,
    name: "Bus Simulator Indonesia MOD",
    developer: "Maleo (Modified)",
    tagline: "Drive with Unlimited Fuel & Custom Skins",
    icon: "https://via.placeholder.com/60",
    rating: 4.6,
    category: "simulation",
    trending: true,
    new: false,
    version: "4.4",
    size: "503MB",
    lastUpdated: "Aug 21, 2024",
    description: `<h3>🚌 MOD Features</h3><ul><li>Unlimited money</li><li>Custom livery support</li><li>No fuel consumption</li><li>Unlocked all cities</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/krsxaeqm183dt92/bus-simulator-indonesia_v4.4.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 2,
    name: "Car Parking Multiplayer MOD",
    developer: "Olzhass (Modified)",
    tagline: "Open World Parking & Racing",
    icon: "https://via.placeholder.com/60",
    rating: 4.5,
    category: "simulation",
    trending: true,
    new: false,
    version: "4.9.3.3",
    size: "1.48GB",
    lastUpdated: "Jul 30, 2024",
    description: `<h3>🚗 MOD Features</h3><ul><li>Unlimited money</li><li>Unlocked cars</li><li>Free shopping</li><li>Teleport anywhere</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/znz0vm10ifw5ehn/car_parking_multiplayer-v4.9.3.3_carsparkingmultiplayer.com.voltnexis.apk/file",
    apkObb: false,
    oldVersions: [
        { version: "4.9.2", size: "1.42GB", url: "https://www.mediafire.com/file/lys7l46yzep125j/car-parking-multiplayer-_v4.9.2-apkgw-com.voltnexis.apk/file" }
    ]
  },
  {
    id: 3,
    name: "GTA III CLEO MOD APK+SCRIPTS",
    developer: "Rockstar Games (Modified)",
    tagline: "Liberty City Unleashed",
    icon: "https://via.placeholder.com/60",
    rating: 4.3,
    category: "action",
    trending: false,
    new: false,
    version: "1.8",
    size: "6KB",
    lastUpdated: "Jun 12, 2024",
    description: `<h3>🔫 MOD Features</h3><ul><li>Unlimited ammo</li><li>All missions unlocked</li><li>Custom skins</li><li>Script injector enabled</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/idtbp20elydi2tt/GTA_3_APK%252BSCRIPTS.zip/file",
    obbUrl: "https://www.mediafire.com/file/wkae6wtgy3nkqkk/com.rockstar.gta3.zip/file",
    apkObb: true,
    oldVersions: []
  },
  {
    id: 4,
    name: "GTA San Andreas CLEO MOD APK+SCRIPTS",
    developer: "Rockstar Games (Modified)",
    tagline: "CJ’s World, Reimagined",
    icon: "https://via.placeholder.com/60",
    rating: 4.7,
    category: "action",
    trending: true,
    new: false,
    version: "2.10",
    size: "15MB",
    lastUpdated: "May 25, 2024",
    description: `<h3>🏙️ MOD Features</h3><ul><li>Unlimited health</li><li>Cheat menu enabled</li><li>HD graphics patch</li><li>Script mods included</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/7qjpwtlirwsyr4a/GTA_SA_APK%252BSCRIPTS.zip/file",
    obbUrl: "https://www.mediafire.com/file/1esp6lt5eljvbl2/com.rockstar.gtavc.zip/file",
    apkObb: true,
    oldVersions: []
  },
  {
    id: 5,
    name: "GTA Vice City CLEO MOD APK+SCRIPTS",
    developer: "Rockstar Games (Modified)",
    tagline: "Retro Crime Paradise",
    icon: "https://via.placeholder.com/60",
    rating: 4.4,
    category: "action",
    trending: false,
    new: false,
    version: "1.12",
    size: "6MB",
    lastUpdated: "Apr 18, 2024",
    description: `<h3>🌴 MOD Features</h3><ul><li>Unlimited money</li><li>All weapons unlocked</li><li>Custom vehicles</li><li>Script injector included</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/gw1oxe7ienp36he/GTA_VC_APK%252BSCRIPT.zip/file",
    obbUrl: "https://drive.google.com/uc?export=download&id=YOUR_OBB_FILE_ID",
    obbUrl: "https://www.mediafire.com/file/1esp6lt5eljvbl2/com.rockstar.gtavc.zip/file",
    apkObb: true,
    oldVersions: []
  },
  {
    id: 6,
    name: "HappyMod",
    developer: "HappyMod Team",
    tagline: "MOD APK Hub",
    icon: "https://via.placeholder.com/60",
    rating: 4.2,
    category: "tools",
    trending: true,
    new: false,
    version: "3.1.0",
    size: "16MB",
    lastUpdated: "Sep 1, 2024",
    description: `<h3>📦 Features</h3><ul><li>Access thousands of modded apps</li><li>Fast download speeds</li><li>User ratings and feedback</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/58h4gvpijh0eh9p/HappyMod-Pro-3-1-0.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 7,
    name: "Hill Climb Racing MOD",
    developer: "Fingersoft (Modified)",
    tagline: "Gravity-Defying Fun",
    icon: "https://via.placeholder.com/60",
    rating: 4.3,
    category: "racing",
    trending: false,
    new: false,
    version: "1.66.0",
    size: "100MB",
    lastUpdated: "Aug 10, 2024",
    description: `<h3>🏁 MOD Features</h3><ul><li>Unlimited coins</li><li>All vehicles unlocked</li><li>No fuel limit</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/8nlqgzlgd7qxvns/hill-climb-racing_v1.66.0-an1.voltnexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 8,
    name: "MadOut2 BigCityOnline MOD",
    developer: "MadOut Games (Modified)",
    tagline: "Open World Chaos",
    icon: "https://via.placeholder.com/60",
    rating: 4.1,
    category: "action",
    trending: true,
    new: false,
    version: "17.0.3",
    size: "1.22GB",
    lastUpdated: "Jul 5, 2024",
    description: `<h3>🚓 MOD Features</h3><ul><li>Unlimited money</li><li>All vehicles unlocked</li><li>Offline mode enabled</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/1palcz04r9rb7lr/MadOut2-v17.03.getmodsapk.voltnexis.apk/file",
    apkObb: false,
    oldVersions: [
        { version: "16.10", size: "1.17GB", url: "https://www.mediafire.com/file/j99l8vs92180aqv/MadOut2-v16.10-an1.VoltNexis.apk/file" }
    ]
  },
  {
    id: 9,
    name: "Moto Rider GO MOD",
    developer: "T-Bull (Modified)",
    tagline: "Ride Fast, Ride Free",
    icon: "https://via.placeholder.com/60",
    rating: 4.2,
    category: "racing",
    trending: false,
    new: false,
    version: "1.93.0",
    size: "88MB",
    lastUpdated: "Jun 8, 2024",
    description: `<h3>🏍️ MOD Features</h3><ul><li>Unlimited coins</li><li>Unlocked bikes</li><li>No traffic collisions</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/m37tq4gzc2nyl9f/moto-rider-go_1.93.0-an1.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 10,
    name: "Moto X3M MOD",
    developer: "Ace Viral (Modified)",
    tagline: "Extreme Bike Stunts",
    icon: "https://via.placeholder.com/60",
    rating: 4.0,
    category: "arcade",
    trending: false,
    new: false,
    version: "1.21.1",
    size: "42MB",
    lastUpdated: "May 3, 2024",
    description: `<h3>🛵 MOD Features</h3><ul><li>All levels unlocked</li><li>No ads</li><li>Unlimited lives</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/qj41s80dt4s4epq/moto-x3m-v1-20-1.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 11,
    name: "Prado Car Parking MOD",
    developer: "Games Gear Studio (Modified)",
    tagline: "Luxury SUV Parking Challenge",
    icon: "https://via.placeholder.com/60",
    rating: 4.1,
    category: "simulation",
    trending: false,
    new: false,
    version: "1.5.1",
    size: "56MB",
    lastUpdated: "Aug 14, 2024",
    description: `<h3>🚙 MOD Features</h3><ul><li>Unlimited coins</li><li>All vehicles unlocked</li><li>No damage</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/6j4ggeb71n5ztm3/prado_car_parking-v1.5.1-voltnexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 12,
    name: "Rally Horizon MOD",
    developer: "Refuel Games (Modified)",
    tagline: "Off-Road Racing Reimagined",
    icon: "https://via.placeholder.com/60",
    rating: 4.3,
    category: "racing",
    trending: true,
    new: false,
    version: "2.5.9",
    size: "531MB",
    lastUpdated: "Jul 22, 2024",
    description: `<h3>🏁 MOD Features</h3><ul><li>Unlimited fuel</li><li>Unlocked tracks</li><li>Enhanced graphics</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/wp1g04rzykdmswk/rally-horizon_v2.5.9-an1.voltnexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 13,
    name: "Real Racing 3 MOD",
    developer: "Electronic Arts (Modified)",
    tagline: "Hyper-Realistic Racing",
    icon: "https://via.placeholder.com/60",
    rating: 4.6,
    category: "racing",
    trending: true,
    new: false,
    version: "13.5.1",
    size: "1.6GB",
    lastUpdated: "Jun 30, 2024",
    description: `<h3>🏎️ MOD Features</h3><ul><li>Unlimited gold & R$</li><li>All cars unlocked</li><li>No ads</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/8pt7he2dp2vsof9/real-racing-3_v13.5.1-an1.voltnexis.apk/file",
    obbUrl: "https://drive.google.com/uc?export=download&id=YOUR_OBB_FILE_ID",
    apkObb: true,
    oldVersions: []
  },
  {
    id: 14,
    name: "Robbery Bob MOD",
    developer: "Deca Games (Modified)",
    tagline: "Sneaky Fun with No Limits",
    icon: "https://via.placeholder.com/60",
    rating: 4.4,
    category: "arcade",
    trending: false,
    new: false,
    version: "1.30.11",
    size: "82MB",
    lastUpdated: "May 15, 2024",
    description: `<h3>🕵️ MOD Features</h3><ul><li>Unlimited coins</li><li>All levels unlocked</li><li>No detection</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/170orkfze69n8dp/robbery-bob-1-30-11.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 15,
    name: "Spotify Premium MOD",
    developer: "Spotify Ltd. (Modified)",
    tagline: "Unlimited Music, No Ads",
    icon: "https://via.placeholder.com/60",
    rating: 4.7,
    category: "music",
    trending: true,
    new: false,
    version: "8.9.0",
    size: "68MB",
    lastUpdated: "Sep 1, 2024",
    description: `<h3>🎧 MOD Features</h3><ul><li>Unlimited skips</li><li>No ads</li><li>Offline mode enabled</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/spotifymod/spotify-premium-mod.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 16,
    name: "Subway Surfers MOD",
    developer: "SYBO Games (Modified)",
    tagline: "Dash Forever",
    icon: "https://via.placeholder.com/60",
    rating: 4.5,
    category: "arcade",
    trending: true,
    new: false,
    version: "3.49.0",
    size: "184MB",
    lastUpdated: "Aug 28, 2024",
    description: `<h3>🚄 MOD Features</h3><ul><li>Unlimited coins & keys</li><li>All characters unlocked</li><li>No ads</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/jvnsibg1veywt1v/subway-surfers_v3.49.0-an1.voltnexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 17,
    name: "Temple Run MOD",
    developer: "Imangi Studios (Modified)",
    tagline: "Run Without Limits",
    icon: "https://via.placeholder.com/60",
    rating: 4.2,
    category: "arcade",
    trending: false,
    new: false,
    version: "1.31.0",
    size: "120MB",
    lastUpdated: "Jul 10, 2024",
    description: `<h3>🏃 MOD Features</h3><ul><li>Unlimited coins</li><li>All characters unlocked</li><li>No obstacles</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/zkzvzr8mlz89k6z/temple-run_v1.31.0-an1.voltnexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 18,
    name: "Vector Classic MOD",
    developer: "NEKKI (Modified)",
    tagline: "Parkour Revolution",
    icon: "https://via.placeholder.com/60",
    rating: 1.4.3,
    category: "arcade",
    trending: false,
    new: false,
    version: "1.4.3",
    size: "129MB",
    lastUpdated: "Jun 18, 2024",
    description: `<h3>🏃‍♂️ MOD Features</h3><ul><li>Unlimited energy</li><li>All levels unlocked</li><li>No ads</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/u3kfx038qxsbz8p/vector-classic-1-4-3.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 19,
    name: "WPS Office Premium MOD",
    developer: "Kingsoft Office (Modified)",
    tagline: "All-in-One Document Suite",
    icon: "https://via.placeholder.com/60",
    rating: 4.6,
    category: "productivity",
    trending: false,
    new: false,
    version: "18.7",
    size: "179MB",
    lastUpdated: "Aug 5, 2024",
    description: `<h3>📄 MOD Features</h3><ul><li>Premium unlocked</li><li>Cloud access enabled</li><li>No watermark export</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/6kn5bzcabz6p3si/WPS_Office_v18.7_apkdone.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  },
  {
    id: 20,
    name: "Zombie Catchers MOD",
    developer: "Deca Games (Modified)",
    tagline: "Catch 'Em All... Undead Style",
    icon: "https://via.placeholder.com/60",
    rating: 4.4,
    category: "action",
    trending: false,
    new: false,
    version: "1.51.12",
    size: "98MB",
    lastUpdated: "Jul 25, 2024",
    description: `<h3>🧟 MOD Features</h3><ul><li>Unlimited plutonium</li><li>All weapons unlocked</li><li>No cooldown</li></ul>`,
    downloadUrl: "https://www.mediafire.com/file/xnz4mgw7i0b7kkv/zombie-catchers_1.51.12-an1.VoltNexis.apk/file",
    apkObb: false,
    oldVersions: []
  }

];

let currentFilter = 'all';
let searchQuery = '';

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

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
    const filteredApps = modApps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery) || 
                            app.developer.toLowerCase().includes(searchQuery);
        
        const matchesFilter = currentFilter === 'all' || 
                            (currentFilter === 'premium' && app.trending) ||
                            (currentFilter === 'adfree' && app.category === 'social') ||
                            (currentFilter === 'unlimited' && app.category === 'entertainment');
        
        return matchesSearch && matchesFilter;
    });

    appsGrid.innerHTML = '';
    
    filteredApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.onclick = () => {
            const appData = encodeURIComponent(JSON.stringify(app));
            window.location.href = `app-detail.html?data=${appData}`;
        };
        
        const tags = [];
        if (app.trending) tags.push('trending');
        if (app.new) tags.push('new');
        tags.push('premium', 'mod');
        
        card.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" class="app-icon">
            <div class="app-name">${app.name}</div>
            <div class="app-meta">
                ${tags.map(tag => `<span class="meta-tag">${tag}</span>`).join('')}
            </div>
            <div style="font-size: 14px; color: #ccc;">
                v${app.version} • ${app.size}
            </div>
        `;
        appsGrid.appendChild(card);
    });
}
