import { STATS } from '@/lib/constants'

export default function StatsBar() {
  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}
              className="p-4 rounded-xl hover:bg-neutral-bg transition-colors"
            >
              <div className="text-3xl font-extrabold text-primary-600">{stat.value}</div>
              <div className="text-sm text-neutral-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
