export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-12 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <span className="font-poppins font-light text-[10px] tracking-[0.35em] text-white/20 uppercase">
        © {new Date().getFullYear()} SOIA — Agência Boutique
      </span>
      <span className="font-poppins font-light text-[10px] tracking-[0.35em] text-white/20 uppercase">
        Estratégia · Cultura · Branding
      </span>
    </footer>
  )
}
