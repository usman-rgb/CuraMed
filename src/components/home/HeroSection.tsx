import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Video, Pill, FlaskConical } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-8 sm:pb-12">
      <div className="curamed-shell relative overflow-hidden bg-[#0A3F63] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] text-white p-5 sm:p-10 lg:p-16 shadow-[0_15px_40px_rgba(10,63,99,0.16)]">
        
        {/* Ambient background glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">

          {/* Left Column: Heading, Subtext, CTA and Feature Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.15] sm:leading-[1.12] tracking-tight mb-4 sm:mb-6 text-white">
                Expert & Passionate<br className="hidden sm:inline" />
                Healthcare, Right at<br className="hidden sm:inline" />
                Your Doorstep
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-sky-100/90 max-w-xl font-normal leading-relaxed mb-6 sm:mb-8">
                Instantly connect with trusted doctors, manage prescriptions, and schedule lab services—all from the comfort of your home.
              </p>

              <div className="mb-8 sm:mb-10">
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-sm sm:text-base font-bold
                             bg-white text-[#0A3F63] hover:bg-sky-50 h-12 sm:h-13 px-8 shadow-lg hover:shadow-xl
                             hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                >
                  Talk to a Doctor Now
                </Link>
              </div>
            </div>

            {/* Bottom 3 Pastel Cards (Adaptive: Horizontal on mobile, Vertical on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 sm:pt-4">
              
              {/* Card 1: Online Consultation */}
              <Link
                href="/appointment"
                className="group bg-[#DDF0D5] hover:bg-[#d4edd2] border border-[#CBE6BF] rounded-2xl p-3.5 sm:p-4.5
                           transition-all duration-200 hover:-translate-y-1 flex sm:flex-col justify-between items-center sm:items-stretch sm:h-36 active:scale-98"
              >
                <div className="flex items-center gap-3 sm:block">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/75 flex items-center justify-center text-[#1E482B] shrink-0">
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E482B] leading-tight sm:hidden">
                    Online Consultation
                  </div>
                </div>
                <div className="flex items-end justify-between w-auto sm:w-full">
                  <div className="text-xs sm:text-sm font-bold text-[#1E482B] leading-snug hidden sm:block">
                    Online<br />Consultation
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1E482B] shadow-xs group-hover:bg-[#1E482B] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Order Medicines */}
              <Link
                href="/services"
                className="group bg-[#FCE1E8] hover:bg-[#fbd3dd] border border-[#F8CAD5] rounded-2xl p-3.5 sm:p-4.5
                           transition-all duration-200 hover:-translate-y-1 flex sm:flex-col justify-between items-center sm:items-stretch sm:h-36 active:scale-98"
              >
                <div className="flex items-center gap-3 sm:block">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/75 flex items-center justify-center text-[#6E1F35] shrink-0">
                    <Pill className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#6E1F35] leading-tight sm:hidden">
                    Order Medicines
                  </div>
                </div>
                <div className="flex items-end justify-between w-auto sm:w-full">
                  <div className="text-xs sm:text-sm font-bold text-[#6E1F35] leading-snug hidden sm:block">
                    Order<br />Medicines
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#6E1F35] shadow-xs group-hover:bg-[#6E1F35] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </Link>

              {/* Card 3: Lab Services */}
              <Link
                href="/services"
                className="group bg-[#D2E8F6] hover:bg-[#c2e0f2] border border-[#BCE0F3] rounded-2xl p-3.5 sm:p-4.5
                           transition-all duration-200 hover:-translate-y-1 flex sm:flex-col justify-between items-center sm:items-stretch sm:h-36 active:scale-98"
              >
                <div className="flex items-center gap-3 sm:block">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/75 flex items-center justify-center text-[#144265] shrink-0">
                    <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#144265] leading-tight sm:hidden">
                    Lab Services
                  </div>
                </div>
                <div className="flex items-end justify-between w-auto sm:w-full">
                  <div className="text-xs sm:text-sm font-bold text-[#144265] leading-snug hidden sm:block">
                    Lab<br />Services
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#144265] shadow-xs group-hover:bg-[#144265] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </Link>

            </div>
          </div>

          {/* Right Column: Doctor Portrait in Arch Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px]">
              
              {/* Arch frame responsive sizing */}
              <div className="relative h-[360px] sm:h-[440px] md:h-[480px] lg:h-[540px] w-full rounded-t-[120px] sm:rounded-t-[160px] rounded-b-[28px] sm:rounded-b-[36px] overflow-hidden shadow-2xl border-4 border-white/20 bg-[#0E517C]">
                <Image
                  src="/images/hero_doctor.jpg"
                  alt="CuraMed Doctor"
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 420px"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
