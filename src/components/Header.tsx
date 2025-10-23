import { Menu } from 'lucide-react'
import SideMenu from './SideMenu'
import { useState } from 'react'

type NavLink = { href: string; label: string }

const NAV_LINKS: NavLink[] = [
  { href: '#brand-definition', label: 'Home' },
  { href: '#about', label: 'Sobre' },
  { href: '#services', label: 'Serviços' },
  { href: '#footer', label: 'Contatos' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="py-8 pl-25 pr-15 flex items-center justify-between bg-black text-white">
        <a href="/">
          <img src="/soia-logo-white.png" alt="Soia Logo" className="h-12" />
        </a>

        <nav className="hidden md:flex items-center justify-center gap-12 text-lg font-bold">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
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
