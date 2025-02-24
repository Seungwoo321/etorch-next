import '@/globals.css'
import type { Metadata } from 'next'
import LayoutHeader from '@/components/layout/app-header'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'custom dashboard'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div id='root'>
            <div className='relative flex h-screen flex-col bg-background'>
              <LayoutHeader />
              <div className='container relative max-w-screen-2xl pt-14 h-full'>
                <div className='flex-col md:flex h-full'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
