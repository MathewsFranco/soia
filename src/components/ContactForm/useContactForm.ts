import { useState } from 'react'
import { WEB3_FORMS_CONFIG, MESSAGES } from './utils/constants'

interface Web3FormsResponse {
  success: boolean
  message?: string
}

export function useContactForm() {
  const [submitResult, setSubmitResult] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const submitForm = async (formData: {
    name: string
    email: string
    message: string
  }) => {
    setIsSubmitting(true)
    setSubmitResult('')

    try {
      const data = new FormData()
      data.append('access_key', WEB3_FORMS_CONFIG.accessKey)
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('message', formData.message)

      const response = await fetch(WEB3_FORMS_CONFIG.endpoint, {
        method: 'POST',
        body: data,
      })

      const result = (await response.json()) as Web3FormsResponse

      if (result.success) {
        setSubmitResult(MESSAGES.success)
        return true
      } else {
        setSubmitResult('Error: ' + (result.message || MESSAGES.defaultError))
        return false
      }
    } catch (error) {
      setSubmitResult(MESSAGES.networkError)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitResult, isSubmitting, submitForm, setSubmitResult }
}
