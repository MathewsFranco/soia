import Typography from './Typography'

export function Services() {
  return (
    <section
      className="flex flex-col md:flex-row text-justify"
      id="services"
    >
      <div className="w-full">
        <Typography variant="title" >
          Nossos Serviços
        </Typography>
        <ul className="text-white text-lg">
          <li className="mb-2">Mentoria Estratégica</li>
          <li className="mb-2">Estratégia de marca e marketing</li>
          <li className="mb-2">Consultoria para marcas</li>
          <li className="mb-2">Mapeamento de Persona</li>
          <li className="mb-2">Manual da marca</li>
          <li className="mb-2">Conteúdo</li>
          <li className="mb-2">Ações, Experiências e Eventos</li>
          <li className="mb-2">Campanhas</li>
          <li className="mb-2">Desenvolvimento de Roteiros</li>
          <li className="mb-2">Seeding</li>
          <li>Relacionamento</li>
        </ul>
      </div>
    </section>
  )
}
