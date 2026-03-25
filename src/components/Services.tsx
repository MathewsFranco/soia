import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SectionLabel from './ui/SectionLabel'

interface Service {
  title: string
  description: string
  items: Array<string>
  accentColor: string
}

const SERVICES: Array<Service> = [
  {
    title: 'Estratégia',
    description:
      'Leitura profunda do mercado, da cultura e do comportamento para construir posicionamentos que ecoam.',
    items: [
      'Mentoria Estratégica',
      'Estratégia de marca e marketing',
      'Consultoria para marcas premium',
      'Mapeamento de Persona',
    ],
    accentColor: 'bg-wine/40',
  },
  {
    title: 'Marca',
    description:
      'Da essência visual à voz da marca — cada detalhe alinhado a um propósito claro.',
    items: [
      'Desenvolvimento de marca',
      'Manual da marca',
      'Conteúdo e roteiros',
      'Seeding',
    ],
    accentColor: 'bg-taupe/40',
  },
  {
    title: 'Marketing',
    description:
      'Ações que conectam marcas a pessoas nos momentos e espaços que importam.',
    items: [
      'Ações, Experiências e Eventos',
      'Campanhas',
      'Relações Públicas',
      'Relacionamento',
    ],
    accentColor: 'bg-wine/40',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const cards = gsap.utils.toArray<HTMLElement>('.service-card')
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -3,
            duration: 0.3,
            ease: 'power2.out',
          })
          gsap.to(card.querySelector('.service-accent'), {
            scaleX: 1.5,
            opacity: 0.7,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
          gsap.to(card.querySelector('.service-accent'), {
            scaleX: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="services-section px-6 md:px-16 py-24"
      id="services"
    >
      <SectionLabel className="block mb-12">O que fazemos</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            key={service.title}
            className={`service-card relative flex flex-col gap-8 py-12 px-6 md:px-10 ${
              index < SERVICES.length - 1 ? 'md:border-r' : ''
            } md:border-taupe/8`}
          >
            {index < SERVICES.length - 1 && (
              <div
                className="absolute inset-x-4 bottom-0 h-[2px] rounded-full md:hidden"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(104, 96, 88, 0.12) 30%, rgba(104, 96, 88, 0.12) 70%, transparent)',
                }}
              />
            )}

            <div className="flex flex-col">
              <h3 className="font-opensauce text-base tracking-wider text-white uppercase">
                {service.title}
              </h3>
              <div
                className={`service-accent w-10 h-[2px] rounded-full ${service.accentColor} mt-3 origin-left`}
              />
              <p className="font-poppins font-light text-sm text-[color:var(--color-warm-white)] leading-relaxed max-w-[320px] mt-4">
                {service.description}
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="font-poppins font-light text-sm text-[color:var(--color-warm-white)] flex items-center gap-3"
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
