const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (replace with database in production)
const rides = new Map();
const packages = new Map();
const drivers = new Map();
const riders = new Map();

// Routes
app.post('/api/package/request', (req, res) => {
  const { senderId, pickup, dropoff, timeWindow } = req.body;
  const packageId = uuidv4();
  
  packages.set(packageId, {
    id: packageId,
    senderId,
    pickup,
    dropoff,
    timeWindow,
    status: 'pending',
    createdAt: new Date()
  });
  
  res.json({ packageId, status: 'created' });
});

app.post('/api/ride/request', (req, res) => {
  const { riderId, pickup, dropoff } = req.body;
  const rideId = uuidv4();
  
  riders.set(rideId, {
    id: rideId,
    riderId,
    pickup,
    dropoff,
    status: 'pending',
    helpWithPackages: false,
    createdAt: new Date()
  });
  
  res.json({ rideId, status: 'created' });
});

app.post('/api/driver/available', (req, res) => {
  const { driverId, location, route } = req.body;
  
  drivers.set(driverId, {
    id: driverId,
    location,
    route,
    status: 'available',
    capacity: { riders: 3, packages: 5 },
    updatedAt: new Date()
  });
  
  res.json({ status: 'driver available' });
});

app.get('/api/optimize-route/:driverId', (req, res) => {
  const { driverId } = req.params;
  const driver = drivers.get(driverId);
  
  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }
  
  // Simple route optimization (replace with AI algorithm)
  const availableRides = Array.from(riders.values()).filter(r => r.status === 'pending');
  const availablePackages = Array.from(packages.values()).filter(p => p.status === 'pending');
  
  const optimizedRoute = {
    driverId,
    stops: [
      ...availableRides.slice(0, driver.capacity.riders),
      ...availablePackages.slice(0, driver.capacity.packages)
    ],
    estimatedTime: '45 minutes',
    totalDistance: '12.5 km'
  };
  
  res.json(optimizedRoute);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚘 PureRide server running on port ${PORT}`);
});