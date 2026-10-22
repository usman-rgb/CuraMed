import Link from 'next/link'
import { CalendarCheck } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white text-center">
      <div className="container-max">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
          Book your appointment today and experience personalized, expert healthcare tailored to your needs.
        </p>
        <Link href="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold
                         bg-white text-primary-700 hover:bg-primary-50 h-11 px-6 transition-colors">
          <CalendarCheck className="w-5 h-5" />
          Book Your Appointment Now
        </Link>
      </div>
    </section>
  )
}
