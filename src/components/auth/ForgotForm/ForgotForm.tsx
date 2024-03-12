import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import LightButton from '@/components/auth/LightButton/LightButton'
import { useNavigate } from "react-router-dom";
import { z } from 'zod'
import { useState } from 'react';

const emailSchema = z.string().min(1, 'Enter you email').email('Email is not valid')

export default function ForgotForm() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const email = emailSchema.safeParse(formData.get('email'))
    if (!email.success) {
      setEmailError(email.error.errors[0].message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={s.forgotForm} noValidate>
      <InputField error={!!emailError} type="email" name='email' placeholder='Enter your email' helperText={emailError} />
      <div className={s.actions}>
        <PrimaryButton type='submit'>Send</PrimaryButton>
        <LightButton onClick={() => navigate('/login')}>Cancel</LightButton>
      </div>
    </form>
  )
}
