import s from './style.module.css'
import InputField from '@/components/auth/InputField/InputField'
import PrimaryButton from '@/components/auth/PrimaryButton/PrimaryButton'
import Alert from '@/components/ui/Alert/Alert'
import { passwordSet, passwordSetPayload, passwordSetResponse } from '@/services/api/passwordSetApi'
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
  const [alertInfo, setAlertInfo] = useState('')
  const [alertError, setAlertError] = useState('')

  const resetError = () => {
    setPasswordError('')
    setConfirmError('')
    setAlertInfo('')
    setAlertError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetError()
    const formData = new FormData(e.currentTarget);

    const parsed = validationSchema.safeParse({
      password: formData.get('password'),
      confirm: formData.get('confirm_password'),
    })

    if (!parsed.success) {
      const error = parsed.error.errors[0]
      if (error.path[0] === 'password') {
        setPasswordError(error.message)
      }
      if (error.path[0] === 'confirm') {
        setConfirmError(error.message)
      }
      return;
    }

    const payload: passwordSetPayload = {
      token: 'token',
      secret: 'secret',
      password: parsed.data.password,
      password_confirm: parsed.data.confirm,
    }

    passwordSet(payload)
      .then(res => res.json())
      .then((data: passwordSetResponse) => {
        if (data?.error === 0) {
          if (typeof data?.detail === 'string') {
            setAlertInfo(data?.detail as string)
          }
          return;
        }
        if (data?.error === 1) {
          Array.isArray(data.detail) && data.detail.forEach((err: any) => {
            if (err?.field_name === 'password') {
              setPasswordError(err?.error)
            }
            if (err?.field_name === 'confirm_password') {
              setConfirmError(err?.error)
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
      <div className={s.alertContainer}>
        {alertInfo && <Alert type='info'>{alertInfo}</Alert>}
        {alertError && <Alert type='danger'>{alertError}</Alert>}
      </div>
    </form>
  )
}
