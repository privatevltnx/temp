// Supabase configuration (replace with your actual Supabase URL and key)
const SUPABASE_URL = 'https://relmcuwdzlwjgmdwqxjp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbG1jdXdkemx3amdtZHdxeGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjY2NjEsImV4cCI6MjA3NDIwMjY2MX0.LxLlUP48MUAagaoMREs7iDgEb4soTdVO66Du0my0nMw';

// Supabase client initialization
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Enhanced mock data with Supabase integration ready
let mockBusData = [
    {
        id: 1,
        busNumber: 'KL-07-1234',
        route: 'Ernakulam - Kottayam',
        operator: 'KSRTC',
        operatorType: 'government',
        busType: 'Fast Passenger',
        photo_url: null, // Will be fetched from Supabase
        timings: ['06:00', '08:30', '11:00', '14:30', '17:00', '19:30'],
        firstBus: '06:00',
        lastBus: '19:30',
        frequency: '2.5 hours',
        majorStops: ['Ernakulam', 'Vaikom', 'Changanassery', 'Kottayam'],
        detailedStops: [
            { name: 'Ernakulam', time: '06:00', fare: 0, distance: '0 km' },
            { name: 'Vytilla', time: '06:15', fare: 8, distance: '5 km' },
            { name: 'Tripunithura', time: '06:25', fare: 12, distance: '8 km' },
            { name: 'Piravom', time: '06:45', fare: 18, distance: '15 km' },
            { name: 'Vaikom', time: '07:10', fare: 25, distance: '25 km' },
            { name: 'Kanjirappally', time: '07:35', fare: 32, distance: '35 km' },
            { name: 'Ettumanoor', time: '07:55', fare: 38, distance: '42 km' },
            { name: 'Changanassery', time: '08:15', fare: 42, distance: '48 km' },
            { name: 'Thiruvalla', time: '08:35', fare: 45, distance: '52 km' },
            { name: 'Kottayam', time: '08:50', fare: 45, distance: '55 km' }
        ],
        totalFare: '₹45',
        duration: '2h 50m',
        rating: 4.2,
        reviews: 156,
        amenities: ['Non-AC', 'Reserved Seats', 'Luggage Space']
    },
    {
        id: 2,
        busNumber: 'KL-01-5678',
        route: 'Thiruvananthapuram - Kochi',
        operator: 'KSRTC',
        operatorType: 'government',
        busType: 'Super Fast',
        photo_url: null,
        timings: ['05:30', '07:00', '09:30', '12:00', '15:30', '18:00'],
        firstBus: '05:30',
        lastBus: '18:00',
        frequency: '2 hours',
        majorStops: ['Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Kochi'],
        detailedStops: [
            { name: 'Thiruvananthapuram', time: '05:30', fare: 0, distance: '0 km' },
            { name: 'Attingal', time: '05:55', fare: 15, distance: '18 km' },
            { name: 'Varkala', time: '06:10', fare: 22, distance: '28 km' },
            { name: 'Kollam', time: '06:35', fare: 35, distance: '45 km' },
            { name: 'Karunagappally', time: '06:50', fare: 42, distance: '52 km' },
            { name: 'Kayamkulam', time: '07:15', fare: 48, distance: '65 km' },
            { name: 'Alappuzha', time: '07:45', fare: 58, distance: '78 km' },
            { name: 'Cherthala', time: '08:05', fare: 65, distance: '88 km' },
            { name: 'Kochi', time: '08:30', fare: 75, distance: '105 km' }
        ],
        totalFare: '₹75',
        duration: '3h 00m',
        rating: 4.5,
        reviews: 203,
        amenities: ['AC', 'Pushback Seats', 'Charging Points', 'WiFi']
    },
    {
        id: 3,
        busNumber: 'KL-14-9876',
        route: 'Kochi - Munnar',
        operator: 'Kallada Travels',
        operatorType: 'private',
        busType: 'Deluxe AC',
        photo_url: null,
        timings: ['06:30', '09:00', '13:30', '16:00'],
        firstBus: '06:30',
        lastBus: '16:00',
        frequency: '3.5 hours',
        majorStops: ['Kochi', 'Aluva', 'Kothamangalam', 'Munnar'],
        detailedStops: [
            { name: 'Kochi', time: '06:30', fare: 0, distance: '0 km' },
            { name: 'Aluva', time: '07:00', fare: 25, distance: '20 km' },
            { name: 'Perumbavoor', time: '07:20', fare: 35, distance: '28 km' },
            { name: 'Kothamangalam', time: '07:45', fare: 50, distance: '40 km' },
            { name: 'Neriyamangalam', time: '08:15', fare: 65, distance: '55 km' },
            { name: 'Adimali', time: '09:30', fare: 95, distance: '85 km' },
            { name: 'Munnar', time: '10:15', fare: 120, distance: '110 km' }
        ],
        totalFare: '₹120',
        duration: '3h 45m',
        rating: 4.7,
        reviews: 89,
        amenities: ['AC', 'Reclining Seats', 'Entertainment', 'Snacks', 'Blankets']
    }
];

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
    console.log('DOM loaded, initializing app...');
    console.log('Mock bus data:', mockBusData.length, 'buses');
    console.log('Sample bus routes:', mockBusData.map(b => b.route));
    
    initializeTabs();
    initializeNavigation();
    populateRouteSelect();
    
    await loadBusDataFromSupabase();
    
    // Re-populate route select after loading data
    populateRouteSelect();
    
    registerServiceWorker();
    
    // Test search functionality
    console.log('Search elements:', {
        searchRouteBtn: !!document.getElementById('search-route'),
        searchBusBtn: !!document.getElementById('search-bus'),
        resultsSection: !!document.getElementById('results'),
        resultsList: !!document.getElementById('results-list')
    });
    
    console.log('Final mock data:', mockBusData.length, 'buses');
    console.log('Final sample routes:', mockBusData.map(b => b.route));
});

