import { useEffect } from 'react'
import { gsap } from 'gsap'
import type { BlobAnimationConfig } from './animation-constants'

export function useBlobAnimation(
  ref: React.RefObject<SVGCircleElement | null>,
  config: BlobAnimationConfig,
) {
  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, config)
  }, [ref, config])
}
