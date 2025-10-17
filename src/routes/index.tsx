import { About } from '../components/About'
import { BrandDefinition } from '../components/BrandDefinition'
import Footer from '@/components/Footer'
import { Founder } from '../components/Founder'
import { Services } from '../components/Services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <img
        src="/keyboard.jpeg"
        alt="Soia Banner"
        className="h-160 w-full object-cover object-[center_70%]"
      />
      <BrandDefinition />
      <About />
      <Services />
      <Founder />
      <Footer />
    </>
  )
}
