import { useRef } from 'react'
import { useBlobAnimation } from './utils/useBlobAnimation'
import type { BlobConfig } from './utils/animation-constants'

interface BlobProps {
  config: BlobConfig
  innerRef?: (el: SVGCircleElement | null) => void
}

export default function Blob({ config, innerRef }: BlobProps) {
  const ref = useRef<SVGCircleElement>(null)
  useBlobAnimation(ref, config.animation)

  return (
    <circle
      ref={(el) => {
        ref.current = el
        if (innerRef) innerRef(el)
      }}
      className={config.className}
      cx={config.cx}
      cy={config.cy}
      r={config.r}
    />
  )
}
