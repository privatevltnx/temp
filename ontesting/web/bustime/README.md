# Kerala Bus Time - MVP

A mobile-first Progressive Web App for Kerala bus timings and live tracking.

## Features

✅ **Phase 1 (Current MVP)**
- Route search (origin → destination)
- Bus number search
- Static timetables
- User contribution system
- PWA (installable)
- Offline support

🚧 **Phase 2 (Planned)**
- Live GPS tracking
- Interactive maps
- AI-powered predictions
- Push notifications
- KSRTC API integration

## Quick Start

1. Open `index.html` in browser
2. For Supabase integration:
   - Follow `supabase-setup.md`
   - Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js`

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS
- **Database**: Supabase (PostgreSQL)
- **PWA**: Service Worker + Manifest
- **Maps**: Ready for Google Maps/Leaflet integration

## File Structure

```
bustime/
├── index.html          # Main app
├── styles.css          # Mobile-first CSS
├── app.js             # Core functionality
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
├── supabase-setup.md # Database setup
└── README.md         # This file
```

## Kerala-Specific Features

- KSRTC route integration ready
- Malayalam support ready
- Kerala district/city autocomplete ready
- Local bus operator support

## Deployment

Deploy to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

The app works offline after first visit!