import { createFileRoute } from '@tanstack/react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedGradientBg from '@/components/background/AnimatedGradientBg'
import { Slogan } from '@/components/Slogan'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        smooth: 1,
        effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
      });
      ScrollTrigger.create({
        trigger: '.big-logo',
        pin: true,
        start: 'center top',
        end: '+=3000000',
      });

      gsap.to(
        '.big-logo',
        {
          scale: 0.2,
          scrollTrigger: {
            scrub: true,
          }
        }
      )
    },
  );

  return (
    <>
      <div id="smooth-content">
        <AnimatedGradientBg />
        <Slogan />
        {/*
      <BrandDefinition />
      <About />
      <Services />
      <Founder />
      <Footer />*/}
      </div>
    </>
  )
}
