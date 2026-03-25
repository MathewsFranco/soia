import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { MOTION } from '@/utils/motion'
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

function ServicePanel({ service }: { service: Service }) {
  return (
    <div className="service-panel relative flex h-full w-screen shrink-0 items-center px-8 md:px-20">
      <div
        className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2 select-none font-roswell leading-none md:left-16"
        style={{
          fontSize: 'clamp(10rem, 20vw, 22rem)',
          color: 'rgba(93, 42, 45, 0.04)',
        }}
        aria-hidden="true"
      >
        {service.number}
      </div>

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-0">
        <div className="flex flex-col md:col-span-7">
          <div className="flex items-start gap-4">
            <div className="service-margin-block mt-3 h-8 w-[3px] shrink-0 bg-wine/60" />
            <div className="flex flex-col">
              <h3
                className="service-title font-roswell text-white"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 8rem)',
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
        </div>

        <div className="service-divider-line hidden h-[50vh] w-[1px] bg-wine/15 md:col-span-1 md:mx-auto md:block" />

        <ul className="flex flex-col gap-5 md:col-span-4">
          {service.items.map((item) => (
            <li
              key={item}
              className="service-item group flex cursor-default items-center gap-4"
            >
              <span className="service-item-bar h-[1px] w-6 shrink-0 bg-wine/30 transition-all duration-300 ease-out group-hover:w-10 group-hover:bg-wine/60" />
              <span className="service-item-text relative font-opensauce text-sm tracking-wider text-white/85 uppercase md:text-base">
                {item}
                <span
                  className="service-item-underline absolute bottom-[-2px] left-0 h-[1px] w-full origin-left scale-x-0 bg-wine/60"
                  aria-hidden="true"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ProgressIndicator({
  activeIndex,
}: {
  activeIndex: number
}) {
  return (
    <div className="services-progress absolute top-8 left-8 z-20 flex items-center gap-6 md:left-20">
      {SERVICES.map((service, index) => (
        <span
          key={service.number}
          className={`font-opensauce text-xs tracking-[0.3em] uppercase transition-all duration-500 ${
            index === activeIndex ? 'text-white' : 'text-taupe/30'
          }`}
          aria-label={service.title}
        >
          {service.number}
          <span
            className={`mt-1 block h-[1px] origin-left bg-wine/60 transition-transform duration-500 ${
              index === activeIndex ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </span>
      ))}
    </div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const isDesktop = window.matchMedia(
        '(min-width: 768px)',
      ).matches

      const panels =
        gsap.utils.toArray<HTMLElement>('.service-panel')
      const splits: Array<InstanceType<typeof SplitText>> = []

      if (isDesktop) {
        const track = sectionRef.current?.querySelector(
          '.services-track',
        ) as HTMLElement
        if (!track) return

        const scrollTween = gsap.to(track, {
          xPercent: -66.66,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${window.innerWidth * 2}`,
            onUpdate: (self) => {
              const newIndex = Math.min(
                Math.floor(self.progress * 3),
                2,
              )
              setActiveIndex(newIndex)
            },
          },
        })

        panels.forEach((panel, index) => {
          const title = panel.querySelector('.service-title')
          if (!title) return

          const split = new SplitText(title, { type: 'chars' })
          splits.push(split)

          const baseTrigger =
            index === 0
              ? {
                  trigger: panel,
                  start: 'top 80%',
                  toggleActions:
                    'play none none none' as const,
                }
              : {
                  trigger: panel,
                  start: 'left 70%',
                  containerAnimation: scrollTween,
                  toggleActions:
                    'play none none none' as const,
                }

          gsap.from(split.chars, {
            ...MOTION.blurMaterialize,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: baseTrigger,
          })

          gsap.from(
            panel.querySelector('.service-margin-block'),
            {
              scaleY: 0,
              opacity: 0,
              transformOrigin: 'top',
              duration: 0.8,
              ease: 'power2.inOut',
              scrollTrigger: {
                ...baseTrigger,
                start:
                  index === 0 ? 'top 85%' : 'left 75%',
              },
            },
          )

          gsap.from(
            panel.querySelector('.service-description'),
            {
              ...MOTION.softReveal,
              delay: 0.15,
              scrollTrigger: baseTrigger,
            },
          )

          gsap.from(
            panel.querySelectorAll('.service-item'),
            {
              ...MOTION.waveReveal,
              stagger: 0.08,
              scrollTrigger: {
                ...baseTrigger,
                start:
                  index === 0 ? 'top 75%' : 'left 65%',
              },
            },
          )

          gsap.from(
            panel.querySelector('.service-divider-line'),
            {
              scaleY: 0,
              opacity: 0,
              transformOrigin: 'top',
              duration: 1,
              ease: 'power2.inOut',
              scrollTrigger: {
                ...baseTrigger,
                start:
                  index === 0 ? 'top 70%' : 'left 60%',
              },
            },
          )
        })

        const items =
          gsap.utils.toArray<HTMLElement>('.service-item')
        items.forEach((item) => {
          const underline = item.querySelector(
            '.service-item-underline',
          ) as HTMLElement
          if (!underline) return

          item.addEventListener('mouseenter', () => {
            gsap.to(underline, {
              scaleX: 1,
              transformOrigin: 'left',
              duration: 0.35,
              ease: 'power2.out',
            })
          })
          item.addEventListener('mouseleave', () => {
            gsap.to(underline, {
              scaleX: 0,
              transformOrigin: 'right',
              duration: 0.3,
              ease: 'power2.in',
            })
          })
        })
      } else {
        panels.forEach((panel) => {
          const title = panel.querySelector('.service-title')
          if (!title) return

          const split = new SplitText(title, { type: 'chars' })
          splits.push(split)

          gsap.from(split.chars, {
            ...MOTION.blurMaterialize,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
            },
          })

          gsap.from(
            panel.querySelector('.service-margin-block'),
            {
              scaleY: 0,
              opacity: 0,
              transformOrigin: 'top',
              duration: 0.8,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: panel,
                start: 'top 90%',
              },
            },
          )

          gsap.from(
            panel.querySelector('.service-description'),
            {
              ...MOTION.softReveal,
              delay: 0.15,
              scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
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
              },
            },
          )
        })
      }

      return () => {
        splits.forEach((s) => s.revert())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="services-section relative overflow-hidden"
      id="services"
    >
      <ProgressIndicator activeIndex={activeIndex} />

      <SectionLabel className="absolute top-8 right-8 z-20 block md:right-20">
        O que fazemos
      </SectionLabel>

      <div className="services-track flex h-screen w-[300vw] items-center max-md:h-auto max-md:w-full max-md:flex-col max-md:gap-16 max-md:px-6 max-md:py-24">
        {SERVICES.map((service) => (
          <ServicePanel key={service.number} service={service} />
        ))}
      </div>
    </section>
  )
}
