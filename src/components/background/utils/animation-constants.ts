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
  animation: BlobAnimationConfig
}

export const BLOB_CONFIGS: ReadonlyArray<BlobConfig> = [
  {
    id: 'g1',
    cx: 50,
    cy: 50,
    r: 40,
    className: 'blob g1',
    animation: {
      attr: { cy: '190%' },
      duration: 15,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    },
  },
  {
    id: 'g2',
    cx: 50,
    cy: 50,
    r: 40,
    className: 'blob g2',
    animation: {
      rotation: 360,
      duration: 22,
      ease: 'power1.inOut',
      repeat: -1,
    },
  },
  {
    id: 'g3',
    cx: 10,
    cy: 70,
    r: 40,
    className: 'blob g3',
    animation: {
      rotation: 360,
      duration: 35,
      ease: 'sine.inOut',
      repeat: -1,
    },
  },
  {
    id: 'g4',
    cx: 50,
    cy: 50,
    r: 40,
    className: 'blob g4',
    animation: {
      attr: { cx: '180%', cy: '58%' },
      duration: 12,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    },
  },
  {
    id: 'g5',
    cx: 10,
    cy: 10,
    r: 40,
    className: 'blob g5',
    animation: {
      attr: { cx: '75%', cy: '75%' },
      duration: 17,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    },
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

export const LOGO_POSITION = {
  center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  fixed: { top: '20px', left: '50%', transform: 'translateX(-50%)' },
} as const
