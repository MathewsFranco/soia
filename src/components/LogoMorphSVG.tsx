import { useId, useRef } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useGSAP } from '@gsap/react'
import {
  COMPOUND_LOGO_PATH,
  LOGO_VIEWBOX,
} from '@/components/background/utils/animation-constants'

gsap.registerPlugin(MorphSVGPlugin)

// Full-viewbox rect — morphs into the compound logo
const LOGO_RECT = 'M213.52 372.64 H627.91 V490.97 H213.52 Z'

interface Props {
  className?: string
  delay?: number
}

export function LogoMorphSVG({ className = '', delay = 0.2 }: Props) {
  const uid = useId().replace(/:/g, '')
  const filterId = `goo-${uid}`
  const morphRef = useRef<SVGPathElement>(null)
  const blurRef = useRef<SVGFEGaussianBlurElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay })
    const fx = { blur: 8, disp: 12 }

    // Rect → compound logo (same proven approach as AnimatedGradientBg)
    tl.to(morphRef.current, {
      morphSVG: { shape: COMPOUND_LOGO_PATH, type: 'rotational' },
      duration: 2,
      ease: 'power2.inOut',
    }, 0)

    // Organic wobble settles — turbulence displacement fades
    tl.to(fx, {
      disp: 0,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate() {
        dispRef.current?.setAttribute('scale', String(fx.disp))
      },
    }, 0)

    // Liquid edges solidify — goo blur resolves to sharp
    tl.to(fx, {
      blur: 0,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate() {
        blurRef.current?.setAttribute('stdDeviation', String(fx.blur))
      },
    }, 0)

    // Strip filter once settled for pixel-perfect final render
    tl.call(() => morphRef.current?.removeAttribute('filter'), [], 2.5)
  })

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="#fefefe"
      aria-label="SOIA"
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          {/* Organic noise for displacement wobble */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.025"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          {/* Ripple the shape with noise — gives liquid distortion */}
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale={12}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Classic goo: blur → high-contrast colorMatrix re-sharpens
              with organic rounded edges, like surface tension on liquid */}
          <feGaussianBlur
            ref={blurRef}
            in="displaced"
            stdDeviation={8}
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
      <path
        ref={morphRef}
        d={LOGO_RECT}
        filter={`url(#${filterId})`}
        fillRule="evenodd"
      />
    </svg>
  )
}
