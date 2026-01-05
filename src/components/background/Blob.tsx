import { forwardRef } from 'react'
import type { BlobConfig } from './utils/animation-constants'

interface BlobProps {
  config: BlobConfig
}

const Blob = forwardRef<SVGCircleElement, BlobProps>(({ config }, ref) => (
  <circle
    ref={ref}
    className={config.className}
    cx={config.cx}
    cy={config.cy}
    r={config.r}
  />
))

Blob.displayName = 'Blob' // Add display name for debugging

export default Blob
