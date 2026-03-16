export const LOGO_VIEWBOX = '213.52 372.64 414.39 118.33'

// Single full-screen viewBox centered on logo (~420, 432).
// 700×1100 yields logo at ~82% width on mobile, ~59% on desktop with slice.
export const MORPH_VIEWBOX = '70 -118 700 1100'
export const WHITE_RECT_PATH = 'M70 -118 H770 V982 H70 Z'

// Combined compound path — all 4 SOIA letters in one d attribute.
// First m of each original <path> capitalized to M (absolute moveTo).
// fill-rule="evenodd" preserves the holes in O and A.
export const COMPOUND_LOGO_PATH = [
  // S
  'M223.79 458.59c6.75 19.99 21.41 31.86 43.23 29.25 14.57-1.75 25.33-13.55 20.6-28.49-8.85-27.95-70.75-17.59-68.38-57.82 2.09-35.3 61.01-37.05 75.38-9.78l-8.51 7.9c-8.42-16.62-20.65-27.07-40.43-22.28-16.68 4.03-24.87 23.12-10.8 35.01 19.1 16.16 73.42 14.91 61.81 56.03-9.46 33.53-69.93 28.41-83.17-0.72-0.38-0.59 0.09-0.8 0.4-1.19 0.38-0.49 9.37-8.3 9.87-7.91z',
  // O (compound — outer + inner hole)
  'M438.12 372.64c7.86-1.51 12.42 7.97 6.95 13.02-3.67 3.39-10.88-0.04-11.99 6.88-1.11 6.86 5.87 18.42 7.28 26.62 7.09 41.03-22.01 78.04-65.01 71.81-75.32-10.92-59.02-129.05 18.58-116.77 9.47 1.49 23.01 9.54 30.29 9.32 10.51-0.3 6.71-9.5 13.9-10.88zm-58.88 3.84c-62.46 5.87-46.02 135.86 22.05 108.91 39.95-15.81 36.2-114.39-22.05-108.91z',
  // I
  'M493.46 375.5v114.06h-12.84v-114.06z',
  // A (compound — outer + inner cutout)
  'M581.07 373.99l46.84 116.32-15.02-0.84-13.65-34.31h-52.94l-13.63 33.2c-0.9 1.64-2.87 1.21-4.46 1.19 12.9-31.74 25.64-63.58 38.87-95.19 3.72-8.89 3.45-13.78 12.11-19.62 0.62-0.42 0.72-1.07 1.88-0.75zm16.63 77.8l-25.68-61.94-24.18 61.94z',
].join(' ')

// Blob radius scaled for the larger MORPH_VIEWBOX (was 6% in the tight LOGO_VIEWBOX).
export const INTERACTIVE_BLOB_CONFIG = {
  cx: '-100',
  cy: '-100',
  r: '22',
  className: 'fill-white',
} as const
