import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { LOGO_SIZE } from './utils/animation-constants'

export default function LogoOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current

    if (!container || !img) return

    const SCROLL_THRESHOLD = 100
    const MAX_SCROLL_DISTANCE = window.innerHeight - SCROLL_THRESHOLD
    const SAFE_PADDING = 20

    const scrollHandler = () => {
      const scrollY = window.scrollY

      if (scrollY <= SCROLL_THRESHOLD) {
        gsap.to(container, {
          top: '50%',
          duration: .5,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(img, {
          width: LOGO_SIZE.full.width,
          height: LOGO_SIZE.full.height,
          duration: .5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      } else {
        const progress = Math.min(
          (scrollY - SCROLL_THRESHOLD) / MAX_SCROLL_DISTANCE,
          1,
        )

        const logoHeight =
          LOGO_SIZE.full.height -
          (LOGO_SIZE.full.height - LOGO_SIZE.fixed.height) * progress
        const currentTop = logoHeight / 2 + SAFE_PADDING

        const currentWidth =
          LOGO_SIZE.full.width -
          (LOGO_SIZE.full.width - LOGO_SIZE.fixed.width) * progress
        const currentHeight =
          LOGO_SIZE.full.height -
          (LOGO_SIZE.full.height - LOGO_SIZE.fixed.height) * progress

        gsap.to(container, {
          top: currentTop,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(img, {
          width: currentWidth,
          height: currentHeight,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'exclusion',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          ref={imgRef}
          src="/logo-test.svg"
          alt="SOIA Logo"
          style={{
            filter: 'contrast(1.2)',
            display: 'block',
            width: `${LOGO_SIZE.full.width}px`,
            height: `${LOGO_SIZE.full.height}px`,
            pointerEvents: 'auto',
          }}
          width={LOGO_SIZE.full.width}
          height={LOGO_SIZE.full.height}
        />
      </div>
    </div>
  )
}
