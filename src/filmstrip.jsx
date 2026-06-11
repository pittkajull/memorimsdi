const filmStrip1 = [
  { src: "/images/IMG_0055.JPG", alt: "Memory 1" },
  { src: "/images/IMG_0056.JPG", alt: "Memory 2" },
  { src: "/images/IMG_0057.JPG", alt: "Memory 3" },
  { src: "/images/IMG_0058.JPG", alt: "Memory 4" },
];

const filmStrip2 = [
  { src: "/images/IMG_0059.JPG", alt: "Memory 5" },
  { src: "/images/IMG_0060.JPG", alt: "Memory 6" },
  { src: "/images/IMG_0061.JPG", alt: "Memory 7" },
  { src: "/images/IMG_0062.JPG", alt: "Memory 8" },
];

const filmStrip3 = [
  { src: "/images/IMG_0063.JPG", alt: "Memory 9" },
  { src: "/images/IMG_0064.JPG", alt: "Memory 10" },
  { src: "/images/IMG_0065.JPG", alt: "Memory 11" },
  { src: "/images/IMG_0066.JPG", alt: "Memory 12" },
];

function FilmStripRow({ images, reverse = false }) {
  return (
    <div className={`relative ${reverse ? "rotate-1" : "-rotate-1"} mb-8`}>
      {/* Film strip container */}
      <div className="bg-zinc-900 border border-zinc-700/50 p-2">
        {/* Top sprocket holes */}
        <div className="flex justify-between px-2 mb-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-2 bg-black border border-zinc-600/40"
            ></div>
          ))}
        </div>

        {/* Photos row */}
        <div className="flex gap-1">
          {images.map((img, i) => (
            <div key={i} className="relative flex-1 aspect-[4/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700"
              />
              {/* Light leak effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom sprocket holes */}
        <div className="flex justify-between px-2 mt-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-2 bg-black border border-zinc-600/40"
            ></div>
          ))}
        </div>
      </div>

      {/* Film strip edge marks */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono rotate-90">
        TX 5063
      </div>
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono -rotate-90">
        400
      </div>
    </div>
  );
}

export default function Filmstrip() {
  return (
    <section className="relative bg-black py-20 px-6 overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Handwritten annotations */}
        <div className="relative mb-16">
          {/* Arrow pointing down-right */}
          <svg
            className="absolute -left-4 top-0 w-16 h-16 text-white/30"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 10 Q 50 30 80 80" strokeDasharray="4 4" />
            <path d="M70 80 L 80 80 L 80 70" />
          </svg>

          <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-white/50 max-w-md ml-12">
            Setiap momen tersimpan dalam gulungan film ini...
          </p>
        </div>

        {/* Film Strip Rows */}
        <div className="space-y-4">
          <FilmStripRow images={filmStrip1} />
          <FilmStripRow images={filmStrip2} reverse />
          <FilmStripRow images={filmStrip3} />
        </div>

        {/* Handwritten annotation bottom */}
        <div className="relative mt-16 text-right">
          <svg
            className="absolute right-0 bottom-0 w-20 h-20 text-white/30"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M90 90 Q 50 70 20 20" strokeDasharray="4 4" />
            <path d="M30 20 L 20 20 L 20 30" />
          </svg>

          <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-white/50 max-w-md mr-12 inline-block">
            Kenangan yang tak pernah pudar
          </p>
        </div>
      </div>
    </section>
  );
}
