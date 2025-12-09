// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appId = urlParams.get('id');

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const developerLink = document.getElementById('developerLink');
const appSize = document.getElementById('appSize');
const appVersion = document.getElementById('appVersion');
const iosVersion = document.getElementById('iosVersion');
const appRating = document.getElementById('appRating');
const ratingText = document.getElementById('ratingText');
const appAbout = document.getElementById('appAbout');
const downloadButtonsContainer = document.getElementById('downloadButtonsContainer');
const screenshotsSection = document.getElementById('screenshotsSection');
const screenshotsContainer = document.getElementById('screenshotsContainer');
const whatsNewSection = document.getElementById('whatsNewSection');
const whatsNewContent = document.getElementById('whatsNewContent');
const moreFromProviderSection = document.getElementById('moreFromProviderSection');
const providerName = document.getElementById('providerName');
const providerAppsContainer = document.getElementById('providerAppsContainer');
const screenshotModal = document.getElementById('screenshotModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const prevScreenshot = document.getElementById('prevScreenshot');
const nextScreenshot = document.getElementById('nextScreenshot');
const currentScreenshotSpan = document.getElementById('currentScreenshot');
const totalScreenshotsSpan = document.getElementById('totalScreenshots');
const pageTitle = document.getElementById('pageTitle');

let currentApp = null;
let currentScreenshotIndex = 0;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    loadAppData();
});

function loadAppData() {
    if (!appId || !window.appsData) {
        showError('App not found');
        return;
    }

    currentApp = window.appsData.find(app => app.id == appId);
    
    if (!currentApp) {
        showError('App not found');
        return;
    }

    renderAppDetails();
}

function renderAppDetails() {
    // Update page title
    pageTitle.textContent = `${currentApp.name} - VoltNexis Apps`;
    document.title = pageTitle.textContent;

    // App Icon
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/160';
    appIcon.alt = currentApp.name;
    appIcon.onerror = function() {
        this.src = 'https://via.placeholder.com/160?text=App';
    };

    // App Name
    appName.textContent = currentApp.name;

    // Developer Link
    const developerName = currentApp.developer || 'Developer';
    developerLink.textContent = `by ${developerName}`;
    developerLink.href = `https://voltnexis.github.io/apps/developer/index.html?name=${encodeURIComponent(developerName)}`;

    // App Info
    appSize.textContent = currentApp.size || 'Unknown';
    appVersion.textContent = `v${currentApp.version}` || 'Unknown';
    iosVersion.textContent = currentApp.iosVersion || 'Unknown';

    // Rating
    renderRating(currentApp.rating);

    // Download Buttons
    renderDownloadButtons();

    // About Section
    renderAbout();

    // Screenshots
    renderScreenshots();

    // What's New (if available)
    renderWhatsNew();

    // More from Provider
    renderMoreFromProvider();
}

function renderRating(rating) {
    if (!rating) rating = 0;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    appRating.innerHTML = starsHTML;

    // Rating text
    const reviewCount = Math.floor(Math.random() * 5000 + 100);
    ratingText.textContent = `${rating.toFixed(1)} (${reviewCount.toLocaleString()} reviews)`;
}

function renderDownloadButtons() {
    downloadButtonsContainer.innerHTML = '';

    if (currentApp.downloads && Array.isArray(currentApp.downloads) && currentApp.downloads.length > 0) {
        currentApp.downloads.forEach((download, index) => {
            const btn = document.createElement('button');
            btn.className = index === 0 ? 'download-btn-primary' : 'download-btn-secondary';
            
            let icon = '<i class="fas fa-download"></i>';
            if (download.type.toLowerCase().includes('tutorial')) {
                icon = '<i class="fas fa-book"></i>';
            } else if (download.type.toLowerCase().includes('ipa')) {
                icon = '<i class="fas fa-apple"></i>';
            } else if (download.type.toLowerCase().includes('deb')) {
                icon = '<i class="fas fa-cube"></i>';
            }

            btn.innerHTML = `${icon} <span>${download.type} ${download.size ? `(${download.size})` : ''}</span>`;
            btn.onclick = function() {
                downloadApp(download.url, download.type);
            };
            downloadButtonsContainer.appendChild(btn);
        });
    } else if (currentApp.downloadUrl) {
        const btn = document.createElement('button');
        btn.className = 'download-btn-primary';
        btn.innerHTML = '<i class="fas fa-download"></i> <span>Download</span>';
        btn.onclick = function() {
            downloadApp(currentApp.downloadUrl, 'Download');
        };
        downloadButtonsContainer.appendChild(btn);
    }
}

