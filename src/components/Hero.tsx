import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { MOTION } from '@/utils/motion'

gsap.registerPlugin(SplitText)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const split1 = new SplitText('.hero-line1', { type: 'chars' })
      const split2 = new SplitText('.hero-line2', { type: 'chars' })

      const charFrom = { ...MOTION.blurMaterialize }

      const tl = gsap.timeline()

      tl.to('.hero-logo', {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      })
        .from(split1.chars, charFrom, '+=0.4')
        .from(split2.chars, charFrom, '-=0.3')
        .from(
          '.hero-body',
          { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' },
          '-=0.4',
        )
        .from(
          '.hero-scroll-cue',
          { opacity: 0, duration: 0.6 },
          '-=0.3',
        )

      return () => {
        split1.revert()
        split2.revert()
      }
    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-16 px-6 md:px-16 pt-6 overflow-hidden"
    >
      <img
        src="/new-logos/Logo e Variacoes-05.png"
        alt="SOIA"
        className="hero-logo absolute top-[15%] left-1/2 -translate-x-1/2 w-[50vw] max-w-[480px] opacity-0 pointer-events-none select-none"
        data-speed="0.6"
      />

      <div className="relative z-10 flex flex-col mb-12">
        <h1
          className="hero-line1 font-roswell text-white leading-[0.95] tracking-wide"
          style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
        >
          Menos ruído.
        </h1>
        <h1
          className="hero-line2 font-roswell text-wine leading-[0.95] tracking-wide"
          style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
        >
          Mais impacto.
        </h1>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="hero-body font-poppins font-light text-sm md:text-base text-[color:var(--color-warm-white)] leading-relaxed max-w-[420px]">
          Mais do que comunicar, buscamos entender o que realmente move as pessoas — seus desejos,
          comportamentos e o que gera reconhecimento duradouro. Construímos posicionamentos e
          narrativas que ecoam.
        </p>

        <div className="hero-scroll-cue scroll-cue-breathe flex items-center gap-3 font-poppins font-light text-xs tracking-[0.4em] text-taupe uppercase">
          <span className="w-10 h-[2px] rounded-full bg-taupe/25" />
          Scroll
        </div>
      </div>
    </section>
  )
}
