import SectionLabel from './ui/SectionLabel'

export function Founder() {
  return (
    <section className="founder-section px-6 md:px-16 py-24" id="founder">
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
        {/* Left: editorial photo */}
        <div className="md:w-[45%] shrink-0 overflow-hidden" data-speed="0.85">
          <img
            src="/founder.jpeg"
            alt="Fabiana Tomaz"
            className="founder-photo w-full aspect-[3/4] object-cover object-top border border-white/8"
            style={{ filter: 'grayscale(20%) contrast(1.05)' }}
          />
        </div>

        {/* Right: text */}
        <div className="flex flex-col gap-5 pt-0 md:pt-12">
          <SectionLabel className="block">Fundadora</SectionLabel>

          <div className="founder-accent-line w-12 h-px bg-wine origin-left" />

          <h2 className="founder-name font-roswell text-4xl md:text-5xl text-white tracking-wide leading-tight">
            Fabiana Tomaz
          </h2>

          <span className="font-opensauce text-[11px] tracking-[0.3em] text-taupe uppercase">
            Fundadora & Estrategista
          </span>

          <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed max-w-[500px] mt-2">
            Fabiana Tomaz é estrategista criativa, formada em Moda e fundadora da SOIA. Com uma
            trajetória construída entre moda, branding e comportamento, transforma cultura e
            tendências em estratégias que conectam marcas e pessoas de forma genuína e relevante.
          </p>

          <p className="font-poppins font-light text-sm md:text-base text-white/70 leading-relaxed max-w-[500px]">
            Sua visão combina sensibilidade estética, pensamento estratégico e inovação para criar
            experiências que transcendem o óbvio e constroem valor simbólico, emocional e duradouro.
          </p>
        </div>
      </div>
    </section>
  )
}
