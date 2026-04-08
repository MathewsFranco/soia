interface Props {
  variant?: 'symbol' | 'line'
}

export default function SectionDivider({ variant = 'symbol' }: Props) {
  if (variant === 'line') {
    return (
      <div className="section-divider flex justify-center py-1">
        <div className="w-20 h-[2px] rounded-full bg-wine/30 origin-center" />
      </div>
    )
  }

  return (
    <div className="section-divider flex justify-center py-6">
      <img
        src="/new-logos/Logo e Variacoes-20.png"
        alt=""
        aria-hidden="true"
        className="w-10 opacity-[0.35]"
      />
    </div>
  )
}
