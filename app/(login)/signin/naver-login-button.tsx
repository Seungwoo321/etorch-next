'use client'
import { useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const NaverLoginButton = () => {
  const signInWithNaver = useCallback(async () => {

  }, [])

  return (
    <Button
      className='p-0 w-full justify-normal bg-[#03C75A] hover:bg-[#03C75A] h-[45px] rounded-lg'
      onClick={signInWithNaver}
    >
      <Image
        src='/images/naver_login_symbol.png'
        alt='네이버 로그인'
        width={30}
        height={30}
        className='rounded-lg ml-2'
      />
      <div className='w-full flex justify-center mr-5 text-[0.9rem]'>
        네이버 로그인
      </div>
    </Button>
  )
}

export default NaverLoginButton
