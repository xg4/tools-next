import { v4 } from 'uuid'

export function generateUsername(length: number) {
  return v4().replaceAll('-', '').slice(0, length)
}

export const globalUsername = v4().replaceAll('-', '')
