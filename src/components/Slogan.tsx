export function Slogan() {
  return (
    <div className="bg-amber p-10 md:px-15 md:py-30 flex gap-8 items-center">
      <img
        src="/logomark-white.png"
        className="w-30 h-30 md:w-50 md:h-50 md:ml-10"
        alt="Descrição da imagem"
      />
      <p className=" text-white text-2xl md:text-3xl text-justify leading-relaxed">
        Mais do que comunicar, buscamos entender o que realmente move o consumo
        e transformamos essas percepções em posicionamentos sólidos, histórias
        autênticas e experiências memoráveis.
      </p>
    </div>
  )
}
