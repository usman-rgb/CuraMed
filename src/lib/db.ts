import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import os from 'os'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient
  dbInitialized?: boolean
}

function resolveDatabaseUrl(): string {
  // If user provided a remote database (PostgreSQL, MySQL, etc.)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL
  }

  // On Vercel / AWS Lambda, the root deployment filesystem is read-only.
  // /tmp is the only writable directory for SQLite writes.
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    (process.env.NODE_ENV === 'production' && !process.env.LOCAL_DEV)
  )

  if (isServerless) {
    const tmpDir = process.env.TMPDIR || os.tmpdir() || '/tmp'
    const tmpDbPath = path.join(tmpDir, 'curamed.db').replace(/\\/g, '/')

    try {
      const exists = fs.existsSync(/*turbopackIgnore: true*/ tmpDbPath)
      if (!exists) {
        const bundledDb = path.join(process.cwd(), 'prisma', 'dev.db')
        if (fs.existsSync(/*turbopackIgnore: true*/ bundledDb)) {
          fs.copyFileSync(bundledDb, tmpDbPath)
        }
      }
    } catch (e) {
      console.warn('Notice: Could not copy initial sqlite DB to /tmp, will auto-initialize schema:', e)
    }

    return `file:${tmpDbPath}`
  }

  // Local development fallback
  return process.env.DATABASE_URL || 'file:./dev.db'
}

function createPrismaClient(): PrismaClient {
  const dbUrl = resolveDatabaseUrl()
  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Ensures database tables and initial service catalogue exist in /tmp
export async function ensureDbReady(): Promise<void> {
  if (globalForPrisma.dbInitialized) return

  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Appointment" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "patientName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "service" TEXT NOT NULL,
        "date" DATETIME NOT NULL,
        "timeSlot" TEXT NOT NULL,
        "message" TEXT,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Service" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "icon" TEXT NOT NULL,
        "duration" TEXT NOT NULL,
        "active" BOOLEAN NOT NULL DEFAULT 1
      );
    `)

    const count = await prisma.service.count().catch(() => 0)
    if (count === 0) {
      await prisma.service.createMany({
        data: [
          { name: 'General Consultation', description: 'Expert guidance for everyday health concerns.', icon: 'stethoscope', duration: '30 min' },
          { name: 'Preventive Care', description: 'Screenings, vaccinations, and wellness checks.', icon: 'heart-pulse', duration: '45 min' },
          { name: 'Emergency Support', description: 'On-call assistance when you need urgent help.', icon: 'phone-call', duration: '24/7' },
          { name: 'Specialist Visits', description: 'Connect with certified specialists across fields.', icon: 'user-check', duration: '40 min' },
          { name: 'Home Healthcare', description: 'Dedicated clinical care delivered right at your doorstep.', icon: 'home', duration: '60 min' },
          { name: 'Lab Services', description: 'Fast diagnostic testing and accurate lab results.', icon: 'flask-conical', duration: '15 min' },
        ],
      }).catch(() => {})
    }

    globalForPrisma.dbInitialized = true
  } catch (err) {
    console.error('ensureDbReady error:', err)
  }
}
