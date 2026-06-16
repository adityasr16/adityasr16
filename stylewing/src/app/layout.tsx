import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StyleWing',
  description: 'AI outfit finder and social wingman',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080808]">
        <div className="max-w-lg mx-auto px-4 pb-24">
          {children}
        </div>
      </body>
    </html>
  )
}
