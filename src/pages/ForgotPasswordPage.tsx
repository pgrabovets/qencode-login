import AuthContainer from '@/components/auth/AuthContainer/AuthContainer'
import CompanyLogo from '@/components/auth/CompanyLogo/CompanyLogo'
import AuthTitle from '@/components/auth/AuthTitle/AuthTitle'
import ForgotForm from '@/components/auth/ForgotForm/ForgotForm'

export default function ForgotPasswordPage() {
  return (
    <AuthContainer>
      <CompanyLogo />
      <AuthTitle>Forgot Password?</AuthTitle>
      <ForgotForm />
    </AuthContainer>
  )
}