import AuthContainer from '@/components/auth/AuthContainer/AuthContainer'
import CompanyLogo from '@/components/auth/CompanyLogo/CompanyLogo'
import AuthTitle from '@/components/auth/AuthTitle/AuthTitle'
import CreatePasswordForm from '@/components/auth/CreatePasswordForm/CreatePasswordForm'

export default function CreatePasswordPage() {
  return (
    <AuthContainer>
      <CompanyLogo />
      <AuthTitle>Create new Password?</AuthTitle>
      <CreatePasswordForm />
    </AuthContainer>
  )
}
