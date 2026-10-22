import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const services = await prisma.service.findMany({
    orderBy: { name: 'asc' },
  })

  return NextResponse.json({ success: true, services })
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, description, duration, icon } = body

    if (!name || !description) {
      return NextResponse.json(
        { success: false, message: 'Name and description are required' },
        { status: 400 }
      )
    }

    const newService = await prisma.service.create({
      data: {
        name,
        description,
        duration: duration || '30 min',
        icon: icon || 'stethoscope',
        active: true,
      },
    })

    return NextResponse.json({ success: true, service: newService }, { status: 201 })
  } catch (error) {
    console.error('Create service error:', error)
    return NextResponse.json({ success: false, message: 'Failed to create service' }, { status: 500 })
  }
}
