import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'Sobre' },
  { href: '#services', label: 'Serviços' },
  { href: '#founder', label: 'Fundadora' },
  { href: '#contact', label: 'Contato' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.from(navRef.current, {
      opacity: 0,
      y: -12,
      filter: 'blur(4px)',
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.paused(isOpen)
    }
  }, [isOpen])

  function handleLinkClick(href: string) {
    setIsOpen(false)
    if (href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        const smoother = ScrollSmoother.get()
        if (smoother) {
          setTimeout(() => smoother.scrollTo(target, true), 300)
        } else {
          setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300)
        }
      }
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 h-16 bg-black border-b border-white/8"
      >
        <Link to="/">
          <img src="/logo-test.svg" alt="SOIA" className="h-7 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-10 font-poppins font-light text-[10px] tracking-widest text-white/50 uppercase">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-6 p-2 text-white/50 hover:text-white transition-colors"
          aria-label="Fechar menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="font-roswell text-4xl text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
