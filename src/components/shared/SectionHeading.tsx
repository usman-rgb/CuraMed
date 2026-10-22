interface Props {
  badge?:    string
  title:     string
  subtitle?: string
  center?:   boolean
}

export default function SectionHeading({ badge, title, subtitle, center = true }: Props) {
  return (
    <div className={center ? 'text-center mb-12' : 'mb-10'}>
      {badge && (
        <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold
                         uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-text">{title}</h2>
      {subtitle && <p className="mt-3 text-neutral-muted max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
