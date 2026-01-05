export interface BlobAnimationConfig {
  attr?: { cx?: string; cy?: string }
  rotation?: number
  duration: number
  ease: string
  repeat: number
  yoyo?: boolean
}

export interface BlobConfig {
  id: string
  cx: number
  cy: number
  r: number
  className: string
}

export const BLOB_CONFIGS: ReadonlyArray<BlobConfig> = [
  {
    id: 'g1',
    cx: 10,
    cy: 15,
    r: 10,
    className: 'blob g1',
  },
  {
    id: 'g2',
    cx: 35,
    cy: 15,
    r: 10,
    className: 'blob g2',
  },
  {
    id: 'g3',
    cx: 60,
    cy: 15,
    r: 10,
    className: 'blob g3',
  },
  {
    id: 'g4',
    cx: 85,
    cy: 15,
    r: 10,
    className: 'blob g4',
  },
] as const

export const INTERACTIVE_BLOB_CONFIG = {
  cx: -10,
  cy: -10,
  r: 10,
  className: 'blob interactive hidden md:block',
} as const

export const LOGO_SIZE = {
  full: { width: 1000, height: 375 },
  fixed: { width: 200, height: 75 },
} as const
