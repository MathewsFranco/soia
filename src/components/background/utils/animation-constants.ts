export interface BlobConfig {
  id: string
  cx: string
  cy: string
  r: string
  className: string
}

export const BLOB_CONFIGS: ReadonlyArray<BlobConfig> = [
  {
    id: 'g1',
    cx: '20%',
    cy: '30%',
    r: '12%',
    className: 'fill-white ',
  },
  {
    id: 'g2',
    cx: '80%',
    cy: '40%',
    r: '15%',
    className: 'fill-white ',
  },
  {
    id: 'g3',
    cx: '40%',
    cy: '70%',
    r: '18%',
    className: 'fill-white ',
  },
  {
    id: 'g4',
    cx: '70%',
    cy: '80%',
    r: '10%',
    className: 'fill-white ',
  },
] as const

export const INTERACTIVE_BLOB_CONFIG = {
  cx: '-10%',
  cy: '-10%',
  r: '12%',
  className: 'fill-white  hidden md:block',
} as const
