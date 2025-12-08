// Sample Windows MOD data
const modApps = [
    {
        id: 1,
        name: "Adobe Photoshop MOD",
        developer: "Adobe Inc. (Modified)",
        tagline: "Professional Photo Editing Unlocked",
        icon: "../img/photoshop.webp",
        rating: 4.8,
        category: "productivity",
        trending: true,
        new: true,
        version: "2024",
        size: "2.5 GB",
        lastUpdated: "Dec 18, 2024",
        description: `<h3>🎨 MOD Features</h3><p>Adobe Photoshop MOD with lifetime activation and all premium features unlocked.</p><h3>✨ What's Unlocked</h3><ul><li>Lifetime activation</li><li>All premium features unlocked</li><li>No subscription required</li><li>Enhanced performance</li></ul>`,
        downloads: [
            { type: "64-bit", size: "2.5 GB", url: "https://www.mediafire.com/file/ps123mod/adobe-photoshop-mod-2024-x64.exe/file" },
            { type: "32-bit", size: "2.3 GB", url: "https://www.mediafire.com/file/ps123mod/adobe-photoshop-mod-2024-x86.exe/file" }
        ],
        systemReq: "Windows 10/11, 8GB RAM, 4GB free space",
        oldVersions: [
            { version: "2023", downloads: [{ type: "64-bit", size: "2.3 GB", url: "https://www.mediafire.com/file/ps456mod/adobe-photoshop-mod-2023-x64.exe/file" }] }
        ]
    },
    {
        id: 2,
        name: "WinRAR Premium MOD",
        developer: "RARLAB (Modified)",
        tagline: "Archive Tool with Lifetime License",
        icon: "../img/winrar.webp",
        rating: 4.6,
        category: "tools",
        trending: true,
        new: false,
        version: "6.24",
        size: "3.2 MB",
        lastUpdated: "Dec 15, 2024",
        description: `<h3>📦 Premium Features</h3><p>WinRAR Premium MOD with lifetime license and no trial limitations.</p><h3>🔓 Unlocked Features</h3><ul><li>Lifetime license</li><li>No trial limitations</li><li>All archive formats supported</li><li>Enhanced compression</li></ul>`,
        downloads: [
            { type: "64-bit", size: "3.2 MB", url: "https://www.mediafire.com/file/wr123mod/winrar-premium-mod-v6.24-x64.exe/file" },
            { type: "32-bit", size: "2.9 MB", url: "https://www.mediafire.com/file/wr123mod/winrar-premium-mod-v6.24-x86.exe/file" }
        ],
        systemReq: "Windows 7/8/10/11, 512MB RAM, 5MB free space",
        oldVersions: [
            { version: "6.23", downloads: [{ type: "64-bit", size: "3.1 MB", url: "https://www.mediafire.com/file/wr456mod/winrar-premium-mod-v6.23-x64.exe/file" }] }
        ]
    },
    {
        id: 3,
        name: "IDM Premium MOD",
        developer: "Tonec Inc. (Modified)",
        tagline: "Download Manager with Premium Features",
        icon: "../img/idm.webp",
        rating: 4.7,
        category: "tools",
        trending: false,
        new: true,
        version: "6.42",
        size: "8.5 MB",
        lastUpdated: "Dec 17, 2024",
        description: `<h3>⚡ Enhanced Features</h3><p>IDM Premium MOD with lifetime activation and 32x faster downloads.</p><h3>🚀 MOD Features</h3><ul><li>Lifetime activation</li><li>32x faster downloads</li><li>Resume capability</li><li>Browser integration</li></ul>`,
        downloads: [
            { type: "32-bit", size: "8.5 MB", url: "https://www.mediafire.com/file/idm123mod/idm-premium-mod-v6.42.exe/file" }
        ],
        systemReq: "Windows 7/8/10/11, 512MB RAM, 20MB free space",
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
                            (currentFilter === 'adfree' && app.category === 'productivity') ||
                            (currentFilter === 'unlimited' && app.category === 'tools');

        return matchesSearch && matchesFilter;
    });

    appsGrid.innerHTML = '';
    
    filteredApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.onclick = () => {
            const appData = encodeURIComponent(JSON.stringify(app));
            window.location.href = `app_detail_win_mod.html?data=${appData}`;
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
