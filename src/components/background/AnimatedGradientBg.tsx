import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedGradientBg() {
  const g1Ref = useRef<HTMLDivElement>(null)
  const g2Ref = useRef<HTMLDivElement>(null)
  const g3Ref = useRef<HTMLDivElement>(null)
  const g4Ref = useRef<HTMLDivElement>(null)
  const g5Ref = useRef<HTMLDivElement>(null)
  const interactiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !g1Ref.current ||
        !g2Ref.current ||
        !g3Ref.current ||
        !g4Ref.current ||
        !g5Ref.current ||
        !interactiveRef.current
      ) {
        return
      }

      gsap.to(g1Ref.current, {
        y: '40%',
        duration: 25,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(g2Ref.current, {
        rotation: 360,
        duration: 22,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: false,
      })

      gsap.to(g3Ref.current, {
        rotation: 360,
        duration: 35,
        ease: 'sine.inOut',
        repeat: -1,
      })

      gsap.to(g4Ref.current, {
        x: '30%',
        y: '8%',
        duration: 28,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(g5Ref.current, {
        x: '25%',
        y: '25%',
        duration: 20,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      const mouseMoveHandler = (e: MouseEvent) => {
        gsap.to(interactiveRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      window.addEventListener('mousemove', mouseMoveHandler)

      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="gradient-bg">
      {/* SVG filter definitions */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="filter-defs"
        style={{ position: 'absolute' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="35"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -18"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="gradients-container">
        <div ref={g1Ref} className="g1" />
        <div ref={g2Ref} className="g2" />
        <div ref={g3Ref} className="g3" />
        <div ref={g4Ref} className="g4" />
        <div ref={g5Ref} className="g5" />
        <div ref={interactiveRef} className="interactive" />
      </div>

      <div className="conexao-text-overlay">
        {/* Embedded inline SVG logo (use JSX-friendly attributes) */}
        <img
          src="/logo-test.svg"
          alt="SOIA Logo"
          className="conexao-logo"
          width="800"
          height="300"
        />
      </div>
    </div>
  )
}
