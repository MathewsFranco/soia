import { LABELS } from './utils/constants'

interface SubmitButtonProps {
  disabled: boolean
  isSubmitting: boolean
}

export function SubmitButton({ disabled, isSubmitting }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`
        mt-8 inline-flex items-center justify-center gap-3
        px-10 py-3
        border font-poppins font-light text-xs tracking-[0.4em] uppercase
        transition-all duration-300
        ${
          disabled
            ? 'border-white/10 text-white/20 cursor-not-allowed'
            : 'border-white/25 text-white/70 hover:border-wine hover:text-white cursor-pointer'
        }
      `}
    >
      {isSubmitting ? (
        <>
          <div className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" />
          {LABELS.sending}
        </>
      ) : (
        <>
          {LABELS.submit}
          <span className="text-wine/70 ml-1">→</span>
        </>
      )}
    </button>
  )
}
