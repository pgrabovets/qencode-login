import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import { usePasswordValidation } from '@/hooks/usePasswordValidation'
import { useConfirmValidation } from '@/hooks/useConfirmValidation'

export default function CreatePasswordForm() {
  const [passwordError, validatePassword] = usePasswordValidation()
  const [confirmError, validateConfirm] = useConfirmValidation()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const parsedPassword = validatePassword(formData.get('password'))

    if (parsedPassword.success) {
      validateConfirm(formData.get('password'), formData.get('confirm_password'))
    }
  }
  return (
    <form onSubmit={handleSubmit} className={s.createPasswordForm}>
      <InputField 
        error={!!passwordError} 
        type="password"
        name='password'
        placeholder='Password'
        label='Password' 
        helperText={passwordError}
      />
      <InputField 
        error={!!confirmError}
        type="password"
        name='confirm_password'
        placeholder='Password'
        label='Confirm Password'
        helperText={confirmError}
      />
      <PrimaryButton type='submit'>Reset Password</PrimaryButton>
    </form>
  )
}
