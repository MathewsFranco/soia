import Typography from "./Typography";

export function Slogan() {
  return (
    <section className=" h-[100vh] flex-col md:flex-row flex items-center justify-center gap-10">
      <img
        src="/logomark-white.png"
        className="w-25 h-25 md:w-50 md:h-50 md:ml-10"
        alt="logomark"
      />
      <div className="max-w-[600px]">
        <Typography variant="body" >
          Mais do que comunicar, buscamos entender o que realmente move as
          pessoas, seus desejos e comportamento de consumo.
          <br />
          <br />
          A partir
          dessas percepções, desenvolvemos posicionamentos e narrativas
          estratégicas para cada marca e cliente.
        </Typography>
      </div>
    </section>
  )
}
