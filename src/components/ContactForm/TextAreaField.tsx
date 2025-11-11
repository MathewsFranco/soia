interface TextAreaFieldProps {
  field: any
  label: string
  placeholder: string
  rows?: number
}

export function TextAreaField({
  field,
  label,
  placeholder,
  rows = 4,
}: TextAreaFieldProps) {
  const hasErrors = field.state.meta.errors.length > 0
  const baseClasses = `
    w-full
    px-4
    py-3
    font-glacial
    border-2
    text-lg
    bg-white
    text-black
    focus:outline-none
    transition-all
    duration-200
    resize-vertical
    min-h-[120px]
  `
  const errorClasses = hasErrors
    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
    : ''

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className="block text-lg font-semibold text-white font-glacial tracking-wide"
      >
        {label}
      </label>
      <textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${baseClasses} ${errorClasses}`}
      />
      {hasErrors && (
        <div className="text-error text-sm font-medium mt-1">
          {field.state.meta.errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  )
}
