// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appDataParam = urlParams.get('data');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample MOD APK",
    developer: "Developer Name",
    tagline: "Premium MOD Features",
    icon: "https://via.placeholder.com/120",
    rating: 4.5,
    category: "tools",
    version: "1.0.0",
    size: "25MB",
    lastUpdated: "Today",
    description: `<h3>MOD Features</h3><p>• Premium unlocked<br>• Ad-free experience<br>• Unlimited features<br>• Enhanced performance</p>`,
    downloadUrl: "sample-mod.apk"
};

// Parse app data or use default
let currentApp;
try {
    currentApp = appDataParam ? JSON.parse(decodeURIComponent(appDataParam)) : defaultApp;
} catch (e) {
    currentApp = defaultApp;
}

// Ensure all required fields exist
currentApp = {
    ...defaultApp,
    ...currentApp,
    version: currentApp.version || "1.0.0",
    size: currentApp.size || "Unknown",
    lastUpdated: currentApp.lastUpdated || "Recently",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    downloadUrl: currentApp.downloadUrl || `${currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'app'}.apk`
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const developerName = document.getElementById('developerName');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const lastUpdated = document.getElementById('lastUpdated');
const appRating = document.getElementById('appRating');
const ratingText = document.getElementById('ratingText');
const appDescription = document.getElementById('appDescription');
const downloadBtn = document.getElementById('downloadBtn');
const obbBtn = document.getElementById('obbBtn');
const versionsToggle = document.getElementById('versionsToggle');
const versionsList = document.getElementById('versionsList');
const oldVersionsSection = document.getElementById('oldVersionsSection');
const overlayAd = document.getElementById('overlayAd');
const closeOverlay = document.getElementById('closeOverlay');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadAppDetails();
    setupEventListeners();
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - MOD APK Download by VoltNexis`;
    
    // Update app details
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
    appIcon.alt = currentApp.name;
    appName.textContent = currentApp.name;
    developerName.textContent = currentApp.developer;
    appVersion.textContent = currentApp.version;
    appSize.textContent = currentApp.size;
    lastUpdated.textContent = currentApp.lastUpdated;
    appDescription.innerHTML = currentApp.description;
    
    // Update rating stars and text
    appRating.innerHTML = generateStars(currentApp.rating);
    ratingText.textContent = `${currentApp.rating} (${Math.floor(Math.random() * 5000 + 100)} reviews)`;
    
    // Update download buttons
    downloadBtn.setAttribute('data-download-url', currentApp.downloadUrl);
    
    // Show OBB button if app has APK+OBB
    if (currentApp.apkObb && currentApp.obbUrl) {
        obbBtn.style.display = 'inline-flex';
        obbBtn.setAttribute('data-download-url', currentApp.obbUrl);
    }
    
    // Load old versions
    loadOldVersions();
}

function setupEventListeners() {
    // APK Download button
    downloadBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // OBB Download button
    obbBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // Old versions toggle
    versionsToggle.addEventListener('click', function() {
        versionsList.classList.toggle('show');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
    
    // Close overlay ad
    closeOverlay.addEventListener('click', function() {
        overlayAd.classList.remove('show');
    });
    
    // Close overlay when clicking outside
    overlayAd.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
}

function startMediaFireDownload(downloadUrl) {
    // Create download link and trigger auto-download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download notification
    const filename = downloadUrl.split('/').pop();
    showDownloadNotification(filename);
}

function loadOldVersions() {
    if (!currentApp.oldVersions || currentApp.oldVersions.length === 0) {
        oldVersionsSection.style.display = 'none';
        return;
    }
    
    oldVersionsSection.style.display = 'block';
    
    versionsList.innerHTML = currentApp.oldVersions.map(version => {
        const hasObb = version.obbUrl ? `<button class="version-download obb-download" data-url="${version.obbUrl}">OBB</button>` : '';
        return `
            <div class="version-item">
                <span class="version-info">Version ${version.version} (${version.size})</span>
                <div class="version-buttons">
                    <button class="version-download" data-url="${version.url}">APK</button>
                    ${hasObb}
                </div>
            </div>
        `;
    }).join('');
    
    // Add event listeners to version download buttons
    setTimeout(() => {
        document.querySelectorAll('.version-download').forEach(btn => {
            btn.addEventListener('click', function() {
                const downloadUrl = this.getAttribute('data-url');
                startMediaFireDownload(downloadUrl);
                showOverlayAd();
            });
        });
    }, 100);
}

function showDownloadNotification(filename) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
    `;
    notification.textContent = `Download started: ${filename}`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function showOverlayAd() {
    overlayAd.classList.add('show');
    
    // Auto-close after 5 seconds (optional)
    setTimeout(() => {
        if (overlayAd.classList.contains('show')) {
            overlayAd.classList.remove('show');
        }
    }, 5000);
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
