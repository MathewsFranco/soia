import { createFileRoute } from '@tanstack/react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedGradientBg from '@/components/background/AnimatedGradientBg'
import { Slogan } from '@/components/Slogan'
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import Footer from '@/components/Footer';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  useGSAP(
    () => {
      ScrollSmoother.create({
        smooth: 1,
        effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
      });

      // gsap.to(
      //   '.big-logo',
      //   {
      //     scale: 0.2,
      //     scrollTrigger: {
      //       trigger: '.big-logo',
      //       scrub: true,
      //       pin: true,
      //       start: 'top top',
      //       end: 'max',
      //     }
      //   }
      // )
    },
  );

  return (
    <>
      <div id="smooth-content">
        <AnimatedGradientBg />
        <Slogan />
        <About />
        <Services />
        <Footer />
        {/*
      <BrandDefinition />
      <Founder />
      */}
      </div>
    </>
  )
}
