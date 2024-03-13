import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import FormMessage from '@/components/auth/FormMessage/FormMessage'
import DefaultLink from '@/components/auth/DefaultLink/DefaultLink'
import Alert from '@/components/ui/Alert/Alert'
import { login, LoginResponse } from '@/services/api/authApi'
import { z } from 'zod'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const validationSchema = z.object({
  email: z.string().min(1, 'Enter you email').email('Email is not valid'),
  password: z.string().min(1, 'Enter you password'),
})

export default function LoginFrom() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [alertError, setAlertError] = useState('')

  const resetErrors = () => {
    setEmailError('')
    setPasswordError('')
    setAlertError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetErrors()
    const formData = new FormData(e.currentTarget);

    const parsed = validationSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!parsed.success) {
      parsed.error.errors.reverse().forEach((error) => {
        if (error.path[0] === 'email') {
          setEmailError(error.message)
        }

        if (error.path[0] === 'password') {
          setPasswordError(error.message)
        }
      })
      return;
    }

    login(parsed.data)
      .then((res) => res.json())
      .then((data: LoginResponse) => {
        if (data?.error === 0) {
          localStorage.setItem('access_token', data?.access_token);
          localStorage.setItem('refresh_token', data?.refresh_token);
          navigate('/');
          return;
        }
        if (data?.error === 1) {
          Array.isArray(data.detail) &&  data.detail.forEach((err) => {
            if (err?.field_name === 'email') {
              setEmailError(err?.error)
            }
            if (err?.field_name === 'password') {
              setPasswordError(err?.error)
            }
          })
          return;
        }
        if (typeof data?.detail === 'string') {
          setAlertError(data?.detail)
        }
      })
  }
  return (
    <form onSubmit={handleSubmit} className={s.loginForm} noValidate>
      <InputField error={!!emailError} type="email" name='email' placeholder='Work email' helperText={emailError} />
      <InputField error={!!passwordError} type="password" name='password' placeholder='Password' helperText={passwordError} />
      <p className={s.forgotPassword}><DefaultLink to='/forgot-password'>Forgot your password?</DefaultLink></p>
      <PrimaryButton type='submit'>Log in to Qencode</PrimaryButton>
      <FormMessage>Is your company new to Qencode? <DefaultLink to='#'>Sign up</DefaultLink></FormMessage>
      { !!alertError &&  <Alert type='danger'>{ alertError }</Alert> }
    </form>
  )
}
  