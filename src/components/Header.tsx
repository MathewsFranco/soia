import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import SideMenu from './SideMenu'
import { LogoMorphSVG } from './LogoMorphSVG'
import type { MouseEvent } from 'react'

type NavLink = { href: string; label: string }

const NAV_LINKS: Array<NavLink> = [
  { href: '/', label: 'Home' },
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

  function mapLinks() {
    return NAV_LINKS.map((link) => {
      const isHash = link.href.startsWith('#')
      const to = isHash ? `/${link.href}` : link.href

      function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        if (isHash) {
          handleNavClick(e, link.href)
        }
        setIsOpen(false)
      }

      // use a plain anchor for hash links so the event target is a real <a>
      if (isHash) {
        return (
          <a key={link.href} href={link.href} onClick={handleClick}>
            {link.label}
          </a>
        )
      }

      return (
        <Link key={link.href} to={to} onClick={handleClick}>
          {link.label}
        </Link>
      )
    })
  }

  return (
    <>
      <header className="py-6 px-10 md:px-16 flex items-center justify-between bg-black text-white border-b border-white/5">
        <Link to="/">
          <LogoMorphSVG className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10 font-poppins font-light text-xs tracking-[0.2em] text-white/60 uppercase">
          {mapLinks()}
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 md:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </header>

      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} mapLinks={mapLinks} />
    </>
  )
}
