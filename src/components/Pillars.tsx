const PILLARS = ['OUSADA', 'CRIATIVA', 'EXCLUSIVA', 'CONTEMPORÂNEA']

export default function Pillars() {
  return (
    <section className="pillars-strip flex flex-wrap items-center justify-center gap-6 md:gap-14 py-16 px-10 border-y border-white/10">
      {PILLARS.map((pillar, i) => (
        <span
          key={pillar}
          className="pillar-word flex items-center gap-6 md:gap-14 font-poppins font-light text-[11px] tracking-[0.4em] text-white/50 uppercase"
        >
          {i > 0 && <span className="text-wine text-base leading-none">·</span>}
          {pillar}
        </span>
      ))}
    </section>
  )
}
