import SectionLabel from './ui/SectionLabel'

interface Service {
  number: string
  title: string
  description: string
  items: Array<string>
}

const SERVICES: Array<Service> = [
  {
    number: '01',
    title: 'Estratégia',
    description:
      'Leitura profunda do mercado, da cultura e do comportamento para construir posicionamentos que ecoam.',
    items: [
      'Mentoria Estratégica',
      'Estratégia de marca e marketing',
      'Consultoria para marcas premium',
      'Mapeamento de Persona',
    ],
  },
  {
    number: '02',
    title: 'Marca',
    description:
      'Da essência visual à voz da marca — cada detalhe alinhado a um propósito claro.',
    items: [
      'Desenvolvimento de marca',
      'Manual da marca',
      'Conteúdo e roteiros',
      'Seeding',
    ],
  },
  {
    number: '03',
    title: 'Marketing',
    description:
      'Ações que conectam marcas a pessoas nos momentos e espaços que importam.',
    items: [
      'Ações, Experiências e Eventos',
      'Campanhas',
      'Relações Públicas',
      'Relacionamento',
    ],
  },
]

export function Services() {
  return (
    <section
      className="services-section px-6 md:px-16 py-24"
      id="services"
    >
      <SectionLabel className="block mb-12">O que fazemos</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            key={service.title}
            className={`service-card flex flex-col gap-8 py-12 px-6 md:px-10 border-b md:border-b-0 border-white/8 last:border-0 ${
              index < SERVICES.length - 1 ? 'md:border-r' : ''
            }`}
          >
            <span
              className="font-roswell text-8xl text-white/[0.04] leading-none select-none pointer-events-none"
              aria-hidden="true"
            >
              {service.number}
            </span>

            <div className="flex flex-col">
              <h3 className="font-opensauce text-base tracking-wider text-white/90 uppercase">
                {service.title}
              </h3>
              <div className="w-8 h-px bg-wine/40 mt-3" />
              <p className="font-poppins font-light text-sm text-white/50 leading-relaxed max-w-[320px] mt-4">
                {service.description}
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="font-poppins font-light text-sm text-white/60 flex items-center gap-3"
                >
                  <span className="font-poppins text-taupe/60 text-xs leading-none">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
