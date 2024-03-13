const BASE_URL = 'https://auth-qa.qencode.com/v1';
const headers = {
  'Content-Type': 'application/json'
}

export type PasswordResetPayload = {
  email: string
  redirect_url?: string
}

export type PasswordResetResponse = {
  error: number
  detail: any[] | string
  timestamp: number
}

export function passwordReset(payload: PasswordResetPayload) {
  return fetch(`${BASE_URL}/auth/password-reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
}
