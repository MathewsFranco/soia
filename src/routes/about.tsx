import { createFileRoute } from '@tanstack/react-router'
import SectionLabel from '@/components/ui/SectionLabel'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <main className="px-6 md:px-16 pt-32 pb-24">
        {/* Hero heading */}
        <div className="mb-20">
          <SectionLabel className="block mb-6">Quem Somos</SectionLabel>
          <h1 className="font-roswell text-5xl md:text-7xl text-white leading-tight tracking-wide max-w-[800px]">
            Além da superfície.
          </h1>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-[1100px]">
          <div className="flex flex-col gap-6">
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Na SOIA, acreditamos que o posicionamento de uma marca vai além de uma estratégia de
              mercado — é um processo contínuo de construção de significado.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Cada marca carrega uma narrativa, um conjunto de valores e um papel simbólico. Nosso
              trabalho é revelar essa essência, compreender como ela se manifesta no presente e
              traduzi-la em linguagem, estética e comportamento.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Acreditamos que marcas fortes são aquelas que sabem se reinventar sem perder
              coerência, e que constroem lealdade não apenas pela comunicação, mas pela experiência
              que entregam.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Na interseção entre estratégia e sensibilidade, ajudamos marcas a se tornarem
              emocionalmente relevantes, culturalmente reconhecidas e profundamente conectadas às
              pessoas que as escolhem.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-12 h-px bg-wine mb-2" />
            <h2 className="font-roswell text-3xl md:text-4xl text-white tracking-wide">
              Fabiana Tomaz
            </h2>
            <span className="font-opensauce text-[11px] tracking-[0.3em] text-taupe uppercase">
              Fundadora & Estrategista
            </span>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Fabiana Tomaz é estrategista criativa e fundadora da SOIA. Formada em Moda, ela
              constrói sua trajetória unindo moda, branding e comportamento de consumo. Na SOIA,
              cada projeto vai além de uma simples entrega: é uma verdadeira experiência de criação.
            </p>
            <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Mergulhamos no universo da marca, estudamos tendências, analisamos comportamentos e
              entendemos o que realmente motiva e emociona as pessoas. A partir disso,
              desenvolvemos narrativas e soluções que dão vida à marca, fortalecendo sua presença e
              relevância no mercado.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
