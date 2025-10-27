export function BrandDefinition() {
  return (
    <section
      className=" flex flex-col pt-10 md:pt-0 md:flex-row justify-center items-center bg-amber text-white "
      id="brand-definition"
    >
      <div className=" px-10 flex flex-col gap-10 items-start justify-center md:w-4/6">
        <h1 className="font-bold text-6xl ">QUEM SOMOS</h1>
        <p className="text-2xl text-justify">
          A SOIA é agência que conecta a sua marca as gerações que estão
          impulsionando o mercado.
        </p>
      </div>
      <div className="p-15 m-5 ml-0  w-full md:w-3/6 flex relative items-center justify-center overflow-hidden">
        <Square className="absolute top-0 left-0 m-5" />
        <Square className="absolute bottom-0 right-0 m-5" />
        <img
          src="/model.jpeg"
          alt="model holding a computer"
          className=" object-cover  object-[center_160%]"
        />
      </div>
    </section>
  )
}

const Square = ({ className }: { className?: string }) => (
  <div className={`w-25 h-25 bg-sage ${className}`} />
)
