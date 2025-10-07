import Carousel from '@/components/Carousel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <div className="h-120 border-2 border-amber">
        <Carousel />
      </div>

      <div className=" p-2 text-3xl text-ink my-8 gap-6 flex items-center justify-center flex-col sm:flex-row ">
        <div>
          <p>
            A SOIA é agência que conecta a sua marca as gerações que estão
            impulsionando o mercado.
          </p>
          <p>
            Mais do que comunicar, buscamos entender o que move o consumo
            transformando percepções em experiências marcantes.
          </p>
        </div>
        <img src="/tv.jpeg" alt="Soia Logo" className="h-120 self-center" />
      </div>
      <div className=" p-2 text-3xl text-ink my-8 gap-6 flex items-center justify-center flex-col sm:flex-row ">
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
        <img src="/orange.jpeg" alt="Soia Logo" className="h-120" />
      </div>
    </>
  )
}
