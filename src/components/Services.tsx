import { Compass, Layers, Megaphone, type LucideIcon } from 'lucide-react'
import SectionLabel from './ui/SectionLabel'

const SERVICES: Array<{
  icon: LucideIcon
  title: string
  items: Array<string>
}> = [
  {
    icon: Compass,
    title: 'Estratégia',
    items: [
      'Mentoria Estratégica',
      'Estratégia de marca e marketing',
      'Consultoria para marcas premium',
      'Mapeamento de Persona',
    ],
  },
  {
    icon: Layers,
    title: 'Marca',
    items: ['Desenvolvimento de marca', 'Manual da marca', 'Conteúdo e roteiros', 'Seeding'],
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    items: ['Ações, Experiências e Eventos', 'Campanhas', 'Relações Públicas', 'Relacionamento'],
  },
]

export function Services() {
  return (
    <section className="services-section min-h-screen flex flex-col overflow-hidden" id="services">
      {/* Section header */}
      <div className="px-6 md:px-16 pt-24 pb-12 shrink-0">
        <SectionLabel className="block mb-6">O que fazemos</SectionLabel>
        <h2 className="font-roswell text-4xl md:text-6xl text-white leading-tight tracking-wide">
          Nossos Serviços
        </h2>
      </div>

      {/* Horizontal scroll track on desktop, vertical stack on mobile */}
      <div className="services-track flex flex-col md:flex-row md:items-stretch flex-1">
        {SERVICES.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className="service-card group flex flex-col gap-8 px-6 md:px-12 py-10 border-b border-white/8 md:border-b-0 md:border-r last:border-0 transition-colors duration-300 hover:bg-wine/6 md:w-[45vw] md:shrink-0"
            >
              <div className="flex flex-col gap-4">
                <Icon
                  size={20}
                  strokeWidth={1.25}
                  className="text-wine/60 group-hover:text-wine transition-colors duration-300"
                />
                <h3 className="font-opensauce text-base tracking-wider text-white/90 uppercase">
                  {service.title}
                </h3>
              </div>

              <ul className="flex flex-col gap-4">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="font-poppins font-light text-sm text-white/50 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-wine/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
