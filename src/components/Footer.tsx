export default function Footer() {
  return (
    <footer className="relative px-6 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-full"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(104, 96, 88, 0.15) 30%, rgba(104, 96, 88, 0.15) 70%, transparent)',
        }}
      />
      <div className="flex items-center gap-4">
        <span className="font-poppins font-light text-xs tracking-[0.35em] text-white/35 uppercase">
          © {new Date().getFullYear()} SOIA — Agência Boutique
        </span>
      </div>
      <span className="font-poppins font-light text-xs tracking-[0.35em] text-white/35 uppercase">
        Estratégia · Cultura · Branding
      </span>
    </footer>
  )
}
