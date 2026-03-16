import { useRef } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useGSAP } from '@gsap/react'
import InteractiveBlob from './InteractiveBlob'
import {
  COMPOUND_LOGO_PATH,
  MORPH_VIEWBOX,
  WHITE_RECT_PATH,
} from './utils/animation-constants'

gsap.registerPlugin(MorphSVGPlugin)

export default function AnimatedGradientBg() {
  const morphPathRef = useRef<SVGPathElement>(null)
  const gooGroupRef = useRef<SVGGElement>(null)
  const interactiveRef = useRef<SVGCircleElement>(null)

  useGSAP(() => {
    if (!morphPathRef.current) return

    const tl = gsap.timeline()

    // White rect drains into logo — the rect IS the logo
    tl.to(morphPathRef.current, {
      morphSVG: {
        shape: COMPOUND_LOGO_PATH,
        type: 'rotational',
      },
      duration: 2,
      ease: 'power2.inOut',
    }, 1)

    // Enable goo filter after morph (avoids huge filter buffer on full-screen rect)
    tl.call(() => {
      gooGroupRef.current?.setAttribute('filter', 'url(#goo)')
    })

    // Fade in mouse blob (desktop only)
    if (
      interactiveRef.current &&
      window.matchMedia('(min-width: 768px)').matches
    ) {
      tl.fromTo(
        interactiveRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
      )
    }
  })

  return (
    <section className="hero-section h-[100vh] flex justify-center items-center bg-black relative">
      <svg
        viewBox={MORPH_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        overflow="visible"
        className="fixed inset-0 w-screen h-screen"
        aria-label="SOIA Logo"
      >
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>

        <g ref={gooGroupRef}>
          <path
            ref={morphPathRef}
            d={WHITE_RECT_PATH}
            fill="white"
            fillRule="evenodd"
          />
          <InteractiveBlob ref={interactiveRef} isMouseFollowEnabled={true} />
        </g>
      </svg>
    </section>
  )
}
