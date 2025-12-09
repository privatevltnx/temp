// iOS app data (using existing data)
const apps = [
{
id: 1,
name: "ServeTracko by VoltNexis",
developer: "VoltNexis PVT LMTD",
tagline: "Simple. Reliable. Fast.",
icon: "https://voltnexis.github.io/apps/img/servetracko.webp",
rating: 4.5,
category: "tools",
trending: true,
new: true,
version: "2.2.0",
size: "13MB",
iosVersion: "14.0+",
lastUpdated: "Aug 29, 2025",
description: `<h3>🚀 Features</h3><p>Serve Tracker is a FREE Service Tool available for iPhone and iPad.</p><p>Track your services, manage subscriptions, and stay organized. Simple, reliable, and fast service management at your fingertips.</p>`,
downloadUrl: "https://www.mediafire.com/file/abc123/servetracko-v2.2.0.ipa/file",
ipaDeb: false,
whatsNew: "Version 2.2.0: Added new dashboard widget, improved performance, and bug fixes.",
screenshots: [
"https://via.placeholder.com/320x640?text=ServeTracko+Screenshot+1",
"https://via.placeholder.com/320x640?text=ServeTracko+Screenshot+2",
"https://via.placeholder.com/320x640?text=ServeTracko+Screenshot+3"
]
},
{
id: 2,
name: "WhatsApp Messenger",
developer: "WhatsApp Inc.",
tagline: "Simple. Reliable. Secure.",
icon: "https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN",
rating: 4.5,
category: "social",
trending: true,
new: false,
version: "23.24.76",
size: "65MB",
iosVersion: "15.1+",
lastUpdated: "Dec 15, 2024",
description: `<h3>🚀 Features</h3><p>WhatsApp Messenger is a FREE messaging app available for iPhone and Android. With WhatsApp, you'll get fast, simple, secure messaging and calling for free, available on phones all over the world.</p>`,
downloadUrl: "https://www.mediafire.com/file/wa123/whatsapp-messenger-v23.24.76.ipa/file",
ipaDeb: false,
whatsNew: "Message reactions, improved camera filters, and enhanced group chat experience.",
screenshots: [
"https://via.placeholder.com/320x640?text=WhatsApp+Screenshot+1",
"https://via.placeholder.com/320x640?text=WhatsApp+Screenshot+2",
"https://via.placeholder.com/320x640?text=WhatsApp+Screenshot+3"
]
},
{
id: 3,
name: "PUBG Mobile",
developer: "PUBG Corporation",
tagline: "Battle Royale Experience",
icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/63/07/78/63077869-bbda-b20c-f27c-9687f9e56b58/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/200x200ia-75.webp",
rating: 4.2,
category: "games",
trending: true,
new: false,
version: "2.9.0",
size: "1.2GB",
iosVersion: "13.0+",
lastUpdated: "Dec 12, 2024",
description: `<h3>🎮 Game Features</h3><p>PUBG MOBILE delivers intense multiplayer action. Fight to survive in the massive open-world arena with up to 100 players.</p><p>Features include advanced graphics, realistic weapon systems, and intense battle royale gameplay.</p>`,
downloadUrl: "https://www.mediafire.com/file/xyz123/pubg-mobile-v2.9.0.ipa/file",
ipaDeb: true,
whatsNew: "New map locations, enhanced graphics engine, and improved network stability.",
},
{
id: 4,
name: "Instagram",
developer: "Instagram, Inc.",
tagline: "Photo & Video Sharing",
icon: "https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM",
rating: 4.3,
category: "social",
description: `<h3>📸 Share Your Story</h3><p>Instagram is a simple way to capture and share the world's moments. Follow your friends and family to see what they're up to, and discover accounts from all around the world that are sharing things you love.</p>`,
downloadUrl: "https://www.mediafire.com/file/ig123/instagram-v307.0.ipa/file",
ipaDeb: false,
whatsNew: "Updated Stories features, new filters, and improved video quality.",
screenshots: [
"https://via.placeholder.com/320x640?text=Instagram+Screenshot+1",
"https://via.placeholder.com/320x640?text=Instagram+Screenshot+2",
"https://via.placeholder.com/320x640?text=Instagram+Screenshot+3"
]
},
{
id: 5,
name: "Safari Browser",
developer: "Apple Inc.",
tagline: "Fast & Private Browser",
icon: "https://images.sftcdn.net/images/t_app-icon-s/p/8b64c19a-96d0-11e6-8c85-00163ed833e7/2453929095/safari-Download-Safari.jpg",
rating: 4.1,
category: "tools",
trending: false,
new: false,
version: "17.1",
size: "95MB",
iosVersion: "17.0+",
lastUpdated: "Dec 13, 2024",
description: `<h3>🌐 Browse the Web</h3><p>Safari is a fast, easy to use, and secure web browser that comes standard with the latest Apple devices. It has intelligent tracking prevention features to help protect your privacy while you surf.</p>`,
downloadUrl: "https://www.mediafire.com/file/sf123/safari-v17.1.ipa/file",
ipaDeb: false,
whatsNew: "Enhanced privacy controls, faster page loading, and new tab management features.",
},
{
id: 6,
name: "Spotify Music",
developer: "Spotify AB",
tagline: "Music & Podcasts",
icon: "https://play-lh.googleusercontent.com/7ynvVIRdhJNAngCg_GI7i8TtH8BqkJYmffeUHsG-mJOdzt1XLvGmbsKuc5Q1SInBjDKN",
rating: 4.6,
category: "entertainment",
trending: false,
new: false,
version: "8.8.96",
size: "85MB",
iosVersion: "15.0+",
lastUpdated: "Dec 11, 2024",
description: `<h3>🎵 Music Streaming</h3><p>Spotify gives you instant access to millions of songs, podcasts, and audiobooks. Play what you want, when you want, offline or online.</p>`,
downloadUrl: "https://www.mediafire.com/file/sp123/spotify-v8.8.96.ipa/file",
ipaDeb: false,
whatsNew: "New personalized playlists, improved discovery mode, and offline downloads.",
screenshots: [
"https://via.placeholder.com/320x640?text=Spotify+Screenshot+1",
"https://via.placeholder.com/320x640?text=Spotify+Screenshot+2",
"https://via.placeholder.com/320x640?text=Spotify+Screenshot+3"
]
},
{
id: 7,
name: "Telegram",
developer: "Telegram FZ-LLC",
tagline: "Cloud-Based Messaging",
icon: "https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q",
rating: 4.7,
category: "social",
trending: false,
new: true,
version: "10.2.5",
size: "55MB",
iosVersion: "12.0+",
lastUpdated: "Dec 17, 2024",
description: `<h3>💬 Secure Messaging</h3><p>Telegram is a messaging app with focus on speed and security. It is super-fast, simple and free. You can use Telegram on all your devices at the same time.</p>`,
downloadUrl: "https://www.mediafire.com/file/tg123/telegram-v10.2.5.ipa/file",
ipaDeb: false,
whatsNew: "Advanced search filters, community features, and improved video compression.",
screenshots: [
"https://via.placeholder.com/320x640?text=Telegram+Screenshot+1",
"https://via.placeholder.com/320x640?text=Telegram+Screenshot+2",
"https://via.placeholder.com/320x640?text=Telegram+Screenshot+3"
]
},
{
id: 8,
name: "VLC Media Player",
developer: "VideoLAN",
tagline: "Universal Media Player",
icon: "https://play-lh.googleusercontent.com/nPnJc260PPoupBe-DcVQ-MNr6149dphdEoEAN-C9xwgctpVXbwsuyon_jEZ3uPWWYQ=w240-h480",
rating: 4.5,
category: "tools",
trending: false,
new: false,
version: "3.5.4",
size: "40MB",
iosVersion: "11.0+",
lastUpdated: "Dec 10, 2024",
description: `<h3>🎬 Media Player</h3><p>VLC plays all video and audio formats and pretty much everything else too. It can also stream from network sources and play Blu-ray discs.</p>`,
downloadUrl: "https://www.mediafire.com/file/vlc123/vlc-v3.5.4.ipa/file",
ipaDeb: false,
whatsNew: "Support for more video formats, improved hardware acceleration, and UI improvements.",
screenshots: [
"https://via.placeholder.com/320x640?text=VLC+Screenshot+1",
"https://via.placeholder.com/320x640?text=VLC+Screenshot+2",
"https://via.placeholder.com/320x640?text=VLC+Screenshot+3"
]
},
{
id: 9,
name: "Discord",
developer: "Discord Inc.",
tagline: "Chat, Hang Out, Stay Close",
icon: "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ",
rating: 4.4,
category: "social",
trending: true,
new: true,
version: "97.4",
size: "120MB",
iosVersion: "14.0+",
lastUpdated: "Dec 18, 2024",
description: `<h3>💬 Connect with Community</h3><p>Discord is the easiest way to talk over voice, video, and text. Chat, hang out, and stay close with your friends and communities.</p>`,
downloadUrl: "https://www.mediafire.com/file/dc123/discord-v97.4.ipa/file",
ipaDeb: false,
whatsNew: "Voice chat improvements, new emoji reactions, and server discovery features.",
screenshots: [
"https://via.placeholder.com/320x640?text=Discord+Screenshot+1",
"https://via.placeholder.com/320x640?text=Discord+Screenshot+2",
"https://via.placeholder.com/320x640?text=Discord+Screenshot+3"
]
},
{
id: 10,
name: "YouTube",
developer: "Google LLC",
tagline: "Watch, Share & Subscribe",
icon: "https://play-lh.googleusercontent.com/6am0i3walYwNLc08QOOhRJttQENNGkhlKajXSERf3JnPVRQczIyxw2w3DxeMRTOSdsY",
rating: 4.6,
category: "entertainment",
trending: true,
new: false,
version: "19.12.35",
size: "95MB",
iosVersion: "15.0+",
lastUpdated: "Dec 18, 2024",
description: `<h3>🎥 Video Streaming</h3><p>Watch unlimited videos, live streams, and more on YouTube. Find the content you love and discover new creators, all in one place.</p>`,
downloadUrl: "https://www.mediafire.com/file/yt123/youtube-v19.12.35.ipa/file",
ipaDeb: false,
whatsNew: "Improved video recommendations, new shorts features, and better playback quality.",
screenshots: [
"https://via.placeholder.com/320x640?text=YouTube+Screenshot+1",
"https://via.placeholder.com/320x640?text=YouTube+Screenshot+2",
"https://via.placeholder.com/320x640?text=YouTube+Screenshot+3"
]
},
{
id: 11,
name: "Snapchat",
developer: "Snap Inc.",
tagline: "Connect with Friends",
icon: "https://play-lh.googleusercontent.com/nC95iM2f4dXas2K5x-heZ_uUVH9oc-mnlQF9phleiU2Kfk_Z1Rmwrbwv0QOdwQ__T4A",
rating: 4.2,
category: "social",
trending: true,
new: true,
version: "12.45.10",
size: "75MB",
iosVersion: "14.0+",
lastUpdated: "Dec 17, 2024",
description: `<h3>📱 Messaging & Stories</h3><p>Share moments with friends instantly using photos, videos, messages and more. Snapchat is a fast and fun way to share the moment with your friends and family.</p>`,
downloadUrl: "https://www.mediafire.com/file/sc123/snapchat-v12.45.10.ipa/file",
ipaDeb: false,
whatsNew: "New lens filters, improved face recognition, and better video quality.",
screenshots: [
"https://via.placeholder.com/320x640?text=Snapchat+Screenshot+1",
"https://via.placeholder.com/320x640?text=Snapchat+Screenshot+2",
"https://via.placeholder.com/320x640?text=Snapchat+Screenshot+3"
]
},
{
id: 12,
name: "Call of Duty",
developer: "Activision",
tagline: "Battle Royale & Multiplayer",
icon: "https://play-lh.googleusercontent.com/uPRFWFbiASqohiTMTKrD5gErGrKxq_1DgH0npRQcvUEDDLMLTECh3xXl0STPBZZseA",
rating: 4.4,
category: "games",
trending: true,
new: false,
version: "3.8.0",
size: "2GB",
iosVersion: "13.0+",
lastUpdated: "Dec 16, 2024",
description: `<h3>🎮 FPS Action</h3><p>Experience intense multiplayer combat gameplay in Call of Duty. Join millions of players worldwide in the ultimate first-person shooter experience.</p>`,
downloadUrl: "https://www.mediafire.com/file/cod123/call-of-duty-v3.8.0.ipa/file",
ipaDeb: false,
whatsNew: "New multiplayer maps, enhanced graphics, and balanced gameplay adjustments.",
screenshots: [
"https://via.placeholder.com/320x640?text=COD+Screenshot+1",
"https://via.placeholder.com/320x640?text=COD+Screenshot+2",
"https://via.placeholder.com/320x640?text=COD+Screenshot+3"
]
}
];

