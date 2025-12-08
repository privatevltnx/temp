// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appId = urlParams.get('id');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample Windows Software",
    developer: "Developer Name",
    tagline: "Software Description",
    icon: "https://via.placeholder.com/120",
    rating: 4.0,
    category: "tools",
    version: "1.0.0",
    size: "10MB",
    windowsVersion: "10+",
    lastUpdated: "Today",
    description: `<h3>About This Software</h3><p>This is a sample Windows software description.</p>`,
    downloadUrl: "sample-software.exe"
};

// Find app by ID or use default
let currentApp = defaultApp;

// Ensure all required fields exist
currentApp = {
    ...defaultApp,
    ...currentApp,
    version: currentApp.version || "1.0.0",
    size: currentApp.size || "Unknown",
    windowsVersion: currentApp.windowsVersion || "10+",
    lastUpdated: currentApp.lastUpdated || "Recently",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    downloadUrl: currentApp.downloadUrl || `${currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'software'}.exe`,
    screenshots: currentApp.screenshots || ["https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350", "https://via.placeholder.com/200x350"]
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const developerName = document.getElementById('developerName');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const windowsVersion = document.getElementById('windowsVersion');
const lastUpdated = document.getElementById('lastUpdated');
const appRating = document.getElementById('appRating');
const appDescription = document.getElementById('appDescription');
const downloadBtn = document.getElementById('downloadBtn');
const msiBtn = document.getElementById('msiBtn');
const versionsToggle = document.getElementById('versionsToggle');
const versionsList = document.getElementById('versionsList');
const oldVersionsSection = document.getElementById('oldVersionsSection');
const overlayAd = document.getElementById('overlayAd');
const closeOverlay = document.getElementById('closeOverlay');

// URL normalization - remove trailing slash
if (window.location.pathname.endsWith('/') && window.location.pathname.length > 1) {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname.slice(0, -1) + window.location.search + window.location.hash;
    window.history.replaceState(null, null, newUrl);
}

// Dynamic Ad System
const adData = {
    banner: [
        { img: 'https://i.ibb.co/gL8CF4Fy/11.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/0kc6kVj/6.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/7t56mhLk/converted-4.jpg', url: 'https://codexaura.vercel.app' },
        { img: 'https://i.ibb.co/Q3TbRyXv/converted-4.jpg', url: 'https://fixmitra.vercel.app' },
        { img: 'https://i.ibb.co/k2GBNGF9/3.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/Z6XL26MZ/1.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/BHdjJR8r/4.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/5Xvw7QKW/4.jpg', url: 'https://voltnexis.github.io/learn' },
        { img: 'https://i.ibb.co/whpC94qr/1.jpg', url: 'https://wandermatch.vercel.app' },
        { img: 'https://i.ibb.co/S4ykt4Hz/1.jpg', url: 'https://servetracko.vercel.app' },
        { img: 'https://i.ibb.co/0VMPrK9b/1.jpg', url: 'https://voltnexis.github.io/web2app' },
        { img: 'https://i.ibb.co/Q3HT70gR/1.jpg', url: 'https://voltnexisstudio.vercel.app' },
        { img: 'https://i.ibb.co/DDKX9kgx/1.jpg', url: 'https://voltnexis.github.io/pureparent' },
        { img: 'https://i.ibb.co/G4RwvC85/1.jpg', url: 'https://voltnexis.github.io/promptverse' },
        { img: 'https://i.ibb.co/7JDZ8Qrs/1.jpg', url: 'https://voltnexis.github.io/builds' }
    ],
    square: [
        { img: 'https://i.ibb.co/3y51t5tr/9.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/XZtZkFBy/converted-5.jpg', url: 'https://codexaura.vercel.app' },
        { img: 'https://i.ibb.co/9909qWpH/converted-5.jpg', url: 'https://fixmitra.vercel.app' },
        { img: 'https://i.ibb.co/XrqBnmY4/4.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/fzLDTWN2/5.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/Gf3YQFgn/2.jpg', url: 'https://voltnexis.github.io/learn' },
        { img: 'https://i.ibb.co/dsc56TNw/2.jpg', url: 'https://wandermatch.vercel.app' },
        { img: 'https://i.ibb.co/bgmYdzvV/2.jpg', url: 'https://servetracko.vercel.app' },
        { img: 'https://i.ibb.co/Q33cZsXT/2.jpg', url: 'https://voltnexis.github.io/web2app' },
        { img: 'https://i.ibb.co/whdw8c5G/2.jpg', url: 'https://voltnexisstudio.vercel.app' },
        { img: 'https://i.ibb.co/gLwgqr62/2.jpg', url: 'https://voltnexis.github.io/pureparent' },
        { img: 'https://i.ibb.co/WWS6hhFz/2.jpg', url: 'https://voltnexis.github.io/promptverse' },
        { img: 'https://i.ibb.co/zV9mQrgJ/2.jpg', url: 'https://voltnexis.github.io/builds' }
    ],
    vertical: [
        { img: 'https://i.ibb.co/mCWVTVVd/8.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/qLzXjWg5/converted-3.jpg', url: 'https://codexaura.vercel.app' },
        { img: 'https://i.ibb.co/pBmzCkYk/converted-2.jpg', url: 'https://fixmitra.vercel.app' },
        { img: 'https://i.ibb.co/TB45crZc/2.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/mC2m4gRS/3.jpg', url: 'https://voltnexis.github.io/learn' },
        { img: 'https://i.ibb.co/j9RfH5J3/3.jpg', url: 'https://wandermatch.vercel.app' },
        { img: 'https://i.ibb.co/ksPRY3jg/3.jpg', url: 'https://servetracko.vercel.app' },
        { img: 'https://i.ibb.co/Wv33w9yp/3.jpg', url: 'https://voltnexis.github.io/web2app' },
        { img: 'https://i.ibb.co/2Ym2nYq2/3.jpg', url: 'https://voltnexisstudio.vercel.app' },
        { img: 'https://i.ibb.co/ksJFNcY7/3.jpg', url: 'https://voltnexis.github.io/pureparent' },
        { img: 'https://i.ibb.co/8D9Mhpzh/3.jpg', url: 'https://voltnexis.github.io/promptverse' },
        { img: 'https://i.ibb.co/0yhmx1S9/22.jpg', url: 'https://voltnexis.github.io/promptverse' },
        { img: 'https://i.ibb.co/ZphvJL2L/3.jpg', url: 'https://voltnexis.github.io/builds' }
    ],
    wide: [
        { img: 'https://i.ibb.co/wZ0Dcvw2/10.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/7x52TGVC/5.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/WpF7cQBs/converted-1.jpg', url: 'https://codexaura.vercel.app' },
        { img: 'https://i.ibb.co/VYTbQj4D/converted-3.jpg', url: 'https://fixmitra.vercel.app' },
        { img: 'https://i.ibb.co/mC0Mj06n/converted-6.jpg', url: 'https://fixmitra.vercel.app' },
        { img: 'https://i.ibb.co/ks3b0mgx/5.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/XfnfBN3k/1.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/21wF8Vwj/1.jpg', url: 'https://voltnexis.github.io/learn' },
        { img: 'https://i.ibb.co/LX0rzTNJ/4.jpg', url: 'https://wandermatch.vercel.app' },
        { img: 'https://i.ibb.co/qhRGpGt/4.jpg', url: 'https://servetracko.vercel.app' },
        { img: 'https://i.ibb.co/XrL0b1Fj/4.jpg', url: 'https://voltnexisstudio.vercel.app' },
        { img: 'https://i.ibb.co/bfD6Vnc/4.jpg', url: 'https://voltnexis.github.io/pureparent' },
        { img: 'https://i.ibb.co/CKrzYy8t/4.jpg', url: 'https://voltnexis.github.io/promptverse' },
        { img: 'https://i.ibb.co/fGDJ8vzX/4.jpg', url: 'https://voltnexis.github.io/builds' }
    ],
    overlay: [
        { img: 'https://i.ibb.co/21RWyFTp/7.png', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/zWYYDKvV/converted-2.jpg', url: 'https://codexaura.vercel.app' },
        { img: 'https://i.ibb.co/JjDwRcLT/converted-1.jpg', url: 'https://fixmitra.vercel.app' },
        { img: 'https://i.ibb.co/XrqBnmY4/4.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/ymFdTB2w/2.jpg', url: 'https://voltnexis.github.io' },
        { img: 'https://i.ibb.co/YwmvkGs/5.jpg', url: 'https://voltnexis.github.io/learn' },
        { img: 'https://i.ibb.co/KgDFHsY/5.jpg', url: 'https://wandermatch.vercel.app' },
        { img: 'https://i.ibb.co/sdvF438P/5.jpg', url: 'https://servetracko.vercel.app' },
        { img: 'https://i.ibb.co/79tSz7H/5.jpg', url: 'https://voltnexis.github.io/web2app' },
        { img: 'https://i.ibb.co/jZG35S2P/5.jpg', url: 'https://voltnexisstudio.vercel.app' },
        { img: 'https://i.ibb.co/ynBFgDJz/5.jpg', url: 'https://voltnexis.github.io/pureparent' },
        { img: 'https://i.ibb.co/N6qDYN44/5.jpg', url: 'https://voltnexis.github.io/promptverse' },
        { img: 'https://i.ibb.co/mCmjDDkD/5.jpg', url: 'https://voltnexis.github.io/builds' }
        
    ]
};

function getRandomAd(type) {
    const ads = adData[type];
    return ads[Math.floor(Math.random() * ads.length)];
}

function createAdElement(ad, className) {
    return `<a href="${ad.url}" target="_blank" class="custom-ad">
        <img src="${ad.img}" alt="VoltNexis" class="${className}">
    </a>`;
}

function loadDynamicAds() {
    document.getElementById('topAd').innerHTML = createAdElement(getRandomAd('banner'), 'ad-banner-img');
    document.getElementById('leftAd').innerHTML = createAdElement(getRandomAd('square'), 'ad-square-img');
    document.getElementById('rightAd').innerHTML = createAdElement(getRandomAd('vertical'), 'ad-vertical-img');
    document.getElementById('bottomAd').innerHTML = createAdElement(getRandomAd('wide'), 'ad-wide-img');
    document.getElementById('overlayAdContent').innerHTML = createAdElement(getRandomAd('overlay'), 'ad-overlay-img');
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
    loadDynamicAds();
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - EXEDownload by VoltNexis`;
    
    // Update app details
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
    appIcon.alt = currentApp.name;
    appName.textContent = currentApp.name;
    developerName.textContent = currentApp.developer;
    developerName.href = `../developer/index.html?name=${encodeURIComponent(currentApp.developer)}`;
    appVersion.textContent = currentApp.version;
    appSize.textContent = currentApp.size;
    windowsVersion.textContent = currentApp.windowsVersion;
    lastUpdated.textContent = currentApp.lastUpdated;
    appDescription.innerHTML = currentApp.description;
    
    // Update rating stars and text
    appRating.innerHTML = generateStars(currentApp.rating);
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = `${currentApp.rating} (${Math.floor(Math.random() * 5000 + 100)} reviews)`;
    }
    
    // Create download buttons
    const downloadButtons = document.getElementById('downloadButtons');
    downloadButtons.innerHTML = '';
    
    if (currentApp.downloads && currentApp.downloads.length > 0) {
        currentApp.downloads.forEach(download => {
            const btn = document.createElement('button');
            btn.className = 'download-btn';
            if (download.type.includes('Tutorial')) {
                btn.innerHTML = `<i class="fas fa-book"></i> ${download.type}`;
                btn.classList.add('tutorial-btn');
            } else if (download.type.includes('Coming Soon')) {
                btn.innerHTML = `<i class="fas fa-clock"></i> ${download.type}`;
                btn.classList.add('coming-soon-btn');
                btn.disabled = true;
            } else if (download.type.includes('Game') || download.type === 'game') {
                btn.innerHTML = `<i class="fas fa-gamepad"></i> Download Game (${download.size})`;
            } else if (download.type.includes('Part')) {
                btn.innerHTML = `<i class="fas fa-download"></i> ${download.type} (${download.size})`;
            } else {
                btn.innerHTML = `<i class="fab fa-windows"></i> Download EXE (${download.type})`;
            }
            btn.setAttribute('data-download-url', download.url);
            btn.addEventListener('click', function() {
                const downloadUrl = this.getAttribute('data-download-url');
                startMediaFireDownload(downloadUrl);
                showOverlayAd();
            });
            downloadButtons.appendChild(btn);
        });
    }
    
    // Load old versions
    loadOldVersions();
    
    // Load screenshots
    loadScreenshots();
}

function setupEventListeners() {
    // EXE Download button
    downloadBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // MSI Download button
    msiBtn.addEventListener('click', function() {
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
            const downloadBtns = version.downloads ? version.downloads.map(dl => 
                `<button class="version-download" data-url="${dl.url}">${dl.type} (${dl.size})</button>`
            ).join('') : '';
            return `
                <div class="version-item">
                    <span class="version-info">Version ${version.version}</span>
                    <div class="version-buttons">${downloadBtns}</div>
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
        background: linear-gradient(45deg, #0078D4, #106EBE);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0, 120, 212, 0.3);
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
