import { useForm } from '@tanstack/react-form'
import {
  validateEmail,
  validateMessage,
  validateName,
} from './utils/validators'
import { useContactForm } from './useContactForm'
import { FormField } from './FormField'
import { TextAreaField } from './TextAreaField'
import { SubmitButton } from './SubmitButton'
import { ResultMessage } from './ResultMessage'
import { LABELS, PLACEHOLDERS } from './utils/constants'

export default function ContactForm() {
  const { submitResult, isSubmitting, submitForm } = useContactForm()

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      const success = await submitForm(value)
      if (success) {
        form.reset()
      }
    },
  })

  return (
    <div className="text-white w-full max-w-4xl mx-auto p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <form.Field
          name="name"
          validators={{
            onChange: validateName,
          }}
        >
          {(field) => (
            <FormField
              field={field}
              label={LABELS.name}
              placeholder={PLACEHOLDERS.name}
            />
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: validateEmail,
          }}
        >
          {(field) => (
            <FormField
              field={field}
              label={LABELS.email}
              placeholder={PLACEHOLDERS.email}
              type="email"
            />
          )}
        </form.Field>

        <form.Field
          name="message"
          validators={{
            onChange: validateMessage,
          }}
        >
          {(field) => (
            <TextAreaField
              field={field}
              label={LABELS.message}
              placeholder={PLACEHOLDERS.message}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            values: state.values,
          })}
        >
          {({ canSubmit, isSubmitting: formIsSubmitting, values }) => {
            const hasValues = values.name && values.email && values.message
            const shouldDisable =
              !hasValues || !canSubmit || formIsSubmitting || isSubmitting

            return (
              <>
                <SubmitButton
                  disabled={shouldDisable}
                  isSubmitting={isSubmitting || formIsSubmitting}
                />
                <ResultMessage message={submitResult} />
              </>
            )
          }}
        </form.Subscribe>
      </form>
    </div>
  )
}
