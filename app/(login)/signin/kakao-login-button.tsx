'use client'
import { useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const KakaoLoginButton = () => {
  const signInWithKakao = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_HOST}/auth/callback`
      }
    })
    if (error) {
      console.error('Kakao login error:', error)
    } else {
      console.log('Kakao login success:', data)
    }
  }, [])

  return (
    <Button
      className='p-0 w-full bg-transparent h-[45px] hover:bg-[#FEE500] rounded-lg'
      onClick={signInWithKakao}
    >
      <Image
        // src="/images/kakao_login_large_wide.png"
        src='/images/kakao_login_ko.png'
        alt='카카오 로그인'
        width={300}
        height={45}
        className='rounded-lg'
      />
    </Button>
  )
}

export default KakaoLoginButton
