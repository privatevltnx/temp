// Get developer name from URL
const urlParams = new URLSearchParams(window.location.search);
const developerName = urlParams.get('name') || 'Unknown Developer';

let allApps = [];
let currentPlatform = 'all';

// URL normalization - remove trailing slash
if (window.location.pathname.endsWith('/') && window.location.pathname.length > 1) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -1) + window.location.search + window.location.hash;
    window.history.replaceState(null, null, newUrl);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadDeveloperApps();
    setupEventListeners();
});

async function loadDeveloperApps() {
    try {
        // Load apps from all platforms
        const platforms = [
            { name: 'android', path: '../android/script.js' },
            { name: 'ios', path: '../ios/script_ios.js' },
            { name: 'windows', path: '../windows/script_exe.js' },
            { name: 'linux', path: '../linux/script_linux.js' }
        ];

        for (const platform of platforms) {
            try {
                const response = await fetch(platform.path);
                const scriptContent = await response.text();
                const appsMatch = scriptContent.match(/const apps = (\[[\s\S]*?\]);/);
                
                if (appsMatch) {
                    const apps = eval(appsMatch[1]);
                    const developerApps = apps.filter(app => 
                        app.developer === developerName
                    ).map(app => ({
                        ...app,
                        platform: platform.name
                    }));
                    allApps.push(...developerApps);
                }
            } catch (error) {
                console.log(`Could not load ${platform.name} apps:`, error);
            }
        }

        updateDeveloperInfo();
        renderApps();
    } catch (error) {
        console.error('Error loading developer apps:', error);
        document.getElementById('developerName').textContent = developerName;
    }
}

function updateDeveloperInfo() {
    document.getElementById('developerName').textContent = developerName;
    document.getElementById('pageTitle').textContent = `${developerName} - VoltNexis`;
    document.getElementById('totalApps').textContent = allApps.length;
    
    if (allApps.length > 0) {
        const avgRating = (allApps.reduce((sum, app) => sum + app.rating, 0) / allApps.length).toFixed(1);
        document.getElementById('avgRating').textContent = avgRating;
    }
}

function setupEventListeners() {
    document.querySelectorAll('.platform-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentPlatform = this.dataset.platform;
            renderApps();
        });
    });
}

function renderApps() {
    const filteredApps = currentPlatform === 'all' 
        ? allApps 
        : allApps.filter(app => app.platform === currentPlatform);

    const appsGrid = document.getElementById('appsGrid');
    
    if (filteredApps.length === 0) {
        appsGrid.innerHTML = '<p class="no-apps">No apps found for this developer on this platform.</p>';
        return;
    }

    appsGrid.innerHTML = filteredApps.map(app => createAppCard(app)).join('');
    
    // Add click listeners
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', function() {
            const appId = this.dataset.appId;
            const platform = this.dataset.platform;
            const platformPaths = {
                android: '../android/app.html',
                ios: '../ios/app_ios.html',
                windows: '../windows/app_exe.html',
                linux: '../linux/app_linux.html'
            };
            window.location.href = `${platformPaths[platform]}?id=${appId}`;
        });
    });
}

function createAppCard(app) {
    const stars = generateStars(app.rating);
    const platformIcon = getPlatformIcon(app.platform);
    
    return `
        <div class="app-card" data-app-id="${app.id}" data-platform="${app.platform}">
            <div class="app-card-header">
                <div class="app-card-icon">
                    <img src="${app.icon}" alt="${app.name}">
                </div>
                <div class="app-card-info">
                    <h3>${app.name}</h3>
                    <p class="platform">${platformIcon} ${app.platform.charAt(0).toUpperCase() + app.platform.slice(1)}</p>
                </div>
            </div>
            <p class="app-card-tagline">${app.tagline}</p>
            <div class="app-card-footer">
                <div class="app-rating">
                    <div class="stars">${stars}</div>
                    <span>${app.rating}</span>
                </div>
                <span class="version">v${app.version}</span>
            </div>
        </div>
    `;
}

function getPlatformIcon(platform) {
    const icons = {
        android: '<i class="fab fa-android"></i>',
        ios: '<i class="fab fa-apple"></i>',
        windows: '<i class="fab fa-windows"></i>',
        linux: '<i class="fab fa-linux"></i>'
    };
    return icons[platform] || '<i class="fas fa-mobile-alt"></i>';
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