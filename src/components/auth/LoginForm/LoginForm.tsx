import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import FormMessage from '@/components/auth/FormMessage/FormMessage'
import DefaultLink from '@/components/auth/DefaultLink/DefaultLink'
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { usePasswordValidation } from '@/hooks/usePasswordValidation'

export default function LoginFrom() {
  const [emailError, validateEmail] = useEmailValidation()
  const [passwordError, validatePassword] = usePasswordValidation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    validateEmail(formData.get('email'));
    validatePassword(formData.get('password'))
  }
  return (
    <form onSubmit={handleSubmit} className={s.loginForm} noValidate>
      <InputField error={!!emailError} type="email" name='email' placeholder='Work email' helperText={emailError} />
      <InputField error={!!passwordError} type="password" name='password' placeholder='Password' helperText={passwordError} />
      <p className={s.forgotPassword}><DefaultLink to='/forgot-password'>Forgot your password?</DefaultLink></p>
      <PrimaryButton type='submit'>Log in to Qencode</PrimaryButton>
      <FormMessage>Is your company new to Qencode? <DefaultLink to='/create-password'>Sign up</DefaultLink></FormMessage>
    </form>
  )
}
  