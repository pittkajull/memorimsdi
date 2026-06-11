const categories = [
  {
    title: "K E R J A S A M A",
    subtitle: "Bersama Mencapai Tujuan",
    description: "Setiap proyek adalah kesempatan untuk belajar, tumbuh, dan membuktikan bahwa tim yang solid dapat mengatasi tantangan apapun.",
  },
  {
    title: "K E L U A R G A",
    subtitle: "Ikatan yang Lebih dari Sekadar Rekan",
    description: "Di luar jam kerja, kami adalah keluarga. Tawa, cerita, dan kenangan manis yang tak terlupakan.",
  },
  {
    title: "P R E S T A S I",
    subtitle: "Bukti Kerja Keras",
    description: "Pencapaian yang diraih bukan hanya milik individu, tapi bukti dari dedikasi seluruh tim.",
  },
];

export default function Moments() {
  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      {/* Subtle film grain texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <p className="text-amber-500/80 tracking-[0.3em] uppercase text-sm font-medium mb-4">
            C A R A K T E R I S T I K A S
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider uppercase">
            Kenangan Berharga
          </h2>
          <div className="mt-6 w-32 h-0.5 bg-amber-500/60 mx-auto"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border border-amber-500/10 rounded-sm overflow-hidden hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Film strip top */}
              <div className="h-8 bg-zinc-900 flex items-center px-3 gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-3 h-2 bg-black/60 border border-zinc-700/50"></div>
                ))}
              </div>

              {/* Content */}
              <div className="p-8 min-h-[280px] flex flex-col justify-center">
                <span className="text-amber-500/50 text-xs tracking-[0.2em] uppercase mb-3 block">
                  0{index + 1}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-wider mb-2">
                  {category.title}
                </h3>
                <p className="text-amber-500/80 text-sm mb-4 italic">
                  {category.subtitle}
                </p>
                <p className="text-white/50 leading-relaxed text-sm">
                  {category.description}
                </p>
              </div>

              {/* Film strip bottom */}
              <div className="h-8 bg-zinc-900 flex items-center px-3 gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-3 h-2 bg-black/60 border border-zinc-700/50"></div>
                ))}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/0 group-hover:via-amber-500/5 group-hover:to-amber-500/0 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
