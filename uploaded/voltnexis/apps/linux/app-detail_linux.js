// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appDataParam = urlParams.get('data');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample Linux Software",
    developer: "Developer Name",
    tagline: "Software Description",
    icon: "https://via.placeholder.com/120",
    rating: 4.0,
    category: "tools",
    version: "1.0.0",
    size: "10MB",
    linuxDistro: "Ubuntu 20.04+",
    lastUpdated: "Today",
    description: `<h3>About This Software</h3><p>This is a sample Linux software description.</p>`,
    debUrl: "sample-software.deb",
    packageName: "sample-software"
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
    linuxDistro: currentApp.linuxDistro || "Ubuntu 20.04+",
    lastUpdated: currentApp.lastUpdated || "Recently",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    debUrl: currentApp.debUrl || `${currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'software'}.deb`,
    packageName: currentApp.packageName || currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'software'
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const developerName = document.getElementById('developerName');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const linuxDistro = document.getElementById('linuxDistro');
const lastUpdated = document.getElementById('lastUpdated');
const appRating = document.getElementById('appRating');
const appDescription = document.getElementById('appDescription');
const debBtn = document.getElementById('debBtn');
const rpmBtn = document.getElementById('rpmBtn');
const appimageBtn = document.getElementById('appimageBtn');
const versionsToggle = document.getElementById('versionsToggle');
const versionsList = document.getElementById('versionsList');
const oldVersionsSection = document.getElementById('oldVersionsSection');
const overlayAd = document.getElementById('overlayAd');
const closeOverlay = document.getElementById('closeOverlay');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadAppDetails();
    setupEventListeners();
    setupCodeTabs();
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - LinuxDownload by VoltNexis`;
    
    // Update app details
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
    appIcon.alt = currentApp.name;
    appName.textContent = currentApp.name;
    developerName.textContent = currentApp.developer;
    appVersion.textContent = currentApp.version;
    appSize.textContent = currentApp.size;
    linuxDistro.textContent = currentApp.linuxDistro;
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
            if (download.type.includes('DEB')) {
                btn.innerHTML = `<i class="fab fa-ubuntu"></i> ${download.type}`;
            } else if (download.type.includes('RPM')) {
                btn.innerHTML = `<i class="fab fa-redhat"></i> ${download.type}`;
                btn.classList.add('rpm-btn');
            } else if (download.type.includes('AppImage')) {
                btn.innerHTML = `<i class="fas fa-cube"></i> ${download.type}`;
                btn.classList.add('appimage-btn');
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
    
    // Update installation codes
    updateInstallationCodes();
    
    // Load old versions
    loadOldVersions();
}

function updateInstallationCodes() {
    const packageName = currentApp.packageName;
    const debFile = currentApp.debUrl ? currentApp.debUrl.split('/').pop().replace('/file', '') : `${packageName}.deb`;
    const rpmFile = currentApp.rpmUrl ? currentApp.rpmUrl.split('/').pop().replace('/file', '') : `${packageName}.rpm`;
    
    // Update Ubuntu/Debian code
    document.getElementById('ubuntu-url').textContent = currentApp.debUrl || 'package-url';
    document.getElementById('ubuntu-file').textContent = debFile;
    
    // Update Fedora/RHEL code
    document.getElementById('fedora-url').textContent = currentApp.rpmUrl || 'package-url';
    document.getElementById('fedora-file').textContent = rpmFile;
    
    // Update Arch Linux code
    document.getElementById('arch-package').textContent = packageName;
    document.getElementById('arch-url').textContent = currentApp.debUrl || 'package-url';
    document.getElementById('arch-file').textContent = `${packageName}.tar.xz`;
    
    // Update Kali Linux code
    document.getElementById('kali-url').textContent = currentApp.debUrl || 'package-url';
    document.getElementById('kali-file').textContent = debFile;
    
    // Update Parrot OS code
    document.getElementById('parrot-url').textContent = currentApp.debUrl || 'package-url';
    document.getElementById('parrot-file').textContent = debFile;
}

function setupEventListeners() {
    // DEB Download button
    debBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // RPM Download button
    rpmBtn.addEventListener('click', function() {
        const downloadUrl = this.getAttribute('data-download-url');
        startMediaFireDownload(downloadUrl);
        showOverlayAd();
    });
    
    // AppImage Download button
    appimageBtn.addEventListener('click', function() {
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

function setupCodeTabs() {
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const distro = this.dataset.distro;
            
            // Remove active class from all tabs and blocks
            codeTabs.forEach(t => t.classList.remove('active'));
            codeBlocks.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding block
            this.classList.add('active');
            document.getElementById(`${distro}-code`).classList.add('active');
        });
    });
}

function copyCode(blockId) {
    const codeBlock = document.getElementById(blockId);
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const btn = codeBlock.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
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