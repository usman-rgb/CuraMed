import { NextRequest, NextResponse } from 'next/server'
import { prisma, ensureDbReady } from '@/lib/db'
import { verifyAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  await ensureDbReady()
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  const whereClause: Record<string, unknown> = {}

  if (status && status !== 'ALL') {
    whereClause.status = status
  }

  if (search) {
    whereClause.OR = [
      { patientName: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
      { service: { contains: search } },
    ]
  }

  const appointments = await prisma.appointment.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ success: true, appointments })
}
