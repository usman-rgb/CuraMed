import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { CLINIC_INFO } from '@/lib/constants'
import AppointmentForm from '@/components/appointment/AppointmentForm'
import { Clock, Phone, MapPin, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = { title: `Book Appointment — ${CLINIC_INFO.name}` }

export default async function AppointmentPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    select: { id: true, name: true }
  })

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="curamed-shell space-y-10">
        
        {/* Header Band */}
        <div className="bg-[#0A3F63] rounded-[32px] md:rounded-[44px] text-white p-10 md:p-16 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block bg-white/15 text-[#13B4C6] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-white/20">
              Online Booking
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              Schedule Your Consultation
            </h1>
            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              Connect with our doctors online or reserve an in-clinic priority visit in minutes.
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Booking Form (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[#0A3F63] mb-6">Patient & Visit Details</h2>
            <AppointmentForm services={services} />
          </div>

          {/* Sidebar Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Hours */}
            <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-[#0A3F63] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#13B4C6]" /> Working Hours
              </h3>
              <ul className="space-y-3 text-sm">
                {CLINIC_INFO.hours.map(h => (
                  <li key={h.day} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                    <span className="font-semibold text-[#0A3F63]">{h.day}</span>
                    <span className="text-[#5A6D80] text-xs">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-[#0A3F63] mb-4">Direct Contact</h3>
              <ul className="space-y-4 text-sm text-[#5A6D80]">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#13B4C6] shrink-0 mt-0.5" />
                  <span>{CLINIC_INFO.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#13B4C6] shrink-0" />
                  <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-[#13B4C6] font-medium">
                    {CLINIC_INFO.phone}
                  </a>
                </li>
              </ul>
            </div>

            {/* Trust badge */}
            <div className="bg-[#D4F4F0] rounded-[28px] p-6 text-sm text-[#185750] border border-[#BFEBE5]">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldCheck className="w-5 h-5 text-[#13B4C6]" /> Guaranteed Zero Wait
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                Booked appointments are scheduled with top priority. Telemedicine and in-clinic slots begin promptly on time.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
