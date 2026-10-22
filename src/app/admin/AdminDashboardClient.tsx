'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import {
  Calendar, CheckCircle2, XCircle, Clock, Trash2, Search,
  Plus, LogOut, ExternalLink, Download, AlertCircle,
  Stethoscope, Users, Loader2, Sparkles, Phone, Mail
} from 'lucide-react'
import { CLINIC_INFO } from '@/lib/constants'

interface Appointment {
  id: string
  patientName: string
  email: string
  phone: string
  service: string
  date: string
  timeSlot: string
  message: string | null
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  createdAt: string
}

interface Service {
  id: string
  name: string
  description: string
  duration: string
  icon: string
  active: boolean
}

interface Stats {
  totalAppointments: number
  pendingCount: number
  confirmedCount: number
  cancelledCount: number
  totalServices: number
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const [tab, setTab] = useState<'overview' | 'appointments' | 'services' | 'settings'>('overview')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // New Service Form State
  const [isAddingService, setIsAddingService] = useState(false)
  const [newServiceName, setNewServiceName] = useState('')
  const [newServiceDesc, setNewServiceDesc] = useState('')
  const [newServiceDuration, setNewServiceDuration] = useState('30 min')
  const [newServiceIcon, setNewServiceIcon] = useState('stethoscope')

