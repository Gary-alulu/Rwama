import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/rwama/Navbar'
import { Providers } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
  title: {
    default: 'Rwama Coffee | Kirinyaga, Kenya',
    template: '%s | Rwama Coffee',
  },
  description:
    'Traceable, exceptional Arabica coffee grown at 1,700m by 1,200+ farmers across the volcanic slopes of Mount Kenya.',
  openGraph: {
    siteName: 'Rwama Coffee',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body className="bg-[var(--color-cream)] text-[var(--color-forest)] antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
