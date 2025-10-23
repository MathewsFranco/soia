import { Menu } from 'lucide-react'
import SideMenu from './SideMenu'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="py-8 pl-25 pr-15 flex items-center justify-between bg-black text-white">
        <a href="/">
          <img src="/soia-logo-white.png" alt="Soia Logo" className="h-12" />
        </a>
        <nav className="md:flex gap-12 text-lg font-bold hidden">
          <a href="#brand-definition">Home</a>
          <a href="#about">Sobre</a>
          <a href="#services">Serviços</a>
          <a href="#footer">Contatos</a>
        </nav>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
