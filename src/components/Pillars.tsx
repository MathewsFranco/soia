import { Fragment } from 'react'

const PILLARS = ['OUSADA', 'CRIATIVA', 'EXCLUSIVA', 'CONTEMPORÂNEA']

function WaveEdge() {
  return (
    <svg
      viewBox="0 0 1440 20"
      preserveAspectRatio="none"
      className="w-full h-full"
      aria-hidden="true"
    >
      <path
        d="M0,20 C240,20 240,4 480,4 C720,4 720,20 960,20 C1200,20 1200,4 1440,4 L1440,20 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Pillars() {
  return (
    <section className="pillars-strip relative z-10 flex flex-nowrap items-center justify-center gap-8 md:gap-16 py-10 md:py-12 px-6 md:px-10 bg-black">
      <div
        className="wave-edge-top"
        style={{ color: 'rgba(93, 42, 45, 0.06)' }}
      >
        <WaveEdge />
      </div>
      <div
        className="wave-edge-bottom"
        style={{ color: 'rgba(93, 42, 45, 0.06)' }}
      >
        <WaveEdge />
      </div>

      {PILLARS.map((pillar, i) => (
        <Fragment key={pillar}>
          {i > 0 && (
            <img
              src="/new-logos/Logo e Variacoes-20.png"
              alt=""
              aria-hidden="true"
              className="w-6 md:w-8 opacity-60"
            />
          )}
          <span className="pillar-word font-opensauce text-sm md:text-base tracking-[0.35em] text-white/85 uppercase">
            {pillar}
          </span>
        </Fragment>
      ))}
    </section>
  )
}
