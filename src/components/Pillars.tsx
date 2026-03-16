import { Fragment } from 'react'

const PILLARS = ['OUSADA', 'CRIATIVA', 'EXCLUSIVA', 'CONTEMPORÂNEA']

export default function Pillars() {
  return (
    <section className="pillars-strip flex flex-nowrap items-center justify-center gap-8 md:gap-16 py-10 md:py-12 px-6 md:px-10 border-y border-white/10">
      {PILLARS.map((pillar, i) => (
        <Fragment key={pillar}>
          {i > 0 && <span className="w-6 md:w-10 h-px bg-taupe/30" />}
          <span className="pillar-word font-opensauce text-xs md:text-sm tracking-[0.35em] text-white/70 uppercase">
            {pillar}
          </span>
        </Fragment>
      ))}
    </section>
  )
}
