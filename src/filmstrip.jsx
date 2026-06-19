import { useEffect, useRef } from "react";

const filmStrip1 = [
  "/images/potostudio/IMG_0003.JPG",
  "/images/potostudio/IMG_0004.JPG",
  "/images/potostudio/IMG_0006.JPG",
  "/images/potostudio/IMG_0007.JPG",
  "/images/potostudio/IMG_0009.JPG",
  "/images/potostudio/IMG_0010.JPG",
  "/images/potostudio/IMG_0011.JPG",
  "/images/potostudio/IMG_0012.JPG",
  "/images/potostudio/IMG_0014.JPG",
  "/images/potostudio/IMG_0015.JPG",
  "/images/potostudio/IMG_0016.JPG",
  "/images/potostudio/IMG_0017.JPG",
  "/images/potostudio/IMG_0018.JPG",
  "/images/potostudio/IMG_0019.JPG",
  "/images/potostudio/IMG_0020.JPG",
  "/images/potostudio/IMG_0021.JPG",
  "/images/potostudio/IMG_0022.JPG",
  "/images/potostudio/IMG_0024.JPG",
  "/images/potostudio/IMG_0025.JPG",
  "/images/potostudio/IMG_0026.JPG",
  "/images/potostudio/IMG_0027.JPG",
  "/images/potostudio/IMG_0029.JPG",
  "/images/potostudio/IMG_0030.JPG",
  "/images/potostudio/IMG_0031.JPG",
];

const filmStrip2 = [
  "/images/potostudio/IMG_0055.JPG",
  "/images/potostudio/IMG_0056.JPG",
  "/images/potostudio/IMG_0057.JPG",
  "/images/potostudio/IMG_0058.JPG",
  "/images/potostudio/IMG_0059.JPG",
  "/images/potostudio/IMG_0060.JPG",
  "/images/potostudio/IMG_0061.JPG",
  "/images/potostudio/IMG_0062.JPG",
  "/images/potostudio/IMG_0063.JPG",
  "/images/potostudio/IMG_0064.JPG",
  "/images/potostudio/IMG_0065.JPG",
  "/images/potostudio/IMG_0066.JPG",
  "/images/potostudio/IMG_0067.JPG",
  "/images/potostudio/IMG_0068.JPG",
  "/images/potostudio/IMG_0069.JPG",
  "/images/potostudio/IMG_0070.JPG",
  "/images/potostudio/IMG_0071.JPG",
  "/images/potostudio/IMG_0072.JPG",
  "/images/potostudio/IMG_0073.JPG",
  "/images/potostudio/IMG_0074.JPG",
  "/images/potostudio/IMG_0075.JPG",
  "/images/potostudio/IMG_0078.JPG",
  "/images/potostudio/IMG_0079.JPG",
  "/images/potostudio/IMG_0080.JPG",
];

function SprocketHoles() {
  return (
    <div className="flex gap-4 px-4">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-3 bg-black/80 border border-zinc-600/30 flex-shrink-0"
        ></div>
      ))}
    </div>
  );
}

function FilmStripRow({ images, direction = "left" }) {
  const isLeft = direction === "left";

  return (
    <div className="relative overflow-hidden py-4">
      <div className="bg-zinc-900/90 border border-zinc-700/40 py-3">
        <SprocketHoles />

        <div className="relative overflow-hidden my-3">
          {/* CSS infinite scroll */}
          <div
            className="flex gap-2 w-max"
            style={{
              animation: `${isLeft ? "scrollLeft" : "scrollRight"} 90s linear infinite`,
            }}
          >
            {/* Repeat 4 times for seamless loop */}
            {[...images, ...images, ...images, ...images].map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-72 h-48 md:w-80 md:h-56 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Memory ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <SprocketHoles />
      </div>
    </div>
  );
}

export default function Filmstrip() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Inline keyframes */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-full mx-auto relative z-10 px-4">
        {/* Handwritten annotation */}
        <div className="mb-12 ml-6">
          <p className="font-['Caveat',_cursive] text-2xl md:text-4xl text-white/40">
            Setiap momen tersimpan dalam gulungan film ini...
          </p>
        </div>

        {/* Film Strip Rows */}
        <div className="space-y-8">
          <FilmStripRow images={filmStrip1} direction="left" />
          <FilmStripRow images={filmStrip2} direction="right" />
        </div>
      </div>
    </section>
  );
}
