// URL normalization - remove trailing slash from ID-based URLs
if (window.location.search.includes('id=') && window.location.pathname.endsWith('/')) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -1) + window.location.search + window.location.hash;
    window.history.replaceState(null, null, newUrl);
}

// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appId = urlParams.get('id');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample App",
    developer: "Developer Name",
    tagline: "App Description",
    icon: "https://via.placeholder.com/120",
    rating: 4.0,
    category: "tools",
    version: "1.0.0",
    size: "10MB",
    lastUpdated: "Today",
    description: `<h3>About This App</h3><p>This is a sample app description.</p>`,
    downloadUrl: "sample-app.apk"
};

// Find app by ID or use default
let currentApp = defaultApp;

// Ensure all required fields exist
currentApp = {
    ...defaultApp,
    ...currentApp,
    version: currentApp.version || "1.0.0",
    size: currentApp.size || "Unknown",
    lastUpdated: currentApp.lastUpdated || "Recently",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    downloadUrl: currentApp.downloadUrl || `${currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'app'}.apk`,
    screenshots: currentApp.screenshots || ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"]
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const developerName = document.getElementById('developerName');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const lastUpdated = document.getElementById('lastUpdated');
const appRating = document.getElementById('appRating');
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
    // Wait for apps data to be available
    function initializeApp() {
        console.log('Initializing app with ID:', appId);
        if (appId && window.appsData) {
            const foundApp = window.appsData.find(app => app.id == appId);
            if (foundApp) {
                currentApp = foundApp;
                console.log('Found app:', currentApp.name);
            } else {
                console.log('App not found with ID:', appId);
            }
        } else {
            console.log('Using default app data');
        }
        loadAppDetails();
        setupEventListeners();
    }
    
    // Check if apps data is already available
    if (window.appsData) {
        initializeApp();
    } else {
        // Wait for apps data to load
        const checkAppsData = setInterval(() => {
            if (window.appsData) {
                clearInterval(checkAppsData);
                initializeApp();
            }
        }, 100);
    }
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - APKDownload by VoltNexis`;
    
    // Update app details with null checks
    if (appIcon) {
        appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
        appIcon.alt = currentApp.name;
    }
    if (appName) appName.textContent = currentApp.name;
    if (developerName) {
        developerName.textContent = currentApp.developer;
        developerName.href = `../developer/index.html?name=${encodeURIComponent(currentApp.developer)}`;
    }
    if (appVersion) appVersion.textContent = currentApp.version;
    if (appSize) appSize.textContent = currentApp.size;
    if (lastUpdated) lastUpdated.textContent = currentApp.lastUpdated;
    if (appDescription) appDescription.innerHTML = currentApp.description;
    
    // Update rating stars and text
    if (appRating) {
        appRating.innerHTML = generateStars(currentApp.rating);
    }
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = `${currentApp.rating} (${Math.floor(Math.random() * 5000 + 100)} reviews)`;
    }
    
    // Handle multi-part downloads or regular downloads
    const downloadButtons = document.getElementById('downloadButtons');
    if (downloadButtons) {
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
            // Fallback to old system - recreate the download button
            const mainDownloadBtn = document.createElement('button');
            mainDownloadBtn.className = 'download-btn';
            mainDownloadBtn.id = 'downloadBtn';
            mainDownloadBtn.innerHTML = '<i class="fas fa-download"></i> Download APK';
            mainDownloadBtn.setAttribute('data-download-url', currentApp.downloadUrl);
            mainDownloadBtn.addEventListener('click', function() {
                const downloadUrl = this.getAttribute('data-download-url');
                if (downloadUrl) {
                    startMediaFireDownload(downloadUrl);
                    showOverlayAd();
                }
            });
            downloadButtons.appendChild(mainDownloadBtn);
            
            // Show OBB button if app has APK+OBB
            if (currentApp.apkObb && currentApp.obbUrl) {
                const obbDownloadBtn = document.createElement('button');
                obbDownloadBtn.className = 'download-btn obb-btn';
                obbDownloadBtn.innerHTML = '<i class="fas fa-cube"></i> Download OBB';
                obbDownloadBtn.setAttribute('data-download-url', currentApp.obbUrl);
                obbDownloadBtn.addEventListener('click', function() {
                    const downloadUrl = this.getAttribute('data-download-url');
                    if (downloadUrl) {
                        startMediaFireDownload(downloadUrl);
                        showOverlayAd();
                    }
                });
                downloadButtons.appendChild(obbDownloadBtn);
            }
        }
    }
    
    // Load old versions
    loadOldVersions();
    
    // Load screenshots
    loadScreenshots();
}

function setupEventListeners() {
    // APK Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const downloadUrl = this.getAttribute('data-download-url');
            if (downloadUrl) {
                startMediaFireDownload(downloadUrl);
                showOverlayAd();
            }
        });
    }
    
    // OBB Download button
    if (obbBtn) {
        obbBtn.addEventListener('click', function() {
            const downloadUrl = this.getAttribute('data-download-url');
            if (downloadUrl) {
                startMediaFireDownload(downloadUrl);
                showOverlayAd();
            }
        });
    }
    
    // Old versions toggle
    if (versionsToggle && versionsList) {
        versionsToggle.addEventListener('click', function() {
            versionsList.classList.toggle('show');
            this.classList.toggle('fa-chevron-down');
            this.classList.toggle('fa-chevron-up');
        });
    }
    
    // Close overlay ad
    if (closeOverlay && overlayAd) {
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
    
    // Store current index for navigation
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
    
    // Event listeners
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
