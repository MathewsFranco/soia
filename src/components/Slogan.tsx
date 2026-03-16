export function Slogan() {
  return (
    <section
      className="min-h-[100vh] flex flex-col md:flex-row items-center justify-center gap-16 px-10 md:px-20 py-20"
      id="manifesto"
    >
      {/* Logomark */}
      <img
        src="/logomark-white.png"
        className="w-20 h-20 md:w-36 md:h-36 opacity-80 flex-shrink-0"
        alt="SOIA logomark"
      />

      {/* Text block */}
      <div className="flex flex-col gap-6 max-w-[640px]">
        <div className="flex flex-col gap-1">
          <h2 className="font-roswell text-5xl md:text-7xl text-white leading-none tracking-wide">
            Menos ruído.
          </h2>
          <h2 className="font-roswell text-5xl md:text-7xl text-wine leading-none tracking-wide">
            Mais impacto.
          </h2>
        </div>

        <p className="font-poppins font-light text-base md:text-lg text-white/60 leading-relaxed max-w-[480px]">
          Mais do que comunicar, buscamos entender o que realmente move as
          pessoas — seus desejos, comportamentos e o que gera reconhecimento
          duradouro. A partir dessas percepções, construímos posicionamentos e
          narrativas estratégicas para marcas que querem ecoar.
        </p>
      </div>
    </section>
  )
}
