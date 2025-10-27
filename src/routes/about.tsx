import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-clay text-white">
      <div>quem somos</div>
      <div>
        Na SOIA, mais do que comunicar, buscamos compreender o que move o
        consumo e traduzir essas percepções em posicionamentos sólidos,
        narrativas autênticas e experiências marcantes. Unimos estratégia,
        estética e sensibilidade para criar e impulsionar marcas que inspiram,
        conectam e permanecem.
      </div>
    </div>
  )
}
