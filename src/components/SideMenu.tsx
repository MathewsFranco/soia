import { X } from 'lucide-react'

const SideMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  const closeMenu = () => setIsOpen(false)

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-80 bg-gray-900 bg-black text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } `}
    >
      <div className="flex items-center justify-between p-4 ">
        <button
          onClick={closeMenu}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto flex flex-col gap-6 text-lg font-bold">
        <a href="#brand-definition" onClick={closeMenu}>
          Home
        </a>
        <a href="#about" onClick={closeMenu}>
          Sobre
        </a>
        <a href="#services" onClick={closeMenu}>
          Serviços
        </a>
        <a href="#founder" onClick={closeMenu}>
          Contatos
        </a>
      </nav>
    </aside>
  )
}

export default SideMenu
