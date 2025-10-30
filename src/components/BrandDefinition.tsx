export function BrandDefinition() {
  return (
    <section
      className="flex flex-col pt-10 md:pt-0 md:flex-row justify-center items-center bg-amber text-white "
      id="brand-definition"
    >
      <div className="mx-5  flex flex-col gap-10 items-start justify-center md:w-4/6  ">
        <h1 className="font-bold text-6xl ">QUEM SOMOS</h1>
        <p className="text-2xl text-justify">
          A SOIA é agência que conecta a sua marca as gerações que estão
          impulsionando o mercado.
        </p>
      </div>
      <div className="max-w-100 my-15 md:w-2/6 md:mr-15 md:mb-15 relative ">
        <Square className="absolute -top-8 -left-15" />
        <Square className="absolute -bottom-10 -right-10 " />
        <img
          src="/model.jpeg"
          alt="model holding a computer"
          className="  object-cover"
        />
      </div>
    </section>
  )
}

const Square = ({ className }: { className?: string }) => (
  <div className={`w-20 h-20 bg-sage ${className}`} />
)
