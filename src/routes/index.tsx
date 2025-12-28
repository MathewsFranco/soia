import { createFileRoute } from '@tanstack/react-router'
import AnimatedGradientBg from '@/components/background/AnimatedGradientBg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="app-wrapper">
      <AnimatedGradientBg />
      {/* <Slogan />
      <BrandDefinition />
      <About />
      <Services />
      <Founder />
      <Footer />*/}
    </div>
  )
}
