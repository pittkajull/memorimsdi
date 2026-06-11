export default function Footer() {
  return (
    <footer className="relative bg-black py-24 px-6">
      {/* Top divider */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center">
        {/* Quote */}
        <p className="text-lg md:text-xl text-white/40 italic leading-relaxed max-w-2xl mx-auto mb-16">
          &quot;Nikmatilah setiap sisa kenangan hangat ini di dalam hati kalian.&quot;
        </p>

        {/* Logo text */}
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase mb-4">
          MEMORI MSDI
        </h3>
        <p className="text-white/20 text-sm tracking-wider mb-12">
          Tempat Berpulang, Kenangan Abadi
        </p>

        {/* Bottom */}
        <p className="text-white/10 text-xs tracking-wider">
          &copy; 2025 MSDI
        </p>
      </div>
    </footer>
  );
}
