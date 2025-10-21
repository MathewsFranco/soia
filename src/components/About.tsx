export function About() {
  return (
    <section
      className="bg-black px-8 md:px-20 py-25 gap-15 flex flex-col md:flex-row tracking-wide leading-9 text-2xl "
      id="about"
    >
      <div className="relative flex flex-col justify-center bg-black text-white w-full md:w-1/2">
        <h1 className="font-bold mb-10 text-6xl max-w-xs">Sobre a SOIA</h1>
        <div className="px-6 py-3">
          {/* Decorative borders */}
          <div className="absolute top-42 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white" />
          <p>
            Mais do que comunicar, buscamos entender o que move o consumo e
            traduzir essas percepções em posicionamentos sólidos, narrativas
            potentes e experiências marcantes.
          </p>
          <p>
            Nosso trabalho une análise sociocultural, branding, inovação e
            storytelling para criar marcas que transcendem produtos e se tornam
            parte da vida das pessoas.
          </p>
        </div>
      </div>
      <div className="aspect-[5/4] w-full md:w-1/2 flex items-center justify-center">
        <img
          src="/magazines.jpeg"
          alt="magazines hanging on a clothes hanger on a sidewalk"
          className="h-full w-full object-cover object-[center_25%]"
        />
      </div>
    </section>
  )
}
