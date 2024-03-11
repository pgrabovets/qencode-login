import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import LightButton from '@/components/auth/LightButton/LightButton'
import { useNavigate } from "react-router-dom";
import { useEmailValidation } from '@/hooks/useEmailValidation';

export default function ForgotForm() {
  const navigate = useNavigate();
  const [error, validateEmail] = useEmailValidation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    validateEmail(formData.get('email'))
  }

  return (
    <form onSubmit={handleSubmit} className={s.forgotForm}>
      <InputField error={!!error} type="email" name='email' placeholder='Enter your email' helperText={error} />
      <div className={s.actions}>
        <PrimaryButton type='submit'>Send</PrimaryButton>
        <LightButton onClick={() => navigate('/login')}>Cancel</LightButton>
      </div>
    </form>
  )
}
