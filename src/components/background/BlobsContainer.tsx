import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { gsap } from 'gsap'
import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'
import { BLOB_CONFIGS } from './utils/animation-constants'

export default function BlobsContainer() {
  const animatedRef = useRef<SVGSVGElement>(null)

  const blobRefs = useRef<Array<SVGCircleElement | null>>([])
  const interactiveRef = useRef<SVGCircleElement | null>(null)

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger)

  //   // inside your useGSAP(...) callback
  //   // 1) create a looping wander timeline
  //   const wanderTl = gsap.timeline({ repeat: -1, yoyo: true })
  //   blobRefs.current.forEach((el, i) => {
  //     if (!el) return
  //     wanderTl.to(el, {
  //       attr: {
  //         cx: () => 10 + Math.random() * 80,
  //         cy: () => 10 + Math.random() * 80,
  //       },
  //       duration: 6 + Math.random() * 4,
  //       ease: 'sine.inOut',
  //     }, i * 0.1) // stagger slightly
  //   })

  //   // 2) create a paused move timeline (from current -> targets)
  //   const moveTl = gsap.timeline({ paused: true })


  //   blobRefs.current.forEach((el) => {
  //     if (!el) return

  //     moveTl.to(el, { attr: { cx: 50, cy: 5, r: 8 }, ease: 'power2.inOut' }, 0)
  //     moveTl.to(el, { transformOrigin: '50% 0%' }, 0)
  //   })

  //   // 3) ScrollTrigger: pause wander when scroll starts, drive move timeline, resume wander when at top
  //   ScrollTrigger.create({
  //     trigger: document.documentElement,
  //     start: 'top top',
  //     end: '+=500',
  //     scrub: true,
  //     onUpdate(self) {
  //       const p = self.progress
  //       if (p > 0.0001) {
  //         if (!wanderTl.paused()) wanderTl.pause()
  //         // ensure moveTl uses current values if needed (optional moveTl.invalidate())
  //         moveTl.pause()
  //         moveTl.progress(p)
  //       } else {
  //         // animate the move timeline back to 0 for a smooth reverse, then resume wander
  //         gsap.to(moveTl, {
  //           progress: 0,
  //           duration: 0.6,
  //           ease: 'power3.inOut',
  //           onComplete() {
  //             if (wanderTl.paused()) wanderTl.resume()
  //           },
  //         })
  //       }
  //     },
  //   })
  // }, { scope: blobRefs })


  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none">
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
