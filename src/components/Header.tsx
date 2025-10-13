import { Link } from '@tanstack/react-router'
import SideMenu from './SideMenu'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="  py-8 pl-25 pr-15 flex items-center justify-between bg-ink text-linen">
        <div className="flex items-center">
          {/* TODO: update this to only show when mobile */}
          {/* <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button> */}
          {/* TODO: update this to only show when mobile */}

          <Link to="/">
            <img src="/soia-logo-white.png" alt="Soia Logo" className="h-12" />
          </Link>
        </div>
        <nav className="flex gap-12 text-lg font-bold ">
          <Link to="/" className="hover:text-cyan-400 transition-colors ">
            Home
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Sobre
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Serviços
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Conteúdos
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Contatos
          </Link>
        </nav>
      </header>

      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
