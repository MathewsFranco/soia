export function Founder() {
  return (
    <section
      className=" leading-relaxed text-xl py-20 px-35 text-white bg-sage flex flex-col items-center justify-center gap-16"
      id="founder"
    >
      <h1 className="font-cy-grotesk text-5xl md:text-8xl mb-4 ">Conheça nossa fundadora</h1>

      <div className="flex flex-col lg:flex-row  gap-10 ">
        <div className="flex flex-col  items-center gap-5 ">
          <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl relative">
            <img
              src="/founder.jpeg"
              alt="founder picture"
              className="w-full h-full object-cover scale-110  object-[0%_-20%]"
            />
          </div>
          <p className="font-bold uppercase">Fabiana Tomaz</p>
        </div>

        <p className="max-w-xl text-2xl text-justify ">
          Fabiana Tomaz é estrategista criativa e fundadora da SOIA. Com uma trajetória marcada pela
          moda, branding e comportamento, transforma cultura e tendências em estratégias que
          conectam marcas a pessoas de forma genuína e relevante. Sua visão une sensibilidade
          estética, pensamento estratégico e inovação para criar experiências que transcendem o
          óbvio e constroem valor simbólico, emocional e duradouro.
        </p>
      </div>
    </section>
  );
}
