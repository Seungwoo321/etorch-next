'use client'
import { useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const GoogleLoginButton = () => {
  const signInWithGoogle = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_HOST}/auth/callback`
      }
    })
    if (error) {
      console.error('Google login error:', error)
    } else {
      console.log('Google login success:', data)
    }
  }, [])

  return (
    <Button
      className="p-0 w-full justify-normal h-[45px] rounded-lg"
      variant={'outline'}
      onClick={signInWithGoogle}
    >
      <Image
        src="/images/g-logo.png"
        alt="Sign in with Google"
        width={30}
        height={30}
        className="rounded-lg ml-2"
      />
      <div className="w-full flex justify-center mr-5">
        {/* Sign in with Google */}
        Google 계정으로 로그인
      </div>
    </Button>
  )
}

export default GoogleLoginButton
