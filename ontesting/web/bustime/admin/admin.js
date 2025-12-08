// Admin panel functionality
let adminData = {
    buses: [],
    routes: [],
    updates: [],
    reports: [],
    analytics: {}
};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminNav();
    loadDashboardData();
    loadBusesData();
    loadUpdatesData();
    loadReportsData();
    loadAnalytics();
});

function initializeAdminNav() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.admin-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionName = item.dataset.section;
            
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(sectionName).classList.add('active');
        });
    });
}

function loadDashboardData() {
    // Mock dashboard data
    const stats = {
        totalBuses: 156,
        totalRoutes: 45,
        pendingUpdates: 23,
        totalUsers: 1247
    };
    
    document.getElementById('total-buses').textContent = stats.totalBuses;
    document.getElementById('total-routes').textContent = stats.totalRoutes;
    document.getElementById('pending-updates').textContent = stats.pendingUpdates;
    document.getElementById('total-users').textContent = stats.totalUsers;
    
    // Recent activity
    const recentActivity = [
        { action: 'New bus added', details: 'KL-08-9999 (Kochi-Munnar)', time: '2 hours ago' },
        { action: 'User update approved', details: 'Timing update for KL-07-1234', time: '4 hours ago' },
        { action: 'Route modified', details: 'Ernakulam-Kottayam route updated', time: '6 hours ago' }
    ];
    
    document.getElementById('recent-activity-list').innerHTML = recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-action">${activity.action}</div>
            <div class="activity-details">${activity.details}</div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

function loadBusesData() {
    // Mock buses data
    adminData.buses = [
        {
            id: 1,
            busNumber: 'KL-07-1234',
            route: 'Ernakulam - Kottayam',
            operator: 'KSRTC',
            type: 'Fast Passenger',
            status: 'active'
        },
        {
            id: 2,
            busNumber: 'KL-01-5678',
            route: 'Thiruvananthapuram - Kochi',
            operator: 'KSRTC',
            type: 'Super Fast',
            status: 'active'
        },
        {
            id: 3,
            busNumber: 'KL-14-9876',
            route: 'Kochi - Munnar',
            operator: 'Kallada Travels',
            type: 'Deluxe AC',
            status: 'inactive'
        }
    ];
    
    displayBuses();
}

function displayBuses() {
    const tbody = document.getElementById('buses-tbody');
    tbody.innerHTML = adminData.buses.map(bus => `
        <tr>
            <td>${bus.busNumber}</td>
            <td>${bus.route}</td>
            <td>${bus.operator}</td>
            <td>${bus.type}</td>
            <td><span class="status-badge status-${bus.status}">${bus.status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editBus(${bus.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteBus(${bus.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function loadUpdatesData() {
    // Mock user updates
    adminData.updates = [
        {
            id: 1,
            busNumber: 'KL-07-1234',
            stop: 'Ernakulam',
            reportedTime: '06:05',
            actualTime: '06:00',
            user: 'user123',
            status: 'pending',
            timestamp: '2024-01-15 06:05'
        },
        {
            id: 2,
            busNumber: 'KL-01-5678',
            stop: 'Kollam',
            reportedTime: '06:40',
            actualTime: '06:35',
            user: 'user456',
            status: 'pending',
            timestamp: '2024-01-15 06:40'
        }
    ];
    
    displayUpdates();
}

function displayUpdates() {
    const updatesList = document.getElementById('updates-list');
    updatesList.innerHTML = adminData.updates.map(update => `
        <div class="update-item">
            <div class="update-header">
                <div>
                    <strong>${update.busNumber}</strong> - ${update.stop}
                </div>
                <div class="update-actions">
                    <button class="action-btn edit-btn" onclick="approveUpdate(${update.id})">Approve</button>
                    <button class="action-btn delete-btn" onclick="rejectUpdate(${update.id})">Reject</button>
                </div>
            </div>
            <div>Reported: ${update.reportedTime} | Scheduled: ${update.actualTime}</div>
            <div>By: ${update.user} | ${update.timestamp}</div>
        </div>
    `).join('');
}

function loadReportsData() {
    // Mock reports
    adminData.reports = [
        {
            id: 1,
            busNumber: 'KL-07-1234',
            issueType: 'delayed',
            details: 'Bus was 15 minutes late',
            user: 'user789',
            status: 'pending',
            timestamp: '2024-01-15 08:30'
        },
        {
            id: 2,
            busNumber: 'KL-14-9876',
            issueType: 'cancelled',
            details: 'Bus service cancelled due to breakdown',
            user: 'user101',
            status: 'pending',
            timestamp: '2024-01-15 09:15'
        }
    ];
    
    displayReports();
}

function displayReports() {
    const reportsList = document.getElementById('reports-list');
    reportsList.innerHTML = adminData.reports.map(report => `
        <div class="report-item">
            <div class="report-header">
                <div>
                    <strong>${report.busNumber}</strong> - ${report.issueType}
                </div>
                <div class="report-actions">
                    <button class="action-btn edit-btn" onclick="resolveReport(${report.id})">Resolve</button>
                    <button class="action-btn delete-btn" onclick="dismissReport(${report.id})">Dismiss</button>
                </div>
            </div>
            <div>${report.details}</div>
            <div>By: ${report.user} | ${report.timestamp}</div>
        </div>
    `).join('');
}

function loadAnalytics() {
    // Mock analytics data
    const popularRoutes = [
        { route: 'Ernakulam - Kottayam', searches: 245 },
        { route: 'Thiruvananthapuram - Kochi', searches: 189 },
        { route: 'Kochi - Munnar', searches: 156 }
    ];
    
    document.getElementById('popular-routes-chart').innerHTML = popularRoutes.map(route => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${route.route}</span>
            <span>${route.searches} searches</span>
        </div>
    `).join('');
    
    const userActivity = [
        { date: '2024-01-10', users: 45 },
        { date: '2024-01-11', users: 52 },
        { date: '2024-01-12', users: 38 },
        { date: '2024-01-13', users: 61 },
        { date: '2024-01-14', users: 47 }
    ];
    
    document.getElementById('user-activity-chart').innerHTML = userActivity.map(day => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${day.date}</span>
            <span>${day.users} active users</span>
        </div>
    `).join('');
}

// Modal functions
function showAddBusModal() {
    document.getElementById('add-bus-modal').style.display = 'flex';
}

function closeAddBusModal() {
    document.getElementById('add-bus-modal').style.display = 'none';
    document.getElementById('add-bus-form').reset();
}

function showAddRouteModal() {
    alert('Add Route functionality - to be implemented');
}

// CRUD operations
function editBus(id) {
    const bus = adminData.buses.find(b => b.id === id);
    if (bus) {
        // Populate form with bus data
        document.getElementById('bus-number').value = bus.busNumber;
        document.getElementById('bus-route').value = bus.route;
        document.getElementById('bus-operator').value = bus.operator;
        document.getElementById('bus-type').value = bus.type;
        showAddBusModal();
    }
}

function deleteBus(id) {
    if (confirm('Are you sure you want to delete this bus?')) {
        adminData.buses = adminData.buses.filter(b => b.id !== id);
        displayBuses();
        alert('Bus deleted successfully');
    }
}

function approveUpdate(id) {
    const update = adminData.updates.find(u => u.id === id);
    if (update) {
        update.status = 'approved';
        displayUpdates();
        alert('Update approved');
    }
}

function rejectUpdate(id) {
    const update = adminData.updates.find(u => u.id === id);
    if (update) {
        update.status = 'rejected';
        displayUpdates();
        alert('Update rejected');
    }
}

function resolveReport(id) {
    const report = adminData.reports.find(r => r.id === id);
    if (report) {
        report.status = 'resolved';
        displayReports();
        alert('Report resolved');
    }
}

function dismissReport(id) {
    const report = adminData.reports.find(r => r.id === id);
    if (report) {
        report.status = 'dismissed';
        displayReports();
        alert('Report dismissed');
    }
}

// Form submission
document.getElementById('add-bus-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const busData = {
        id: Date.now(),
        busNumber: document.getElementById('bus-number').value,
        route: document.getElementById('bus-route').value,
        operator: document.getElementById('bus-operator').value,
        type: document.getElementById('bus-type').value,
        photoUrl: document.getElementById('bus-photo').value,
        frequency: document.getElementById('bus-frequency').value,
        stops: document.getElementById('bus-stops').value.split(',').map(s => s.trim()),
        status: 'active'
    };
    
    // In real app, save to Supabase
    adminData.buses.push(busData);
    displayBuses();
    closeAddBusModal();
    alert('Bus added successfully');
});

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
    }
}