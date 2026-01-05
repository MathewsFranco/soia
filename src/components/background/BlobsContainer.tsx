import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'
import { BLOB_CONFIGS } from './utils/animation-constants'

export default function BlobsContainer() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const blobRefs = useRef<Array<SVGCircleElement | null>>([])
  const interactiveRef = useRef<SVGCircleElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Safety: make sure we have the SVG and at least one blob before animating
    if (!svgRef.current || BLOB_CONFIGS.length === 0) return

    // 1) Wander timeline: each blob moves around in a subtle, random pattern
    const wanderTl = gsap.timeline({ paused: false })
    BLOB_CONFIGS.forEach((_, i) => {
      const el = blobRefs.current[i]
      if (!el) return

      const duration = 4 + Math.random() * 6
      const delay = Math.random() * 2
      // animate to random points within the viewBox (10% - 90%)
      const tween = gsap.to(el, {
        attr: {
          cx: () => `${10 + Math.random() * 100}%`,
          cy: () => `${10 + Math.random() * 180}%`,
        },
        ease: 'sine.inOut',
        duration,
        repeat: -1,
        yoyo: true,
        delay,
      })
      wanderTl.add(tween, 0)
    })

    // 2) Scroll driven timeline: blobs move to logo-area positions and stop wandering
    //
    // Define final positions for the blobs around the top-center (logo area).
    // These are percentages in the SVG viewBox coordinates (0 - 100)
    const finalPosition =
      { cx: '50%', cy: '20%', r: '6%' }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: '+=500',
        scrub: true,
        // pause wandering when progress if half
        onUpdate(self) {
          if (self.progress > 0.5 && !wanderTl.paused()) {
            wanderTl.pause()
          } else if (self.progress < 0.5 && wanderTl.paused()) {
            wanderTl.resume()
          }
        },
      },
    })

    // animate each blob to its target position; pin them into the logo area
    BLOB_CONFIGS.forEach((_, i) => {
      const el = blobRefs.current[i]
      if (!el) return
      scrollTl.to(
        el,
        {
          attr: { cx: finalPosition.cx, cy: finalPosition.cy, r: finalPosition.r },
          ease: 'power2.inOut',
          duration: 1,
        },
        0,
      )
    })

    return () => {
      wanderTl.kill()
      scrollTl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, { scope: svgRef })

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <svg
        ref={svgRef}
        className="blobs-container"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Animated blob background"
      >
        <title>Animated blob background</title>
        {BLOB_CONFIGS.map((config, index) => (
          <Blob
            // assign each blob element into our refs array so GSAP can animate them
            ref={(el: SVGCircleElement | null) => {
              blobRefs.current[index] = el
            }}
            key={config.id}
            config={config}
          />
        ))}
        <InteractiveBlob
          ref={interactiveRef}
          isMouseFollowEnabled={true}
        />
      </svg>
    </div>
  )
}
