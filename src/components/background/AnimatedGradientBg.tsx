import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedGradientBg() {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const interactive = interactiveRef.current
    if (!interactive) return

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY }
    }

    const animate = () => {
      currentPosition.current.x +=
        (mousePosition.current.x - currentPosition.current.x) * 0.15
      currentPosition.current.y +=
        (mousePosition.current.y - currentPosition.current.y) * 0.15

      gsap.set(interactive, {
        x: Math.round(currentPosition.current.x),
        y: Math.round(currentPosition.current.y),
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
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
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
        <div className="g4" />
        <div className="g5" />
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
