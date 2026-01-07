import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export default function LogoOverlay() {
  const logoRef = useRef<HTMLImageElement>(null)

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger)

  //   gsap.set(logoRef.current, {
  //     top: '50%',
  //     left: '50%',
  //     xPercent: -50,
  //     yPercent: -50,
  //     transformOrigin: '50% 0%'
  //   })

  //   gsap.to(logoRef.current, {
  //     scale: 0.2,
  //     top: '1.5rem',
  //     yPercent: 0, // Removes centering offset
  //     scrollTrigger: {
  //       trigger: document.documentElement,
  //       start: 'top top',
  //       end: '+=500',
  //       scrub: true,
  //     },
  //   })
  // }, { scope: logoRef })

  return (
    <img
      ref={logoRef}
      src="/logo-test.svg"
      alt="SOIA Logo"
      className='big-logo'
    />
  )
}
