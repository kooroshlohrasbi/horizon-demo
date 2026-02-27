import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Horizon Bay',
  description: 'The operating system for ANZ\'s most connected angel network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