// Supabase integration functions
async function loadBusDataFromSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from('buses')
            .select('*');
        
        if (error) {
            console.error('Error fetching buses:', error);
            console.log('Using original mock data');
            return;
        }
        
        if (data && data.length > 0) {
            console.log('Loaded data from Supabase:', data.length, 'buses');
            console.log('Sample Supabase data:', data[0]);
            
            // Check if data has proper route information
            const hasRouteInfo = data.some(bus => bus.route_name || (bus.major_stops && bus.major_stops.length > 0));
            
            if (!hasRouteInfo) {
                console.log('Supabase data incomplete, using original mock data');
                return;
            }
            
            mockBusData = data.map(bus => ({
                id: bus.id,
                busNumber: bus.bus_number || bus.busNumber,
                route: bus.route_name || bus.route || 'Unknown Route',
                operator: bus.operator || 'Unknown',
                operatorType: (bus.operator === 'KSRTC' || bus.operator === 'ksrtc') ? 'government' : 'private',
                busType: bus.type || bus.busType || 'Regular',
                photo_url: bus.photo_url,
                timings: bus.timings || [],
                firstBus: bus.first_bus || bus.firstBus,
                lastBus: bus.last_bus || bus.lastBus,
                frequency: bus.frequency,
                majorStops: bus.major_stops || bus.majorStops || [],
                detailedStops: bus.detailed_stops || bus.detailedStops || [],
                totalFare: bus.total_fare || bus.totalFare || '₹0',
                duration: bus.duration,
                rating: bus.rating || 4.0,
                reviews: bus.reviews || 0,
                amenities: bus.amenities || []
            }));
            console.log('Updated mock data:', mockBusData.length, 'buses');
            console.log('Sample mapped data:', mockBusData[0]);
        } else {
            console.log('No data from Supabase, using original mock data');
        }
    } catch (error) {
        console.error('Supabase connection error:', error);
        console.log('Using original mock data');
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

// User data storage
let userFavorites = [];
let userReports = [];

try {
    userFavorites = JSON.parse(localStorage.getItem('busFavorites') || '[]');
    userReports = JSON.parse(localStorage.getItem('userReports') || '[]');
} catch (e) {
    console.warn('Error loading localStorage:', e);
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
        const busId = parseInt(btn.dataset.busId);
        btn.textContent = isFavorite(busId) ? '⭐' : '☆';
    });
}

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const emptyState = document.getElementById('empty-favorites');
    const favoriteBuses = mockBusData.filter(bus => isFavorite(bus.id));
    
    if (favoriteBuses.length === 0) {
        favoritesList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    favoritesList.innerHTML = favoriteBuses.map(bus => `
        <div class="favorite-item" onclick="openBusDetails(${bus.id})">
            <img src="${bus.photo_url || getDefaultBusImage(bus.operatorType)}" class="favorite-thumb">
            <div class="favorite-info">
                <div class="bus-number">${bus.busNumber}</div>
                <div class="route-info">${bus.route}</div>
                <div class="timing">
                    <span class="time">${(bus.timings || [])[0] || 'N/A'}</span>
                    <span class="time">${(bus.timings || [])[1] || 'N/A'}</span>
                </div>
            </div>
            <button onclick="event.stopPropagation(); toggleFavorite(${bus.id})" class="remove-favorite">✕</button>
        </div>
    `).join('');
}

