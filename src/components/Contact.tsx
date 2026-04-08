import ContactForm from './ContactForm/ContactForm'
import SectionLabel from './ui/SectionLabel'

export default function Contact() {
  return (
    <section
      className="relative px-6 md:px-16 pt-24 pb-16"
      id="contact"
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-full"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(104, 96, 88, 0.12) 30%, rgba(104, 96, 88, 0.12) 70%, transparent)',
        }}
      />
      <SectionLabel className="block mb-10">Contato</SectionLabel>

      <div className="flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left: heading + links */}
        <div className="flex flex-col gap-10 md:w-[38%] shrink-0">
          <h2 className="contact-heading font-roswell text-4xl md:text-5xl text-white leading-tight tracking-wide">
            Vamos conversar
            <br />
            <span className="text-wine">sobre a sua marca.</span>
          </h2>

          <div className="flex flex-col gap-5">
            <a
              href="mailto:comercial@soiaconnect.com.br"
              className="contact-link group relative inline-block font-poppins font-light text-sm text-taupe tracking-wide hover:text-white transition-colors duration-300 pb-px w-fit"
            >
              comercial@soiaconnect.com.br
              <span className="absolute bottom-0 left-0 w-0 h-px bg-wine group-hover:w-full transition-all duration-500" />
            </a>

            <a
              href="https://www.instagram.com/soiaconnect/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group relative inline-block font-poppins font-light text-sm text-taupe tracking-wide hover:text-white transition-colors duration-300 pb-px w-fit"
            >
              @soiaconnect
              <span className="absolute bottom-0 left-0 w-0 h-px bg-wine group-hover:w-full transition-all duration-500" />
            </a>
          </div>

          <img
            src="/new-logos/Logo e Variacoes-08.png"
            alt=""
            aria-hidden="true"
            className="w-48 mt-auto hidden md:block"
          />
        </div>

        {/* Right: form */}
        <div className="contact-form flex-1">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
