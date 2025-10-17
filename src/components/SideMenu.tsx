import { Home, X } from 'lucide-react'

import { Link } from '@tanstack/react-router'

const SideMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Navigation</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
          activeProps={{
            className:
              'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
          }}
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </Link>

        {/* Demo Links Start */}

        {/* Demo Links End */}
      </nav>
    </aside>
  )
}

export default SideMenu
