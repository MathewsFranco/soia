interface FormFieldProps {
  field: any
  label: string
  placeholder: string
  type?: 'text' | 'email'
}

export function FormField({
  field,
  label,
  placeholder,
  type = 'text',
}: FormFieldProps) {
  const hasErrors = field.state.meta.errors.length > 0
  const baseInputClasses = `
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
      <input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className={`${baseInputClasses} ${errorClasses}`}
      />
      {hasErrors && (
        <div className="text-error text-sm font-medium mt-1">
          {field.state.meta.errors.map((error: string, index: number) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  )
}
