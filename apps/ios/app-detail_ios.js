// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appId = urlParams.get('id');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample iOS App",
    developer: "Developer Name",
    tagline: "App Description",
    icon: "https://via.placeholder.com/120",
    rating: 4.0,
    category: "tools",
    version: "1.0.0",
    size: "10MB",
    iosVersion: "14.0+",
    lastUpdated: "Today",
    description: `<h3>About This App</h3><p>This is a sample iOS app description.</p>`,
    downloadUrl: "sample-app.ipa"
};

// Find app by ID or use default
let currentApp = defaultApp;

// Ensure all required fields exist
currentApp = {
    ...defaultApp,
    ...currentApp,
    version: currentApp.version || "1.0.0",
    size: currentApp.size || "Unknown",
    iosVersion: currentApp.iosVersion || "14.0+",
    lastUpdated: currentApp.lastUpdated || "Recently",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    downloadUrl: currentApp.downloadUrl || `${currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'app'}.ipa`,
    screenshots: currentApp.screenshots || ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"]
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const developerName = document.getElementById('developerName');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const iosVersion = document.getElementById('iosVersion');
const lastUpdated = document.getElementById('lastUpdated');
const appRating = document.getElementById('appRating');
const appDescription = document.getElementById('appDescription');
const downloadBtn = document.getElementById('downloadBtn');
const debBtn = document.getElementById('debBtn');
const versionsToggle = document.getElementById('versionsToggle');
const versionsList = document.getElementById('versionsList');
const oldVersionsSection = document.getElementById('oldVersionsSection');
const overlayAd = document.getElementById('overlayAd');
const closeOverlay = document.getElementById('closeOverlay');

// URL normalization - remove trailing slash from ID-based URLs
if (window.location.search.includes('id=') && window.location.pathname.endsWith('/')) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -1) + window.location.search + window.location.hash;
    window.history.replaceState(null, null, newUrl);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Find app by ID after DOM is loaded
    if (appId && window.appsData) {
        const foundApp = window.appsData.find(app => app.id == appId);
        if (foundApp) {
            currentApp = foundApp;
        }
    }
    loadAppDetails();
    setupEventListeners();
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - iOSDownload by VoltNexis`;
    
    // Update app details
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
    appIcon.alt = currentApp.name;
    appName.textContent = currentApp.name;
    developerName.textContent = currentApp.developer;
    developerName.href = `../developer/index.html?name=${encodeURIComponent(currentApp.developer)}`;
    appVersion.textContent = currentApp.version;
    appSize.textContent = currentApp.size;
    iosVersion.textContent = currentApp.iosVersion;
    lastUpdated.textContent = currentApp.lastUpdated;
    appDescription.innerHTML = currentApp.description;
    
    // Update rating stars and text
    appRating.innerHTML = generateStars(currentApp.rating);
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = `${currentApp.rating} (${Math.floor(Math.random() * 5000 + 100)} reviews)`;
    }
    
    // Handle multi-part downloads or regular downloads
    const downloadButtons = document.getElementById('downloadButtons');
    downloadButtons.innerHTML = '';
    
    if (currentApp.downloads && currentApp.downloads.length > 0) {
        currentApp.downloads.forEach(download => {
            const btn = document.createElement('button');
            btn.className = 'download-btn';
            if (download.type.includes('Tutorial')) {
                btn.innerHTML = `<i class="fas fa-book"></i> ${download.type}`;
                btn.classList.add('tutorial-btn');
            } else {
                btn.innerHTML = `<i class="fas fa-download"></i> ${download.type} (${download.size})`;
            }
            btn.setAttribute('data-download-url', download.url);
            btn.addEventListener('click', function() {
                const downloadUrl = this.getAttribute('data-download-url');
                startMediaFireDownload(downloadUrl);
                showOverlayAd();
            });
            downloadButtons.appendChild(btn);
        });
    } else {
        // Fallback to old system
        downloadBtn.setAttribute('data-download-url', currentApp.downloadUrl);
        
        // Show DEB button if app has IPA+DEB
        if (currentApp.ipaDeb && currentApp.debUrl) {
            debBtn.style.display = 'inline-flex';
            debBtn.setAttribute('data-download-url', currentApp.debUrl);
        }
    }
    
    // Load old versions
    loadOldVersions();
    
    // Load screenshots
    loadScreenshots();
}

function setupEventListeners() {
    // IPA Download button
    downloadBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // DEB Download button
    debBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // Old versions toggle
    versionsToggle.addEventListener('click', function() {
        versionsList.classList.toggle('show');
        this.classList.toggle('fa-chevron-down');
        this.classList.toggle('fa-chevron-up');
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

function startMediaFireDownload(mediaFireUrl) {
    // Extract direct download link from MediaFire URL
    const directUrl = convertMediaFireUrl(mediaFireUrl);
    
    // Create hidden iframe for auto-download
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = directUrl;
    document.body.appendChild(iframe);
    
    // Remove iframe after 5 seconds
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 5000);
    
    // Show download notification
    const filename = mediaFireUrl.split('/').pop().replace('/file', '');
    showDownloadNotification(filename);
}

function convertMediaFireUrl(mediaFireUrl) {
    // Convert MediaFire URL to direct download
    if (mediaFireUrl.includes('mediafire.com')) {
        return mediaFireUrl.replace('/file/', '/download/').replace('/file', '');
    }
    return mediaFireUrl;
}

function loadOldVersions() {
    if (!currentApp.oldVersions || currentApp.oldVersions.length === 0) {
        if (oldVersionsSection) {
            oldVersionsSection.style.display = 'none';
        }
        return;
    }
    
    if (oldVersionsSection) {
        oldVersionsSection.style.display = 'block';
    }
    
    if (versionsList) {
        versionsList.innerHTML = currentApp.oldVersions.map(version => {
            const hasDeb = version.debUrl ? `<button class="version-download deb-download" data-url="${version.debUrl}">DEB</button>` : '';
            return `
                <div class="version-item">
                    <span class="version-info">Version ${version.version} (${version.size})</span>
                    <div class="version-buttons">
                        <button class="version-download" data-url="${version.url}">IPA</button>
                        ${hasDeb}
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
}

