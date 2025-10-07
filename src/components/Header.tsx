import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import SideMenu from './SideMenu'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center justify-between  bg-gray-200 text-rich-back shadow-lg">
        {/* TODO: remove this nav bar */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          {/* TODO: remove this nav bar */}

          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/">
              <img
                src="/soia-logo-black.png"
                alt="Soia Logo"
                className="h-16"
              />
            </Link>
          </h1>
        </div>
        <nav className="flex gap-6 text-lg font-bold">
          <Link to="/" className="hover:text-cyan-400 transition-colors ">
            Inicio
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Sobre
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Conteúdos
          </Link>
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Contato
          </Link>
        </nav>
      </header>

      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
