import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ConsentBanner } from '@/components/consent-banner'
import { AdProvider } from '@/components/ad-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watch & Earn - Live Streaming Platform',
  description: 'Earn money by watching live streams. Streamers pay to go live.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdProvider />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}