function showDownloadNotification(filename) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #007AFF, #0051D5);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 122, 255, 0.3);
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

function loadScreenshots() {
    const screenshotsGrid = document.querySelector('.screenshots-grid');
    if (screenshotsGrid && currentApp.screenshots) {
        screenshotsGrid.innerHTML = currentApp.screenshots.map((screenshot, index) => 
            `<img src="${screenshot}" alt="Screenshot ${index + 1}" onclick="openScreenshotModal('${screenshot}', ${index})">`
        ).join('');
    }
}

function openScreenshotModal(imageSrc, index) {
    const modal = document.getElementById('screenshotModal') || createScreenshotModal();
    const modalImg = modal.querySelector('.modal-image');
    const counter = modal.querySelector('.image-counter');
    
    modalImg.src = imageSrc;
    counter.textContent = `${index + 1} / ${currentApp.screenshots.length}`;
    modal.style.display = 'flex';
    
    modal.currentIndex = index;
}

function createScreenshotModal() {
    const modal = document.createElement('div');
    modal.id = 'screenshotModal';
    modal.className = 'screenshot-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="Screenshot">
            <div class="modal-nav">
                <button class="nav-btn prev-btn">&#8249;</button>
                <span class="image-counter">1 / 1</span>
                <button class="nav-btn next-btn">&#8250;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').onclick = () => modal.style.display = 'none';
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    modal.querySelector('.prev-btn').onclick = () => navigateScreenshot(-1);
    modal.querySelector('.next-btn').onclick = () => navigateScreenshot(1);
    
    return modal;
}

function navigateScreenshot(direction) {
    const modal = document.getElementById('screenshotModal');
    const newIndex = modal.currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < currentApp.screenshots.length) {
        openScreenshotModal(currentApp.screenshots[newIndex], newIndex);
    }
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