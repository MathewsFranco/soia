import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import SideMenu from './SideMenu'

type NavLink = { href: string; label: string }

const NAV_LINKS: NavLink[] = [
  { href: '#brand-definition', label: 'Home' },
  { href: '#about', label: 'Sobre' },
  { href: '#services', label: 'Serviços' },
  { href: '/about', label: 'Quem somos' },
  { href: '#footer', label: 'Contatos' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#')) return // let normal navigation occur

    // If not on the home page, navigate to '/' with the hash so the root can handle scrolling
    if (window.location.pathname !== '/') {
      e.preventDefault()
      // navigating via location.href ensures the root receives the hash.
      window.location.href = '/' + href
      return
    }
  }

  return (
    <>
      <header className="py-8 pl-25 pr-15 flex items-center justify-between bg-black text-white">
        <Link to="/">
          <img src="/soia-logo-white.png" alt="Soia Logo" className="h-12" />
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-12 text-lg font-bold">
          {NAV_LINKS.map((link) => {
            const isHash = link.href.startsWith('#')
            const to = isHash ? `/${link.href}` : link.href
            return (
              <Link
                key={link.href}
                to={to}
                onClick={(e) => isHash && handleNavClick(e as any, link.href)}
              >
                {link.label}
              </Link>
            )
          })}
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
