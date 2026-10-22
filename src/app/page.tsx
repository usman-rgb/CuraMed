import HeroSection from '@/components/home/HeroSection'
import AboutPartnerSection from '@/components/home/AboutPartnerSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import HowItWorks from '@/components/home/HowItWorks'
import GetInTouchCard from '@/components/home/GetInTouchCard'

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with Arch Doctor & 3 Pastel Floating Cards */}
      <HeroSection />

      {/* 2. Team Partner Section: "We are more than just a platform..." */}
      <AboutPartnerSection />

      {/* 3. Services Grid: "Comprehensive Care for Every Stage of Life" (4 Pastel Cards) */}
      <ServicesPreview />

      {/* 4. How It Works Section: Doctor Family Image & 4 Step Cards */}
      <HowItWorks />

      {/* 5. Contact Section: "Get In Touch With Us Today!" with Live Booking Form & Nurse in Scrubs */}
      <GetInTouchCard />
    </>
  )
}
