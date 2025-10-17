export function BrandDefinition() {
  return (
    <div className=" flex flex-col md:flex-row bg-amber text-white h-160">
      <div className=" px-10  flex flex-col items-start justify-center text-left w-full h-160 md:w-4/6">
        <h1 className="font-bold mb-10 text-6xl ">QUEM SOMOS</h1>
        <p className="text-2xl">
          A SOIA é agência que conecta a sua marca as gerações que estão
          impulsionando o mercado.
        </p>
      </div>
      <div className="w-full md:w-3/6 flex items-center justify-center overflow-hidden">
        <img
          src="/model.jpeg"
          alt="model holding a computer"
          className="w-full h-full object-cover   object-[center_60%]"
        />
      </div>
    </div>
  )
}
