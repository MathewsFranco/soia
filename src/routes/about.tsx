import { createFileRoute } from '@tanstack/react-router'
import Footer from '@/components/Footer'
import Typography from '@/components/Typography'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="bg-sage text-white flex items-center gap-10 px-5 md:px-15 text-justify py-30 flex-col md:flex-row">
        <div className="md:w-1/2 w-auto">
          <Typography variant="title" color="white" className="text-center uppercase border-b-white border-b-3 mb-8">
            quem somos
          </Typography>
          <div className="text-2xl w-full md:w-1/2">
            <Typography variant="body" color="white" className="mb-4">
              Na SOIA, acreditamos que o posicionamento de uma marca vai além de
              uma estratégia de mercado, é um processo contínuo de construção de
              significado.
            </Typography>
            <Typography variant="body" color="white" className="mb-4">
              Cada marca carrega uma narrativa, um conjunto de valores e um papel
              simbólico. Nosso trabalho é revelar essa essência, compreender como
              ela se manifesta no presente e traduzi-la em linguagem, estética e
              comportamento.
            </Typography>
            <Typography variant="body" color="white" className="mb-4">
              Acreditamos que marcas fortes são aquelas que sabem se reinventar
              sem perder coerência, e que constroem lealdade não apenas pela
              comunicação, mas pela experiência que entregam.
            </Typography>
            <Typography variant="body" color="white">
              Na interseção entre estratégia e sensibilidade, ajudamos marcas a se
              tornarem emocionalmente relevantes, culturalmente reconhecidas e
              profundamente conectadas às pessoas que as escolhem.
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex gap-10 px-5 md:px-15 text-justify py-30 flex-col">
        <Typography variant="title" color="white" className="self-start uppercase border-b-white border-b-3 mb-8">
          além da superfície
        </Typography>
        <Typography variant="body" color="white" className="md:ml-55">
          Fabiana Tomaz é estrategista criativa e fundadora da SOIA. Formada em
          Moda, ela constrói sua trajetória unindo a moda, o branding e o
          comportamento de consumo. Na SOIA, cada projeto vai além de uma
          simples entrega: é uma verdadeira experiência de criação. Mergulhamos
          no universo da marca, estudamos tendências, analisamos comportamentos
          e entendemos o que realmente motiva e emociona as pessoas. A partir
          disso, desenvolvemos narrativas e soluções que dão vida à marca,
          fortalecendo sua presença e relevância no mercado.
        </Typography>
      </div>
      <Footer color="sage" />
    </>
  )
}
