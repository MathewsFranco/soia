import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const smootherRef = useRef<InstanceType<typeof ScrollSmoother> | null>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.4,
      smoothTouch: 0.1,
      effects: true,
    })

    return () => {
      smootherRef.current?.kill()
    }
  })

  return (
    <>
      <title>SOIA — Agência Boutique de Estratégia e Branding</title>
      <meta
        name="description"
        content="SOIA é uma agência boutique especializada em estratégia, cultura e branding para marcas premium e luxo."
      />
      <meta property="og:title" content="SOIA — Agência Boutique de Estratégia e Branding" />
      <meta
        property="og:description"
        content="Posicionamento, narrativas e estratégia para marcas que querem ecoar."
      />
      <meta property="og:image" content="/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />

      <div id="smooth-wrapper" style={{ overflow: 'hidden' }}>
        <div id="smooth-content">
          <Outlet />
        </div>
      </div>
    </>
  )
}
