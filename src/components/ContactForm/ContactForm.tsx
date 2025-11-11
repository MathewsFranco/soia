import {
  validateEmail,
  validateMessage,
  validateName,
} from './utils/validators'

import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

interface Web3FormsResponse {
  success: boolean
  message?: string
}

export default function ContactForm() {
  const [submitResult, setSubmitResult] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      setSubmitResult('')

      try {
        const formData = new FormData()
        formData.append('access_key', 'b86eb91d-b984-4c15-bbfb-522372cb6069')
        formData.append('name', value.name)
        formData.append('email', value.email)
        formData.append('message', value.message)

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        })

        const data = (await response.json()) as Web3FormsResponse

        if (data.success) {
          setSubmitResult('Mensagem enviada com sucesso!')
          form.reset()
        } else {
          setSubmitResult('Error: ' + (data.message || 'Algo deu errado'))
        }
      } catch (error) {
        setSubmitResult('Error: Network error occurred. Please try again.')
      } finally {
        setIsSubmitting(false)
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
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="
                  block
                  text-lg
                  font-semibold
                  text-white
                  font-glacial
                  tracking-wide
                "
              >
                Name
              </label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your name..."
                className={`
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
                  ${
                    field.state.meta.errors.length > 0 &&
                    'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                  }
                `}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-error text-sm font-medium mt-1">
                  {field.state.meta.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: validateEmail,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="
                  block
                  text-lg
                  font-semibold
                  text-white
                  font-glacial
                "
              >
                Email
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your email..."
                className={`
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
                  ${
                    field.state.meta.errors.length > 0 &&
                    'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                  }
                `}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-error text-sm font-medium mt-1">
                  {field.state.meta.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="message"
          validators={{
            onChange: validateMessage,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="
                  block
                  text-lg
                  font-semibold
                  text-white
                  font-glacial
                  tracking-wide
                "
              >
                Message
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your message..."
                rows={4}
                className={`
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
                  ${
                    field.state.meta.errors.length > 0 &&
                    'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                  }
                `}
              />
              {field.state.meta.errors.length > 0 && (
                <div className="text-error text-sm font-medium mt-1">
                  {field.state.meta.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
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
              <button
                type="submit"
                disabled={shouldDisable}
                className={`
                  font-glacial
                  font-bold
                  py-4
                  px-8
                  rounded-lg
                  transition-all
                  duration-200
                  text-lg
                  w-full
                  sm:w-auto
                  flex
                  items-center
                  justify-center
                  gap-2
                  ${
                    shouldDisable
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-sage hover:text-white'
                  }
                `}
              >
                {isSubmitting || formIsSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
              </button>
            )
          }}
        </form.Subscribe>

        {submitResult && (
          <p
            className={`
              text-center
              font-semibold
              mt-4
              ${submitResult.startsWith('Mensagem enviada') ? 'text-success' : 'text-error'}
            `}
          >
            {submitResult}
          </p>
        )}
      </form>
    </div>
  )
}
