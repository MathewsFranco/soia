type TypographyVariant = 'title' | 'body'

interface TypographyProps {
  variant: TypographyVariant
  color?: 'black' | 'white'
  className?: string
  children: React.ReactNode
}

const TITLE_CLASSES =
  'font-syne font-bold text-4xl md:text-5xl'

const BODY_CLASSES =
  'font-inter font-normal text-base md:text-2xl'

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
  const baseClasses = variant === 'title' ? TITLE_CLASSES : BODY_CLASSES
  const textColor = COLORS[color]

  const classes = [baseClasses, textColor, className].filter(Boolean).join(' ')

  if (variant === 'title') {
    return <h1 className={classes}>{children}</h1>
  }

  return <p className={classes}>{children}</p>
}
