import { BrandDefinition } from '../components/BrandDefinition'
import Footer from '@/components/Footer'
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
      <div className=" bg-black text-linen px-18 py-25 text-3xl gap-6 flex items-center justify-center flex-col sm:flex-row ">
        <div className="flex-col justify-center align-middle bg-black text-linen">
          <h1 className="font-bold mb-10 text-6xl ">Sobre a Soia</h1>
          <p className="text-2xl">
            Mais do que comunicar, buscamos entender o que move o consumo e
            traduzir essas percepções em posicionamentos sólidos, narrativas
            potentes e experiências marcantes.
            <br />
            Nosso trabalho une análise sociocultural, branding, inovação e
            storytelling para criar marcas que transcendem produtos e se tornam
            parte da vida das pessoas.
          </p>
        </div>
        <img
          src="/magazines.jpeg"
          alt="Soia Logo"
          className="h-140 object-cover"
        />
      </div>
      <div className=" p-2 text-3xl text-ink my-8 gap-6 flex items-center justify-center flex-col sm:flex-row ">
        <h2 className="font-bold mb-4">Nossos Serviços</h2>
        <div>
          <p>
            A SOIA observa, analisa e transforma o comportamento humano em
            narrativas e oportunidades.
          </p>
          <p>
            Entre o sentir e o pensar, traduz o que move pessoas e o que inspira
            gerações e dar forma as marcas que estão buscando o encontro emoção,
            cultura e propósito.
          </p>
          <p>
            Na area Sensorial, as ideas ganham texturas, voz e propósito, ou
            seja, transformando conceitos em experiencias que despertam os
            sentidos.
          </p>
          <p>
            Na área comportamental, tendências são traduzidas em estratégias
            humanas, conectando marcas ao tempo presente e ao que ainda está por
            vir.
          </p>
          <p>
            Nos projetos de PR, cada ação é projetada com muita pesquisa, para
            que o encontro entre marcas e públicos aconteça de forma genuína e
            memorável.
          </p>
        </div>
        <img src="/shoes.jpeg" alt="Soia Logo" className="h-120" />
      </div>
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
