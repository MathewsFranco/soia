import type { BlobConfig } from './utils/animation-constants'

interface BlobProps {
  config: BlobConfig
}

export default function Blob({ config }: BlobProps) {
  return (
    <circle
      className={config.className}
      cx={config.cx}
      cy={config.cy}
      r={config.r}
    />
  )
}
