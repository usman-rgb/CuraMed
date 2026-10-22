import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CLINIC_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${CLINIC_INFO.name} — ${CLINIC_INFO.tagline}`,
  description: 'Instantly connect with trusted doctors, manage prescriptions, and schedule lab services—all from the comfort of your home.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#EDF5F7] text-[#172B3F] min-h-screen flex flex-col justify-between selection:bg-[#13B4C6] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
