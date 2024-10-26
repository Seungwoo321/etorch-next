import '@/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signin',
  description: 'login'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div id="root">
          <div className="relative flex min-h-screen flex-col bg-background">
            <div className="bg-background w-full h-full p-4 lg:p-0">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