function downloadApp(url, type) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #1f73e6, #4285f4);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(31, 115, 230, 0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `Starting download: ${type}`;
    document.body.appendChild(notification);

    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();

    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function renderAbout() {
    if (currentApp.description) {
        appAbout.innerHTML = currentApp.description;
    } else {
        appAbout.innerHTML = `<p>${currentApp.tagline || 'No description available.'}</p>`;
    }
}

function renderScreenshots() {
    if (!currentApp.screenshots || currentApp.screenshots.length === 0) {
        screenshotsSection.style.display = 'none';
        return;
    }

    screenshotsSection.style.display = 'block';
    totalScreenshotsSpan.textContent = currentApp.screenshots.length;

    screenshotsContainer.innerHTML = currentApp.screenshots.map((screenshot, index) => `
        <div class="screenshot-item" onclick="openScreenshot(${index})">
            <img src="${screenshot}" alt="Screenshot ${index + 1}" loading="lazy">
        </div>
    `).join('');
}

function openScreenshot(index) {
    currentScreenshotIndex = index;
    displayScreenshot(index);
    screenshotModal.classList.add('show');
}

function displayScreenshot(index) {
    if (index < 0 || index >= currentApp.screenshots.length) return;
    
    currentScreenshotIndex = index;
    modalImage.src = currentApp.screenshots[index];
    currentScreenshotSpan.textContent = index + 1;
}

function closeScreenshot() {
    screenshotModal.classList.remove('show');
}

function previousScreenshot() {
    if (currentScreenshotIndex > 0) {
        displayScreenshot(currentScreenshotIndex - 1);
    } else {
        displayScreenshot(currentApp.screenshots.length - 1);
    }
}

function nextScreenshot() {
    if (currentScreenshotIndex < currentApp.screenshots.length - 1) {
        displayScreenshot(currentScreenshotIndex + 1);
    } else {
        displayScreenshot(0);
    }
}

function renderWhatsNew() {
    if (currentApp.whatsNew) {
        whatsNewSection.style.display = 'block';
        whatsNewContent.textContent = currentApp.whatsNew;
    } else {
        whatsNewSection.style.display = 'none';
    }
}

function renderMoreFromProvider() {
    if (!currentApp.developer) {
        moreFromProviderSection.style.display = 'none';
        return;
    }

    const developerApps = window.appsData.filter(app => 
        app.developer === currentApp.developer && app.id !== currentApp.id
    );

    if (developerApps.length === 0) {
        moreFromProviderSection.style.display = 'none';
        return;
    }

    moreFromProviderSection.style.display = 'block';
    providerName.textContent = currentApp.developer;

    providerAppsContainer.innerHTML = developerApps.map(app => `
        <div class="provider-app-card" onclick="goToApp(${app.id})">
            <img src="${app.icon}" alt="${app.name}" class="provider-app-icon" loading="lazy">
            <div class="provider-app-name">${app.name}</div>
            <div class="provider-app-rating">
                <span>⭐ ${app.rating || 0}</span>
            </div>
        </div>
    `).join('');
}

function goToApp(appId) {
    window.location.href = `app-detail.html?id=${appId}`;
}

function showError(message) {
    appAbout.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Modal Event Listeners
modalClose.addEventListener('click', closeScreenshot);
prevScreenshot.addEventListener('click', previousScreenshot);
nextScreenshot.addEventListener('click', nextScreenshot);

// Close modal when clicking outside
screenshotModal.addEventListener('click', function(e) {
    if (e.target === screenshotModal) {
        closeScreenshot();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (screenshotModal.classList.contains('show')) {
        if (e.key === 'ArrowLeft') previousScreenshot();
        if (e.key === 'ArrowRight') nextScreenshot();
        if (e.key === 'Escape') closeScreenshot();
    }
});

// Add slide-in animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
