interface Props {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: Props) {
  return (
    <span
      className={`font-opensauce text-sm tracking-[0.3em] text-taupe uppercase ${className}`}
    >
      {children}
    </span>
  )
}
