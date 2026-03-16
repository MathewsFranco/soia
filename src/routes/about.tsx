import { createFileRoute } from '@tanstack/react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { MOTION } from '@/utils/motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Hero heading — blurMaterialize chars
    const heroSplit = new SplitText('.about-hero-heading', {
      type: 'chars',
    })
    gsap.from(heroSplit.chars, {
      ...MOTION.blurMaterialize,
      delay: 0.3,
    })

    // Hero label — breathIn
    gsap.from('.about-hero-label', {
      ...MOTION.breathIn,
      duration: 0.6,
      delay: 0.2,
    })

    // Left column paragraphs — softReveal
    gsap.from('.about-body-left p', {
      ...MOTION.softReveal,
      stagger: 0.1,
      scrollTrigger: { trigger: '.about-body-left', start: 'top 80%' },
    })

    // Founder accent line — lineBreathIn
    gsap.from('.about-founder-line', {
      ...MOTION.lineBreathIn,
      scrollTrigger: { trigger: '.about-founder-col', start: 'top 80%' },
    })

    // Founder name — blurMaterialize (no SplitText)
    gsap.from('.about-founder-name', {
      opacity: 0,
      filter: 'blur(6px)',
      y: 6,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.about-founder-col', start: 'top 75%' },
    })

    // Founder bio paragraphs — softReveal
    gsap.from('.about-founder-bio p', {
      ...MOTION.softReveal,
      stagger: 0.1,
      duration: 0.6,
      scrollTrigger: { trigger: '.about-founder-bio', start: 'top 80%' },
    })

    return () => {
      heroSplit.revert()
      ScrollTrigger.killAll()
    }
  })

  return (
    <>
      <main className="px-6 md:px-16 pt-32 pb-24">
        {/* Hero heading */}
        <div className="mb-20">
          <SectionLabel className="about-hero-label block mb-6">Quem Somos</SectionLabel>
          <h1 className="about-hero-heading font-roswell text-5xl md:text-7xl text-white leading-tight tracking-wide max-w-[800px]">
            Além da superfície.
          </h1>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-[1100px]">
          <div className="about-body-left flex flex-col gap-6">
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Na SOIA, acreditamos que o posicionamento de uma marca vai além de uma estratégia de
              mercado — é um processo contínuo de construção de significado.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Cada marca carrega uma narrativa, um conjunto de valores e um papel simbólico. Nosso
              trabalho é revelar essa essência, compreender como ela se manifesta no presente e
              traduzi-la em linguagem, estética e comportamento.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Acreditamos que marcas fortes são aquelas que sabem se reinventar sem perder
              coerência, e que constroem lealdade não apenas pela comunicação, mas pela experiência
              que entregam.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Na interseção entre estratégia e sensibilidade, ajudamos marcas a se tornarem
              emocionalmente relevantes, culturalmente reconhecidas e profundamente conectadas às
              pessoas que as escolhem.
            </p>
          </div>

          <div className="about-founder-col flex flex-col gap-5">
            <div className="about-founder-line w-12 h-px bg-wine origin-left" />
            <h2 className="about-founder-name font-roswell text-3xl md:text-4xl text-white tracking-wide">
              Fabiana Tomaz
            </h2>
            <span className="font-opensauce text-[11px] tracking-[0.3em] text-taupe uppercase">
              Fundadora & Estrategista
            </span>
            <div className="about-founder-bio flex flex-col gap-5">
              <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
                Fabiana Tomaz é estrategista criativa e fundadora da SOIA. Formada em Moda, ela
                constrói sua trajetória unindo moda, branding e comportamento de consumo. Na SOIA,
                cada projeto vai além de uma simples entrega: é uma verdadeira experiência de
                criação.
              </p>
              <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
                Mergulhamos no universo da marca, estudamos tendências, analisamos comportamentos e
                entendemos o que realmente motiva e emociona as pessoas. A partir disso,
                desenvolvemos narrativas e soluções que dão vida à marca, fortalecendo sua presença
                e relevância no mercado.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
