import { forwardRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { INTERACTIVE_BLOB_CONFIG } from './utils/animation-constants'

interface InteractiveBlobProps {
  isMouseFollowEnabled: boolean
}

const InteractiveBlob = forwardRef<SVGCircleElement, InteractiveBlobProps>(
  ({ isMouseFollowEnabled }, ref) => {
    const circleRef = ref as React.RefObject<SVGCircleElement>

    useEffect(() => {
      // Only enable mouse follow for larger screens and if the prop allows it
      if (
        !isMouseFollowEnabled ||
        !window.matchMedia('(min-width: 768px)').matches
      ) {
        return
      }

      let lastClientX = 0
      let lastClientY = 0

      const moveBlobToClient = (clientX: number, clientY: number) => {
        const svg = circleRef.current?.closest('svg')
        if (!svg) return

        const point = svg.createSVGPoint()
        point.x = clientX
        point.y = clientY
        const ctm = svg.getScreenCTM()
        if (!ctm) return
        const svgPoint = point.matrixTransform(ctm.inverse())

        gsap.to(circleRef.current, {
          attr: { cx: svgPoint.x, cy: svgPoint.y },
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      const mouseMoveHandler = (e: MouseEvent) => {
        lastClientX = e.clientX
        lastClientY = e.clientY
        moveBlobToClient(lastClientX, lastClientY)
      }

      const scrollHandler = () => {
        moveBlobToClient(lastClientX, lastClientY)
      }

      window.addEventListener('mousemove', mouseMoveHandler)
      window.addEventListener('scroll', scrollHandler, { passive: true })

      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('scroll', scrollHandler)
      }
    }, [isMouseFollowEnabled, circleRef]) // Re-run effect if isMouseFollowEnabled changes

    return (
      <circle
        ref={circleRef}
        className={INTERACTIVE_BLOB_CONFIG.className}
        cx={INTERACTIVE_BLOB_CONFIG.cx}
        cy={INTERACTIVE_BLOB_CONFIG.cy}
        r={INTERACTIVE_BLOB_CONFIG.r}
        opacity={0}
      />
    )
  },
)

InteractiveBlob.displayName = 'InteractiveBlob'

export default InteractiveBlob
