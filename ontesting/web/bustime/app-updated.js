// Supabase configuration
const SUPABASE_URL = 'https://relmcuwdzlwjgmdwqxjp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbG1jdXdkemx3amdtZHdxeGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjY2NjEsImV4cCI6MjA3NDIwMjY2MX0.LxLlUP48MUAagaoMREs7iDgEb4soTdVO66Du0my0nMw';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let busData = [];
let userFavorites = [];

// Load favorites from localStorage
try {
    userFavorites = JSON.parse(localStorage.getItem('busFavorites') || '[]');
} catch (e) {
    console.warn('Error loading favorites:', e);
}

// DOM elements
const searchTabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const searchRouteBtn = document.getElementById('search-route');
const searchBusBtn = document.getElementById('search-bus');
const resultsSection = document.getElementById('results');
const resultsList = document.getElementById('results-list');
const submitUpdateBtn = document.getElementById('submit-update');
const routeSelect = document.getElementById('route-select');
const navBtns = document.querySelectorAll('.nav-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    initializeTabs();
    initializeNavigation();
    await loadBusDataFromSupabase();
    populateRouteSelect();
    registerServiceWorker();
});

// Load bus data from Supabase
async function loadBusDataFromSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from('buses')
            .select(`
                *,
                routes!inner(
                    id,
                    origin,
                    destination,
                    operator,
                    frequency,
                    stops
                )
            `);
        
        if (error) {
            console.error('Error fetching buses:', error);
            return;
        }
        
        if (data && data.length > 0) {
            busData = data.map(bus => ({
                id: bus.id,
                busNumber: bus.bus_number,
                route: `${bus.routes.origin} - ${bus.routes.destination}`,
                operator: bus.routes.operator,
                operatorType: bus.routes.operator === 'KSRTC' ? 'government' : 'private',
                busType: bus.type,
                photo_url: bus.photo_url,
                timings: bus.timings || [],
                firstBus: bus.timings?.[0] || '06:00',
                lastBus: bus.timings?.[bus.timings.length - 1] || '20:00',
                frequency: bus.routes.frequency || '30 minutes',
                majorStops: bus.routes.stops || [],
                detailedStops: bus.routes.stops || [],
                totalFare: bus.total_fare || '₹50',
                duration: bus.duration || '2h 30m',
                rating: bus.rating || 4.2,
                reviews: bus.reviews || 50,
                amenities: bus.amenities || ['Non-AC', 'Reserved Seats']
            }));
        }
    } catch (error) {
        console.error('Supabase connection error:', error);
    }
}

// Default bus images
function getDefaultBusImage(operatorType) {
    const defaultImages = {
        government: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=200&fit=crop&q=80',
        private: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&q=80'
    };
    return defaultImages[operatorType] || defaultImages.government;
}

// Tab switching
function initializeTabs() {
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            searchTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// Navigation
function initializeNavigation() {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const section = btn.dataset.section;
            showSection(section);
        });
    });
}

function showSection(section) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(s => s.style.display = 'none');
    
    if (section === 'search') {
        document.querySelector('.search-section').style.display = 'block';
        document.querySelector('.results-section').style.display = 'block';
    } else if (section === 'contribute') {
        document.querySelector('.contribute-section').style.display = 'block';
        initializeContributeTabs();
    } else if (section === 'favorites') {
        document.querySelector('.favorites-section').style.display = 'block';
        displayFavorites();
    } else if (section === 'reports') {
        document.querySelector('.reports-section').style.display = 'block';
        displayUserReports();
    }
}

