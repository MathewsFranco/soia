import SectionLabel from './ui/SectionLabel'

export function About() {
  return (
    <section
      className="about-section relative min-h-screen flex items-center px-6 md:px-16 py-24 overflow-hidden"
      id="about"
    >
      {/* Warm radial gradient behind section */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(104, 96, 88, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        <div className="md:w-[35%] flex justify-center relative">
          <img
            src="/new-logos/Logo e Variacoes-16.png"
            alt=""
            aria-hidden="true"
            className="w-full max-w-[320px] select-none pointer-events-none -ml-8"
            data-speed="0.8"
          />
        </div>

        <div className="md:w-[65%]">
          <SectionLabel className="about-label block mb-6">Agência Boutique</SectionLabel>

          <h2 className="about-heading font-roswell text-5xl md:text-7xl text-white leading-tight tracking-wide mb-10">
            Sobre a SOIA
          </h2>

          <div className="flex flex-col gap-6">
            <p className="about-body font-poppins font-light text-sm md:text-base text-[color:var(--color-warm-white)] leading-relaxed">
              A SOIA é uma agência de consultoria para marcas no segmento premium e luxo. SOIA vem do
              verbo soar:{' '}
              <em className="text-white not-italic font-normal">
                aquilo que ecoa, permanece e cria reconhecimento
              </em>
              . Representamos marcas que não apenas comunicam — mas ressoam no tempo e na cultura.
            </p>

            <p className="about-body font-poppins font-light text-sm md:text-base text-[color:var(--color-warm-white)] leading-relaxed">
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
