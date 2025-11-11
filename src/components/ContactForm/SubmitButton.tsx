import { LABELS } from './utils/constants'

interface SubmitButtonProps {
  disabled: boolean
  isSubmitting: boolean
}

export function SubmitButton({ disabled, isSubmitting }: SubmitButtonProps) {
  const baseClasses = `
    font-glacial
    font-bold
    py-4
    px-8
    transition-all
    duration-200
    text-lg
    w-full
    sm:w-auto
    flex
    items-center
    justify-center
    gap-2
  `

  const disabledClasses = 'bg-gray-400 text-gray-600 cursor-not-allowed'
  const enabledClasses =
    'bg-white text-black hover:bg-sage hover:text-white cursor-pointer'

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
          {LABELS.sending}
        </>
      ) : (
        LABELS.submit
      )}
    </button>
  )
}
