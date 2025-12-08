// Supabase configuration
const SUPABASE_URL = 'https://relmcuwdzlwjgmdwqxjp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbG1jdXdkemx3amdtZHdxeGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjY2NjEsImV4cCI6MjA3NDIwMjY2MX0.LxLlUP48MUAagaoMREs7iDgEb4soTdVO66Du0my0nMw';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentBus = null;
let userRatings = {};

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    await loadBusDetails();
    initializeDetailsTabs();
    initializeStarRatings();
});

async function loadBusDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const busId = urlParams.get('id');
    
    if (!busId) {
        window.location.href = 'index.html';
        return;
    }
    
    currentBus = await getBusById(busId);
    if (!currentBus) {
        window.location.href = 'index.html';
        return;
    }
    
    displayBusDetails();
}

async function getBusById(id) {
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
            `)
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error fetching bus:', error);
            return null;
        }
        
        if (!data) return null;
        
        // Transform data to match expected format
        return {
            id: data.id,
            busNumber: data.bus_number,
            route: `${data.routes.origin} - ${data.routes.destination}`,
            operator: data.routes.operator,
            operatorType: data.routes.operator === 'KSRTC' ? 'government' : 'private',
            busType: data.type,
            photoUrl: data.photo_url,
            timings: data.timings || [],
            firstBus: data.timings?.[0] || '06:00',
            lastBus: data.timings?.[data.timings.length - 1] || '20:00',
            frequency: data.routes.frequency || '30 minutes',
            majorStops: data.routes.stops || [],
            detailedStops: (data.routes.stops || []).map((stop, index) => ({
                name: stop,
                time: data.timings?.[Math.floor(index * data.timings.length / data.routes.stops.length)] || '06:00',
                fare: Math.floor(index * (data.fare || 50) / data.routes.stops.length),
                distance: `${index * 10} km`
            })),
            totalFare: `₹${data.fare || 50}`,
            duration: data.duration || '2h 30m',
            rating: data.rating || 4.2,
            reviews: data.reviews || 50,
            amenities: data.amenities || ['Non-AC', 'Reserved Seats'],
            liveUpdates: []
        };
    } catch (error) {
        console.error('Error fetching bus:', error);
        return null;
    }
}

function displayBusDetails() {
    // Header
    document.getElementById('bus-title').textContent = currentBus.busNumber;
    document.getElementById('bus-number-large').textContent = currentBus.busNumber;
    document.getElementById('operator-badge-large').textContent = currentBus.operator;
    document.getElementById('operator-badge-large').className = `operator-badge-large ${currentBus.operatorType}`;
    
    // Image
    const busImage = document.getElementById('bus-image');
    const defaultImage = currentBus.operatorType === 'government' 
        ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop'
        : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop';
    
    busImage.src = currentBus.photoUrl || defaultImage;
    busImage.onerror = () => {
        busImage.src = defaultImage;
    };
    
    // Quick Info
    document.getElementById('route-info').textContent = currentBus.route;
    document.getElementById('type-info').textContent = currentBus.busType;
    document.getElementById('fare-info').textContent = currentBus.totalFare;
    document.getElementById('duration-info').textContent = currentBus.duration;
    
    // Schedule Tab
    displaySchedule();
    
    // Route Tab
    displayRoute();
    
    // Reviews Tab
    displayReviews();
    
    // Updates Tab
    displayLiveUpdates();
}

function displaySchedule() {
    const timingsGrid = document.getElementById('timings-grid');
    timingsGrid.innerHTML = currentBus.timings.map(time => 
        `<div class="timing-item">${time}</div>`
    ).join('');
    
    document.getElementById('first-bus').textContent = currentBus.firstBus;
    document.getElementById('last-bus').textContent = currentBus.lastBus;
    document.getElementById('frequency').textContent = currentBus.frequency;
}

function displayRoute() {
    const routeTimeline = document.getElementById('route-timeline');
    routeTimeline.innerHTML = currentBus.detailedStops.map(stop => `
        <div class="route-stop">
            <div class="stop-time">${stop.time}</div>
            <div class="stop-info">
                <div class="stop-name">${stop.name}</div>
                <div class="stop-details">
                    <span class="stop-fare">₹${stop.fare}</span>
                    <span class="stop-distance">${stop.distance}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function displayReviews() {
    document.getElementById('rating-score').innerHTML = `
        <div class="score">${currentBus.rating}</div>
        <div class="stars">${'★'.repeat(Math.floor(currentBus.rating))}${'☆'.repeat(5-Math.floor(currentBus.rating))}</div>
    `;
    document.getElementById('rating-details').textContent = `Based on ${currentBus.reviews} reviews`;
    
    // Mock reviews
    const mockReviews = [
        { user: 'Ravi K.', rating: 5, comment: 'Very punctual and clean bus. Comfortable journey.', date: '2024-01-10' },
        { user: 'Priya S.', rating: 4, comment: 'Good service but can be crowded during peak hours.', date: '2024-01-08' }
    ];
    
    document.getElementById('reviews-list').innerHTML = mockReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${review.user}</span>
                <span class="review-rating">${'★'.repeat(review.rating)}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-comment">${review.comment}</div>
        </div>
    `).join('');
}

function displayLiveUpdates() {
    // Populate stops dropdown
    const updateStop = document.getElementById('update-stop');
    updateStop.innerHTML = '<option value="">Select Stop</option>' + 
        currentBus.detailedStops.map(stop => 
            `<option value="${stop.name}">${stop.name}</option>`
        ).join('');
    
    // Display recent updates
    const updatesHtml = currentBus.liveUpdates.map(update => `
        <div class="update-item">
            <div class="update-info">
                <strong>${update.stop}</strong> - ${update.status} at ${update.time}
            </div>
            <div class="update-time">Reported ${update.reportedAt}</div>
        </div>
    `).join('');
    
    document.getElementById('live-updates-list').innerHTML = updatesHtml || '<p>No recent updates</p>';
}

function initializeDetailsTabs() {
    const tabs = document.querySelectorAll('.details-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

function initializeStarRatings() {
    document.querySelectorAll('.star-rating').forEach(rating => {
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = '☆';
            star.dataset.rating = i;
            star.addEventListener('click', () => setRating(rating.dataset.category, i));
            rating.appendChild(star);
        }
    });
}

function setRating(category, rating) {
    userRatings[category] = rating;
    const ratingElement = document.querySelector(`[data-category="${category}"]`);
    const stars = ratingElement.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.textContent = index < rating ? '★' : '☆';
        star.classList.toggle('active', index < rating);
    });
}

function showRatingModal() {
    document.getElementById('rating-modal').style.display = 'flex';
}

function closeRatingModal() {
    document.getElementById('rating-modal').style.display = 'none';
}

function submitRating() {
    const reviewText = document.getElementById('review-text').value;
    
    if (Object.keys(userRatings).length === 0) {
        alert('Please rate at least one category');
        return;
    }
    
    // In real app, submit to Supabase
    console.log('Rating submitted:', { busId: currentBus.id, ratings: userRatings, review: reviewText });
    alert('Thank you for your rating!');
    closeRatingModal();
}

function submitLiveUpdate() {
    const stop = document.getElementById('update-stop').value;
    const time = document.getElementById('update-time').value;
    
    if (!stop || !time) {
        alert('Please select stop and time');
        return;
    }
    
    // In real app, submit to Supabase
    console.log('Live update submitted:', { busId: currentBus.id, stop, time });
    alert('Update submitted! Thank you.');
    
    // Clear form
    document.getElementById('update-stop').value = '';
    document.getElementById('update-time').value = '';
}

function toggleFavorite() {
    // In real app, toggle in Supabase and localStorage
    const btn = document.getElementById('favorite-btn');
    btn.textContent = btn.textContent === '⭐' ? '★' : '⭐';
    alert(btn.textContent === '★' ? 'Added to favorites!' : 'Removed from favorites!');
}

function goBack() {
    window.history.back();
}