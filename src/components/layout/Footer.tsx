'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CLINIC_INFO } from '@/lib/constants'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="px-3 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-2 sm:pt-4">
      <div className="curamed-shell relative overflow-hidden bg-[#0A3F63] text-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 pb-8 sm:pb-12 shadow-[0_20px_50px_rgba(10,63,99,0.18)]">
        
        {/* 4 Main Columns: Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 relative z-10 mb-12 sm:mb-16">
          
          {/* Column 1: Company */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              Company
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-sky-100/80">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Doctors</Link></li>
              <li><Link href="/appointment" className="hover:text-white transition-colors">Appointments</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-sky-100/80">
              <li><Link href="/services" className="hover:text-white transition-colors">General Consultation</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Preventive Care</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Emergency Support</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Specialist Visits</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Home Healthcare</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-sky-100/80">
              <li><Link href="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/appointment" className="hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link href="/admin" className="hover:text-[#13B4C6] transition-colors font-medium">Staff Portal</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Insurance & Billing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us + Subscribe */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-sky-100/80 mb-5">
              <p><span className="text-white/60 font-medium">Phone:</span> {CLINIC_INFO.phone}</p>
              <p><span className="text-white/60 font-medium">Email:</span> {CLINIC_INFO.email}</p>
              <p><span className="text-white/60 font-medium">Address:</span> {CLINIC_INFO.address}</p>
            </div>

            {/* Newsletter Input Form */}
            {subscribed ? (
              <p className="text-xs text-[#13B4C6] font-semibold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-sky-300/40 pb-1.5 max-w-xs sm:max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-transparent text-xs sm:text-sm text-white placeholder-sky-200/50 outline-none w-full pr-16"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-xs font-bold text-white hover:text-[#13B4C6] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/60 relative z-10 text-center sm:text-left">
          <p>Copyright ©PencLab. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors p-1" aria-label="Twitter">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors p-1" aria-label="Facebook">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors p-1" aria-label="Instagram">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors p-1" aria-label="GitHub">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>

        {/* Faint Watermark Logo Typography with safe mobile overflow */}
        <div className="curamed-watermark text-center mt-6 select-none opacity-20">
          CuraMed
        </div>

      </div>
    </footer>
  )
}
