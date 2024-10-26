import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import KakaoLoginButton from './kakao-login-button'
import GoogleLoginButton from './google-login-button'
export default function Page () {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] 2xl:min-h-[1000px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto grid w-[350px] gap-6">
          <CardHeader>
            <CardTitle className="text-2xl">E-TORCH</CardTitle>
            <CardDescription>
              SNS 계정으로 로그인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <KakaoLoginButton/>
              <GoogleLoginButton/>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block overflow-hidden">
        <div className="bg-[url('/images/login_bg.png')] bg-cover bg-center h-full w-full transform rotate-[35deg] scale-[150%] translate-x-[20px]">
        </div>
      </div>
    </div>
  )
}
