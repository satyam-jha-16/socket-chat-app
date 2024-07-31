'use client'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'

import { Toaster } from '@/components/ui/toaster'
import { AuthContextProvider } from '@/context/AuthContext'
import SocketContextProvider from '@/context/SocketContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='light'>
      <body
        className={cn(
          'min-h-screen font-sans antialiased grainy',
          inter.className
        )}>
        <Toaster />
        <AuthContextProvider>
          <SocketContextProvider>
            {children}
          </SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