  // Load Dashboard Data
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [statsRes, apptRes, svcRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/appointments'),
        fetch('/api/admin/services'),
      ])

      const statsData = await statsRes.json()
      const apptData = await apptRes.json()
      const svcData = await svcRes.json()

      if (statsData.success) setStats(statsData.stats)
      if (apptData.success) setAppointments(apptData.appointments)
      if (svcData.success) setServices(svcData.services)
    } catch (err) {
      console.error('Error loading admin data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Update Appointment Status
  async function handleUpdateStatus(id: string, newStatus: 'CONFIRMED' | 'CANCELLED' | 'PENDING') {
    try {
      setActionLoading(id)
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        setAppointments(prev =>
          prev.map(a => (a.id === id ? { ...a, status: newStatus } : a))
        )
        // Refresh stats
        const statsRes = await fetch('/api/admin/stats')
        const statsData = await statsRes.json()
        if (statsData.success) setStats(statsData.stats)
      }
    } catch (err) {
      console.error('Error updating status:', err)
    } finally {
      setActionLoading(null)
    }
  }

  // Delete Appointment
  async function handleDeleteAppointment(id: string) {
    if (!confirm('Are you sure you want to permanently delete this appointment?')) return
    try {
      setActionLoading(id)
      const res = await fetch(`/api/admin/appointments/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a.id !== id))
        // Refresh stats
        const statsRes = await fetch('/api/admin/stats')
        const statsData = await statsRes.json()
        if (statsData.success) setStats(statsData.stats)
      }
    } catch (err) {
      console.error('Error deleting appointment:', err)
    } finally {
      setActionLoading(null)
    }
  }

  // Create Service
  async function handleCreateService(e: React.FormEvent) {
    e.preventDefault()
    if (!newServiceName.trim()) return

    try {
      setActionLoading('create-service')
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newServiceName,
          description: newServiceDesc,
          duration: newServiceDuration,
          icon: newServiceIcon,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setServices(prev => [...prev, data.service])
        setIsAddingService(false)
        setNewServiceName('')
        setNewServiceDesc('')
      }
    } catch (err) {
      console.error('Error creating service:', err)
    } finally {
      setActionLoading(null)
    }
  }

  // Toggle Service Active
  async function handleToggleService(id: string, currentActive: boolean) {
    try {
      setActionLoading(id)
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      })
      const data = await res.json()
      if (data.success) {
        setServices(prev =>
          prev.map(s => (s.id === id ? { ...s, active: !currentActive } : s))
        )
      }
    } catch (err) {
      console.error('Error toggling service:', err)
    } finally {
      setActionLoading(null)
    }
  }

  // Delete Service
  async function handleDeleteService(id: string) {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      setActionLoading(id)
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id))
      }
    } catch (err) {
      console.error('Error deleting service:', err)
    } finally {
      setActionLoading(null)
    }
  }

  // Logout
  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  // Export CSV
  function exportCSV() {
    const headers = ['ID', 'Patient Name', 'Email', 'Phone', 'Service', 'Date', 'Time Slot', 'Status', 'Created At', 'Message']
    const rows = appointments.map(a => [
      a.id,
      `"${a.patientName}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.service}"`,
      new Date(a.date).toLocaleDateString(),
      a.timeSlot,
      a.status,
      new Date(a.createdAt).toLocaleString(),
      `"${(a.message || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `curamed_appointments_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchStatus = statusFilter === 'ALL' || a.status === statusFilter
    const q = searchQuery.toLowerCase()
    const matchQuery =
      !searchQuery ||
      a.patientName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.phone.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q)
    return matchStatus && matchQuery
  })

  return (
    <div className="py-6 px-3 sm:px-6 lg:px-8">
      <div className="curamed-shell space-y-6">

        {/* Top Header Card */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="h-8 w-px bg-gray-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold text-[#0A3F63]">
                  Admin Control Center
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              </div>
              <p className="text-xs text-[#5A6D80]">
                Live medical management & patient scheduling system
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A3F63] hover:text-[#13B4C6] bg-sky-50 hover:bg-sky-100 px-4 py-2.5 rounded-full transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Website
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-full transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs Navigation Bar */}
        <div className="bg-white rounded-[24px] p-2 shadow-sm border border-gray-100 flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
            {
              id: 'appointments',
              label: `Appointments (${stats?.pendingCount ? `${stats.pendingCount} Pending` : appointments.length})`,
              icon: Calendar,
              badge: stats?.pendingCount,
            },
            { id: 'services', label: `Manage Services (${services.length})`, icon: Stethoscope },
            { id: 'settings', label: 'Clinic Information', icon: Users },
          ].map(t => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  active
                    ? 'bg-[#0A3F63] text-white shadow-sm'
                    : 'text-[#5A6D80] hover:text-[#0A3F63] hover:bg-sky-50/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="bg-white rounded-[32px] p-16 text-center shadow-sm border border-gray-100">
            <Loader2 className="w-10 h-10 animate-spin text-[#13B4C6] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#0A3F63]">Loading control records...</p>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {!loading && tab === 'overview' && stats && (
          <div className="space-y-6">
            
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6D80]">
                    Total Bookings
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0A3F63] flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0A3F63]">{stats.totalAppointments}</div>
                <p className="text-xs text-[#5A6D80] mt-1 font-medium">All registered patients</p>
              </div>

              <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm border border-amber-100 bg-amber-50/20 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Pending Requests
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-700">{stats.pendingCount}</div>
                <p className="text-xs text-amber-800/80 mt-1 font-medium">Action required by doctor</p>
              </div>

              <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm border border-teal-100 bg-teal-50/20 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Confirmed Visits
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#D4F4F0] text-[#13B4C6] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#13B4C6]">{stats.confirmedCount}</div>
                <p className="text-xs text-teal-800/80 mt-1 font-medium">Approved consultations</p>
              </div>

              <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A6D80]">
                    Active Services
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#EDF5F7] text-[#0A3F63] flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0A3F63]">{stats.totalServices}</div>
                <p className="text-xs text-[#5A6D80] mt-1 font-medium">Available on website</p>
              </div>

            </div>

            {/* Quick Action / Recent Appointments Card */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0A3F63]">Recent Patient Requests</h3>
                  <p className="text-xs sm:text-sm text-[#5A6D80]">Confirm or update incoming consultation bookings</p>
                </div>
                <button
                  onClick={() => setTab('appointments')}
                  className="text-xs font-bold text-[#13B4C6] hover:underline"
                >
                  View All ({appointments.length}) →
                </button>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-12 text-[#5A6D80] text-sm">
                  No appointments booked yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 5).map(a => (
                    <div
                      key={a.id}
                      className="p-4 rounded-2xl border border-gray-100 bg-[#EDF5F7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#0A3F63]">{a.patientName}</span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              a.status === 'CONFIRMED'
                                ? 'bg-teal-100 text-teal-800'
                                : a.status === 'CANCELLED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {a.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#5A6D80] mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          <span>🩺 {a.service}</span>
                          <span>📅 {new Date(a.date).toLocaleDateString()} at {a.timeSlot}</span>
                          <span>📞 {a.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {a.status !== 'CONFIRMED' && (
                          <button
                            onClick={() => handleUpdateStatus(a.id, 'CONFIRMED')}
                            disabled={actionLoading === a.id}
                            className="inline-flex items-center gap-1 text-xs font-bold bg-[#13B4C6] hover:bg-[#0E9CAB] text-white px-3 py-1.5 rounded-full shadow-2xs transition-all disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                          </button>
                        )}
                        {a.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleUpdateStatus(a.id, 'CANCELLED')}
                            disabled={actionLoading === a.id}
                            className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: APPOINTMENTS */}
        {!loading && tab === 'appointments' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            
            {/* Header, Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#0A3F63]">All Patient Appointments</h3>
                <p className="text-xs sm:text-sm text-[#5A6D80]">
                  Manage patient schedules, confirm bookings, or export records
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-2 text-xs font-bold bg-sky-50 text-[#0A3F63] hover:bg-sky-100 px-4 py-2.5 rounded-full transition-colors border border-sky-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export to CSV
                </button>
              </div>
            </div>

            {/* Filter pills and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                      statusFilter === st
                        ? 'bg-[#0A3F63] text-white'
                        : 'bg-gray-100 text-[#5A6D80] hover:bg-gray-200'
                    }`}
                  >
                    {st === 'ALL' ? 'All Bookings' : st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, phone, service..."
                  className="w-full rounded-full border border-gray-200 pl-9 pr-4 py-2 text-xs text-[#0A3F63] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6]"
                />
              </div>
            </div>

            {/* Appointments List / Table */}
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-16 bg-[#EDF5F7]/30 rounded-2xl border border-dashed border-gray-200">
                <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#0A3F63]">No matching appointments found</p>
                <p className="text-xs text-[#5A6D80] mt-1">Try changing your search query or status filter.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredAppointments.map(a => (
                  <div
                    key={a.id}
                    className="p-5 rounded-2xl border border-gray-100 bg-[#EDF5F7]/25 hover:bg-[#EDF5F7]/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-base text-[#0A3F63]">{a.patientName}</span>
                        <span
                          className={`text-[10px] font-bold uppercase px-3 py-0.5 rounded-full ${
                            a.status === 'CONFIRMED'
                              ? 'bg-teal-100 text-teal-800'
                              : a.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {a.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#5A6D80]">
                        <p className="flex items-center gap-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-[#13B4C6]" />
                          <strong className="text-[#0A3F63]">{a.service}</strong>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#13B4C6]" />
                          <span>{new Date(a.date).toLocaleDateString()} at {a.timeSlot}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#13B4C6]" />
                          <span>{a.phone}</span>
                        </p>
                      </div>

                      {a.email && (
                        <p className="text-xs text-[#5A6D80] flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#13B4C6]" />
                          <span>{a.email}</span>
                        </p>
                      )}

                      {a.message && (
                        <div className="bg-white p-2.5 rounded-xl text-xs text-[#5A6D80] border border-gray-100 mt-2">
                          <strong className="text-[#0A3F63]">Notes:</strong> {a.message}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-0 border-gray-100">
                      {a.status !== 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(a.id, 'CONFIRMED')}
                          disabled={actionLoading === a.id}
                          className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#13B4C6] hover:bg-[#0E9CAB] text-white px-3.5 py-2 rounded-full shadow-xs transition-all disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                        </button>
                      )}

                      {a.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleUpdateStatus(a.id, 'CANCELLED')}
                          disabled={actionLoading === a.id}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3.5 py-2 rounded-full transition-all disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteAppointment(a.id)}
                        disabled={actionLoading === a.id}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: SERVICES */}
        {!loading && tab === 'services' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#0A3F63]">Medical Services Control</h3>
                <p className="text-xs sm:text-sm text-[#5A6D80]">
                  Add, edit, or toggle services displayed across the website
                </p>
              </div>

              <button
                onClick={() => setIsAddingService(!isAddingService)}
                className="inline-flex items-center gap-2 text-xs font-bold bg-[#13B4C6] hover:bg-[#0E9CAB] text-white px-5 py-2.5 rounded-full shadow-md transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                {isAddingService ? 'Close Form' : 'Add New Service'}
              </button>
            </div>

            {/* Add Service Expandable Form */}
            {isAddingService && (
              <form onSubmit={handleCreateService} className="bg-[#EDF5F7] p-5 sm:p-6 rounded-2xl border border-sky-100 space-y-4 animate-in fade-in">
                <h4 className="font-bold text-sm text-[#0A3F63]">New Service Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A3F63] mb-1">Service Name *</label>
                    <input
                      type="text"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      placeholder="e.g. Cardiology Consultation"
                      required
                      className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2 text-xs text-[#0A3F63] outline-none focus:ring-2 focus:ring-[#13B4C6]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A3F63] mb-1">Duration</label>
                    <input
                      type="text"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(e.target.value)}
                      placeholder="e.g. 45 min"
                      className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2 text-xs text-[#0A3F63] outline-none focus:ring-2 focus:ring-[#13B4C6]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0A3F63] mb-1">Icon</label>
                    <select
                      value={newServiceIcon}
                      onChange={(e) => setNewServiceIcon(e.target.value)}
                      className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2 text-xs text-[#0A3F63] outline-none focus:ring-2 focus:ring-[#13B4C6]/30"
                    >
                      <option value="stethoscope">Stethoscope</option>
                      <option value="heart-pulse">Heart Pulse</option>
                      <option value="phone-call">Emergency Phone</option>
                      <option value="user-check">Specialist Doctor</option>
                      <option value="flask-conical">Lab Tests</option>
                      <option value="home">Home Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A3F63] mb-1">Description *</label>
                  <input
                    type="text"
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    placeholder="Brief description of clinical care offered..."
                    required
                    className="w-full rounded-xl bg-white border border-gray-200 px-3.5 py-2 text-xs text-[#0A3F63] outline-none focus:ring-2 focus:ring-[#13B4C6]/30"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingService(false)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-white text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === 'create-service'}
                    className="px-5 py-2 rounded-full text-xs font-bold bg-[#13B4C6] text-white hover:bg-[#0E9CAB] shadow-sm disabled:opacity-50"
                  >
                    {actionLoading === 'create-service' ? 'Saving...' : 'Save Service'}
                  </button>
                </div>
              </form>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <div
                  key={s.id}
                  className="p-5 rounded-2xl border border-gray-100 bg-[#EDF5F7]/30 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#0A3F63]">{s.name}</h4>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          s.active ? 'bg-teal-100 text-teal-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {s.active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A6D80] mt-1 leading-relaxed">{s.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-[#13B4C6] font-semibold">
                      <span>⏱️ {s.duration}</span>
                      <span>Icon: {s.icon}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleService(s.id, s.active)}
                      disabled={actionLoading === s.id}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 ${
                        s.active
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                          : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                      }`}
                    >
                      {s.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      disabled={actionLoading === s.id}
                      className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
                      title="Delete service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {!loading && tab === 'settings' && (
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0A3F63]">Clinic Information & Configurations</h3>
              <p className="text-xs sm:text-sm text-[#5A6D80]">
                Active clinic credentials and operational settings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#EDF5F7]/40 border border-sky-100 space-y-3">
                <h4 className="font-bold text-sm text-[#0A3F63] flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#13B4C6]" /> Physician & Practice
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-[#5A6D80]">
                  <p><strong className="text-[#0A3F63]">Clinic Name:</strong> {CLINIC_INFO.name}</p>
                  <p><strong className="text-[#0A3F63]">Chief Doctor:</strong> {CLINIC_INFO.doctor}</p>
                  <p><strong className="text-[#0A3F63]">Specialty:</strong> {CLINIC_INFO.specialty}</p>
                  <p><strong className="text-[#0A3F63]">Tagline:</strong> {CLINIC_INFO.tagline}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#EDF5F7]/40 border border-sky-100 space-y-3">
                <h4 className="font-bold text-sm text-[#0A3F63] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#13B4C6]" /> Contact & Location
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-[#5A6D80]">
                  <p><strong className="text-[#0A3F63]">Phone:</strong> {CLINIC_INFO.phone}</p>
                  <p><strong className="text-[#0A3F63]">Email:</strong> {CLINIC_INFO.email}</p>
                  <p><strong className="text-[#0A3F63]">Address:</strong> {CLINIC_INFO.address}</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100">
              <h4 className="font-bold text-sm text-teal-900 mb-2">Security Notice</h4>
              <p className="text-xs text-teal-800 leading-relaxed">
                This Admin portal is restricted using secure HTTP-only session cookies. Unauthenticated visitors are automatically redirected to the login gate. To update your admin password, modify the <code className="bg-white/80 px-1 py-0.5 rounded font-mono">ADMIN_PASSWORD</code> variable in your server environment file (<code className="bg-white/80 px-1 py-0.5 rounded font-mono">.env</code>).
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
