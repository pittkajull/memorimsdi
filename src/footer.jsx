export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black to-zinc-950 py-20 px-6 overflow-hidden">
      {/* Film strip decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

      <div className="max-w-6xl mx-auto">
        {/* Quote Section */}
        <div className="text-center mb-16">
          <p className="text-amber-500/60 tracking-[0.3em] uppercase text-xs font-medium mb-6">
            B O N &nbsp; A P P É T I T
          </p>
          <blockquote className="text-xl md:text-2xl text-white/70 italic leading-relaxed max-w-3xl mx-auto">
            &quot;Nikmatilah setiap sisa kenangan hangat ini di dalam hati kalian.&quot;
          </blockquote>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="w-16 h-px bg-amber-500/30"></div>
          <div className="w-2 h-2 rotate-45 border border-amber-500/40"></div>
          <div className="w-16 h-px bg-amber-500/30"></div>
        </div>

        {/* Bottom */}
        <div className="text-center">
          <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-4">
            MEMORI MSDI
          </h3>
          <p className="text-white/30 text-sm tracking-wider">
            Tempat Berpulang, Kenangan Abadi
          </p>
          <p className="text-white/20 text-xs mt-8 tracking-wider">
            &copy; 2025 MSDI. All memories preserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
