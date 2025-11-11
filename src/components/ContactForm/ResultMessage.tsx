type ResultMessageType = {
  message: string
}

export function ResultMessage({ message }: ResultMessageType) {
  if (!message) return null

  const isSuccess = message.startsWith('Mensagem enviada')

  return (
    <p
      className={`
        text-center
        mt-4
        ${isSuccess ? 'text-success' : 'text-error'}
      `}
    >
      {message}
    </p>
  )
}
