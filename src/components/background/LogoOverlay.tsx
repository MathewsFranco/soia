import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export default function LogoOverlay() {
  const logoRef = useRef<HTMLImageElement>(null)

  // useGSAP(
  //   () => {
  //     gsap.registerPlugin(ScrollTrigger)

  //     gsap.set(logoRef.current, {
  //       transformOrigin: '50% 50%',
  //     })

  //     gsap.to(logoRef.current, {
  //       top: '2rem',
  //       yPercent: -50,
  //       scale: 0.2,
  //       scrollTrigger: {
  //         trigger: '.hero-section',
  //         start: 'top top',
  //         end: '+=400',
  //         scrub: true,
  //       },
  //     })
  //   },
  //   { scope: logoRef },
  // )

  return (
    <img
      ref={logoRef}
      src="/logo-test.svg"
      alt="SOIA Logo"
      className="big-logo mix-blend-difference"
    />
  )
}
