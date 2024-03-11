import { z } from 'zod'
import { useState } from 'react'

export function useConfirmValidation(): [string, (password: unknown, confirm: unknown) => z.SafeParseReturnType<string, string>] {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const validate = (password: unknown, confirm: unknown) => {
    const passwordFormSchema = z.string().refine(confirm => confirm === password)
    const parsed = passwordFormSchema.safeParse(confirm)
    if (parsed.success) {
      setErrorMessage('')
    } else {
      setErrorMessage('Passwords don\'t match')
    }
    return parsed;
  }
  return [errorMessage, validate]
}
