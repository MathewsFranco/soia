import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { MOTION } from '@/utils/motion'

interface Service {
  title: string
  description: string
  items: Array<string>
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
  },
]

function ServicePanel({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const isReversed = index % 2 !== 0

  return (
    <div className="service-panel relative py-24 md:py-32">
      <div
        className={`relative z-10 grid w-full grid-cols-1 items-start gap-12 px-8 md:grid-cols-12 md:gap-0 md:px-20 ${isReversed ? 'md:direction-rtl' : ''}`}
        style={
          isReversed ? { direction: 'rtl' } : undefined
        }
      >
        <div
          className="flex flex-col md:col-span-6"
          style={
            isReversed ? { direction: 'ltr' } : undefined
          }
        >
          <div className="flex flex-col">
              <h3
                className="service-title font-roswell text-white"
                style={{
                  fontSize: 'clamp(2.25rem, 7vw, 6rem)',
                  lineHeight: 0.95,
                }}
              >
                {service.title}
              </h3>
              <p className="service-description mt-6 max-w-[440px] font-poppins text-base font-light leading-relaxed text-[color:var(--color-warm-white)]">
                {service.description}
              </p>
          </div>
        </div>

        <div className="md:col-span-1" />

        <ul
          className="flex flex-col gap-5 md:col-span-5 md:pt-4"
          style={
            isReversed ? { direction: 'ltr' } : undefined
          }
        >
          {service.items.map((item) => (
            <li
              key={item}
              className="service-item group flex cursor-default items-center gap-4"
            >
              <span className="service-item-bar h-[2px] w-8 shrink-0 bg-wine/50 transition-all duration-300 ease-out group-hover:w-14 group-hover:bg-wine" />
              <span className="service-item-text font-opensauce text-sm tracking-wider text-white/85 uppercase transition-colors duration-300 group-hover:text-white md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {index < SERVICES.length - 1 && (
        <div className="service-separator mx-auto mt-24 h-[1px] w-24 bg-wine/20 md:mt-32" />
      )}
    </div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const panels =
        gsap.utils.toArray<HTMLElement>('.service-panel')
      const splits: Array<InstanceType<typeof SplitText>> =
        []

      panels.forEach((panel) => {
        const title = panel.querySelector('.service-title')
        if (!title) return

        const split = new SplitText(title, {
          type: 'chars',
        })
        splits.push(split)

        gsap.from(split.chars, {
          ...MOTION.blurMaterialize,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            once: true,
          },
        })

        gsap.from(
          panel.querySelector('.service-description'),
          {
            ...MOTION.softReveal,
            delay: 0.15,
            scrollTrigger: {
              trigger: panel,
              start: 'top 80%',
              once: true,
            },
          },
        )

        gsap.from(
          panel.querySelectorAll('.service-item'),
          {
            ...MOTION.waveReveal,
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              start: 'top 75%',
              once: true,
            },
          },
        )

        const separator = panel.querySelector(
          '.service-separator',
        )
        if (separator) {
          gsap.from(separator, {
            scaleX: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: separator,
              start: 'top 90%',
              once: true,
            },
          })
        }
      })

      return () => {
        splits.forEach((s) => s.revert())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="services-section relative"
      id="services"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-8 pt-24 md:px-20">
        <span className="h-[2px] w-6 bg-wine/80" />
        <span className="font-opensauce text-xs tracking-[0.3em] text-white/80 uppercase md:text-sm">
          O que fazemos
        </span>
      </div>

      {SERVICES.map((service, index) => (
        <ServicePanel
          key={service.title}
          service={service}
          index={index}
        />
      ))}
    </section>
  )
}
