import { prisma } from '@/lib/db'
import ServiceCard from '@/components/services/ServiceCard'

export default async function ServicesPreview() {
  const services = await prisma.service.findMany({
    where: { active: true },
    take: 4,
  })

  return (
    <section className="px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="curamed-shell">
        
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0A3F63] tracking-tight">
            Comprehensive Care for<br className="hidden sm:inline" /> Every Stage of Life
          </h2>
        </div>

        {/* 4 Pastel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
