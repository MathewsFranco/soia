interface Props {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: Props) {
  return (
    <span
      className={`font-opensauce text-[10px] tracking-[0.4em] text-taupe uppercase ${className}`}
    >
      {children}
    </span>
  )
}