// ===== Global Variables =====
let currentFilter = 'all';
let searchQuery = '';
let currentCarouselIndex = 0;
let displayedAppsCount = 12;
let allFilteredApps = [];

// ===== Carousel Functions =====
function initCarousel() {
const carousel = document.getElementById('carouselContainer');
const dots = document.getElementById('carouselDots');

// Create carousel items
const carouselItems = [
{ title: 'Top Apps', desc: 'Discover the best rated apps' },
{ title: 'New Releases', desc: 'Latest games & apps' },
{ title: 'Games', desc: 'Amazing games for everyone' },
{ title: 'Trending', desc: 'What\'s trending now' },
{ title: 'Featured', desc: 'Hand-picked selections' }
];

carousel.innerHTML = carouselItems.map((item, idx) => `
<div class="carousel-item" data-index="${idx}">
<h3>${item.title}</h3>
<p>${item.desc}</p>
</div>
`).join('');

// Create dots
dots.innerHTML = carouselItems.map((_, idx) => `
<div class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
`).join('');

// Dot click events
document.querySelectorAll('.dot').forEach(dot => {
dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
});

// Navigation buttons
document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);
}

function goToSlide(index) {
currentCarouselIndex = index;
const carousel = document.getElementById('carouselContainer');
carousel.style.transform = `translateX(-${index * 100}%)`;

// Update dots
document.querySelectorAll('.dot').forEach(dot => {
dot.classList.remove('active');
});
document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
}

