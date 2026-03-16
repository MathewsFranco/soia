import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      // Wrap each headline in overflow-hidden for clip reveal
      const line1 = heroRef.current?.querySelector<HTMLElement>('.hero-line1')
      const line2 = heroRef.current?.querySelector<HTMLElement>('.hero-line2')

      function wrapClip(el: HTMLElement) {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        el.parentNode?.insertBefore(wrapper, el)
        wrapper.appendChild(el)
      }

      if (line1) wrapClip(line1)
      if (line2) wrapClip(line2)

      const tl = gsap.timeline({ delay: 0.4 })
      tl.from(['.hero-line1', '.hero-line2'], {
        yPercent: 105,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      })
        .from('.hero-body', { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.3')
    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-16 px-6 md:px-16 pt-6 overflow-hidden"
    >
      {/* Large logomark watermark */}
      <img
        src="/logomark-white.png"
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[640px] opacity-[0.07] pointer-events-none select-none"
        data-speed="0.6"
      />

      {/* Oversized headline */}
      <div className="relative z-10 flex flex-col mb-12">
        <h1
          className="hero-line1 font-roswell text-white leading-[0.95] tracking-wide"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
        >
          Menos ruído.
        </h1>
        <h1
          className="hero-line2 font-roswell text-wine leading-[0.95] tracking-wide"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
        >
          Mais impacto.
        </h1>
      </div>

      {/* Bottom-anchored body + scroll cue */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="hero-body font-poppins font-light text-sm md:text-base text-white/60 leading-relaxed max-w-[420px]">
          Mais do que comunicar, buscamos entender o que realmente move as pessoas — seus desejos,
          comportamentos e o que gera reconhecimento duradouro. Construímos posicionamentos e
          narrativas que ecoam.
        </p>

        <div className="hero-scroll-cue flex items-center gap-3 font-poppins font-light text-[10px] tracking-[0.4em] text-white/25 uppercase">
          <span className="w-8 h-px bg-white/20" />
          Scroll
        </div>
      </div>
    </section>
  )
}
