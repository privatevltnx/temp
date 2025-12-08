// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appDataParam = urlParams.get('data');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample Windows MOD",
    developer: "Developer Name",
    tagline: "Premium Windows Software",
    icon: "https://via.placeholder.com/120",
    rating: 4.5,
    category: "tools",
    version: "1.0.0",
    size: "25MB",
    lastUpdated: "Today",
    arch: "64bit",
    systemReq: "Windows 10/11, 4GB RAM, 1GB free space",
    description: `<h3>MOD Features</h3><p>• Premium unlocked<br>• Lifetime license<br>• Enhanced performance<br>• No subscription required</p>`,
    downloadUrl: "sample-mod.exe"
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
    systemReq: currentApp.systemReq || "Windows 10/11, 4GB RAM",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    downloads: currentApp.downloads || [{ type: "Universal", size: currentApp.size || "Unknown", url: "#" }]
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const appDeveloper = document.getElementById('appDeveloper');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const appCategory = document.getElementById('appCategory');
const systemText = document.getElementById('systemText');
const appDescription = document.getElementById('appDescription');
const downloadOptions = document.getElementById('downloadOptions');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadAppDetails();
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - Windows MOD Download by VoltNexis`;
    
    // Update app details
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
    appIcon.alt = currentApp.name;
    appName.textContent = currentApp.name;
    appDeveloper.textContent = currentApp.developer;
    appVersion.textContent = `v${currentApp.version}`;
    appSize.textContent = currentApp.size;
    appCategory.textContent = currentApp.category;
    systemText.textContent = currentApp.systemReq;
    appDescription.innerHTML = currentApp.description;
    
    // Create download buttons
    downloadOptions.innerHTML = '';
    if (currentApp.downloads && currentApp.downloads.length > 0) {
        currentApp.downloads.forEach(download => {
            const downloadBtn = document.createElement('a');
            downloadBtn.className = 'download-btn';
            downloadBtn.href = download.url;
            downloadBtn.innerHTML = `
                <div class="download-info">
                    <i class="fas fa-download"></i>
                    <div>
                        <div>Download EXE (${download.type})</div>
                        <div style="font-size: 12px; opacity: 0.8;">${download.size} • MediaFire</div>
                    </div>
                </div>
                <i class="fas fa-external-link-alt"></i>
            `;
            downloadOptions.appendChild(downloadBtn);
        });
    }
    
    // Load old versions
    loadOldVersions();
}

function loadOldVersions() {
    const oldVersionsSection = document.getElementById('oldVersionsSection');
    if (!currentApp.oldVersions || currentApp.oldVersions.length === 0) {
        if (oldVersionsSection) oldVersionsSection.style.display = 'none';
        return;
    }
    
    if (oldVersionsSection) {
        oldVersionsSection.style.display = 'block';
        const versionsList = document.getElementById('versionsList');
        if (versionsList) {
            versionsList.innerHTML = currentApp.oldVersions.map(version => {
                const downloadBtns = version.downloads ? version.downloads.map(dl => 
                    `<a href="${dl.url}" class="version-download">${dl.type} (${dl.size})</a>`
                ).join('') : '';
                return `
                    <div class="version-item">
                        <span class="version-info">Version ${version.version}</span>
                        <div class="version-buttons">${downloadBtns}</div>
                    </div>
                `;
            }).join('');
        }
    }
}