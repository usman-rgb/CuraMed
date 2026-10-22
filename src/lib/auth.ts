import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'curamed_admin_session'

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
    const secret = process.env.ADMIN_SECRET || 'curamed_secure_token_secret_2026'
    return !!token && token === secret
  } catch {
    return false
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  const secret = process.env.ADMIN_SECRET || 'curamed_secure_token_secret_2026'
  cookieStore.set(ADMIN_COOKIE_NAME, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
