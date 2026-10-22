import { NextRequest, NextResponse } from 'next/server'
import { prisma, ensureDbReady } from '@/lib/db'
import { appointmentSchema } from '@/types'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    await ensureDbReady()

    const body = await req.json()
    const data = appointmentSchema.parse(body)

    const targetDate = new Date(data.date)

    // Check for double booking / conflict
    const existing = await prisma.appointment.findFirst({
      where: {
        date: targetDate,
        timeSlot: data.timeSlot,
        status: { not: 'CANCELLED' },
      },
    })

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'This time slot is already booked for this date. Please select a different time slot.',
        },
        { status: 409 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientName: data.patientName,
        email:       data.email,
        phone:       data.phone,
        service:     data.service,
        date:        targetDate,
        timeSlot:    data.timeSlot,
        message:     data.message ?? null,
        status:      'PENDING',
      },
    })

    return NextResponse.json({ success: true, id: appointment.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.issues }, { status: 400 })
    }
    console.error('Appointment booking error:', err)
    const errMessage = err instanceof Error ? err.message : 'Server error occurred while booking.'
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  await ensureDbReady()

  // Simple protection for GET endpoint
  const authHeader = req.headers.get('authorization')
  if (process.env.ADMIN_TOKEN && authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  return NextResponse.json(appointments)
}
