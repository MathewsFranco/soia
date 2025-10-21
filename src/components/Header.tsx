import { Menu } from 'lucide-react'
import SideMenu from './SideMenu'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="  py-8 pl-25 pr-15 flex items-center justify-between bg-black text-white">
        <div className="flex items-center">
          {/* TODO: update this to only show when mobile */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          {/* TODO: update this to only show when mobile */}

          <a href="/">
            <img src="/soia-logo-white.png" alt="Soia Logo" className="h-12" />
          </a>
        </div>
        <nav className="flex gap-12 text-lg font-bold ">
          <a
            href="#brand-definition"
            className="hover:text-cyan-400 transition-colors "
          >
            Home
          </a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">
            Sobre
          </a>
          <a href="#services" className="hover:text-cyan-400 transition-colors">
            Serviços
          </a>
          {/* <a href="#" className="hover:text-cyan-400 transition-colors">
            Conteúdos
          </a> */}
          <a href="#founder" className="hover:text-cyan-400 transition-colors">
            Contatos
          </a>
        </nav>
      </header>

      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
