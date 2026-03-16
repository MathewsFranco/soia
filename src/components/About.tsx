import SectionLabel from './ui/SectionLabel'

export function About() {
  return (
    <section
      className="about-section relative min-h-screen flex items-center px-6 md:px-16 py-24 overflow-hidden"
      id="about"
    >
      {/* Large background word — parallaxes slower than foreground */}
      <span
        className="absolute right-[-2vw] top-1/2 -translate-y-1/2 font-roswell leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 22vw, 22rem)',
          color: 'rgba(93, 42, 45, 0.08)',
        }}
        aria-hidden="true"
        data-speed="0.75"
      >
        SOIA
      </span>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        <div className="md:w-[35%] flex justify-center">
          <img
            src="/logomark-white.png"
            alt=""
            aria-hidden="true"
            className="w-full max-w-[200px] opacity-[0.12] select-none pointer-events-none"
            data-speed="0.8"
          />
        </div>

        <div className="md:w-[65%]">
          <SectionLabel className="about-label block mb-6">Agência Boutique</SectionLabel>

          <h2 className="about-heading font-roswell text-4xl md:text-6xl text-white leading-tight tracking-wide mb-10">
            Sobre a SOIA
          </h2>

          <div className="flex flex-col gap-6">
            <p className="about-body font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              A SOIA é uma agência de consultoria para marcas no segmento premium e luxo. SOIA vem do
              verbo soar:{' '}
              <em className="text-white not-italic font-normal">
                aquilo que ecoa, permanece e cria reconhecimento
              </em>
              . Representamos marcas que não apenas comunicam — mas ressoam no tempo e na cultura.
            </p>

            <p className="about-body font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed">
              Idealizada por Fabiana Tomaz, com formação em Moda e atuação em marketing e
              comportamento de consumo, a SOIA atua em posicionamento, narrativas, influência,
              conteúdo, relações públicas, eventos e experiências — sempre a partir de uma leitura
              profunda do que move as pessoas e o consumo contemporâneo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
