const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col items-center p-10 pb-25 gap-12">
      <img src="/soia-logo-white.png" alt="soia-logo" className="w-100" />
      <a
        href="https://www.instagram.com/soiaconnect/"
        target="_blank"
        className="flex items-center gap-4 "
      >
        <img
          src="/instagram-logo.png"
          alt="Instagram Logo"
          className="w-8 h-8"
        />
        <p className="text-3xl">Follow us</p>
      </a>
      <a
        href="mailto:soiaconnectcomercial@gmail.com"
        className="text-xl font-bold p-2"
      >
        soiaconnectcomercial@gmail.com
      </a>
    </div>
  )
}

export default Footer