function prevSlide() {
currentCarouselIndex = (currentCarouselIndex - 1 + 5) % 5;
goToSlide(currentCarouselIndex);
}

function nextSlide() {
currentCarouselIndex = (currentCarouselIndex + 1) % 5;
goToSlide(currentCarouselIndex);
}

function autoPlayCarousel() {
setInterval(() => {
nextSlide();
}, 5000);
}

// ===== App Card Creation =====
function createAppCard(app) {
const stars = Array(Math.floor(app.rating)).fill('★').join('');
return `
<div class="app-card" onclick="navigateToApp(${app.id})">
<div class="app-icon-wrapper">
<img src="${app.icon}" alt="${app.name}" onerror="this.src='https://via.placeholder.com/150?text=${encodeURIComponent(app.name)}'">
</div>
<div class="app-info">
<div class="app-name">${app.name}</div>
<div class="app-developer">${app.developer}</div>
<div class="app-meta">
<div class="app-rating">
<span class="star">${stars}</span>
</div>
<span class="app-rating-count">${app.rating}</span>
</div>
<button class="app-action-btn">Get</button>
</div>
</div>
`;
}

// ===== App Rendering =====
function renderApps(startIndex = 0) {
const grid = document.getElementById('appsGrid');

// Get filtered apps
let filtered = apps.filter(app => {
const matchesFilter = currentFilter === 'all' || app.category === currentFilter;
const matchesSearch = searchQuery === '' ||
app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
app.developer.toLowerCase().includes(searchQuery.toLowerCase());
return matchesFilter && matchesSearch;
});

allFilteredApps = filtered;
const appsToDisplay = filtered.slice(0, startIndex + 12);

if (startIndex === 0) {
grid.innerHTML = appsToDisplay.map(app => createAppCard(app)).join('');
} else {
grid.innerHTML += appsToDisplay.slice(startIndex).map(app => createAppCard(app)).join('');
}

// Update load more button
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (appsToDisplay.length >= filtered.length) {
loadMoreBtn.style.display = 'none';
} else {
loadMoreBtn.style.display = 'block';
}

displayedAppsCount = appsToDisplay.length;

// Update grid title
const gridTitle = document.getElementById('gridTitle');
if (currentFilter === 'all') {
gridTitle.textContent = `All Apps (${filtered.length})`;
} else {
gridTitle.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1) + ` (${filtered.length})`;
}
}

