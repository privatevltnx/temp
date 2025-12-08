# Watch & Earn - Live Streaming Platform

A revolutionary live streaming platform where viewers earn real money for verified watch-time, and streamers pay to go live.

## Features

### For Viewers
- **Earn Real Money**: Get paid for watching live streams
- **Engagement Verification**: Complete simple challenges to verify active watching
- **UPI Withdrawals**: Direct payouts to your bank account
- **Anti-Fraud Protection**: Advanced systems ensure fair earnings

### For Streamers
- **Pay-to-Stream Model**: Pay a fee to unlock live streaming
- **Professional Tools**: High-quality streaming with WebRTC/HLS
- **Multiple Plans**: Per-stream or monthly subscription options
- **Analytics Dashboard**: Track performance and audience engagement

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js, NestJS/Express, WebSockets
- **Database**: PostgreSQL with Prisma ORM
- **Streaming**: WebRTC (Livepeer/Agora), HLS fallback
- **Payments**: Razorpay (streamer fees), RazorpayX (viewer payouts)
- **Authentication**: JWT with httpOnly cookies
- **Real-time**: Socket.IO for chat and notifications

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Redis (for caching and queues)
- Razorpay account for payments

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd watch-and-earn-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database
```bash
npm run db:generate
npm run db:push
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboards
│   ├── live/              # Live streaming pages
│   ├── wallet/            # Wallet and payouts
│   ├── pricing/           # Pricing pages
│   ├── admin/             # Admin panel
│   ├── legal/             # Legal pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Feature components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── public/                # Static assets
```

## Key Features Implementation

### Anti-Fraud System
- Device fingerprinting
- Engagement challenges every 3-7 minutes
- Tab visibility detection
- Audio presence verification
- Multi-account detection

### Monetization
- Streamer fees fund viewer earnings
- Ad revenue (desktop-heavy, mobile-light)
- Configurable earning rates and caps
- Secure UPI payouts via RazorpayX

### Streaming Technology
- WebRTC for ultra-low latency
- HLS fallback for compatibility
- TURN servers for NAT traversal
- Provider toggle (Livepeer/Agora)

## Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Payment processing
- `LIVEPEER_API_KEY` or `AGORA_APP_ID`: Streaming provider
- `JWT_SECRET`: Authentication secret

## Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend
- Deploy to Render, Fly.io, or similar
- Set up webhook endpoints for Razorpay
- Configure TURN servers for WebRTC

### Database
- Use managed PostgreSQL (Supabase, PlanetScale)
- Set up Redis for caching

## Security Considerations

- All payments handled via Razorpay (PCI compliant)
- JWT tokens in httpOnly cookies
- CSRF protection on forms
- Content Security Policy (CSP)
- Rate limiting on API endpoints
- KYC verification for high-value withdrawals

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary. All rights reserved.

## Support

For support, email support@watchearn.com or create an issue in the repository.