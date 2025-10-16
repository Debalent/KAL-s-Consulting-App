import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AccessibilityMenu } from '@/components/accessibility/accessibility-menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KAL Claims Companion - Veterans Benefits Consulting',
  description: 'Premium Veterans Benefits Consulting and Advocacy Platform by KAL\'s Consulting',
  keywords: ['veterans', 'benefits', 'consulting', 'advocacy', 'claims', 'VA'],
  authors: [{ name: 'KAL\'s Consulting' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'KAL Claims Companion - Veterans Benefits Consulting',
    description: 'Professional advocacy and consulting services to help veterans navigate the complex benefits system',
    url: 'https://kalsconsulting.com',
    siteName: 'KAL Claims Companion',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="root" className="min-h-full">
            {/* Skip to main content link for screen readers */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary-600 text-white px-4 py-2 z-50"
            >
              Skip to main content
            </a>
            
            <main id="main-content">
              {children}
            </main>
            
            {/* Accessibility Menu */}
            <AccessibilityMenu />
            
            {/* Screen reader announcements */}
            <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}