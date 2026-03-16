const CONTENT = 'Menos ruído. Mais impacto. — '

export default function Marquee() {
  const repeated = CONTENT.repeat(8)

  return (
    <section className="marquee-section py-12 border-y border-white/5 overflow-hidden" id="marquee">
      <div className="marquee-track whitespace-nowrap will-change-transform">
        <span
          className="font-roswell text-wine tracking-wide"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {repeated}
        </span>
      </div>
    </section>
  )
}
