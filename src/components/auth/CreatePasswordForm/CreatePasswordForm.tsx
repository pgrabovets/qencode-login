import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import { z } from 'zod'
import { useState } from 'react';


const validationSchema = z.object({
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
  confirm: z.string(),
})
.refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ['confirm'],
})

export default function CreatePasswordForm() {
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const parsed = validationSchema.safeParse({
      password: formData.get('password'),
      confirm: formData.get('confirm_password'),
    })

    setPasswordError('')
    setConfirmError('')
    if (!parsed.success) {
      const error = parsed.error.errors[0]
      if (error.path[0] === 'password') {
        setPasswordError(error.message)
      }
      if (error.path[0] === 'confirm') {
        setConfirmError(error.message)
      }
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
