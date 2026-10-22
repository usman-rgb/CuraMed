'use client'
import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, Loader2, ChevronDown } from 'lucide-react'

export default function GetInTouchCard() {
  const [patientName, setPatientName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!patientName.trim()) {
      setErrorMessage('Please enter your full name')
      return
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number')
      return
    }
    if (!service) {
      setErrorMessage('Please select a service')
      return
    }

    setErrorMessage('')
    setStatus('loading')

    try {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const dateStr = tomorrow.toISOString().split('T')[0]

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          email: `${patientName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'patient'}@curamed.com`,
          phone,
          service,
          date: dateStr,
          timeSlot: '10:00 AM',
          message: 'Quick consultation request via website home contact form',
        }),
      })

      if (res.ok) {
        setStatus('success')
        setPatientName('')
        setPhone('')
        setService('')
      } else {
        setStatus('error')
        setErrorMessage('Failed to submit. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="curamed-shell relative overflow-hidden bg-gradient-to-br from-[#C6E6EE] via-[#D5ECF2] to-[#BEE1EA] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] shadow-[0_15px_40px_rgba(10,63,99,0.08)] border border-sky-200/60 p-6 sm:p-10 lg:p-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Left: Heading and Form */}
          <div className="lg:col-span-6 max-w-lg w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0A3F63] leading-[1.18] sm:leading-[1.15] tracking-tight mb-6 sm:mb-8 text-center lg:text-left">
              Get In Touch With<br className="hidden sm:inline" /> Us Today!
            </h2>

            {status === 'success' ? (
              <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 text-center border border-white shadow-sm">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-[#13B4C6] mx-auto mb-3" />
                <h3 className="text-lg sm:text-xl font-bold text-[#0A3F63] mb-2">Request Received!</h3>
                <p className="text-xs sm:text-sm text-[#5A6D80] mb-5">
                  Our medical team will call you back shortly on your phone number to confirm your consultation.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A3F63] text-white px-6 py-2.5 hover:bg-[#072F4A] active:scale-95 transition-all"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white/85 focus:bg-white text-[#0A3F63] placeholder-[#7F97AB] text-base sm:text-sm font-medium rounded-full px-5 sm:px-6 py-3 sm:py-3.5 border border-sky-300/60 focus:border-[#13B4C6] focus:ring-2 focus:ring-[#13B4C6]/20 outline-none transition-all shadow-2xs"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-white/85 focus:bg-white text-[#0A3F63] placeholder-[#7F97AB] text-base sm:text-sm font-medium rounded-full px-5 sm:px-6 py-3 sm:py-3.5 border border-sky-300/60 focus:border-[#13B4C6] focus:ring-2 focus:ring-[#13B4C6]/20 outline-none transition-all shadow-2xs"
                  />
                </div>

                {/* Select Service Dropdown */}
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full appearance-none bg-white/85 focus:bg-white text-[#0A3F63] text-base sm:text-sm font-medium rounded-full px-5 sm:px-6 py-3 sm:py-3.5 border border-sky-300/60 focus:border-[#13B4C6] focus:ring-2 focus:ring-[#13B4C6]/20 outline-none transition-all cursor-pointer shadow-2xs"
                  >
                    <option value="" className="text-[#7F97AB]">Select Service</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Preventive Care">Preventive Care</option>
                    <option value="Emergency Support">Emergency Support</option>
                    <option value="Specialist Visits">Specialist Visits</option>
                    <option value="Home Healthcare">Home Healthcare</option>
                    <option value="Lab Services">Lab Services</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#5A6D80] absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {errorMessage && (
                  <p className="text-red-600 text-xs font-semibold px-2">{errorMessage}</p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold
                               bg-[#13B4C6] hover:bg-[#0E9CAB] text-white h-12 px-8 shadow-md hover:shadow-lg
                               active:scale-95 transition-all duration-200 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right: Smiling Nurse in Teal Scrubs */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative mt-4 lg:mt-0">
            <div className="absolute bottom-0 w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 rounded-full bg-teal-400/20 blur-xl pointer-events-none" />

            <div className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[380px] h-[360px] sm:h-[440px] lg:h-[500px]">
              <Image
                src="/images/nurse_scrubs.jpg"
                alt="CuraMed Healthcare Assistant"
                fill
                className="object-contain object-bottom drop-shadow-[0_15px_25px_rgba(10,63,99,0.15)]"
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
