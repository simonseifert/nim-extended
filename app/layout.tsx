import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsightsWrapper } from '@/components/SpeedInsightsWrapper'
import { ClientEffects } from './client-effects'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nim-extended.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Your Name — Personal website',
    template: '%s | Your Name',
  },
  description: `A personal website template built on Nim — Next.js 16, React 19, Tailwind v4, and Motion-Primitives — extended with sections, animated UI primitives, and a structured content schema.`,
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <ClientEffects />
          <div className="flex min-h-screen w-full flex-col">
            <div className="relative mx-auto w-full max-w-screen-lg flex-1 px-6 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
          <SpeedInsightsWrapper />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
