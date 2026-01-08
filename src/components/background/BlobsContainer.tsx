import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'
import { BLOB_CONFIGS } from './utils/animation-constants'

export default function BlobsContainer() {
  const animatedRef = useRef<SVGSVGElement>(null)

  const blobRefs = useRef<Array<SVGCircleElement | null>>([])
  const interactiveRef = useRef<SVGCircleElement | null>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      // Timeline 1: Wandering
      const wanderTl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: 'sine.inOut' },
      })

      blobRefs.current.forEach((el, i) => {
        if (!el) return
        wanderTl.to(
          el,
          {
            attr: {
              cx: () => gsap.utils.random(10, 90),
              cy: () => gsap.utils.random(10, 90),
            },
            duration: gsap.utils.random(5, 8),
          },
          i * 0.15,
        )
      })

      // Timeline 2: Scroll-driven
      const scrollTl = gsap.timeline({ paused: true })

      blobRefs.current.forEach((el) => {
        if (!el) return
        scrollTl.to(
          el,
          {
            attr: { cx: 50, cy: 8, r: 5 },
            duration: 1,
            ease: 'power2.inOut',
          },
          0,
        )
      })

      const trigger = ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'top top',
        end: '+=400',
        scrub: true,
        onEnter() {
          wanderTl.pause()
        },
        onLeave() {
          scrollTl.progress(1)
        },
        onEnterBack() {
          scrollTl.progress(0)
          wanderTl.resume()
        },
        onUpdate(self) {
          scrollTl.progress(self.progress)
          if (self.progress > 0.01 && !wanderTl.paused()) {
            wanderTl.pause()
          } else if (self.progress < 0.01 && wanderTl.paused()) {
            wanderTl.resume()
          }
        },
      })

      return () => {
        trigger.kill()
        wanderTl.kill()
        scrollTl.kill()
      }
    },
    { scope: animatedRef },
  )

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <svg
        ref={animatedRef}
        className="blobs-container"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Animated blob background"
      >
        <title>Animated blob background</title>
        {BLOB_CONFIGS.map((config, index) => (
          <Blob
            key={config.id}
            config={config}
            ref={(el: SVGCircleElement | null) => {
              blobRefs.current[index] = el
            }}
          />
        ))}
        <InteractiveBlob ref={interactiveRef} isMouseFollowEnabled={true} />
      </svg>
    </div>
  )
}
