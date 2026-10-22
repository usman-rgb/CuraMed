import { NextResponse } from 'next/server'
import { prisma, ensureDbReady } from '@/lib/db'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  await ensureDbReady()
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [totalAppointments, pendingCount, confirmedCount, cancelledCount, totalServices] =
      await Promise.all([
        prisma.appointment.count(),
        prisma.appointment.count({ where: { status: 'PENDING' } }),
        prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
        prisma.appointment.count({ where: { status: 'CANCELLED' } }),
        prisma.service.count(),
      ])

    const recentAppointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    })

    return NextResponse.json({
      success: true,
      stats: {
        totalAppointments,
        pendingCount,
        confirmedCount,
        cancelledCount,
        totalServices,
      },
      recentAppointments,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch stats' }, { status: 500 })
  }
}
