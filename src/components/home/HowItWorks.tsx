import Image from 'next/image'
import { Calendar, Headphones, Activity, UserCheck } from 'lucide-react'

const STEPS = [
  {
    title: 'Schedule Online',
    description: 'Book your appointment in minutes.',
    icon: Calendar,
  },
  {
    title: 'Meet Your Provider',
    description: 'Consult virtually or in person.',
    icon: Headphones,
  },
  {
    title: 'Get Personalized Care',
    description: 'Receive tailored treatment & ongoing support.',
    icon: Activity,
  },
  {
    title: 'Follow-Up & Support',
    description: 'Continuous care to keep you on track.',
    icon: UserCheck,
  },
]

export default function HowItWorks() {
  return (
    <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="curamed-shell grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left: Doctor with Family Image */}
        <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-md sm:max-w-lg">
            <div className="relative h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_15px_35px_rgba(10,63,99,0.08)] border border-sky-100 bg-white">
              <Image
                src="/images/doctor_family.jpg"
                alt="Doctor consulting with family"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
              />
            </div>
          </div>
        </div>

        {/* Right: How It Works Heading and 4 Horizontal Step Cards */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0A3F63] tracking-tight mb-6 sm:mb-8 text-center lg:text-left">
            How It Works
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="bg-white rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-5 shadow-[0_4px_16px_rgba(10,63,99,0.04)]
                             border border-gray-100/90 flex items-center gap-3.5 sm:gap-5 hover:shadow-md
                             hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-50 text-[#0A3F63] flex items-center justify-center shrink-0 group-hover:bg-[#13B4C6]/10 group-hover:text-[#13B4C6] transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-[#0A3F63] mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A6D80]">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
