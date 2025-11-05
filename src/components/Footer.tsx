const Footer = ({ color = 'black' }: { color?: string }) => {
  return (
    <section
      className={`bg-${color} text-white flex flex-col items-center p-10 pb-15 gap-12`}
      id="footer"
    >
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
        href="mailto:comercial@soiaconnect.com.br"
        className="text-xl md:text-3xl font-bold"
      >
        comercial@soiaconnect.com.br
      </a>
    </section>
  )
}

export default Footer
