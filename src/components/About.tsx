import Typography from "./Typography";

export function About() {
  return (
    <section
      className=" h-[100vh] flex p-10"
      id="about"
    >
      <div className="flex flex-col justify-center gap-10">
        <Typography variant="title">Sobre a SOIA</Typography>
        <Typography variant="body">
          Idealizada por Fabiana Tomaz, com formação em Moda e atuação em marketing e comportamento de consumo, a SOIA nasce como um agência de comunicação boutique e com estratégia de 360º, conectando marcas, clientes e influenciadores de forma assertiva e relevante.
          <br />
          <br />
          Atuamos em múltiplas frentes como, posicionamento, narrativas, influência, conteúdo, relações públicas, eventos e experiências. Sempre a partir de uma leitura profunda do que move as pessoas e o consumo contemporâneo nos universos de moda e lifestyle.
        </Typography>
      </div>
    </section >
  )
}
