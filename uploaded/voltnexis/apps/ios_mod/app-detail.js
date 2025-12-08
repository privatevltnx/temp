// Get app data from URL
const urlParams = new URLSearchParams(window.location.search);
const appDataParam = urlParams.get('data');

// Default app data if no parameter
const defaultApp = {
    id: 1,
    name: "Sample IPA MOD",
    developer: "Developer Name",
    tagline: "Premium iOS Features",
    icon: "https://via.placeholder.com/120",
    rating: 4.5,
    category: "social",
    version: "1.0.0",
    size: "25MB",
    lastUpdated: "Today",
    ios: "iOS 16+",
    jailbreak: "not-required",
    jailbreakText: "No jailbreak required. Install using sideloading tools.",
    description: `<h3>MOD Features</h3><p>• Premium unlocked<br>• Ad-free experience<br>• Enhanced features<br>• No subscription required</p>`,
    downloadUrl: "sample-mod.ipa"
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
    ios: currentApp.ios || "iOS 16+",
    jailbreak: currentApp.jailbreak || "not-required",
    jailbreakText: currentApp.jailbreakText || "No jailbreak required.",
    description: currentApp.description || `<h3>About ${currentApp.name}</h3><p>${currentApp.tagline || 'No description available.'}</p>`,
    downloadUrl: currentApp.downloadUrl || `${currentApp.name?.toLowerCase().replace(/\s+/g, '-') || 'app'}.ipa`
};

// DOM Elements
const appIcon = document.getElementById('appIcon');
const appName = document.getElementById('appName');
const appDeveloper = document.getElementById('appDeveloper');
const appVersion = document.getElementById('appVersion');
const appSize = document.getElementById('appSize');
const appCategory = document.getElementById('appCategory');
const jailbreakStatus = document.getElementById('jailbreakStatus');
const jailbreakText = document.getElementById('jailbreakText');
const appDescription = document.getElementById('appDescription');
const downloadOptions = document.getElementById('downloadOptions');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadAppDetails();
});

function loadAppDetails() {
    // Update page title
    document.title = `${currentApp.name} - IPA MOD Download by VoltNexis`;
    
    // Update app details
    appIcon.src = currentApp.icon || 'https://via.placeholder.com/120';
    appIcon.alt = currentApp.name;
    appName.textContent = currentApp.name;
    appDeveloper.textContent = currentApp.developer;
    appVersion.textContent = `v${currentApp.version}`;
    appSize.textContent = currentApp.size;
    appCategory.textContent = currentApp.category;
    jailbreakStatus.textContent = currentApp.jailbreak === 'not-required' ? 'No Jailbreak' : 'Jailbreak Required';
    jailbreakText.textContent = currentApp.jailbreakText;
    appDescription.innerHTML = currentApp.description;
    
    // Create download button
    downloadOptions.innerHTML = '';
    const downloadBtn = document.createElement('a');
    downloadBtn.className = 'download-btn';
    downloadBtn.href = currentApp.downloadUrl;
    downloadBtn.innerHTML = `
        <div class="download-info">
            <i class="fas fa-download"></i>
            <div>
                <div>Download IPA MOD</div>
                <div style="font-size: 12px; opacity: 0.8;">${currentApp.size} • MediaFire</div>
            </div>
        </div>
        <i class="fas fa-external-link-alt"></i>
    `;
    downloadOptions.appendChild(downloadBtn);
    
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
                return `
                    <div class="version-item">
                        <span class="version-info">Version ${version.version} (${version.size})</span>
                        <div class="version-buttons">
                            <a href="${version.url}" class="version-download">Download IPA</a>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}