const filmStrip4 = [
  { src: "/images/IMG_0067.JPG", alt: "Memory 13" },
  { src: "/images/IMG_0068.JPG", alt: "Memory 14" },
  { src: "/images/IMG_0069.JPG", alt: "Memory 15" },
  { src: "/images/IMG_0070.JPG", alt: "Memory 16" },
];

const filmStrip5 = [
  { src: "/images/IMG_0071.JPG", alt: "Memory 17" },
  { src: "/images/IMG_0072.JPG", alt: "Memory 18" },
  { src: "/images/IMG_0073.JPG", alt: "Memory 19" },
  { src: "/images/IMG_0074.JPG", alt: "Memory 20" },
];

const filmStrip6 = [
  { src: "/images/IMG_0075.JPG", alt: "Memory 21" },
  { src: "/images/IMG_0078.JPG", alt: "Memory 22" },
  { src: "/images/IMG_0079.JPG", alt: "Memory 23" },
  { src: "/images/IMG_0080.JPG", alt: "Memory 24" },
];

function FilmStripRow({ images, reverse = false, tilt = "1" }) {
  const tiltClass = reverse ? `rotate-${tilt}` : `-rotate-${tilt}`;

  return (
    <div className={`relative ${tiltClass} mb-6`}>
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
    </div>
  );
}

export default function Filmstrip2() {
  return (
    <section className="relative bg-black py-20 px-6 overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      {/* Orange light leak on left */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-orange-600/20 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Handwritten annotation */}
        <div className="relative mb-12 flex justify-end">
          <div className="relative">
            <svg
              className="absolute -right-12 -top-8 w-24 h-24 text-white/30"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M80 20 C 60 40, 40 60, 20 80" strokeDasharray="4 4" />
              <path d="M30 80 L 20 80 L 20 70" />
            </svg>

            <p className="font-['Caveat',_cursive] text-xl md:text-2xl text-white/40 text-right max-w-xs">
              Cerita yang tertulis di setiap frame
            </p>
          </div>
        </div>

        {/* Film Strip Rows */}
        <div className="space-y-4">
          <FilmStripRow images={filmStrip4} tilt="0.5" />
          <FilmStripRow images={filmStrip5} reverse tilt="0.5" />
          <FilmStripRow images={filmStrip6} tilt="1" />
        </div>

        {/* Bottom annotation with circle */}
        <div className="relative mt-16">
          <div className="flex items-center justify-center gap-4">
            <svg
              className="w-8 h-8 text-white/20"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
              <path d="M50 20 L 50 10" />
              <path d="M50 80 L 50 90" />
            </svg>

            <p className="font-['Caveat',_cursive] text-2xl md:text-3xl text-white/40">
              #KitaSelaluIngat
            </p>

            <svg
              className="w-8 h-8 text-white/20"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
              <path d="M50 20 L 50 10" />
              <path d="M50 80 L 50 90" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
