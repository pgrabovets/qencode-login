const BASE_URL = 'https://auth-qa.qencode.com/v1';
const headers = {
  'Content-Type': 'application/json'
}

export type passwordSetPayload = {
  token: string
  secret: string
  password: string
  password_confirm: string
}

export type passwordSetResponse = {
  error: number
  detail: any
  timestamp: string
}

export function passwordSet(payload: passwordSetPayload) {
  return fetch(`${BASE_URL}/auth/password-set`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
}
