import { forwardRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { INTERACTIVE_BLOB_CONFIG } from './utils/animation-constants'

interface InteractiveBlobProps {
  isMouseFollowEnabled: boolean
}

const InteractiveBlob = forwardRef<SVGCircleElement, InteractiveBlobProps>(
  ({ isMouseFollowEnabled }, ref) => {
    const internalRef = useRef<SVGCircleElement>(null)
    const circleRef = (ref as React.RefObject<SVGCircleElement>) || internalRef

    useEffect(() => {
      // Only enable mouse follow for larger screens and if the prop allows it
      if (!isMouseFollowEnabled || !window.matchMedia('(min-width: 768px)').matches || !circleRef.current) {
        return
      }

      const mouseMoveHandler = (e: MouseEvent) => {
        const svg = circleRef.current?.closest('svg')
        if (!svg || !circleRef.current) return

        const point = svg.createSVGPoint()
        point.x = e.clientX
        point.y = e.clientY
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

      window.addEventListener('mousemove', mouseMoveHandler)

      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler)
      }
    }, [isMouseFollowEnabled, circleRef]) // Re-run effect if isMouseFollowEnabled changes

    return (
      <circle
        ref={circleRef}
        className={INTERACTIVE_BLOB_CONFIG.className}
        cx={INTERACTIVE_BLOB_CONFIG.cx}
        cy={INTERACTIVE_BLOB_CONFIG.cy}
        r={INTERACTIVE_BLOB_CONFIG.r}
      />
    )
  },
)

InteractiveBlob.displayName = 'InteractiveBlob'

export default InteractiveBlob
