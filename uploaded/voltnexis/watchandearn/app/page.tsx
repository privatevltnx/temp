import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { LiveNowCarousel } from '@/components/live-now-carousel'
import { EarningsCalculator } from '@/components/earnings-calculator'
import { PricingTeaser } from '@/components/pricing-teaser'
import { TrustSafety } from '@/components/trust-safety'
import { AdSlot } from '@/components/ad-slot'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <AdSlot variant="leaderboard" device="desktop" />
      
      <Hero />
      
      <HowItWorks />
      
      <LiveNowCarousel />
      
      <AdSlot variant="native" device="mobile" />
      
      <EarningsCalculator />
      
      <PricingTeaser />
      
      <TrustSafety />
    </div>
  )
}