function initializeContributeTabs() {
    const contributeTabs = document.querySelectorAll('.contribute-tab');
    const contributeContents = document.querySelectorAll('.contribute-content');
    
    contributeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            contributeTabs.forEach(t => t.classList.remove('active'));
            contributeContents.forEach(tc => tc.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabName}-content`).classList.add('active');
        });
    });
}

// Search functionality
if (searchRouteBtn) {
    searchRouteBtn.addEventListener('click', () => {
        const origin = document.getElementById('origin').value.trim();
        const destination = document.getElementById('destination').value.trim();
        
        if (!origin || !destination) {
            alert('Please enter both origin and destination');
            return;
        }
        
        searchByRoute(origin, destination);
    });
}

if (searchBusBtn) {
    searchBusBtn.addEventListener('click', () => {
        const busNumber = document.getElementById('bus-number').value.trim();
        
        if (!busNumber) {
            alert('Please enter bus number');
            return;
        }
        
        searchByBusNumber(busNumber);
    });
}

function searchByRoute(origin, destination) {
    const results = busData.filter(bus => {
        if (!bus) return false;
        
        const route = bus.route || '';
        const detailedStops = bus.detailedStops || [];
        const majorStops = bus.majorStops || [];
        
        const originInRoute = route.toLowerCase().includes(origin.toLowerCase());
        const destinationInRoute = route.toLowerCase().includes(destination.toLowerCase());
        
        const originInDetailedStops = detailedStops.some(stop => 
            (stop.name || '').toLowerCase().includes(origin.toLowerCase())
        );
        const destinationInDetailedStops = detailedStops.some(stop => 
            (stop.name || '').toLowerCase().includes(destination.toLowerCase())
        );
        
        const originInMajorStops = majorStops.some(stop => 
            (stop || '').toLowerCase().includes(origin.toLowerCase())
        );
        const destinationInMajorStops = majorStops.some(stop => 
            (stop || '').toLowerCase().includes(destination.toLowerCase())
        );
        
        const originFound = originInRoute || originInDetailedStops || originInMajorStops;
        const destinationFound = destinationInRoute || destinationInDetailedStops || destinationInMajorStops;
        
        return originFound && destinationFound;
    });
    
    displayResults(results);
}

function searchByBusNumber(busNumber) {
    const results = busData.filter(bus => {
        if (!bus || !bus.busNumber) return false;
        return bus.busNumber.toLowerCase().includes(busNumber.toLowerCase());
    });
    
    displayResults(results);
}

function displayResults(results) {
    resultsSection.style.display = 'block';
    
    if (!results || results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <p>No buses found. Try different search terms.</p>
                <p>Available routes:</p>
                <ul>
                    ${busData.map(bus => `<li>${bus.route}</li>`).join('')}
                </ul>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = results.map(bus => {
        const imageUrl = bus.photo_url || getDefaultBusImage(bus.operatorType);
        return `
        <div class="bus-result" data-bus-id="${bus.id}">
            <div class="bus-image-preview">
                <img src="${imageUrl}" alt="${bus.busNumber}" class="bus-thumb" 
                     onerror="this.src='${getDefaultBusImage(bus.operatorType)}'" 
                     loading="lazy">
            </div>
            <div class="bus-content" onclick="showBusDetails('${bus.id}')">
                <div class="bus-header">
                    <div class="bus-number">${bus.busNumber}</div>
                    <div class="operator-badge ${bus.operatorType}">${bus.operator}</div>
                </div>
                <div class="route-info">${bus.route} • ${bus.busType}</div>
                <div class="route-info">Frequency: ${bus.frequency} • ${bus.duration}</div>
                <div class="major-stops-flow">
                    ${(bus.majorStops || []).map((stop, i) => 
                        `<span class="major-stop">${stop}</span>${i < (bus.majorStops || []).length - 1 ? '<span class="arrow">→</span>' : ''}`
                    ).join('')}
                </div>
                <div class="timing">
                    ${(bus.timings || []).slice(0, 3).map(time => `<span class="time">${time}</span>`).join('')}
                    ${(bus.timings || []).length > 3 ? '<span class="more-times">+' + ((bus.timings || []).length - 3) + ' more</span>' : ''}
                </div>
                <div class="fare-preview">
                    <span class="fare-label">Total Fare:</span> <span class="fare-amount">${bus.totalFare}</span>
                    <span class="rating-preview">⭐ ${bus.rating}</span>
                </div>
                <div class="click-hint">👆 Tap for full details</div>
            </div>
            <div class="bus-actions">
                <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite('${bus.id}')" data-bus-id="${bus.id}">
                    ${isFavorite(bus.id) ? '⭐' : '☆'}
                </button>
                <button class="download-btn" onclick="event.stopPropagation(); downloadRoute('${bus.id}')">💾</button>
                <div class="next-bus-badge ${getNextBusStatus(bus)}">
                    ${getNextBusText(bus)}
                </div>
            </div>
        </div>
    `}).join('');
}

// Favorites management
function isFavorite(busId) {
    return userFavorites.includes(busId);
}

function toggleFavorite(busId) {
    if (isFavorite(busId)) {
        userFavorites = userFavorites.filter(id => id !== busId);
    } else {
        userFavorites.push(busId);
    }
    localStorage.setItem('busFavorites', JSON.stringify(userFavorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const busId = btn.dataset.busId;
        btn.textContent = isFavorite(busId) ? '⭐' : '☆';
    });
}

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const emptyState = document.getElementById('empty-favorites');
    const favoriteBuses = busData.filter(bus => isFavorite(bus.id));
    
    if (favoriteBuses.length === 0) {
        favoritesList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    favoritesList.innerHTML = favoriteBuses.map(bus => `
        <div class="favorite-item" onclick="openBusDetails('${bus.id}')">
            <img src="${bus.photo_url || getDefaultBusImage(bus.operatorType)}" class="favorite-thumb">
            <div class="favorite-info">
                <div class="bus-number">${bus.busNumber}</div>
                <div class="route-info">${bus.route}</div>
                <div class="timing">
                    <span class="time">${(bus.timings || [])[0] || 'N/A'}</span>
                    <span class="time">${(bus.timings || [])[1] || 'N/A'}</span>
                </div>
            </div>
            <button onclick="event.stopPropagation(); toggleFavorite('${bus.id}')" class="remove-favorite">✕</button>
        </div>
    `).join('');
}

// Utility functions
function getNextBusStatus(bus) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const timings = (bus.timings || []).map(t => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    });
    
    const nextTiming = timings.find(t => t > currentTime);
    if (!nextTiming) return 'ended';
    
    const diff = nextTiming - currentTime;
    if (diff <= 15) return 'soon';
    if (diff <= 60) return 'coming';
    return 'scheduled';
}

function getNextBusText(bus) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const timings = (bus.timings || []).map(t => {
        const [h, m] = t.split(':').map(Number);
        return { time: h * 60 + m, display: t };
    });
    
    const nextTiming = timings.find(t => t.time > currentTime);
    if (!nextTiming) return 'Service Ended';
    
    const diff = nextTiming.time - currentTime;
    if (diff <= 15) return `Next in ${diff}m`;
    return `Next at ${nextTiming.display}`;
}

function downloadRoute(busId) {
    const bus = busData.find(b => b.id === busId);
    if (!bus) return;
    
    const routeData = {
        busNumber: bus.busNumber,
        route: bus.route,
        operator: bus.operator,
        timings: bus.timings,
        stops: bus.detailedStops,
        downloadedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(routeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bus.busNumber}-route.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function showBusDetails(busId) {
    window.location.href = `bus-details.html?id=${busId}`;
}

// User contributions
function populateRouteSelect() {
    const routes = [...new Set(busData.map(bus => bus.route).filter(route => route))];
    if (routeSelect) {
        routeSelect.innerHTML = '<option value="">Select Route</option>' + 
            routes.map(route => `<option value="${route}">${route}</option>`).join('');
    }
    
    const issueRouteSelect = document.getElementById('issue-route');
    if (issueRouteSelect) {
        issueRouteSelect.innerHTML = '<option value="">Select Route</option>' + 
            routes.map(route => `<option value="${route}">${route}</option>`).join('');
    }
}

// Submit update
if (submitUpdateBtn) {
    submitUpdateBtn.addEventListener('click', async () => {
        const route = routeSelect.value;
        const actualTime = document.getElementById('actual-time').value;
        const stopName = document.getElementById('stop-name').value;
        
        if (!route || !actualTime || !stopName) {
            alert('Please fill all fields');
            return;
        }
        
        try {
            await submitUserUpdate({ route, actualTime, stopName });
            alert('Thank you for the update! It will be verified and added.');
            
            // Clear form
            document.getElementById('actual-time').value = '';
            document.getElementById('stop-name').value = '';
            routeSelect.value = '';
        } catch (error) {
            alert('Error submitting update. Please try again.');
        }
    });
}

// Submit report
document.getElementById('submit-report')?.addEventListener('click', async () => {
    const route = document.getElementById('issue-route').value;
    const issueType = document.getElementById('issue-type').value;
    const details = document.getElementById('issue-details').value;
    
    if (!route || !issueType) {
        alert('Please select route and issue type');
        return;
    }
    
    try {
        await submitUserReport({ route, issueType, details });
        alert('Thank you for the report! It will be reviewed.');
        
        // Clear form
        document.getElementById('issue-route').value = '';
        document.getElementById('issue-type').value = '';
        document.getElementById('issue-details').value = '';
    } catch (error) {
        alert('Error submitting report. Please try again.');
    }
});

// Supabase functions
async function submitUserUpdate(updateData) {
    try {
        const { data, error } = await supabaseClient
            .from('user_updates')
            .insert([{
                bus_id: null, // Will need to find bus_id based on route
                stop_name: updateData.stopName,
                reported_time: updateData.actualTime,
                status: 'On Time'
            }]);
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error submitting update:', error);
        throw error;
    }
}

async function submitUserReport(reportData) {
    try {
        const { data, error } = await supabaseClient
            .from('user_updates')
            .insert([{
                bus_id: null, // Will need to find bus_id based on route
                issue_type: reportData.issueType,
                details: reportData.details || `${reportData.issueType} reported`
            }]);
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error submitting report:', error);
        throw error;
    }
}

async function loadUserReports() {
    try {
        const { data, error } = await supabaseClient
            .from('issue_reports')
            .select('*, buses(bus_number, routes(origin, destination))')
            .order('created_at', { ascending: false })
            .limit(20);
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error loading reports:', error);
        return [];
    }
}

async function displayUserReports() {
    const reportsList = document.getElementById('user-reports-list');
    const reports = await loadUserReports();
    
    if (reports.length === 0) {
        reportsList.innerHTML = '<div class="empty-state"><p>No recent updates available.</p></div>';
        return;
    }
    
    reportsList.innerHTML = reports.map(report => {
        const timeAgo = getTimeAgo(new Date(report.created_at));
        const statusClass = getStatusClass(report.update_type);
        
        return `
            <div class="report-item status-${statusClass}">
                <div class="report-header">
                    <strong>${report.buses?.routes?.origin} - ${report.buses?.routes?.destination}</strong>
                    <span class="status-badge ${statusClass}">${report.update_type.toUpperCase()}</span>
                </div>
                <div class="report-details">
                    ${report.details}
                </div>
                <div class="report-meta">
                    ${timeAgo} ${report.verified ? '• Verified' : '• Pending verification'}
                </div>
            </div>
        `;
    }).join('');
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

function getStatusClass(updateType) {
    const statusMap = {
        'delayed': 'delayed',
        'cancelled': 'cancelled',
        'breakdown': 'delayed',
        'overcrowded': 'delayed'
    };
    return statusMap[updateType] || 'ontime';
}

// PWA Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
}