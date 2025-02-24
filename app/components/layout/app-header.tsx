import { MainNav } from '@/components/layout/main-nav'
import { UserNav } from '@/components/layout/user-nav'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { createClient } from '@/lib/supabase/server'
import type { JSX } from 'react'
const AppHeader = async (): Promise<JSX.Element> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userData = {
    email: user?.email,
    avatarUrl: user?.user_metadata.avatar_url,
    name: user?.user_metadata.name
  }

  return (
    <header className='fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <MainNav />
        {/* <MobileNav /> */}
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            {/*   */}
          </div>
          <nav className='flex items-center space-x-2'>
            <ModeToggle />
            <UserNav userData={userData} />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
