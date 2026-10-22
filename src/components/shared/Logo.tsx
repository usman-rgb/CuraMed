import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
}

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <Link href="/" className={`inline-flex items-center gap-2 group select-none ${className}`}>
      {/* CuraMed Medical Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          className="w-7 h-7 text-[#13B4C6] group-hover:scale-105 transition-transform duration-300"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Medical Cross / Leaf loop */}
          <path
            d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C21.4 29 26.05 25.71 27.97 21"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M16 9V23"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M9 16H23"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <span className={`text-2xl font-extrabold tracking-tight ${
        isDark ? 'text-white' : 'text-[#0A3F63]'
      }`}>
        Cura<span className="text-[#13B4C6]">Med</span>
      </span>
    </Link>
  )
}
