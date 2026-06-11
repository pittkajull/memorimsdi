const memories = [
  {
    year: "2023",
    title: "Awal Perjalanan",
    description: "Ketika pertama kali berkumpul dengan semangat yang sama, memulai langkah kecil menuju mimpi besar.",
  },
  {
    year: "2024",
    title: "Tantangan & Pertumbuhan",
    description: "Melewati berbagai rintangan, belajar dari kegagahan, dan menemukan kekuatan dalam kebersamaan.",
  },
  {
    year: "2025",
    title: "Pencapaian Luar Biasa",
    description: "Meraih prestasi yang tak pernah kami bayangkan sebelumnya, membuktikan bahwa kerja keras membuahkan hasil.",
  },
];

export default function Timeline() {
  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-900 to-black py-24 px-6 overflow-hidden">
      {/* Film strip decoration - top */}
      <div className="absolute top-0 left-0 w-full h-12 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.08)_20px,rgba(255,255,255,0.08)_24px)] opacity-60"></div>

      {/* Film strip decoration - bottom */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.08)_20px,rgba(255,255,255,0.08)_24px)] opacity-60"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <p className="text-amber-500/80 tracking-[0.3em] uppercase text-sm font-medium mb-4">
            A K A N T E C I M I E N T O S
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider uppercase">
            Memori Kami
          </h2>
          <div className="mt-6 w-32 h-0.5 bg-amber-500/60 mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-500/30 transform -translate-x-1/2"></div>

          {memories.map((memory, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-20 last:mb-0 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                <span className="text-5xl md:text-6xl font-black text-amber-500/40 tracking-wider">
                  {memory.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-3 tracking-wide">
                  {memory.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  {memory.description}
                </p>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-amber-500 border-4 border-black shadow-lg shadow-amber-500/30"></div>
              </div>

              {/* Spacer for the other side */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