function downloadRoute(busId) {
    const bus = mockBusData.find(b => b.id === busId);
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

function displayUserReports() {
    const reportsList = document.getElementById('user-reports-list');
    const mockReports = [
        { busNumber: 'KL-07-1234', stop: 'Ernakulam', time: '08:35', users: 2, status: 'departed', timestamp: '5 min ago' },
        { busNumber: 'KL-01-5678', stop: 'Kollam', time: '06:40', users: 1, status: 'delayed', timestamp: '12 min ago' },
        { busNumber: 'KL-14-9876', stop: 'Aluva', time: '07:05', users: 3, status: 'ontime', timestamp: '18 min ago' }
    ];
    
    reportsList.innerHTML = mockReports.map(report => `
        <div class="report-item status-${report.status}">
            <div class="report-header">
                <strong>Bus ${report.busNumber}</strong>
                <span class="status-badge ${report.status}">${report.status.toUpperCase()}</span>
            </div>
            <div class="report-details">
                ${report.status} ${report.stop} at ${report.time}
            </div>
            <div class="report-meta">
                ${report.users} users confirmed • ${report.timestamp}
            </div>
        </div>
    `).join('');
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
    } else if (section === 'filters') {
        document.getElementById('filters-modal').style.display = 'flex';
    }
}

// Search functionality
if (searchRouteBtn) {
    searchRouteBtn.addEventListener('click', () => {
        console.log('Route search button clicked');
        const origin = document.getElementById('origin').value.trim();
        const destination = document.getElementById('destination').value.trim();
        
        console.log('Origin:', origin, 'Destination:', destination);
        
        if (!origin || !destination) {
            alert('Please enter both origin and destination');
            return;
        }
        
        searchByRoute(origin, destination);
    });
} else {
    console.error('Search route button not found');
}

if (searchBusBtn) {
    searchBusBtn.addEventListener('click', () => {
        console.log('Bus search button clicked');
        const busNumber = document.getElementById('bus-number').value.trim();
        
        console.log('Bus number:', busNumber);
        
        if (!busNumber) {
            alert('Please enter bus number');
            return;
        }
        
        searchByBusNumber(busNumber);
    });
} else {
    console.error('Search bus button not found');
}

function searchByRoute(origin, destination) {
    console.log('Searching for route:', origin, 'to', destination);
    console.log('Available buses:', mockBusData.length);
    console.log('First bus data:', mockBusData[0]);
    
    const results = mockBusData.filter(bus => {
        if (!bus) return false;
        
        console.log('Checking bus:', bus.busNumber || bus.bus_number, 'Route:', bus.route || bus.route_name);
        console.log('Major stops:', bus.majorStops);
        console.log('Detailed stops:', bus.detailedStops?.map(s => s.name));
        
        // Check if origin and destination exist in route or detailed stops
        const route = bus.route || '';
        const detailedStops = bus.detailedStops || [];
        const majorStops = bus.majorStops || [];
        
        // More flexible matching
        const originInRoute = route.toLowerCase().includes(origin.toLowerCase());
        const destinationInRoute = route.toLowerCase().includes(destination.toLowerCase());
        
        // Also check for partial matches
        const originPartial = origin.toLowerCase().length > 3 && route.toLowerCase().includes(origin.toLowerCase().substring(0, 4));
        const destinationPartial = destination.toLowerCase().length > 3 && route.toLowerCase().includes(destination.toLowerCase().substring(0, 4));
        
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
        
        const originFound = originInRoute || originInDetailedStops || originInMajorStops || originPartial;
        const destinationFound = destinationInRoute || destinationInDetailedStops || destinationInMajorStops || destinationPartial;
        
        console.log('Origin found:', originFound, 'Destination found:', destinationFound);
        
        return originFound && destinationFound;
    });
    
    console.log('Search results:', results.length);
    displayResults(results);
}

function searchByBusNumber(busNumber) {
    console.log('Searching for bus number:', busNumber);
    console.log('Available buses:', mockBusData.length);
    
    const results = mockBusData.filter(bus => {
        if (!bus || !bus.busNumber) return false;
        return bus.busNumber.toLowerCase().includes(busNumber.toLowerCase());
    });
    
    console.log('Search results:', results.length);
    displayResults(results);
}

