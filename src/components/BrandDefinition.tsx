export function BrandDefinition() {
  return (
    <section
      className="flex flex-col pt-10 md:pt-0 md:flex-row justify-center items-center bg-amber text-white "
      id="brand-definition"
    >
      <div className="mx-5  flex flex-col gap-5 items-start justify-center md:w-4/6  ">
        <h1 className="font-cy-grotesk text-6xl uppercase">quem somos</h1>
        <p className="text-2xl text-justify">
          A SOIA é uma agência de estratégias para marcas que buscam relevância
          em um mercado em constante transformação. Conectamos marcas às
          gerações que estão impulsionando as transformações do mercado, aquelas
          que redefinem comportamentos, valores e modos de consumo. Fazemos isso
          por meio de pesquisa de comportamento, análise de tendências e leitura
          sociocultural, traduzindo movimentos culturais em estratégias que
          constroem relevância, identificação e desejo.
        </p>
      </div>
      <div className="max-w-100 my-15 md:w-2/6 md:mr-15 md:mb-15 relative ">
        <Square className="absolute md:-top-8 md:-left-15" />
        <Square className="absolute bottom-0 right-0 md:-bottom-10 md:-right-10 " />
        <img
          src="/model.jpeg"
          alt="model holding a computer"
          className="object-cover p-10 md:p-0"
        />
      </div>
    </section>
  )
}

const Square = ({ className }: { className?: string }) => (
  <div className={`w-20 h-20 bg-sage ${className}`} />
)