function renderTrendingApps() {
const section = document.getElementById('trendingApps');
const trending = apps.filter(app => app.trending).slice(0, 8);
section.innerHTML = trending.map(app => createAppCard(app)).join('');
}

function renderNewApps() {
const section = document.getElementById('newApps');
const newApps = apps.filter(app => app.new).slice(0, 8);
section.innerHTML = newApps.map(app => createAppCard(app)).join('');
}

// ===== Navigation =====
function navigateToApp(appId) {
window.location.href = `app_ios.html?id=${appId}`;
}

// ===== Event Listeners =====
function setupEventListeners() {
// Search
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
searchQuery = e.target.value;
displayedAppsCount = 12;
renderApps(0);
});

// Filters
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
chip.addEventListener('click', () => {
chips.forEach(c => c.classList.remove('active'));
chip.classList.add('active');
currentFilter = chip.dataset.filter;
displayedAppsCount = 12;
renderApps(0);
window.scrollTo({ top: 0, behavior: 'smooth' });
});
});

// Load More
const loadMoreBtn = document.getElementById('loadMoreBtn');
loadMoreBtn.addEventListener('click', () => {
renderApps(displayedAppsCount);
});
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
// Make apps data globally available
window.appsData = apps;

initCarousel();
renderTrendingApps();
renderNewApps();
renderApps(0);
setupEventListeners();
autoPlayCarousel();
});
