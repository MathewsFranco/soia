import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Blob from './Blob'
import InteractiveBlob from './InteractiveBlob'
import { BLOB_CONFIGS } from './utils/animation-constants'

const FINAL_POSITIONS = { cx: '50%', cy: '15%', r: '10%' }

export default function BlobsContainer() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const blobRefs = useRef<Array<SVGCircleElement | null>>([])
  const interactiveRef = useRef<SVGCircleElement | null>(null)

  // running wander tweens
  const wanderTweens = useRef<Array<gsap.core.Tween>>([])
  // persistent move timeline (we rebuild its inner tweens on each scroll-start)
  const moveTlRef = useRef<gsap.core.Timeline | null>(null)
  // snapshot of wandering positions captured at first scroll
  const wanderSnapshot = useRef<Array<{ cx: string; cy: string; r: string }>>([])
  // a return tween instance to avoid overlapping return animations
  const returnTween = useRef<gsap.core.Tween | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!svgRef.current || BLOB_CONFIGS.length === 0) return

    // helper: start wandering tweens from whatever current positions elements have
    const startWanders = () => {
      // kill existing
      wanderTweens.current.forEach(t => t.kill())
      wanderTweens.current = []

      BLOB_CONFIGS.forEach((_, i) => {
        const el = blobRefs.current[i]
        if (!el) {
          // placeholder to keep index alignment
          wanderTweens.current.push(gsap.to({}, {}))
          return
        }

        const duration = 4 + Math.random() * 6
        const delay = Math.random() * 1.2

        // To make wandering feel natural, animate toward random points repeatedly.
        // The element's current attrs remain the starting point for the first tween.
        const tween = gsap.to(el, {
          attr: {
            cx: () => `${10 + Math.random() * 80}%`,
            cy: () => `${10 + Math.random() * 80}%`,
          },
          ease: 'sine.inOut',
          duration,
          repeat: -1,
          yoyo: true,
          delay,
          overwrite: 'auto',
        })

        wanderTweens.current.push(tween)
      })
    }

    // start wandering immediately on mount
    startWanders()

    // build or update the move timeline so its FROM values come from the provided snapshot
    const buildOrUpdateMoveTimelineFromSnapshot = (snapshot: Array<{ cx: string; cy: string; r: string }>) => {
      let tl = moveTlRef.current
      if (!tl) {
        tl = gsap.timeline({ paused: true })
      } else {
        // clear inner tweens without disposing the timeline instance
        tl.clear()
      }

      BLOB_CONFIGS.forEach((_, i) => {
        const el = blobRefs.current[i]
        const target = FINAL_POSITIONS
        if (!el) return

        const from = snapshot[i] || { cx: el.getAttribute('cx') || '50%', cy: el.getAttribute('cy') || '50%', r: el.getAttribute('r') || target.r }
        // fromTo ensures movement begins from the snapshot positions (no teleport)
        tl.fromTo(el, { attr: { cx: from.cx, cy: from.cy, r: from.r } }, { attr: { cx: target.cx, cy: target.cy, r: target.r }, ease: 'power2.inOut' }, 0)
      })

      if (interactiveRef.current) {
        const el = interactiveRef.current
        const from = { cx: el.getAttribute('cx') || '10%', cy: el.getAttribute('cy') || '10%', r: el.getAttribute('r') || '6%' }
        tl.fromTo(el, { attr: { cx: from.cx, cy: from.cy, r: from.r } }, { attr: { cx: '50%', cy: '10%', r: '6%' }, ease: 'power2.inOut' }, 0)
      }

      moveTlRef.current = tl
      return tl
    }

    // flags
    let wandersPaused = false
    let moveBuilt = false

    // ScrollTrigger drives the progress of the move timeline both directions
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: '+=500',
      scrub: true,
      onUpdate(self) {
        const p = self.progress

        if (p > 0.001) {
          // on first scroll down: capture a snapshot and pause wander tweens
          if (!wandersPaused) {
            wanderSnapshot.current = BLOB_CONFIGS.map((_, i) => {
              const el = blobRefs.current[i]
              return el
                ? {
                  cx: el.getAttribute('cx') || '50%',
                  cy: el.getAttribute('cy') || '50%',
                  r: el.getAttribute('r') || '6%',
                }
                : { cx: '50%', cy: '50%', r: '6%' }
            })
            // pause wandering immediately after snapshotting
            wanderTweens.current.forEach(t => t.pause())
            wandersPaused = true
          }

          // build/update move timeline from the snapshot so FROM values match current positions
          const tl = buildOrUpdateMoveTimelineFromSnapshot(wanderSnapshot.current)
          moveBuilt = true

          // ensure any running return animation is killed to avoid fights
          if (returnTween.current) {
            returnTween.current.kill()
            returnTween.current = null
          }

          // drive timeline to scroll progress
          tl.pause()
          tl.progress(p)
        } else {
          // user returned to top: animate blobs back down to the snapshot positions,
          // then resume wandering. We keep the move timeline instance persistent.
          if (moveBuilt && moveTlRef.current && wanderSnapshot.current.length) {
            // if a previous return tween exists, kill it
            if (returnTween.current) {
              returnTween.current.kill()
              returnTween.current = null
            }

            // create a return tween that animates the move timeline progress back to 0
            // animating the timeline's progress causes the elements to follow the reverse motion
            returnTween.current = gsap.to(moveTlRef.current, {
              progress: 0,
              duration: 0.6,
              ease: 'power2.inOut',
              onComplete: () => {
                // after returning to snapshot positions rebuild wanderers so they begin from
                // the snapshot attrs (and continue natural wandering)
                startWanders()
                wandersPaused = false
              },
            })
          } else if (wandersPaused) {
            // fallback: if move timeline wasn't built but wanders were paused, just restart wanders
            startWanders()
            wandersPaused = false
          }
        }
      },
    })

    // cleanup
    return () => {
      wanderTweens.current.forEach(t => t.kill())
      if (moveTlRef.current) moveTlRef.current.kill()
      if (returnTween.current) returnTween.current.kill()
      st.kill()
      ScrollTrigger.getAll().forEach(s => s.kill())
    }
  }, { scope: svgRef })

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
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