function displayResults(results) {
    console.log('Displaying results:', results);
    resultsSection.style.display = 'block';
    
    if (!results || results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <p>No buses found. Try different search terms.</p>
                <p>Available routes:</p>
                <ul>
                    ${mockBusData.map(bus => `<li>${bus.route}</li>`).join('')}
                </ul>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = results.map((bus, index) => {
        const imageUrl = bus.photo_url || getDefaultBusImage(bus.operatorType);
        return `
        <div class="bus-result" data-bus-id="${bus.id}" onclick="openBusDetails(${bus.id})">
            <div class="bus-image-preview">
                <img src="${imageUrl}" alt="${bus.busNumber}" class="bus-thumb" 
                     onerror="this.src='${getDefaultBusImage(bus.operatorType)}'" 
                     loading="lazy">
            </div>
            <div class="bus-content">
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
                <div class="bus-actions">
                    <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite(${bus.id})" data-bus-id="${bus.id}">
                        ${isFavorite(bus.id) ? '⭐' : '☆'}
                    </button>
                    <button class="download-btn" onclick="event.stopPropagation(); downloadRoute(${bus.id})">💾</button>
                    <div class="next-bus-badge ${getNextBusStatus(bus)}">
                        ${getNextBusText(bus)}
                    </div>
                </div>
            </div>
            <div class="click-hint">👆 Tap for full details</div>
        </div>
    `}).join('');
    
    // Click events handled by onclick in HTML
}

function openBusDetails(busId) {
    window.location.href = `bus-details.html?id=${busId}`;
}

// Removed toggleDetails - now opens separate page

// User contributions
function populateRouteSelect() {
    const routes = [...new Set(mockBusData.map(bus => bus.route).filter(route => route && route !== 'Unknown Route'))];
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

submitUpdateBtn.addEventListener('click', async () => {
    const route = routeSelect.value;
    const actualTime = document.getElementById('actual-time').value;
    const stopName = document.getElementById('stop-name').value;
    
    if (!route || !actualTime || !stopName) {
        alert('Please fill all fields');
        return;
    }
    
    const updateData = {
        route,
        actualTime,
        stopName,
        timestamp: new Date().toISOString(),
        username: 'Anonymous'
    };
    
    try {
        await submitUserUpdate(updateData);
        userReports.unshift(updateData);
        localStorage.setItem('userReports', JSON.stringify(userReports.slice(0, 50)));
        alert('Thank you for the update! It will be verified and added.');
    } catch (error) {
        userReports.unshift(updateData);
        localStorage.setItem('userReports', JSON.stringify(userReports.slice(0, 50)));
        alert('Update saved locally. It will be synced when connection is available.');
    }
    
    // Clear form
    document.getElementById('actual-time').value = '';
    document.getElementById('stop-name').value = '';
    routeSelect.value = '';
});

// Initialize filters
document.getElementById('apply-filters')?.addEventListener('click', () => {
    const sortBy = document.getElementById('sort-by').value;
    const busType = document.getElementById('bus-type-filter').value;
    const operator = document.getElementById('operator-filter').value;
    
    let results = [...mockBusData];
    
    if (busType) {
        results = results.filter(bus => bus.busType === busType);
    }
    
    if (operator) {
        if (operator === 'KSRTC') {
            results = results.filter(bus => bus.operatorType === 'government');
        } else {
            results = results.filter(bus => bus.operatorType === 'private');
        }
    }
    
    if (sortBy === 'time') {
        results.sort((a, b) => (a.timings[0] || '').localeCompare(b.timings[0] || ''));
    } else if (sortBy === 'fare') {
        results.sort((a, b) => parseInt((a.totalFare || '0').replace('₹', '')) - parseInt((b.totalFare || '0').replace('₹', '')));
    } else if (sortBy === 'rating') {
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    displayResults(results);
    document.getElementById('filters-modal').style.display = 'none';
    showSection('search');
});

document.getElementById('close-filters')?.addEventListener('click', () => {
    document.getElementById('filters-modal').style.display = 'none';
});

document.getElementById('clear-filters')?.addEventListener('click', () => {
    document.getElementById('sort-by').value = 'time';
    document.getElementById('bus-type-filter').value = '';
    document.getElementById('operator-filter').value = '';
});

// PWA Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
}

// Supabase integration functions (to be implemented)
async function initSupabase() {
    // Initialize Supabase client
    // const { createClient } = supabase;
    // const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

async function fetchBusData() {
    try {
        const { data, error } = await supabaseClient.from('buses').select('*');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching bus data:', error);
        return mockBusData;
    }
}

async function submitUserUpdate(updateData) {
    try {
        const { data, error } = await supabaseClient
            .from('user_updates')
            .insert([{
                route: updateData.route,
                actual_time: updateData.actualTime,
                stop_name: updateData.stopName,
                timestamp: new Date().toISOString(),
                verified: false
            }]);
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error submitting update:', error);
        throw error;
    }
}