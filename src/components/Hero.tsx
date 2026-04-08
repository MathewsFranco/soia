import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { MOTION } from '@/utils/motion'

gsap.registerPlugin(SplitText)

type Phase = 'logo' | 'transitioning' | 'slogan'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const q = gsap.utils.selector(heroRef)

      const split1 = new SplitText('.hero-line1', { type: 'chars' })
      const split2 = new SplitText('.hero-line2', { type: 'chars' })

      if (prefersReduced) {
        gsap.set(
          [
            q('.hero-logo'),
            q('.hero-line1'),
            q('.hero-line2'),
            q('.hero-body'),
            q('.hero-scroll-cue'),
          ],
          { opacity: 1, clearProps: 'filter,y' },
        )
        return
      }

      // ── Initial state ──────────────────────────────────────────────────────
      gsap.set(q('.hero-logo'), { opacity: 0 })
      gsap.set(q('.hero-scroll-cue'), { opacity: 0 })
      gsap.set([q('.hero-line1'), q('.hero-line2'), q('.hero-body')], {
        opacity: 0,
      })

      let phase: Phase = 'logo'
      let cueTween: gsap.core.Tween | null = null

      // ── Logo entrance ──────────────────────────────────────────────────────
      gsap.to(q('.hero-logo'), {
        opacity: 1,
        duration: 1.4,
        ease: 'power2.inOut',
        onComplete: () => {
          // Scroll cue appears ~2 s from page load (1.4 + 0.6)
          cueTween = gsap.to(q('.hero-scroll-cue'), {
            opacity: 1,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out',
          })
        },
      })

      // ── Slogan reveal (one-time, never reverses) ───────────────────────────
      const revealSlogan = () => {
        gsap
          .timeline()
          .set(q('.hero-line1'), { opacity: 1 })
          .from(split1.chars, {
            ...MOTION.blurMaterialize,
            stagger: 0.025,
            duration: 0.7,
            ease: 'power3.out',
          })
          .set(q('.hero-line2'), { opacity: 1 }, '-=0.45')
          .from(
            split2.chars,
            {
              ...MOTION.blurMaterialize,
              stagger: 0.025,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.45',
          )
          .from(q('.hero-body'), { ...MOTION.softReveal }, '-=0.4')
          // Release scroll lock once slogan is fully on screen
          .call(() => {
            phase = 'slogan'
          })
      }

      // ── Transition: logo out → slogan in ──────────────────────────────────
      const triggerTransition = () => {
        if (phase !== 'logo') return
        phase = 'transitioning'

        cueTween?.kill()
        gsap.killTweensOf(q('.hero-scroll-cue'))

        // Mirror of entrance: pure opacity fade out (same easing, reversed)
        gsap.to(q('.hero-logo'), { opacity: 0, duration: 0.9, ease: 'power2.inOut' })
        gsap.to(q('.hero-scroll-cue'), {
          opacity: 0,
          duration: 0.4,
          onComplete: revealSlogan,
        })
      }

      // ── Scroll / input interception ────────────────────────────────────────
      // Block all scroll while logo is showing or animating; release at 'slogan'

      const handleWheel = (e: WheelEvent) => {
        if (phase === 'slogan') return
        e.preventDefault()
        if (e.deltaY > 0) triggerTransition()
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (phase === 'slogan') return
        const scrollKeys = ['ArrowDown', 'PageDown', ' ', 'ArrowUp', 'PageUp']
        if (!scrollKeys.includes(e.key)) return
        e.preventDefault()
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) triggerTransition()
      }

      let touchStartY = 0
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
      }
      const handleTouchMove = (e: TouchEvent) => {
        if (phase === 'slogan') return
        e.preventDefault()
        if (touchStartY - e.touches[0].clientY > 20) triggerTransition()
      }

      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })

      return () => {
        split1.revert()
        split2.revert()
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
      }
    },
    { scope: heroRef },
  )

  return (
    <section id="hero" className="h-screen">
      <div
        ref={heroRef}
        className="relative h-full flex flex-col justify-end pb-16 px-6 md:px-16 overflow-hidden bg-black"
      >
        {/* Logo — centered, fades in on load, fades out on first scroll */}
        <img
          src="/new-logos/Logo e Variacoes-05.png"
          alt="SOIA"
          className="hero-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[672px] pointer-events-none select-none"
        />

        {/* Slogan — appears after logo is gone, stays for the session */}
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
            Mais do que comunicar, buscamos entender o que realmente move as
            pessoas — seus desejos, comportamentos e o que gera reconhecimento
            duradouro. Construímos posicionamentos e narrativas que ecoam.
          </p>
        </div>

        {/* Scroll cue — bottom-right, appears at ~2 s */}
        <div className="hero-scroll-cue absolute bottom-8 right-6 md:right-16 flex items-center gap-3 font-poppins font-light text-xs tracking-[0.4em] text-white uppercase z-10">
          <span className="w-10 h-[2px] rounded-full bg-white" />
          Scroll
        </div>
      </div>
    </section>
  )
}
