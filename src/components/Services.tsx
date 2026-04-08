import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

interface Service {
  title: string
  description: string
  items: Array<string>
  image: string
  imageAlt: string
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
    image: '/Mockups/Mockup 9.jpeg',
    imageAlt:
      'Direção estratégica aplicada em peças e materiais de marca',
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
    image: '/Mockups/Mockup 7.jpeg',
    imageAlt:
      'Aplicação de identidade visual em material impresso',
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
    image: '/Mockups/Mockup 6.jpeg',
    imageAlt:
      'Campanha de marca em contexto de experiência ao público',
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
  const mediaSide = isReversed ? 'right-0' : 'left-0'

  return (
    <div className="service-panel relative flex min-h-screen items-center px-6 py-24 md:px-16">
      <div className="service-stage relative mx-auto h-[78vh] w-full max-w-[1400px]">
        <div
          className={`service-media absolute top-1/2 hidden h-[68%] w-[58%] -translate-y-1/2 md:block ${mediaSide}`}
        >
          <img
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <div className="service-media-tint" aria-hidden />
        </div>

        <div
          className="service-media service-media--mobile absolute inset-0 md:hidden"
          aria-hidden
        >
          <img
            src={service.image}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="service-media-tint" />
        </div>

        <div
          className={`service-copy relative z-10 flex h-full w-full flex-col justify-center md:absolute md:top-1/2 md:w-[52%] md:-translate-y-1/2 ${
            isReversed
              ? 'md:left-0 md:items-start md:pr-8'
              : 'md:right-0 md:items-end md:pl-8 md:text-right'
          }`}
        >
          <h3
            className="service-title font-roswell"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 7rem)',
              lineHeight: 0.9,
            }}
          >
            {service.title}
          </h3>
          <p className="service-description mt-6 max-w-[440px] font-poppins text-base font-light leading-relaxed text-[color:var(--color-warm-white)]">
            {service.description}
          </p>
          <ul
            className={`mt-10 flex flex-col gap-4 ${
              !isReversed ? 'md:items-end' : ''
            }`}
          >
            {service.items.map((item) => (
              <li
                key={item}
                className={`service-item flex items-center ${
                  !isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <span className="service-item-text font-opensauce text-sm tracking-wider text-white uppercase md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {index < SERVICES.length - 1 && (
        <div className="service-separator absolute bottom-12 left-1/2 h-[1px] w-24 -translate-x-1/2 bg-wine/20" />
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

      panels.forEach((panel, panelIndex) => {
        const isReversed = panelIndex % 2 !== 0
        const title = panel.querySelector('.service-title')
        const media = panel.querySelectorAll<HTMLElement>('.service-media')

        if (media.length) {
          const clipStart = isReversed
            ? 'inset(0 0% 0 100%)'
            : 'inset(0 100% 0 0%)'

          gsap.fromTo(
            media,
            { clipPath: clipStart },
            {
              clipPath: 'inset(0 0% 0 0%)',
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 75%',
                once: true,
              },
            },
          )

          gsap.to(media, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        }

        if (title) {
          const split = new SplitText(title, { type: 'chars' })
          splits.push(split)

          gsap.set(title, { perspective: 600 })
          gsap.from(split.chars, {
            y: 80,
            rotationX: -90,
            opacity: 0,
            stagger: 0.028,
            duration: 0.7,
            delay: 0.25,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: panel,
              start: 'top 75%',
              once: true,
            },
          })
        }

        const xDir = isReversed ? -40 : 40
        gsap.from(panel.querySelector('.service-description'), {
          x: xDir,
          opacity: 0,
          duration: 0.7,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            once: true,
          },
        })

        gsap.from(panel.querySelectorAll('.service-item'), {
          x: isReversed ? -30 : 30,
          opacity: 0,
          stagger: 0.07,
          delay: 0.65,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            once: true,
          },
        })

        const separator = panel.querySelector('.service-separator')
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
