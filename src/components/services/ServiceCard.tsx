import Link from 'next/link'
import { Stethoscope, HeartPulse, PhoneCall, UserCheck, Home, FlaskConical, Activity } from 'lucide-react'
import type { Service } from '@/types'

interface Props {
  service: Service
  index?: number
}

// Pastel theme mapping matching the 4-card sequence in CuraMed reference design
const THEMES = [
  {
    bg: 'bg-[#DDF0D5]',
    border: 'border-[#CBE6BF]',
    iconColor: 'text-[#1E482B]',
    iconCircle: 'bg-white/60 border border-[#1E482B]/20',
  },
  {
    bg: 'bg-[#FCE1E8]',
    border: 'border-[#F8CAD5]',
    iconColor: 'text-[#6E1F35]',
    iconCircle: 'bg-white/60 border border-[#6E1F35]/20',
  },
  {
    bg: 'bg-[#D2E8F6]',
    border: 'border-[#BCE0F3]',
    iconColor: 'text-[#144265]',
    iconCircle: 'bg-white/60 border border-[#144265]/20',
  },
  {
    bg: 'bg-[#D4F4F0]',
    border: 'border-[#BFEBE5]',
    iconColor: 'text-[#185750]',
    iconCircle: 'bg-white/60 border border-[#185750]/20',
  },
]

export default function ServiceCard({ service, index = 0 }: Props) {
  const theme = THEMES[index % THEMES.length]

  // Clean, tree-shakable icon lookup
  const getIcon = () => {
    switch (service.icon) {
      case 'stethoscope': return <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
      case 'heart-pulse': return <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
      case 'phone-call':  return <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
      case 'user-check':  return <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
      case 'home':        return <Home className="w-5 h-5 sm:w-6 sm:h-6" />
      case 'flask-conical': return <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6" />
      default:            return <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
    }
  }

  return (
    <div className="group rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-gray-100/90 shadow-[0_4px_20px_rgba(10,63,99,0.04)] hover:shadow-[0_12px_30px_rgba(10,63,99,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Top Pastel Header with Icon */}
      <div className={`${theme.bg} ${theme.border} h-28 sm:h-36 p-4 sm:p-5 flex items-start border-b transition-colors`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${theme.iconCircle} ${theme.iconColor} flex items-center justify-center shadow-xs`}>
          {getIcon()}
        </div>
      </div>

      {/* Bottom White Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0A3F63] mb-1.5 sm:mb-2 group-hover:text-[#13B4C6] transition-colors">
            {service.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A6D80] leading-relaxed mb-5 sm:mb-6">
            {service.description}
          </p>
        </div>

        <div>
          <Link
            href="/appointment"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-xs font-semibold
                       border border-gray-200 text-[#5A6D80] hover:border-[#13B4C6] hover:text-[#13B4C6]
                       hover:bg-[#13B4C6]/5 px-5 py-2.5 transition-all duration-200 active:scale-95"
          >
            Learn More
          </Link>
        </div>
      </div>

    </div>
  )
}
