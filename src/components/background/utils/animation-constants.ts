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
