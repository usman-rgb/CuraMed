import type { Metadata } from 'next'
import { CLINIC_INFO } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = { title: `Contact & Location — ${CLINIC_INFO.name}` }

export default function ContactPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="curamed-shell space-y-10">
        
        {/* Header */}
        <div className="bg-[#0A3F63] rounded-[32px] md:rounded-[44px] text-white p-10 md:p-16 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block bg-white/15 text-[#13B4C6] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-white/20">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              Contact & Hospital Location
            </h1>
            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              We are here to support your health journey. Reach out anytime via phone or email.
            </p>
          </div>
        </div>

        {/* 2 Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Cards */}
          <div className="space-y-6">
            
            {/* Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-[#13B4C6] flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-[#0A3F63] uppercase mb-1">Address</h3>
                <p className="text-xs text-[#5A6D80] leading-snug">{CLINIC_INFO.address}</p>
              </div>

              <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-[#13B4C6] flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-[#0A3F63] uppercase mb-1">Phone</h3>
                <a href={`tel:${CLINIC_INFO.phone}`} className="text-xs text-[#5A6D80] hover:text-[#13B4C6] font-medium leading-snug">
                  {CLINIC_INFO.phone}
                </a>
              </div>

              <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm text-center">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-[#13B4C6] flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-[#0A3F63] uppercase mb-1">Email</h3>
                <a href={`mailto:${CLINIC_INFO.email}`} className="text-xs text-[#5A6D80] hover:text-[#13B4C6] font-medium leading-snug break-all">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-[#13B4C6] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#0A3F63]">Opening Hours</h3>
              </div>
              <ul className="space-y-3 text-sm">
                {CLINIC_INFO.hours.map(h => (
                  <li key={h.day} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                    <span className="font-semibold text-[#0A3F63]">{h.day}</span>
                    <span className="text-xs text-[#5A6D80]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/appointment"
              className="block w-full text-center rounded-full text-sm font-bold
                         bg-[#13B4C6] hover:bg-[#0E9CAB] text-white py-3.5 shadow-md hover:shadow-lg transition-all"
            >
              Book an Appointment Online
            </Link>

          </div>

          {/* Right Map Card */}
          <div className="bg-white rounded-[32px] p-3 shadow-sm border border-gray-100 overflow-hidden h-[420px] lg:h-full min-h-[380px]">
            <iframe
              title="Clinic Location"
              src={CLINIC_INFO.mapUrl}
              width="100%"
              height="100%"
              className="rounded-[24px] border-0 w-full h-full min-h-[360px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </div>
  )
}
