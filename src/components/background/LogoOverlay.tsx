import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

export default function LogoOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(containerRef.current, {
      y: '50vh',
      yPercent: -50,
      transformOrigin: 'center top',
    })

    gsap.to(containerRef.current, {
      scale: 0.15,
      y: '1.5rem',
      yPercent: 0,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '+=500',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="logo-container fixed top-0 left-0 w-full flex justify-center pointer-events-none"
    >
      <img
        src="/logo-test.svg"
        alt="SOIA Logo"
        className="pointer-events-auto max-w-[80vw] h-auto"
      />
    </div>
  )
}
