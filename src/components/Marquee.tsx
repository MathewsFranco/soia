export default function Marquee() {
  return (
    <section
      className="marquee-section border-y border-white/5 py-20 md:py-28 px-6 md:px-16"
      id="marquee"
    >
      <div className="marquee-quote flex flex-col items-center text-center">
        <p
          className="font-roswell text-2xl md:text-4xl text-white/90 leading-snug max-w-[680px]"
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
