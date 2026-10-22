import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CLINIC_INFO, STATS } from '@/lib/constants'
import { CheckCircle, CalendarCheck, ShieldCheck, HeartPulse } from 'lucide-react'

export const metadata: Metadata = { title: `About Us — ${CLINIC_INFO.name}` }

const qualifications = [
  'Doctor of Medicine (MD) — Harvard Medical School',
  'Board Certified Specialist in Internal & Family Medicine',
  'Over 12+ years of hospital and clinical primary care experience',
  'Fellow — American College of Physicians (FACP)',
  'Certified in Advanced Life Support & Modern Diagnostic Care',
]

const values = [
  {
    title: 'Accessibility First',
    desc: 'Connecting patients with quality medical consultations from any location without long queue wait times.',
  },
  {
    title: 'Compassionate Care',
    desc: 'Empathetic bedside manner, thorough active listening, and holistic recovery plans for the entire family.',
  },
  {
    title: 'Modern Diagnostics',
    desc: 'Integrating rapid digital test reporting, seamless prescriptions, and data-driven preventive wellness.',
  },
  {
    title: 'Transparent Health',
    desc: 'No hidden charges, clear diagnostic summaries, and direct communication with certified providers.',
  },
]

export default function AboutPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="curamed-shell space-y-12">
        
        {/* Hero Band */}
        <div className="bg-[#0A3F63] rounded-[32px] md:rounded-[44px] text-white p-10 md:p-16 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block bg-white/15 text-[#13B4C6] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-white/20">
              About CuraMed
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              We are Your Dedicated Health Partner
            </h1>
            <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
              Founded on the belief that quality healthcare should be accessible, convenient, and compassionate for everyone.
            </p>
          </div>
        </div>

        {/* Doctor Profile Section */}
        <section className="bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Doctor Portrait */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="relative h-[420px] w-full rounded-[28px] overflow-hidden shadow-xl border-4 border-sky-50 bg-[#0A3F63]">
                  <Image
                    src="/images/hero_doctor.jpg"
                    alt={CLINIC_INFO.doctor}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#D4F4F0] text-[#185750]">
                    <ShieldCheck className="w-4 h-4 text-[#13B4C6]" /> Chief Medical Director
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Credentials & Bio */}
            <div className="md:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-[#13B4C6] mb-2 block">
                Meet Chief Physician
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A3F63] mb-2">
                {CLINIC_INFO.doctor}
              </h2>
              <p className="text-[#13B4C6] font-semibold mb-6 flex items-center gap-2 text-sm sm:text-base">
                <HeartPulse className="w-5 h-5 text-[#13B4C6]" />
                {CLINIC_INFO.specialty}
              </p>

              <p className="text-[#5A6D80] text-sm sm:text-base leading-relaxed mb-6">
                With over a decade of clinical excellence, Dr. Alex Chen is committed to breaking down traditional healthcare barriers. Combining modern telemedicine diagnostics with attentive, personalized care, he ensures every patient receives first-class treatment.
              </p>

              <h3 className="font-bold text-[#0A3F63] text-sm uppercase tracking-wider mb-3">
                Credentials & Experience
              </h3>
              <div className="space-y-3 mb-8">
                {qualifications.map(q => (
                  <div key={q} className="flex items-start gap-3 text-sm text-[#5A6D80]">
                    <CheckCircle className="w-4 h-4 text-[#13B4C6] mt-0.5 shrink-0" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 rounded-full text-sm font-bold bg-[#13B4C6] hover:bg-[#0E9CAB] text-white px-8 py-3.5 shadow-md hover:shadow-lg transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                Schedule Appointment with {CLINIC_INFO.doctor}
              </Link>
            </div>

          </div>
        </section>

        {/* Stats Grid */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(stat => (
              <div key={stat.label} className="p-4 rounded-2xl hover:bg-[#EDF5F7] transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-[#0A3F63]">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[#5A6D80] mt-1.5 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#13B4C6] mb-2 block">
              Our Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#0A3F63]">The CuraMed Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(val => (
              <div key={val.title} className="bg-[#EDF5F7] rounded-2xl p-6 border border-sky-100">
                <h3 className="text-lg font-bold text-[#0A3F63] mb-2">{val.title}</h3>
                <p className="text-sm text-[#5A6D80] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
