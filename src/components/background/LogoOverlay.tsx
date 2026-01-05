import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

export default function LogoOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const scale = 0.15
    const yPercent = -50 * (1 - scale)

    gsap.to(containerRef.current, {
      scale,
      yPercent,
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
      className="logo-container fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
    >
      <img
        src="/logo-test.svg"
        alt="SOIA Logo"
        className="pointer-events-auto max-w-[80vw]"
      />
    </div>
  )
}
