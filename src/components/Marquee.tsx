export default function Marquee() {
  return (
    <section
      className="marquee-section relative py-20 md:py-28 px-6 md:px-16"
      id="marquee"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(93, 42, 45, 0.03) 30%, rgba(93, 42, 45, 0.03) 70%, transparent)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/paterns/Patterm-04.4.png')",
          backgroundSize: '300px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 70%)',
        }}
      />

      <div className="marquee-quote relative z-10 flex flex-col items-center text-center">
        <img
          src="/new-logos/Logo e Variacoes-17.png"
          alt=""
          aria-hidden="true"
          className="marquee-symbol w-16 opacity-[0.30] mb-8"
        />
        <p
          className="font-roswell text-3xl md:text-5xl text-white/90 leading-snug max-w-[680px]"
        >
          &ldquo;Quando olharem para a marca,
          <br />
          quero que sintam conexão.&rdquo;
        </p>
        <span className="font-poppins font-light text-xs tracking-[0.3em] text-taupe uppercase mt-8">
          — Fabiana Tomaz
        </span>
      </div>
    </section>
  )
}
