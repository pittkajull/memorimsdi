import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const filmStrip3 = [
  { src: "/images/IMG_0071.JPG", alt: "Memory 17" },
  { src: "/images/IMG_0072.JPG", alt: "Memory 18" },
  { src: "/images/IMG_0073.JPG", alt: "Memory 19" },
  { src: "/images/IMG_0074.JPG", alt: "Memory 20" },
  { src: "/images/IMG_0075.JPG", alt: "Memory 21" },
  { src: "/images/IMG_0078.JPG", alt: "Memory 22" },
  { src: "/images/IMG_0079.JPG", alt: "Memory 23" },
  { src: "/images/IMG_0080.JPG", alt: "Memory 24" },
];

const filmStrip4 = [
  { src: "/images/IMG_0081.JPG", alt: "Memory 25" },
  { src: "/images/IMG_0083.JPG", alt: "Memory 26" },
  { src: "/images/IMG_0084.JPG", alt: "Memory 27" },
  { src: "/images/IMG_0085.JPG", alt: "Memory 28" },
  { src: "/images/IMG_0086.JPG", alt: "Memory 29" },
  { src: "/images/IMG_0097.JPG", alt: "Memory 30" },
  { src: "/images/IMG_0098.JPG", alt: "Memory 31" },
  { src: "/images/IMG_0100.JPG", alt: "Memory 32" },
];

function SprocketHoles() {
  return (
    <div className="flex gap-3 px-4">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-2 bg-black/80 border border-zinc-600/30 flex-shrink-0"
        ></div>
      ))}
    </div>
  );
}

function FilmStripRow({ images, direction = "left", speed = 40 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const animation = gsap.to(track, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => animation.kill();
  }, [direction, speed]);

  const content = (
    <div className="flex gap-1.5">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 w-48 h-32 overflow-hidden"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover grayscale contrast-110 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden py-3">
      <div className="bg-zinc-900/90 border border-zinc-700/40 py-2">
        <SprocketHoles />
        <div className="relative overflow-hidden my-2">
          <div ref={trackRef} className="flex gap-1.5 w-max">
            {content}
            {content}
          </div>
        </div>
        <SprocketHoles />
      </div>
    </div>
  );
}

export default function Filmstrip2() {
  return (
    <section className="relative bg-black py-16 overflow-hidden">
      {/* Orange light leak */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-orange-600/15 to-transparent pointer-events-none"></div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="space-y-6">
          <FilmStripRow images={filmStrip3} direction="right" speed={38} />
          <FilmStripRow images={filmStrip4} direction="left" speed={42} />
        </div>

        {/* Bottom hashtag */}
        <div className="mt-12 text-center">
          <p className="font-['Caveat',_cursive] text-2xl text-white/30">
            #KitaSelaluIngat
          </p>
        </div>
      </div>
    </section>
  );
}
