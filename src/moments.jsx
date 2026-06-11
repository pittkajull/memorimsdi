const categories = [
  {
    number: "01",
    title: "Kerjasama",
    description: "Setiap proyek adalah kesempatan untuk belajar, tumbuh, dan membuktikan bahwa tim yang solid dapat mengatasi tantangan apapun.",
  },
  {
    number: "02",
    title: "Keluarga",
    description: "Di luar jam kerja, kami adalah keluarga. Tawa, cerita, dan kenangan manis yang tak terlupakan.",
  },
  {
    number: "03",
    title: "Prestasi",
    description: "Pencapaian yang diraih bukan hanya milik individu, tapi bukti dari dedikasi seluruh tim.",
  },
];

export default function Moments() {
  return (
    <section className="relative bg-black py-32 px-6">
      {/* Divider */}
      <div className="max-w-5xl mx-auto mb-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-white/30 text-xs tracking-[0.4em] uppercase block mb-4">
            Our Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Kenangan Berharga
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-white/20"></div>
            <div className="w-1.5 h-1.5 bg-white/40 rotate-45"></div>
            <div className="w-12 h-px bg-white/20"></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 md:p-10 border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              {/* Number */}
              <span className="text-6xl md:text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 block mb-6">
                {item.number}
              </span>

              {/* Content */}
              <h3 className="text-lg font-bold text-white tracking-wide mb-4 uppercase">
                {item.title}
              </h3>
              <p className="text-white/30 leading-relaxed text-sm group-hover:text-white/50 transition-colors duration-500">
                {item.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
