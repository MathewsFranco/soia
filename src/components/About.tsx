export function About() {
  return (
    <section
      className=" bg-black pb-15 pr-15 px-8 pt-5 md:px-15 md:py-15 gap-5 flex flex-col md:flex-row tracking-wide leading-relaxed text-xl text-white "
      id="about"
    >
      <div className="flex flex-col gap-10 justify-center bg-black md:w-1/2">
        <h1 className="font-cy-grotesk text-5xl ">Sobre a SOIA</h1>
        <div className="px-6 py-3 text-justify relative">
          {/* Decorative borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
          <p>
            Mais do que comunicar, queremos decifrar o que move o desejo e o
            consumo. Compreender os símbolos, comportamentos e emoções que
            definem o que as pessoas escolhem, usam e acreditam. Traduzimos
            essas leituras em estratégias que unem razão e sensibilidade,
            criando marcas que não apenas comunicam, mas expressam um tempo, um
            estilo de vida e uma visão de mundo.
          </p>
        </div>
      </div>
      <div className=" relative aspect-[5/4] w-full md:w-1/2">
        <img
          src="/magazines.jpeg"
          alt="magazines hanging on a clothes hanger on a sidewalk"
          className=" h-full w-full object-cover object-[center_25%]"
        />
        <Square className="absolute -bottom-15 -right-15" />
      </div>
    </section>
  )
}

const Square = ({ className }: { className?: string }) => (
  <div className={`w-25 h-25 bg-amber ${className}`} />
)
