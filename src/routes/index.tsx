import { About } from '../components/About'
import { BrandDefinition } from '../components/BrandDefinition'
import Footer from '@/components/Footer'
import { Founder } from '../components/Founder'
import { ImageSpacer } from '../components/ImageSpacer'
import { Services } from '../components/Services'
import { Slogan } from '../components/Slogan'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <Slogan />
      <ImageSpacer />
      <BrandDefinition />
      <About />
      <Services />
      <Founder />
      <Footer />
    </>
  )
}
