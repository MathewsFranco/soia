import { About } from '../components/About'
import { BrandDefinition } from '../components/BrandDefinition'
import Footer from '@/components/Footer'
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
      <div className=" p-2 text-3xl text-ink my-8 gap-6 flex items-center justify-center flex-col sm:flex-row ">
        <h2 className="font-bold mb-4">Conheça nossa fundadora</h2>
        <div>
          <p>
            Fabiana Tomaz é estrategista criativa e fundadora da SOIA. Com uma
            trajetória marcada pela moda, branding e comportamento, transforma
            cultura e tendências em estratégias que conectam marcas a pessoas de
            forma genuína e relevante. Sua visão une sensibilidade estética,
            pensamento estratégico e inovação para criar experiências que
            transcendem o óbvio e constroem valor simbólico, emocional e
            duradouro.
          </p>
        </div>
        <img src="/owner.jpeg" alt="Soia Logo" className="h-120" />
      </div>
      <Footer />
    </>
  )
}
