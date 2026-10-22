import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { CLINIC_INFO } from '@/lib/constants'
import ServiceCard from '@/components/services/ServiceCard'
import Link from 'next/link'
import { CalendarCheck } from 'lucide-react'

export const metadata: Metadata = { title: `Medical Services — ${CLINIC_INFO.name}` }

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { active: true } })

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="curamed-shell space-y-12">
        
        {/* Header */}
        <div className="bg-[#0A3F63] rounded-[32px] md:rounded-[44px] text-white p-10 md:p-16 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block bg-white/15 text-[#13B4C6] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-white/20">
              CuraMed Healthcare
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              Comprehensive Medical Services
            </h1>
            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              From routine consultations to diagnostic lab screenings, discover modern patient-first healthcare.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-white rounded-[32px] p-10 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0A3F63] mb-3">
            Need Personalized Medical Consultation?
          </h2>
          <p className="text-sm text-[#5A6D80] mb-6">
            Schedule an online or clinic visit with our certified doctors in under 2 minutes.
          </p>
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold
                       bg-[#13B4C6] hover:bg-[#0E9CAB] text-white h-12 px-8 shadow-md hover:shadow-lg
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            <CalendarCheck className="w-4 h-4" />
            Book an Appointment Now
          </Link>
        </div>

      </div>
    </div>
  )
}
