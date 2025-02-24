import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from '@/components/shared/icons'

import type { JSX, HTMLAttributes } from 'react'

const links = [
  {
    name: 'Overview',
    href: '/'
  },
  {
    name: 'Settings',
    href: '/edit'
  }
]

export function MainNav ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>): JSX.Element {
  return (
    <div className='mr-4 hidden md:flex'>
      <Link href='/' className='mr-6 flex items-center space-x-2'>
        <Icons.Logo className='h-6 w-6' />
        <span className='hidden font-bold sm:inline-block'>
          e-torch
        </span>
      </Link>
      <nav
        className={cn('flex items-center space-x-4 lg:space-x-6', className)}
        {...props}
      >
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
