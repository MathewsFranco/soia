import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function LogoOverlay() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.logo-container', {
      scale: 0.18,
      top: '-150',
      duration: 1,
      scrollTrigger: {
        scrub: true,
      },
    })
  })

  return (
    <div className="logo-container fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-15">
      <img src="/logo-test.svg" alt="SOIA Logo" />
    </div>
  )
}
