export function Services() {
  return (
    <section
      className="text-justify bg-white text-black flex flex-col md:flex-row tracking-wide leading-relaxed text-2xl"
      id="services"
    >
      <div className="p-10">
        <h1 className="font-bold mb-20 text-6xl">Nossos Serviços</h1>
        <p>
          A SOIA observa, analisa e transforma o comportamento humano em
          narrativas e oportunidades.
        </p>
        <p>
          Entre o sentir e o pensar, traduz o que move pessoas e o que inspira
          gerações e dar forma as marcas que estão buscando o encontro emoção,
          cultura e propósito.
        </p>
        <br />
        <p>
          Na área sensorial, as ideias ganham texturas, voz e propósito,
          transformando conceitos em experiências que despertam os sentidos.
        </p>
        <br />
        <p>
          Na área comportamental, tendências são traduzidas em estratégias
          humanas, conectando marcas ao tempo presente e ao que ainda está por
          vir.
        </p>
      </div>
      <div>
        <p className="px-10 md:pl-0 pr-10 md:pt-10">
          Nos projetos de PR, cada ação é projetada com muita pesquisa, para que
          o encontro entre marcas e públicos aconteça de forma genuína e
          memorável.
        </p>
        <div className="w-full aspect-[1/1] mt-6">
          <img
            src="/shoes.jpeg"
            alt="black high heels on a office desk"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
