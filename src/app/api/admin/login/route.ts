import { NextRequest, NextResponse } from 'next/server'
import { setAdminSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    const validUser = process.env.ADMIN_USERNAME || 'admin'
    const validPass = process.env.ADMIN_PASSWORD || 'admin123'

    if (username === validUser && password === validPass) {
      await setAdminSession()
      return NextResponse.json({ success: true, message: 'Logged in successfully' })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid admin username or password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error during login' },
      { status: 500 }
    )
  }
}
