type TypographyVariant = 'title' | 'subtitle' | 'body'

interface TypographyProps {
  variant: TypographyVariant
  color?: 'black' | 'white'
  className?: string
  children: React.ReactNode
}

const TITLE_CLASSES = 'font-roswell font-normal text-4xl md:text-6xl tracking-wide'
const SUBTITLE_CLASSES = 'font-opensauce font-medium text-xl md:text-3xl'
const BODY_CLASSES = 'font-poppins font-light text-base md:text-xl leading-relaxed'

const COLORS = {
  black: 'text-black',
  white: 'text-white',
}

export default function Typography({
  variant,
  color = 'white',
  className = '',
  children,
}: TypographyProps) {
  const baseClasses =
    variant === 'title'
      ? TITLE_CLASSES
      : variant === 'subtitle'
        ? SUBTITLE_CLASSES
        : BODY_CLASSES
  const textColor = COLORS[color]
  const classes = [baseClasses, textColor, className].filter(Boolean).join(' ')

  if (variant === 'title') return <h1 className={classes}>{children}</h1>
  if (variant === 'subtitle') return <h2 className={classes}>{children}</h2>
  return <p className={classes}>{children}</p>
}
