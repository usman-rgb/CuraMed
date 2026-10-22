'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema, type AppointmentFormData } from '@/types'
import { TIME_SLOTS } from '@/lib/constants'
import { CheckCircle2, Loader2, Calendar } from 'lucide-react'

interface Props { services: { id: string; name: string }[] }

export default function AppointmentForm({ services }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [minDate, setMinDate] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0])
  }, [])

  const {
    register, handleSubmit, setValue, reset,
    formState: { errors }
  } = useForm<AppointmentFormData>({ resolver: zodResolver(appointmentSchema) })

  async function onSubmit(data: AppointmentFormData) {
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/appointments', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
        setErrorMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error occurred. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10 sm:py-12 px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D4F4F0] text-[#13B4C6] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0A3F63] mb-2">Appointment Request Submitted!</h3>
        <p className="text-xs sm:text-sm text-[#5A6D80] max-w-md mx-auto mb-6 sm:mb-8">
          Our clinic team will contact you shortly to confirm your consultation schedule with your chosen specialist.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold
                     border border-gray-200 text-[#0A3F63] hover:bg-gray-50 h-11 px-8 active:scale-95 transition-all"
        >
          Book Another Appointment
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

      {/* Patient Name */}
      <div>
        <label htmlFor="patientName" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
          Full Name *
        </label>
        <input
          id="patientName"
          placeholder="e.g. Sarah Johnson"
          {...register('patientName')}
          className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 sm:py-3.5 text-base sm:text-sm text-[#0A3F63]
                     placeholder-[#7F97AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all shadow-2xs"
        />
        {errors.patientName && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.patientName.message}</p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            placeholder="sarah@example.com"
            {...register('email')}
            className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 sm:py-3.5 text-base sm:text-sm text-[#0A3F63]
                       placeholder-[#7F97AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all shadow-2xs"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (234) 567-890"
            {...register('phone')}
            className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 sm:py-3.5 text-base sm:text-sm text-[#0A3F63]
                       placeholder-[#7F97AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all shadow-2xs"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
          Select Medical Service *
        </label>
        <select
          id="service"
          onChange={(e) => setValue('service', e.target.value)}
          className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 sm:py-3.5 text-base sm:text-sm text-[#0A3F63]
                     focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all cursor-pointer shadow-2xs"
        >
          <option value="">Choose a service...</option>
          {services.map(s => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.service.message}</p>}
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
            Preferred Date *
          </label>
          <input
            id="date"
            type="date"
            {...register('date')}
            min={minDate}
            className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 sm:py-3.5 text-base sm:text-sm text-[#0A3F63]
                       focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all shadow-2xs"
          />
          {errors.date && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="timeSlot" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
            Preferred Time Slot *
          </label>
          <select
            id="timeSlot"
            onChange={(e) => setValue('timeSlot', e.target.value)}
            className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 sm:py-3.5 text-base sm:text-sm text-[#0A3F63]
                       focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all cursor-pointer shadow-2xs"
          >
            <option value="">Select a time slot...</option>
            {TIME_SLOTS.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.timeSlot && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.timeSlot.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5 sm:mb-2">
          Symptoms or Medical Notes (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Briefly describe your symptoms or any specific requirements..."
          {...register('message')}
          className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 px-4 py-3 text-base sm:text-sm text-[#0A3F63]
                     placeholder-[#7F97AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all shadow-2xs"
        />
      </div>

      {errorMessage && (
        <p className="text-red-600 text-sm font-semibold bg-red-50 p-3 rounded-xl border border-red-100">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold
                   bg-[#13B4C6] hover:bg-[#0E9CAB] text-white h-12 sm:h-13 px-8 shadow-md hover:shadow-lg
                   active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...</>
        ) : (
          <><Calendar className="w-4 h-4" /> Confirm Appointment Request</>
        )}
      </button>
    </form>
  )
}
