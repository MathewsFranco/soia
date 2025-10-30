import Footer from '@/components/Footer'
import { createFileRoute } from '@tanstack/react-router'
import { About } from '../components/About'
import { BrandDefinition } from '../components/BrandDefinition'
import { Founder } from '../components/Founder'
import { Services } from '../components/Services'
import { Slogan } from '../components/Slogan'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <Slogan />
      <BrandDefinition />
      <About />
      <Services />
      <Founder />
      <Footer />
    </>
  )
}
