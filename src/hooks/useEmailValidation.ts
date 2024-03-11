import { z } from 'zod'
import { useState } from 'react';

export function useEmailValidation(): [string, (data: unknown) => z.SafeParseReturnType<string, string>] {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const emailFormSchema = z.string().email()
  const validate = (data: unknown) => {
    const parsed = emailFormSchema.safeParse(data)
    if (parsed.success) {
      setErrorMessage('')
    } else {
      setErrorMessage('Email is not valid')
    }
    return parsed;
  }

  return [errorMessage, validate]
}
