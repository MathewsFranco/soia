export const MOTION = {
  blurMaterialize: {
    opacity: 0,
    filter: 'blur(8px)',
    y: 6,
    duration: 0.6,
    stagger: 0.03,
    ease: 'power2.out',
  },

  softReveal: {
    opacity: 0,
    y: 10,
    duration: 0.7,
    ease: 'power2.out',
  },

  breathIn: {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
  },

  lineBreathIn: {
    scaleX: 0,
    opacity: 0,
    transformOrigin: 'center',
    duration: 0.8,
    ease: 'power2.inOut',
  },

  atmosphericReveal: {
    opacity: 0,
    filter: 'blur(12px)',
    scale: 1.02,
    rotation: 0.5,
    duration: 1.2,
    ease: 'power2.inOut',
  },

  waveReveal: {
    opacity: 0,
    filter: 'blur(6px)',
    y: 12,
    duration: 0.8,
    ease: 'power3.out',
  },
} as const
