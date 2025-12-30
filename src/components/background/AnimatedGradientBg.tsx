import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedGradientBg() {
  const g1Ref = useRef<SVGCircleElement>(null)
  const g2Ref = useRef<SVGCircleElement>(null)
  const g3Ref = useRef<SVGCircleElement>(null)
  const g4Ref = useRef<SVGCircleElement>(null)
  const g5Ref = useRef<SVGCircleElement>(null)
  const interactiveRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !g1Ref.current ||
        !g2Ref.current ||
        !g3Ref.current ||
        !g4Ref.current ||
        !g5Ref.current
      ) {
        return
      }

      gsap.to(g1Ref.current, {
        attr: { cy: '190%' },
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(g2Ref.current, {
        rotation: 360,
        duration: 22,
        ease: 'power1.inOut',
        repeat: -1,
      })

      gsap.to(g3Ref.current, {
        rotation: 360,
        duration: 35,
        ease: 'sine.inOut',
        repeat: -1,
      })

      gsap.to(g4Ref.current, {
        attr: { cx: '180%', cy: '58%' },
        duration: 12,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(g5Ref.current, {
        attr: { cx: '75%', cy: '75%' },
        duration: 17,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      if (
        window.matchMedia('(min-width: 768px)').matches &&
        interactiveRef.current
      ) {
        const mouseMoveHandler = (e: MouseEvent) => {
          const svg = interactiveRef.current?.closest(
            'svg',
          ) as SVGSVGElement | null
          if (!svg || !interactiveRef.current) return

          const point = svg.createSVGPoint()
          point.x = e.clientX
          point.y = e.clientY
          const ctm = svg.getScreenCTM()
          if (!ctm) return
          const svgPoint = point.matrixTransform(ctm.inverse())

          gsap.to(interactiveRef.current, {
            attr: { cx: svgPoint.x, cy: svgPoint.y },
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        window.addEventListener('mousemove', mouseMoveHandler)

        return () => {
          window.removeEventListener('mousemove', mouseMoveHandler)
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="gradient-bg">
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

      <svg
        className="blobs-container"
        viewBox="0 0 100 100"
        aria-label="Animated blob background"
      >
        <title>Animated blob background</title>
        <circle ref={g1Ref} className="blob" cx="50" cy="50" r="40" />
        <circle ref={g2Ref} className="blob" cx="50" cy="50" r="40" />
        <circle ref={g3Ref} className="blob" cx="10" cy="70" r="40" />
        <circle ref={g4Ref} className="blob" cx="50" cy="50" r="40" />
        <circle ref={g5Ref} className="blob" cx="10" cy="10" r="40" />
        <circle
          ref={interactiveRef}
          className="blob interactive hidden md:block"
          cx="-10"
          cy="-10"
          r="10"
        />
      </svg>

      <div className="conexao-text-overlay">
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
