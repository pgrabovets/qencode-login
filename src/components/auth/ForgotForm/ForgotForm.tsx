import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import LightButton from '@/components/auth/LightButton/LightButton'
import Alert from '@/components/ui/Alert/Alert'
import { useNavigate } from "react-router-dom";
import { passwordReset, PasswordResetResponse } from '@/services/api/passwordResetApi'
import { z } from 'zod'
import { useState } from 'react';

const validationSchema = z.object({
  email: z.string().min(1, 'Enter you email').email('Email is not valid')
})

export default function ForgotForm() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('')
  const [alertInfo, setAlertInfo] = useState('')
  const [alertError, setAlertError] = useState('')

  const resetErrors = () => {
    setEmailError('')
    setAlertInfo('');
    setAlertError('');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();
    const formData = new FormData(e.currentTarget)
    const parsed = validationSchema.safeParse({
      email: formData.get('email')
    })

    if (!parsed.success) {
      setEmailError(parsed.error.errors[0].message)
      return;
    }

    const payload = {
      email: parsed.data.email,
      redirect_url: 'https://phrabovets-qencode-test.netlify.app/create-password',
    }
    passwordReset(payload)
      .then(res => res.json())
      .then((data: PasswordResetResponse) => {
        if (data?.error === 0) {
          if (typeof data?.detail === 'string') {
            setAlertInfo(data?.detail)
            return;
          }
        }
        if (data?.error === 1) {
          if (typeof data?.detail === 'string') {
            setEmailError(data?.detail)
            return;
          }
        }
        if (typeof data?.detail === 'string') {
          setAlertError(data?.detail)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} className={s.forgotForm} noValidate>
      <InputField error={!!emailError} type="email" name='email' placeholder='Enter your email' helperText={emailError} />
      <div className={s.actions}>
        <PrimaryButton type='submit'>Send</PrimaryButton>
        <LightButton onClick={() => navigate('/login')}>Cancel</LightButton>
        {alertInfo && <Alert type='info'>{alertInfo}</Alert>}
        {alertError && <Alert type='danger'>{alertError}</Alert>}
      </div>
    </form>
  )
}
