import { z } from 'zod'
import { useState } from 'react';

export function usePasswordValidation(): [string, (data: unknown) => z.SafeParseReturnType<string, string>] {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const passwordFormSchema = z.string().min(8)
  const validate = (data: unknown) => {
    const parsed = passwordFormSchema.safeParse(data)
    if (parsed.success) {
      setErrorMessage('')
    } else {
      setErrorMessage('Password must be at least 8 characters')
    }
    return parsed;
  }

  return [errorMessage, validate];
}
