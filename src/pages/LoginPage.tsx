import AuthContainer from '@/components/auth/AuthContainer/AuthContainer'
import CompanyLogo from '@/components/auth/CompanyLogo/CompanyLogo'
import AuthTitle from '@/components/auth/AuthTitle/AuthTitle'
import SocialLogin from '@/components/auth/SocialLogin/SocialLogin'
import Divider from '@/components/auth/Divider/Divider'
import LoginFrom from '@/components/auth/LoginForm/LoginForm'

export default function LoginPage() {
  return (
    <AuthContainer>
      <CompanyLogo />
      <AuthTitle>Log in to your account</AuthTitle>
      <SocialLogin />
      <Divider />
      <LoginFrom />
    </AuthContainer>
  )
}
