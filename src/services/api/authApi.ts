const BASE_URL = 'https://auth-qa.qencode.com/v1';
const headers = {
  'Content-Type': 'application/json'
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  detail: any
  error: number
  timestamp: number
  access_token: string
  refresh_token: string
  token_expire: number
  refresh_token_expire: number
}

export function login(payload: LoginPayload) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
}
