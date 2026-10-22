'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import Logo from '@/components/shared/Logo'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-3 sm:px-6 lg:px-8 bg-[#EDF5F7]/85 backdrop-blur-md transition-all">
      <div className="curamed-shell bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-[0_2px_14px_rgba(10,63,99,0.06)] flex items-center justify-between border border-gray-100">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-[#13B4C6] ${
                  isActive ? 'text-[#0A3F63] font-bold' : 'text-[#5A6D80]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center rounded-full text-sm font-semibold
                       bg-[#13B4C6] hover:bg-[#0E9CAB] text-white h-10 lg:h-11 px-5 lg:px-6 shadow-sm
                       hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            Book an Appointment
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden p-2 text-[#0A3F63] rounded-full hover:bg-gray-100 active:scale-95 transition-transform focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {open && (
        <div className="curamed-shell md:hidden mt-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-5 space-y-2 animate-in fade-in slide-in-from-top-2">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-base font-semibold py-2.5 px-4 rounded-xl transition-colors ${
                pathname === link.href
                  ? 'bg-sky-50 text-[#0A3F63]'
                  : 'text-[#5A6D80] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/appointment"
              className="block w-full text-center rounded-full text-sm font-bold
                         bg-[#13B4C6] hover:bg-[#0E9CAB] text-white py-3 shadow-md active:scale-[0.98] transition-all"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
