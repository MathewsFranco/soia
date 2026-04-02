import { createFileRoute } from '@tanstack/react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { MOTION } from '@/utils/motion'

import Hero from '@/components/Hero'
import Pillars from '@/components/Pillars'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import Marquee from '@/components/Marquee'
import { Founder } from '@/components/Founder'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SectionDivider from '@/components/ui/SectionDivider'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin)

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Hero scroll-out: dissolve back into atmosphere
    gsap.to('#hero', {
      opacity: 0,
      scale: 0.97,
      filter: 'blur(6px)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    })

    // Pillars — breathIn with blur + y-rise
    gsap.from('.pillar-word', {
      opacity: 0,
      filter: 'blur(4px)',
      y: 8,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.pillars-strip', start: 'top 85%' },
    })

    // Section dividers — breathIn on scroll
    gsap.from('.section-divider', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.about-section', start: 'top 90%' },
    })

    // About section label — breathIn
    gsap.from('.about-label', {
      ...MOTION.breathIn,
      duration: 0.6,
      scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
    })

    // About heading — blurMaterialize chars with power3
    const aboutSplit = new SplitText('.about-heading', {
      type: 'chars',
    })
    gsap.from(aboutSplit.chars, {
      ...MOTION.blurMaterialize,
      stagger: 0.025,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-heading',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // About body paragraphs — softReveal
    gsap.from('.about-body', {
      ...MOTION.softReveal,
      stagger: 0.12,
      scrollTrigger: { trigger: '.about-heading', start: 'top 70%' },
    })

    // Marquee symbol — breathIn before quote
    gsap.from('.marquee-symbol', {
      opacity: 0,
      scale: 0.6,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.marquee-section', start: 'top 80%' },
    })

    // Marquee quote — blurMaterialize words
    const marqueeSplit = new SplitText('.marquee-quote p', {
      type: 'words',
    })
    gsap.from(marqueeSplit.words, {
      ...MOTION.blurMaterialize,
      stagger: 0.04,
      scrollTrigger: { trigger: '.marquee-section', start: 'top 80%' },
    })

    // Marquee attribution — breathIn with delay
    gsap.from('.marquee-quote span', {
      ...MOTION.breathIn,
      delay: 0.3,
      scrollTrigger: { trigger: '.marquee-section', start: 'top 80%' },
    })

    // Founder accent line — lineBreathIn from left
    gsap.from('.founder-accent-line', {
      scaleX: 0,
      opacity: 0,
      transformOrigin: 'left',
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '.founder-section', start: 'top 75%' },
    })

    // Founder photo — atmosphericReveal
    gsap.from('.founder-photo', {
      ...MOTION.atmosphericReveal,
      scrollTrigger: { trigger: '.founder-section', start: 'top 70%' },
    })

    // Founder name — blurMaterialize
    gsap.from('.founder-name', {
      opacity: 0,
      filter: 'blur(6px)',
      y: 6,
      duration: 0.7,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.founder-section', start: 'top 65%' },
    })

    // Contact heading — blurMaterialize words
    const contactSplit = new SplitText('.contact-heading', {
      type: 'words',
    })
    gsap.from(contactSplit.words, {
      ...MOTION.blurMaterialize,
      stagger: 0.05,
      scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    })

    // Contact form fields — softReveal
    gsap.from('.contact-form .form-field', {
      ...MOTION.softReveal,
      stagger: 0.08,
      duration: 0.6,
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
    })

    return () => {
      aboutSplit.revert()
      marqueeSplit.revert()
      contactSplit.revert()
      ScrollTrigger.killAll()
    }
  })

  return (
    <main>
      <Hero />
      <Pillars />
      <About />
      <SectionDivider variant="line" />
      <Services />
      <SectionDivider />
      <Marquee />
      <Founder />
      <Contact />
      <Footer />
    </main>
  )
}
