export default function Footer() {
  return (
    <footer className="relative bg-black px-6 py-16 md:py-20">
      {/* Garis pemisah — dibikin sepanjang isinya aja, dulu 5xl jadi
          kepanjangan sendirian di layar lebar */}
      <div className="mx-auto mb-12 max-w-xl">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-xl text-center">
        <p className="mx-auto mb-10 max-w-md text-base italic leading-relaxed text-white/40 md:text-lg">
          &quot;Enjoy every remaining warm memory in your hearts.&quot;
        </p>

        <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-white md:text-3xl">
          Memori MSDI
        </h3>
        <p className="mt-2 text-xs tracking-wider text-white/25">
          A Place of Rest, Eternal Memories
        </p>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/memorimsdi/"
          target="_blank"
          rel="noreferrer"
          className="group mt-7 inline-flex items-center gap-2 border border-white/10 px-4 py-2
                     text-white/50 transition-colors duration-300
                     hover:border-amber-400/40 hover:text-amber-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-xs tracking-[0.15em]">@memorimsdi</span>
        </a>

        <p className="mt-10 text-[10px] tracking-[0.2em] text-white/15">&copy; 2025 MSDI</p>
      </div>
    </footer>
  );
}
