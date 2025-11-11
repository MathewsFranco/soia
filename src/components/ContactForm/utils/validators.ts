export const validateName = ({ value }: { value: string }) => {
  if (!value || value.trim().length === 0) {
    return 'Nome é obrigatório'
  }
  if (value.trim().length < 2) {
    return 'Nome deve ter pelo menos 2 caracteres'
  }
  return undefined
}

export const validateEmail = ({ value }: { value: string }) => {
  if (!value || value.trim().length === 0) {
    return 'Email é obrigatório'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Por favor, insira um endereço de email válido'
  }
  return undefined
}

export const validateMessage = ({ value }: { value: string }) => {
  if (!value || value.trim().length === 0) {
    return 'Mensagem é obrigatória'
  }

  return undefined
}
