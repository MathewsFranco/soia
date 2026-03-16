import { createFileRoute } from '@tanstack/react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Hero from '@/components/Hero'
import Pillars from '@/components/Pillars'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import Marquee from '@/components/Marquee'
import { Founder } from '@/components/Founder'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Hero → About: scale + fade out as hero scrolls away
    gsap.to('#hero', {
      opacity: 0,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    })

    // Pillars staggered reveal
    gsap.from('.pillar-word', {
      y: 12,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.pillars-strip', start: 'top 85%' },
    })

    // About section label slide in
    gsap.from('.about-label', {
      x: -16,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
    })

    // About heading — line clip reveal
    const aboutSplit = new SplitText('.about-heading', {
      type: 'lines',
      linesClass: 'overflow-hidden',
    })
    gsap.from(aboutSplit.lines, {
      yPercent: 110,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-heading',
        start: 'top 80%',
        toggleActions: 'play pause resume reset',
      },
    })

    // About body paragraphs
    gsap.from('.about-body', {
      y: 16,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.about-heading', start: 'top 70%' },
    })

    // Services — stagger fade-in
    gsap.from('.service-card', {
      y: 20,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#services', start: 'top 85%' },
    })

    // Brand quote — fade up
    gsap.from('.marquee-quote', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.marquee-section', start: 'top 80%' },
    })

    // Founder — accent line expands from left
    gsap.from('.founder-accent-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.founder-section', start: 'top 75%' },
    })

    // Founder — photo wipe reveal (curtain from left)
    gsap.fromTo(
      '.founder-photo',
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.founder-section', start: 'top 70%' },
      },
    )

    // Founder — name fade up after wipe
    gsap.from('.founder-name', {
      y: 16,
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.founder-section', start: 'top 65%' },
    })

    // Contact heading line reveal
    const contactSplit = new SplitText('.contact-heading', {
      type: 'lines',
      linesClass: 'overflow-hidden',
    })
    gsap.from(contactSplit.lines, {
      yPercent: 110,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    })

    // Contact form fields cascade
    gsap.from('.contact-form .form-field', {
      y: 24,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
    })

    return () => ScrollTrigger.killAll()
  })

  return (
    <main>
      <Hero />
      <Pillars />
      <About />
      <Services />
      <Marquee />
      <Founder />
      <Contact />
      <Footer />
    </main>
  )
}
