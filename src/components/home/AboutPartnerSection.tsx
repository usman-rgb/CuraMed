import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Users, Award } from 'lucide-react'

export default function AboutPartnerSection() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="curamed-shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left: Professional Healthcare Team Showcase */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-md sm:max-w-lg">
            
            {/* Ambient subtle glow ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#13B4C6]/20 to-[#0A3F63]/10 rounded-[40px] blur-2xl transform -rotate-2 scale-105 pointer-events-none" />

            {/* Main Team Showcase Frame */}
            <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-white p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(10,63,99,0.12)] border border-sky-100">
              <div className="relative h-[340px] sm:h-[420px] md:h-[460px] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-slate-100">
                <Image
                  src="/images/doctors_team_compact.jpg"
                  alt="CuraMed Dedicated Healthcare Team"
                  fill
                  priority
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
                />
                
                {/* Subtle bottom gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3F63]/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4F4F0] text-[#13B4C6] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#0A3F63]">
                        Certified Medical Staff
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#5A6D80] font-medium">
                        150+ Dedicated Specialists
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 bg-sky-50 text-[#0A3F63] px-3 py-1 rounded-full text-xs font-bold border border-sky-100">
                    <Award className="w-3.5 h-3.5 text-[#13B4C6]" />
                    Top Rated
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-white text-[#0A3F63] px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-gray-100 animate-bounce duration-1000 z-10">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#13B4C6] flex items-center justify-center font-bold">
                <Users className="w-4 h-4 text-[#13B4C6]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#0A3F63]">24/7 Availability</div>
                <div className="text-[10px] text-[#5A6D80] font-medium">Family Care</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Content & CTA */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0A3F63] leading-[1.2] tracking-tight mb-4 sm:mb-6">
            We are more than just a platform; we are your dedicated health partner.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#5A6D80] leading-relaxed mb-6 sm:mb-8">
            CuraMed was founded on a simple belief: quality healthcare should be accessible, convenient, and compassionate for everyone. We are a team of dedicated doctors, nurses, and technologists committed to breaking down the barriers of traditional healthcare.
          </p>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-sm sm:text-base font-semibold
                       bg-[#13B4C6] hover:bg-[#0E9CAB] text-white h-12 px-8 shadow-sm hover:shadow-md
                       active:scale-95 transition-all duration-200"
          >
            Explore Our Values
          </Link>
        </div>

      </div>
    </section>
  )
}
