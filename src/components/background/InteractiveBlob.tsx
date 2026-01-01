import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { INTERACTIVE_BLOB_CONFIG } from './utils/animation-constants'

export default function InteractiveBlob() {
  const ref = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches || !ref.current) {
      return
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      const svg = ref.current?.closest('svg') as SVGSVGElement | null
      if (!svg || !ref.current) return

      const point = svg.createSVGPoint()
      point.x = e.clientX
      point.y = e.clientY
      const ctm = svg.getScreenCTM()
      if (!ctm) return
      const svgPoint = point.matrixTransform(ctm.inverse())

      gsap.to(ref.current, {
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
  }, [])

  return (
    <circle
      ref={ref}
      className={INTERACTIVE_BLOB_CONFIG.className}
      cx={INTERACTIVE_BLOB_CONFIG.cx}
      cy={INTERACTIVE_BLOB_CONFIG.cy}
      r={INTERACTIVE_BLOB_CONFIG.r}
    />
  )
}
