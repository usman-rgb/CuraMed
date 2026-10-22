import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth'
import AdminDashboardClient from './AdminDashboardClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Control Center — CuraMed Healthcare',
  description: 'Manage clinic appointments, patient schedules, and medical services.',
}

export default async function AdminPage() {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    redirect('/admin/login')
  }

  return <AdminDashboardClient />
}
