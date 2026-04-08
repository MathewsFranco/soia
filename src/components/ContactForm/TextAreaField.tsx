interface FieldState {
  name: string
  state: { value: string; meta: { errors: Array<string | undefined> } }
  handleBlur: () => void
  handleChange: (value: string) => void
}

interface TextAreaFieldProps {
  field: FieldState
  label: string
}

export function TextAreaField({ field, label }: TextAreaFieldProps) {
  const hasErrors = field.state.meta.errors.length > 0

  return (
    <div className="space-y-1">
      <div className={`form-field${hasErrors ? ' form-field--error' : ''}`}>
        <textarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder=" "
        />
        <label htmlFor={field.name}>{label}</label>
      </div>
      {hasErrors && (
        <p className="font-poppins font-light text-[10px] tracking-[0.2em] text-error/80 uppercase pt-1">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  )
}
