import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import FormMessage from '@/components/auth/FormMessage/FormMessage'
import DefaultLink from '@/components/auth/DefaultLink/DefaultLink'
import { z } from 'zod'
import { useState } from 'react';

const validationSchema = z.object({
  email: z.string().min(1, 'Enter you email').email('Email is not valid'),
  password: z.string().min(1, 'Enter you password'),
})

export default function LoginFrom() {
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    }
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
  