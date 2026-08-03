import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Vision CRM — AI-first customer relationships',
  description:
    'Vision is the AI-first CRM for modern teams. Manage customers, companies, and deals with intelligent automation.',
  generator: 'v0.app',
  icons: {
    icon: '/vision-logo.png',
    shortcut: '/vision-logo.png',
    apple: '/vision-logo.png',
  },
  openGraph: {
    title: 'Vision CRM — AI SaaS Platform',
    description:
      'Vision is the AI-first CRM for modern teams. Manage customers, companies, and deals with intelligent automation.',
    url: 'https://vision-crm.app',
    siteName: 'Vision CRM',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vision CRM - AI-first Customer Relationship Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1f26' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
