# 🚘 PureRide

Multi-Person, Multi-Package Ride-Share + Delivery Network

## Quick Start

```bash
npm install
npm start
```

Open http://localhost:3000

## Core Features

- **Package Delivery Requests** - Senders book deliveries with flexible time windows
- **Ride Requests** - Riders request trips with optional package assistance
- **Driver Route Optimization** - AI-optimized multi-stop trips
- **Real-time Tracking** - Chain of custody for all packages

## API Endpoints

- `POST /api/package/request` - Request package delivery
- `POST /api/ride/request` - Request ride
- `POST /api/driver/available` - Driver goes online
- `GET /api/optimize-route/:driverId` - Get optimized route

## Next Steps

1. Add real-time GPS tracking
2. Implement package scanning/QR codes
3. Add payment processing
4. Build mobile apps
5. Integrate AI route optimization