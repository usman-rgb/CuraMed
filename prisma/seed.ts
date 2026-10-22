import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.service.deleteMany({})
  await prisma.service.createMany({
    data: [
      { name: 'General Consultation', description: 'Expert guidance for everyday health concerns.',           icon: 'stethoscope', duration: '30 min' },
      { name: 'Preventive Care',      description: 'Screenings, vaccinations, and wellness checks.',           icon: 'heart-pulse', duration: '45 min' },
      { name: 'Emergency Support',   description: 'On-call assistance when you need urgent help.',             icon: 'phone-call',  duration: '24/7' },
      { name: 'Specialist Visits',    description: 'Connect with certified specialists across fields.',        icon: 'user-check',  duration: '40 min' },
      { name: 'Home Healthcare',     description: 'Dedicated clinical care delivered right at your doorstep.', icon: 'home',        duration: '60 min' },
      { name: 'Lab Services',         description: 'Fast diagnostic testing and accurate lab results.',        icon: 'flask-conical', duration: '15 min' },
    ]
  })
  console.log('Seed complete.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
