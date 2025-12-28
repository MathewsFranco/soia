import { createFileRoute } from '@tanstack/react-router'
import { About } from '../components/About'
import { BrandDefinition } from '../components/BrandDefinition'
import { Founder } from '../components/Founder'
import { Services } from '../components/Services'
import { Slogan } from '../components/Slogan'
import Footer from '@/components/Footer'
import AnimatedGradientBg from '@/components/background/AnimatedGradientBg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <AnimatedGradientBg />
      {/* Your content sits above */}
      {/* <Slogan />
      <BrandDefinition />
      <About />
      <Services />
      <Founder />
      <Footer />*/}
    </>
  )
}
